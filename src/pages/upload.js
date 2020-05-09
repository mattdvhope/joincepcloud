import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import AWS from 'aws-sdk';
import Layout from '../components/layout'
import photo from '../../static/asianTeam.jpg'

export default class Upload extends React.Component {
	constructor() {
    super();
    this.state = {
      window: undefined,
      s3: undefined,
      s3data: undefined,
      albums: undefined,
      newAlbumName: "",
      albumChosenName: "",
      newAlbumExists: false,
      bucketName: `cep-class-notes`,
      photoURL: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addPhoto = this.addPhoto.bind(this);
  }

  componentDidMount() {
  	const bucketName = this.state.bucketName;
		AWS.config.update({
		  region: `ap-southeast-1`,
		  credentials: new AWS.CognitoIdentityCredentials({
		    IdentityPoolId: `ap-southeast-1:8a430d38-b41b-48e3-ad57-7cc3335726ff`
		  })
		});


		const s3 = new AWS.S3({
		  apiVersion: "2006-03-01",
		  params: { Bucket: bucketName }
		});

		const _this = this;
	  s3.listObjects({ Delimiter: "/" }, function(err, data) {
	    if (err) {
	      return alert("There was an error listing your albums: " + err.message);
	    } else {
	      _this.setState({ window: window, s3: s3, s3data: data });
	    }
	  });
  }

	handleChange(event) {
    this.setState({newAlbumName: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.createAlbum(this.state.newAlbumName);
  }

	createAlbum(albumName) {
		const s3 = this.state.s3;
		const _this = this;
		albumName = albumName.trim();
	  if (!albumName) {
	    return alert("Album names must contain at least one non-space character.");
	  }
	  const illegalCharacters = albumName.match(/[^\w|-]/g) !== null ? true : false
	  if (illegalCharacters) {
	    return alert("Album names can only contain Letters, Numbers, Underscores(_) or Dashes(-), with no spaces.");
	  }
	  const albumKey = encodeURIComponent(albumName) + "/";
	  s3.headObject({ Key: albumKey }, function(err, data) {
	    if (!err) {
	      return alert("Album already exists.");
	    }
	    if (err.code !== "NotFound") {
	      return alert("There was an error creating your album: " + err.message);
	    }
	    s3.putObject({ Key: albumKey }, function(err, data) {
	      if (err) {
	        return alert("There was an error creating your album: " + err.message);
	      }
	      alert("Successfully created album.");
	      _this.viewAlbums(albumName)
	    });
	  });
	}

	async viewAlbums(albumName) {
		const s3 = this.state.s3;
		const _this = this;
		const objs = await s3.listObjects({}, function(err, data) {
	    if (err) {
	      return alert("There was an error viewing your album: " + err.message);
	    }	
	    const contents = data.Contents;
      const last_element = contents[contents.length - 1];
      _this.state.s3data.CommonPrefixes.push({Prefix: albumName + "/"})
      console.log(last_element)
      console.log(_this.state.s3data.CommonPrefixes)
      _this.setState(_this.state);
      document.getElementById("albInput").value = "";
      console.log(document.getElementById("albInput").value)
		})
	}

	addPhoto() {
		const files = document.getElementById("photoupload").files;
		if (!files.length) {
	    return alert("Please choose a file to upload first.");
	  }
		const file = files[0];
	  const fileName = file.name;
		const albumName = this.state.albumChosenName
		const albumPhotosKey = encodeURIComponent(albumName) + "/";
		const photoKey = albumPhotosKey + fileName;

		const upload = new AWS.S3.ManagedUpload({
	    params: {
	      Bucket: this.state.bucketName,
	      Key: photoKey,
	      Body: file,
	      ACL: "public-read"
	    }
	  });

	  const promise = upload.promise();
		const _this = this;
	  promise.then(
	    function(response) {
	    	console.log(response)
				_this.setState({ photoURL: response.Location });
	      // alert("Successfully uploaded photo.");
	      // viewAlbum(albumName);
	    },
	    function(err) {
	      return alert("There was an error uploading your photo: ", err.message);
	    }
	  );
	}

  render() {
  	const siteTitle = get(this, 'props.data.cosmicjsSettings.metadata.site_title')
    if (!this.state.window) {
      return (<span/>)
    } 
    else {
			const albumList = (data) => {
	      const albums = data.CommonPrefixes.map((commonPrefix) => {
	        const prefix = commonPrefix.Prefix;
	        const albumName = decodeURIComponent(prefix.replace("/", ""));
					return (
						<li
							key={albumName}
							onClick={e => this.setState({ albumChosenName: albumName })}
						>
							{albumName}
						</li>
					)
	      });
				return (
			    <ul>{albums}</ul>
			  );
			}

	  	return (
				<Layout location={location}>
			  	<Helmet title={siteTitle}>
	          <script src="https://sdk.amazonaws.com/js/aws-sdk-2.670.0.min.js" />
	        </Helmet>
			  	<h1 style={{ fontFamily: `Athiti` }} >Hello world!</h1>
					{albumList(this.state.s3data)}

					<form onSubmit={this.handleSubmit}>
		        <label>
		          New Album:
		          <input id="albInput" value={this.state.newAlbumName} onChange={this.handleChange} />
		        </label>
		        <input type="submit" value="Submit" />
		      </form>
					
					<div>Before choosing photo, click an Album above </div>
					<h3>{this.state.albumChosenName}</h3>

					<input id="photoupload" type="file" />
					<br/>
					<button onClick={this.addPhoto}>Upload file you've chosen</button>

					{  }
					<img src={this.state.photoURL} alt=""/>

			  </Layout>
			)
		} // if / else - window
	}
}

export const uploadPageQuery = graphql`
  query uploadQuery {
    cosmicjsSettings(slug: { eq: "general" }) {
      metadata {
        site_title
      }
    }
  }
`
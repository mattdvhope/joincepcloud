import React from 'react'
import Helmet from 'react-helmet'
import { Link, navigate } from 'gatsby'
import get from 'lodash/get'
import { graphql } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'
import { handleLogin, isLoggedIn, getUser } from "../utils/auth"

import Layout from '../components/layout'
import { rhythm, scale } from '../utils/typography'

class BlogPostTemplate extends React.Component {
  constructor(props) {
    super();
    this.state = { 
      id_token: undefined,
      person: undefined,
      window: undefined
    };
  }

// change REGEX for other than Chrome!!!
  async componentDidMount() {
    const code_in_url = window.location.search.match(/(?<=code=)(.*)(?=&state)/)
    const code = code_in_url ? code_in_url[0] : null
    
console.log(code);

    if (!isLoggedIn() && code) {
      // 1. getting id_token
      const slug = window.localStorage.getItem("Node Slug");
      const params = `grant_type=authorization_code&code=${code}&redirect_uri=${process.env.GATSBY_API_URL}${slug}&client_id=1654045933&client_secret=fada8f346cb8e9092ad92d7ff4b10675`;
      const response = await fetch(`https://api.line.me/oauth2/v2.1/token`, {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: params
      })
      const json = await response.json();

      // 2. getting user info with id_token
      const personal_data = await fetch(`https://api.line.me/oauth2/v2.1/verify`, {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: `id_token=${json.id_token}&client_id=1654045933`
      });
      const person = await personal_data.json()
      handleLogin(person)

      // 3. personal data from LINE login
      this.setState({ window: window, person: person, id_token: json.id_token });

      // sessionStorage.setItem("json", JSON.stringify(json))
      // // 4a. validate ID token
      // let base64Url = json.id_token.split('.')[1]; // json.id_token you get
      // let base64 = base64Url.replace('-', '+').replace('_', '/');
      // let decodedData = JSON.parse(Buffer.from(base64, 'base64').toString('binary'));
      // console.log("decodedData: ", decodedData)

      // // 4b. validate ID token
      // console.log("decodedData: ", parseJwt(json.id_token))
      // function parseJwt (token) {
      //   var base64Url = token.split('.')[1];
      //   var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      //   var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      //       return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      //   }).join(''));

      //   return JSON.parse(jsonPayload);
      // };
    } else {
      this.setState({ window: window, person: getUser() })
    }
  } // async componentDidMount()

  render() {
    const post = this.props.data.cosmicjsPosts
    const siteTitle = get(
      this.props,
      'data.cosmicjsSettings.metadata.site_title'
    )
    const author = get(this, 'props.data.cosmicjsSettings.metadata')
    const location = get(this, 'props.location')
    const { previous, next } = this.props.pageContext
    const blog_post_page = (
      <Layout location={location}>
        <style>
          {`
          .post-content {
            text-align: justify;
          }
          .post-hero {
            width: calc(100% + ${rhythm(8)});
            margin-left: ${rhythm(-4)};
            height: ${rhythm(18)};
          }
          @media (max-width: ${rhythm(32)}) {
            .post-hero {
              width: calc(100% + ${rhythm((3 / 4) * 2)});
              margin-left: ${rhythm(-3 / 4)};
              height: ${rhythm(13)};
            }
          }
        `}
        </style>
        <Helmet title={`${post.title} | ${siteTitle}`} />
        <div
          style={{
            marginTop: rhythm(1.4),
          }}
        >
          <Link to="/">← Back to Posts</Link>
        </div>
        <h1
          style={{
            marginTop: rhythm(1),
          }}
        >
          {post.title}
        </h1>
        <BackgroundImage
          Tag="div"
          className="post-hero"
          fluid={post.metadata.hero.local.childImageSharp.fluid}
          backgroundColor={`#007ACC`}
          style={{
            marginBottom: rhythm(0.6),
            height: rhythm(8),
          }}
        />
        <div
          className="post-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />

        <ul
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            listStyle: 'none',
            padding: 0,
          }}
        >
          {previous && (
            <li>
              <Link to={`posts/${previous.slug}`} rel="prev">
                ← {previous.title}
              </Link>
            </li>
          )}

          {next && (
            <li>
              <Link to={`posts/${next.slug}`} rel="next">
                {next.title} →
              </Link>
            </li>
          )}
        </ul>
      </Layout>
    ) // blog_post_page

    if (!this.state.window) {
      console.log("not yet rendering blog page!!!!");
      return (<span></span>)
    } 
    else {
      if (isLoggedIn()) {
        return blog_post_page;
      } else {
        navigate(`/`)
        alert("You're not logged in yet!!!!");
        return null
      }
    }
  } // render()
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    cosmicjsPosts(slug: { eq: $slug }) {
      id
      content
      title
      created(formatString: "MMMM DD, YYYY")
      metadata {
        hero {
          local {
            childImageSharp {
              fluid(quality: 90, maxWidth: 1920) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
    }
    cosmicjsSettings(slug: { eq: "general" }) {
      metadata {
        site_title
        author_name
        author_bio
        author_avatar {
          imgix_url
        }
      }
    }
  }
`

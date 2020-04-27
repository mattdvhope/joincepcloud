import React from 'react'
import { navigate } from 'gatsby'
import get from 'lodash/get'
import { graphql } from 'gatsby'
import { handleLogin, isLoggedIn, getUser } from "../utils/auth"
import Layout from '../components/layout'
import BlogContent from './blog_content'

class BlogPostTemplate extends React.Component {
  constructor(props) {
    super();
    this.state = { 
      id_token: undefined,
      person: undefined,
      window: undefined
    };
  }

  async componentDidMount() {
    // const url_with_code = window.location.search.match(/(?<=code=)(.*)(?=&state)/)
    const url_with_code = window.location.search.match(/(code=)(.*)(?=&state)/)
    const code = url_with_code ? url_with_code[2] : null
    
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
      
      // 3. validate ID token
      let base64Url = json.id_token.split('.')[1]; // json.id_token you get
      let base64 = base64Url.replace('-', '+').replace('_', '/');
      let decodedData = JSON.parse(Buffer.from(base64, 'base64').toString('binary'));

      // 4. If person validated, then login & go to blog page
      if (JSON.stringify(person) === JSON.stringify(decodedData)) {
        handleLogin(person)
        this.setState({ window: window, person: person, id_token: json.id_token });
      }

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
        <BlogContent
          post={post}
          siteTitle={siteTitle}
          previous={previous}
          next={next}
        />
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

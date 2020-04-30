import React from 'react'
import { Link } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'

import Bio from '../components/Bio'
import Layout from '../components/layout'
import { rhythm } from '../utils/typography'
import { isLoggedIn } from "../utils/auth"

class BlogIndex extends React.Component {

  handleClick(e, slug) {
    e.preventDefault();
    window.localStorage.setItem("Node Slug", slug);
    window.location.replace(this.lineLink(slug));
  }

  makeState(length) {
    let result           = '';
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  Linkage(title, slug) {
    return isLoggedIn() ? this.loggedInLink(title, slug) : this.loggedOutLink(title, slug)
  }

  loggedOutLink(title, slug) {
    return (
      <a
        href={this.lineLink(slug)}
        onClick={e => this.handleClick(e, slug)}
        style={{ boxShadow: `none` }}
      >
        {title}
      </a>
    )
  }

  lineLink(slug) {
    return `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1654045933&redirect_uri=${process.env.GATSBY_API_URL}${slug}&state=${this.makeState(10)}&scope=profile%20openid&max_age=360000&ui_locales=th&bot_prompt=aggressive`
  }

  loggedInLink(title, slug) {
    return (
      <Link style={{ boxShadow: 'none' }} to={`posts/${slug}`}>
        {title}
      </Link>
    )
  }

  render() {
    const siteTitle = get(
      this,
      'props.data.cosmicjsSettings.metadata.site_title'
    )
    const posts = get(this, 'props.data.allCosmicjsPosts.edges')
    const author = get(this, 'props.data.cosmicjsSettings.metadata')
    const location = get(this, 'props.location')

    return (
      <Layout location={location}>
        <Helmet title={siteTitle} />
    {/* <Bio settings={author} /> */}
        {posts.map(({ node }) => {
          const title = get(node, 'title') || node.slug
          return (
            <div key={node.slug}>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
              {this.Linkage(title, node.slug)}
              </h3>
          {/* <small>{node.created}</small>  */}
              <p
                dangerouslySetInnerHTML={{ __html: node.metadata.description }}
              />
            </div>
          )
        })}
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query IndexQuery {
    allCosmicjsPosts(sort: { fields: [created], order: DESC }, limit: 1000) {
      edges {
        node {
          metadata {
            description
          }
          slug
          title
          created(formatString: "DD MMMM, YYYY")
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

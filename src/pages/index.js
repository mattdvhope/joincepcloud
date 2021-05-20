import React from 'react'
import { Link } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'

// import Infor1 from '../components/Infor1'
import Infor2 from '../components/Infor2'
import Layout from '../components/layout'
import { rhythm, scale } from '../utils/typography'
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
        style={{ boxShadow: `none`, fontFamily: `Athiti` }}
      >
        {title}
      </a>
    )
  }

  lineLink(slug) {
    return `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${process.env.GATSBY_LINE_CLIENT_ID}&redirect_uri=${process.env.GATSBY_API_URL}${slug}&state=${this.makeState(10)}&scope=profile%20openid&max_age=360000&ui_locales=th&bot_prompt=aggressive`
  }

  loggedInLink(title, slug) {
    return (
      <Link style={{ boxShadow: 'none', fontFamily: `Athiti` }} to={`posts/${slug}`}>
        {title}
      </Link>
    )
  }

  numberPosts(posts) {
    return posts.map((post) => {
      const date = new Date(post.node.metadata.class_date)
      post.num = date.getTime()
    });
  }

  formatDate(date) {
    const formatted = new Date(date)
    const day = formatted.getDate();
    const month = formatted.getMonth() + 1;
    const year = formatted.getFullYear()
    return "วันที่เริ่มต้น - " + day + "/" + month + "/" + year;
  }

  render() {
    const siteTitle = get(
      this,
      'props.data.cosmicjsSettings.metadata.site_title'
    )
    const posts = get(this, 'props.data.allCosmicjsPosts.edges')
    this.numberPosts(posts);
    posts.sort((a, b) => b.num - a.num);
    const infor = get(this, 'props.data.cosmicjsSettings.metadata')
    const location = get(this, 'props.location')
    return (
      <Layout location={location}>
    {/* <Infor1 settings={infor} /> */} {/* this is for the ZOOM icon */}
        <Infor2 settings={infor} />
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
              <p
                style={{
                  ...scale(-1 / 5),
                  display: 'block',
                  marginBottom: rhythm(0.4),
                  marginTop: rhythm(-0.6),
                }}
              >
              </p>
              <small>{this.formatDate(node.metadata.class_date)}</small>
              <p
                dangerouslySetInnerHTML={{ __html: node.metadata.description }}
                style={{ fontSize: `130%` }}
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
            class_date
          }
          slug
          title
        }
      }
    }
    cosmicjsSettings(slug: { eq: "general" }) {
      metadata {
        site_title
        infor_name_1
        infor_1
        infor_avatar_1 {
          imgix_url
        }
        infor_name_2
        infor_2
        infor_avatar_2 {
          imgix_url
        }
      }
    }
  }
`

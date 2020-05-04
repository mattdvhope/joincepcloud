import React from "react"
import { Link } from 'gatsby'
import Helmet from 'react-helmet'
import BackgroundImage from 'gatsby-background-image'
import { rhythm } from '../utils/typography'

export default ({ post, siteTitle, previous, next }) => (
	<>
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
	    <Link to="/">← กลับไปที่หน้าแรก</Link>
	  </div>
	  <h1
	    style={{
	      marginTop: rhythm(1),
	      fontFamily: `Athiti`,
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
	      margin: `auto`,
	      marginBottom: `5%`,
	      height: rhythm(10),
	      width: rhythm(8),
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
	  <div
	    style={{
	      marginTop: rhythm(1.4),
	    }}
	  >
	    <Link to="/">← กลับไปที่หน้าแรก</Link>
	  </div>

	</>
)

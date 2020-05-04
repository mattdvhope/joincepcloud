import React from 'react'
import { rhythm } from '../utils/typography'

export default ({ srcImg, altName, setHTML, top, bottom, imgTop }) => (
  <div
    style={{
      display: 'flex',
      marginTop: rhythm(top),
      marginBottom: rhythm(bottom),
      fontFamily: `Athiti`,
    }}
  >
    <img
      src={srcImg}
      alt={altName}
      style={{
        marginRight: rhythm(1 / 2),
        marginTop: rhythm(imgTop),
        width: rhythm(2),
        height: rhythm(2),
      }}
    />
    <div
      dangerouslySetInnerHTML={{ __html: setHTML }}
      style={{ fontSize: `130%` }}
    />
  </div>
)
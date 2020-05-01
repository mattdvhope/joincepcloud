import React from 'react'
import { rhythm } from '../utils/typography'

export default ({ settings }) => (
  <div
    style={{
      display: 'flex',
      marginTop: -10,
      marginBottom: rhythm(-2),
      fontFamily: `Athiti`,
    }}
  >
    <img
      src={settings.infor_avatar_2.imgix_url}
      alt={settings.infor_name_2}
      style={{
        marginRight: rhythm(1 / 2),
        marginTop: 13,
        width: rhythm(2),
        height: rhythm(2),
      }}
    />
    <div
      dangerouslySetInnerHTML={{ __html: settings.infor_2 }}
      style={{ fontSize: `130%` }}
    />
  </div>
)

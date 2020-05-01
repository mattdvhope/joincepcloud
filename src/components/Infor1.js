import React from 'react'
import { rhythm } from '../utils/typography'

export default ({ settings }) => (
  <div
    style={{
      display: 'flex',
      marginTop: rhythm(-0.8),
      marginBottom: rhythm(-0.8),
      fontFamily: `Athiti`,
    }}
  >
    <img
      src={settings.infor_avatar_1.imgix_url}
      alt={settings.infor_name_1}
      style={{
        marginRight: rhythm(1 / 2),
        marginTop: 0,
        width: rhythm(2),
        height: rhythm(2),
      }}
    />
    <div
      dangerouslySetInnerHTML={{ __html: settings.infor_1 }}
      style={{ fontSize: `130%` }}
    />
  </div>
)

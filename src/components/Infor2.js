import React from 'react'
import Infor from './Infor'

// This is for LINE icon

export default ({ settings }) => (
  <Infor
    top={0.4}
    bottom={-2}
    srcImg={settings.infor_avatar_2.imgix_url}
    altName={settings.infor_name_2}
    imgTop={0.4}
    setHTML={settings.infor_2}
  />
)
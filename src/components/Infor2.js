import React from 'react'
import Infor from './Infor'

export default ({ settings }) => (
  <Infor
    srcImg={settings.infor_avatar_2.imgix_url}
    altName={settings.infor_name_2}
    setHTML={settings.infor_2}
    top={0.2}
    bottom={-2}
    imgTop={0.4}
  />
)
import React from 'react'
import Infor from './Infor'

export default ({ settings }) => (
  <Infor
    srcImg={settings.infor_avatar_1.imgix_url}
    altName={settings.infor_name_1}
    setHTML={settings.infor_1}
    top={0.7}
    bottom={-0.8}
    imgTop={0}
  />
)
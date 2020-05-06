import React from 'react'
import Infor from './Infor'

export default ({ settings }) => (
  <Infor
    top={0.9}
    bottom={-0.8}
    srcImg={settings.infor_avatar_1.imgix_url}
    altName={settings.infor_name_1}
    imgTop={0}
    setHTML={settings.infor_1}
  />
)
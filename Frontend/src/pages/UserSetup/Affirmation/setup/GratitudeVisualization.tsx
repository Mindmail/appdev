import React, { useState } from 'react'
import './setup.scss'
import { isMobile } from 'react-device-detect'

import ImageUpload from '@/components/ImageUpload'

import PrepareGratitudeVisualization from './PrepareGratitudeVisualization'
import Setup from './setup'

const GratitudeVisualizationSetup: React.FC = () => {
  const [uploadImage, setUploadImage] = useState(true)

  return uploadImage ? (
    <Setup
      header_1={
        isMobile
          ? 'Time to prepare your Gratitude and Visualization'
          : 'Now, it’s time to prepare your Gratitude and Visualization practice.'
      }
      header_2={
        isMobile
          ? 'We’ll start by uploading images and videos that you want to use in your practice later.'
          : 'We’ll start by uploading images and videos that you want to use.'
      }
    >
      <ImageUpload handleUploadImage={setUploadImage} />
    </Setup>
  ) : (
    <PrepareGratitudeVisualization />
  )
}

export default GratitudeVisualizationSetup

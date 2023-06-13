import React from 'react'
import { AiFillCheckCircle } from 'react-icons/ai'

import '@/assets/scss/components/photo-item.scss'

const PhotoItem: React.FC<{
  photo: any
  photoSelected: any
  selectPhoto: any
}> = ({ photo, /*photoSelected,*/ selectPhoto }) => {
  const handleSelectPhoto = () => {
    selectPhoto(photo)
  }
  return (
    <div className="col select-image-card">
      <input
        type="checkbox"
        className="image-checkbox"
        id={`previewImageCheckbox${photo.id}`}
        checked={photo.selected}
        onChange={handleSelectPhoto}
      />
      <label
        htmlFor={`previewImageCheckbox${photo.id}`}
        className="image-label"
        style={{ width: '100%' }}
      >
        <div className="selected-wrapper">
          <AiFillCheckCircle size={30} />
        </div>
        <img
          src={photo.photoURL}
          className="image-size"
          alt=""
          style={{ height: '139px' }}
        />
      </label>
    </div>
  )
}

export default PhotoItem

// import { ImageType } from '@/global.types'
import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
// import { isMobile } from 'react-device-detect'
import { FaFolder } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'

import PhotoFolder from '@/components/PhotoFolder'
import type { AppState } from '@/store'
import { updateUserImage } from '@/store/actions/images'

const gratitudeFolderArray = [
  {
    folderName: 'Present Folder',
    id: 1,
    items: [{}],
    selected: false,
  },
  {
    folderName: 'Future Folder',
    id: 2,
    items: [{}],
    selected: false,
  },
]
const GratitudeFolder: React.FC<{
  isGratitude: number
  elementRef: any
  className: any
}> = ({ isGratitude, elementRef, className }) => {
  const dispatch = useDispatch()
  const [gratitudeFolder, setGratitudeFolder] = useState(gratitudeFolderArray)
  const userImages = useSelector((state: AppState) => state.images.images)

  const userImageCallback = (images: any) => {
    gratitudeFolderArray[0].items.length = 0
    gratitudeFolderArray[1].items.length = 0
    if (images.length > 0)
      images.forEach((image: any) => {
        if (image.state == 'present') gratitudeFolderArray[0].items.push(image)
        else if (image.state == 'future')
          gratitudeFolderArray[1].items.push(image)
      })

    setGratitudeFolder(gratitudeFolderArray)
  }
  // get Images from server
  useEffect(() => {
    userImageCallback(userImages)
  }, [userImages])

  const handleOpenFolderModal = (idx: any, status: boolean) => {
    const newGratitudeFolder = gratitudeFolder.map((folder) => {
      folder.selected = false
      return folder
    })
    newGratitudeFolder[idx].selected = status
    setGratitudeFolder(newGratitudeFolder)
  }

  const updateImage = (imageInfo: any) => {
    updateUserImage(imageInfo, dispatch)
  }

  return (
    <div className={`side-widget-wrapper mb-3 ${className}`} ref={elementRef}>
      <p className="sub-title text-secondary-color pl-2">Your Folders</p>
      <div className="side-widget-box">
        <div className="row gratitude-border">
          {gratitudeFolder.map((folder, index) => {
            return (
              <div key={folder.id} className="col-md-6 col-6">
                <button
                  className="btn gratitude-folder"
                  onClick={() => handleOpenFolderModal(index, true)}
                >
                  <span className="label">{folder.folderName}</span>
                  <FaFolder size={24} />
                </button>
                <Modal
                  show={folder.selected}
                  onHide={() => handleOpenFolderModal(index, false)}
                  centered
                  aria-labelledby="contained-modal-title-vcenter"
                  className="photo-folder-modal"
                >
                  <Modal.Body>
                    <PhotoFolder
                      isGratitude={isGratitude}
                      folder={folder}
                      updateImage={updateImage}
                    />
                  </Modal.Body>
                </Modal>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default GratitudeFolder

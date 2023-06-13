/* eslint-disable prettier/prettier */
import React, { useCallback, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { isMobile } from 'react-device-detect';
import { IoMdPhotos, FaInfoCircle, FaFolder } from 'react-icons/all';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './setup.scss';
import Slider from 'react-slick';

import PhotoItem from '@/components/PhotoItem/PhotoItem';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import type { AppState } from '@/store';
// ## import integration module
import { getUserImages, updateUserImage } from '@/store/actions/images';
// import { apiClientWithToken } from '@/store/apiClient';

import Tooltip from '../../../../components/Tooltip';

import Setup from './setup';

export interface Photo {
  id: number;
  photoURL: string;
  state: string;
  selected: boolean;
}

const PrepareGratitudeVisualization: React.FC = () => {
  //##
  const dispatch = useDispatch();
  const [folderSelectModal, setFolderSelectModal] = useState(false);
  const [photoList, setPhotoList] = useState<Photo[]>([]);
  const [present, setPresent] = useState<number>(0);
  const [future, setFuture] = useState<number>(0);

  const images = useSelector((state: AppState) => state.images.images);

  useEffect(() => {
    getUserImages(dispatch);
  }, []);

  useEffect(() => {
    const data = images.map(
      (item: any): Photo => {
        if (item.state === 'present') {
          setPresent(pre => {
            return pre + 1;
          });
        } else if (item.state === 'future') {
          setFuture(pre => {
            return pre + 1;
          });
        }
        return {
          id: item.id,
          photoURL: item.photoURL,
          selected: false,
          state: item.state,
        };
      }
    );
    setPhotoList(data);
  }, [images]);

  //##
  const navigate = useNavigate();
  const goToAllSet = useCallback(() => navigate('/setup/allset'), [history]);

  const handleSelectPhoto = (photo: any) => {
    const newItems = photoList.map((item: any) => {
      if (item.id == photo.id && item.state === 'none') {
        item.selected = !item.selected;
      }
      return item;
    });
    setPhotoList(newItems);
  };

  const openFolderSelectModal = () => {
    setFolderSelectModal(true);
  };

  const movePhoto = (type: string) => {
    photoList.map((item: Photo) => {
      if (item.selected) {
        item.state = type;
        updateUserImage(item, dispatch);
      }
    });
    setFolderSelectModal(false);
  };

  const settings = {
    arrows: false,
    centerMode: false,
    centerPadding: '10px',
    focusOnSelect: true,

    infinite: true,
    slidesToScroll: 1,
  };
  const PhotoList = ({state, _class}: { state: string; _class?: string }) => (
    <>
      {photoList.map((item: any, index: any) => {
        if (item.state === state) {
          return (
            <div key={index} className={`col-md-4 px-1 ${_class}`}>
              <PhotoItem
                photo={item}
                photoSelected={item.selected}
                selectPhoto={handleSelectPhoto}
              />
            </div>
          );
        }
      })}
    </>
  )
  return (
    <>
      <Setup
        header_1={
          isMobile
            ? 'Look into the photos/videos'
            : 'Look into the photos/videos and choose the ones that have the things in your life and put them into present folder. Choose the ones that have the things you wish to have in your life and put them into future folder.'
        }
        header_2={
          isMobile
            ? 'Choose the ones that have the things you wish to have in your life and put them into future folder.'
            : ''
        }
      >
        <div className={`${isMobile ? '' : 'col-md-12'} mt-3`}>
          <div className={`${isMobile ? '' : 'col-md-12 row'} `}>
            <div className={`${isMobile ? '' : 'col-md-6'} `}>
              <div className="card custom_card bigger-card" style={{ maxHeight: '48rem' }}>
                <div className="card-header pl-4 pr-4 sub-title d-flex justify-content-center align-items-center text-white bg-gray-color--5 text-center">
                  <IoMdPhotos size={23} />
                  <p className={`${isMobile ? 'label' : 'paragraph'} mb-0 ml-5 mr-5`}>
                    Photo Uploaded Folder
                  </p>
                  <Tooltip
                    icon={<FaInfoCircle size="23" />}
                    text="Based on scientific research, an affirmation can work very well when people not only say the affirmation in present tense but also share their affirmations in conversation."
                    position="right"
                  />
                </div>
                <div className="card-body container">
                  {isMobile ? (
                    <Slider
                      {...settings}
                      slidesToShow={
                        photoList.filter(item => item.state === 'none').length === 1 ? 1 : 2
                      }
                    >
                      <PhotoList state='none' />
                    </Slider>
                  ) : (
                    <div className="row p-1">
                      <PhotoList state='none' _class='p-2' />
                    </div>
                  )}
                </div>
                <div className="card-footer text-center">
                  <button
                    className="btn btn-sm mindmail-button button-primary button-label w-75"
                    onClick={openFolderSelectModal}
                  >
                    {isMobile ? 'Move the photos' : 'Move the photos'}
                  </button>
                </div>
              </div>
            </div>
            <div className={`${isMobile ? 'mt-2' : ' col-md-6'}`}>
              <div className="card custom_card middle-card" style={{ maxHeight: '29rem' }}>
                <div className="card-header sub-title d-flex justify-content-center align-items-center text-white bg-gray-color--5 text-center">
                  <FaFolder className="margin-right-sm" size={23} />
                  <p className={`${isMobile ? 'label' : 'paragraph'} mb-0`}>Present Folder</p>
                </div>
                <div className="container">
                  {isMobile ? (
                    present > 0 ? (
                      <Slider
                        {...settings}
                        slidesToShow={
                          photoList.filter(item => item.state === 'present').length === 1 ? 1 : 2
                        }
                      >
                        <PhotoList state='present' />
                      </Slider>
                    ) : (
                      <p className="p-5 label color-black text-center">
                        This is the place you have the things you cherish the most
                      </p>
                    )
                  ) : (
                    <div className="row p-1">
                      {present > 0 ? (
                        photoList.map((item: any, index: any) => {
                          if (item.state === 'present') {
                            return (
                              <div key={index} className="col-md-4 px-1 p-2">
                                <PhotoItem
                                  photo={item}
                                  photoSelected={item.selected}
                                  selectPhoto={handleSelectPhoto}
                                />
                              </div>
                            );
                          }
                        })
                      ) : (
                        <span className="p-5 label black-color" style={{ margin: '0 auto' }}>
                          This is the place you have the things you cherish the most
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className={`${isMobile ? 'mt-2' : 'mt-1'} card custom_card middle-card`} style={{ maxHeight: '29rem' }}>
                <div className="card-header sub-title d-flex justify-content-center align-items-center text-white bg-gray-color--5 text-center">
                  <FaFolder className="margin-right-sm" size={23} />
                  Future Folder
                </div>
                <div className="container">
                  {isMobile ? (
                    future > 0 ? (
                      <Slider
                        {...settings}
                        slidesToShow={
                          photoList.filter(item => item.state === 'future').length === 1 ? 1 : 2
                        }
                      >
                        <PhotoList state='future' />
                      </Slider>
                    ) : (
                      <p className="p-5 label color-black text-center">
                        This is the folder that have the things you want to have the most.
                      </p>
                    )
                  ) : (
                    <div className="row p-1">
                      {future > 0 ? (
                        <PhotoList state='future' _class='p-2' />
                      ) : (
                        <span className="p-5 label black-color" style={{ margin: '0 auto' }}>
                          This is the folder that have the things you want to have the most.
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className={`${isMobile ? 'mt-4' : 'col-md-12 mt-4'}`}>
              <button
                type="button"
                className="btn btn-sm btn-block mindmail-button button-label button-primary"
                onClick={goToAllSet}
              >
                {isMobile
                  ? 'Finished photo uploading'
                  : "I finished upload photos/videos I'm ready for my Mindmail journey!"}
              </button>
            </div>
          </div>
        </div>

        <Modal
          show={folderSelectModal}
          onHide={() => setFolderSelectModal(false)}
          centered
          size="sm"
          aria-labelledby="contained-modal-title-vcenter"
          className="option-modal"
        >
          <Modal.Body>
            <button className="bg-transparent border-0 modal-button" onClick={() => movePhoto('present')}>
              Put it into Present Folder
            </button>
            <button className="bg-transparent border-0 modal-button" onClick={() => movePhoto('future')}>
              Put it into Future Folder
            </button>
            <button className="bg-transparent border-0 modal-button" onClick={() => setFolderSelectModal(false)}>
              Cancel
            </button>
          </Modal.Body>
        </Modal>
      </Setup>
    </>
  );
};

export default PrepareGratitudeVisualization;

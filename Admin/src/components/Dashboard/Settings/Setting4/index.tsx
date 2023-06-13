import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import AddSvg from "../../../../assets/icons/SVG/AddSvg";
import { Modal } from "react-bootstrap";
import { uuidv4 } from "../../../../utility/Generator";
import ReactS3Client from "react-aws-s3-typescript";
import { apiClientwithToken } from "../../../../store/apiClient";
import { s3Config } from "../../s3Config";
import "./style.scss";

const Setting4: React.FC = () => {

  const [videos, setVideos] = useState([]);
  const [showVideo, setShowVideo] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<any>();
  const [selectedItem, setSelectedItem] = useState<any>();
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    apiClientwithToken(localStorage.getItem("mindmail_admin_token"))
        .get("/admin/videos")
        .then((res) => {
          setVideos(res.data.items);
        })
        .catch((e) => console.log(e));
  }, [isUpdated]);

  const handleShowVideo = (flag: boolean) => {
    setShowVideo(flag);
  };

  const handleVideoAdd = async (event: any) => {
    if (
      event.target.files[0].type !== "video/mp4" &&
      event.target.files[0].type !== "video/avi"
    ) {
      return;
    }
    if (event.target.files.length) {
      setSelectedFile(event.target.files[0]);
    } 
  };

  const onDeleteItem = (item: any) => {
    apiClientwithToken(localStorage.getItem("mindmail_admin_token"))
        .delete("/admin/video/" + item.id)
        .then((res) => {
          setIsUpdated(!isUpdated);
        })
        .catch((e) => console.log(e));
  }

  const handleSubmitVideo = async () => {
    const s3 = new ReactS3Client(s3Config);
    await s3
      .uploadFile(selectedFile, uuidv4())
      .then(async (data: any) => {
        const postData = {
          id: selectedItem.id,
          name: data.key,
          videoURL: data.location,
          type: selectedItem.type
        };
        await apiClientwithToken(localStorage.getItem("mindmail_admin_token"))
          .post("/admin/video", postData)
          .then((res) => {
            setShowVideo(false);
            setIsUpdated(!isUpdated);
          })
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((err: any) => console.error(err));
  }
  
  return (
    <div className="setting-container">
    <div className="setting-body">
      <div className="setting-content">
      <div className="setting2-container">
        <div className="sub-container">
          <div className="sub-body">
            <div className="videotype-container">
              <div className="sub-header">
                <span>Videos</span>
              </div>
              <div className="sub-content">
                <table>
                  <tbody>
                    {videos.map((item: any, index: number) => (
                      <tr key={item.id}>
                        <td style={{ width: "5%" }}>{item.type}</td>
                        <td>
                          {item.videoURL}
                        </td>
                        <td>{ item.videoURL != null ?
                          <div
                            key={item.id}
                            className="pt1 sub-content-1"
                            onClick={() => onDeleteItem(item)}
                          >
                            Delete
                          </div>
                          :
                          <div
                            key={item.id}
                            className="pt1 sub-content-1"
                            onClick={() => {handleShowVideo(true); setSelectedItem(item);}}
                          >
                            <AddSvg />
                          </div>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        animation={false}
        show={showVideo}
        onHide={() => setShowVideo(false)}
        centered
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header>
          <span>Add Video</span>
        </Modal.Header>
        <Modal.Body>
          <div className="video-modal">
            <div className="video-upload">
              <input
                type="file"
                id="upload-video"
                className="uploadvideo"
                accept=".mp4, .avi"
                onChange={handleVideoAdd}
              />
            </div>
            
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button role="discard" onClick={() => handleShowVideo(false)}>
            Discard
          </button>
          <button role="submit" onClick={() => handleSubmitVideo()}>
            Upload
          </button>
        </Modal.Footer>
      </Modal>
      </div>
      </div>
    </div>
  );
};

export default Setting4;

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  GetFrametime,
  UpdateFrametime,
} from "../../../../../store/MusicTime/actions";
import { AppState } from "../../../../../store";
//
import { Modal } from "react-bootstrap";
import AddSvg from "../../../../../assets/icons/SVG/AddSvg";
import { t_framtime } from "../../../../../types";

import "./style.scss";
import { apiClientwithToken } from "../../../../../store/apiClient";

const initialValue = {
  id: 0,
  time: 1,
  type: "s",
  defined: 0,
};

const Frametime: React.FC = () => {
  const dispatch = useDispatch();
  const [timelist, setTimelist] = useState<t_framtime[]>([]);
  const [isTypeshow, setIsTypeshow] = useState<boolean>(false);
  const [selected, setSelected] = useState(initialValue);

  const timelistState = useSelector(
    (state: AppState) => state.musictimelist.frametime
  );

  useEffect(() => {
    dispatch(GetFrametime());
  }, []);

  useEffect(() => {
    setTimelist(timelistState);
  }, [timelistState]);

  const handlemodal = (flag: any, id: number) => {
    const data = timelist.filter((item: t_framtime) => item.id === id);
    setSelected({
      ...selected,
      id: data[0].id,
      time: data[0].time,
      defined: data[0].defined,
      type: data[0].type,
    });
    setIsTypeshow(flag);
  };

  const handletime = (e: string) => {
    if (isNaN(parseInt(e))) {
      setSelected({ ...selected, time: 0 });
    } else {
      setSelected({ ...selected, time: parseInt(e) });
    }
  };

  const handletype = (e: string) => {
    setSelected({ ...selected, type: e });
  };

  const handleDefault = (flag: boolean) => {
    setSelected({ ...selected, defined: flag ? 1 : 0 });
  };

  const handleSubmit = async () => {
    if (selected.time === 0) {
      return;
    }
    if (selected.id !== 0) {
      await apiClientwithToken(localStorage.getItem("mindmail_admin_token"))
        .put("/admin/frametime/" + selected.id, selected)
        .then((res) => {
          dispatch(UpdateFrametime(selected));
          setIsTypeshow(false);
        })
        .catch((e) => console.log(e));
    } else {
      await apiClientwithToken(localStorage.getItem("mindmail_admin_token"))
        .post("/admin/frametime", selected)
        .then((res) => {
          dispatch(GetFrametime());
          setIsTypeshow(false);
        })
        .catch((e) => console.log(e));
    }
  };
  const handleAddItem = () => {
    setSelected(initialValue);
    setIsTypeshow(true);
  };
  return (
    <>
      <div className="frametime-container">
        <div className="frametime-header">
          <span>FrameTime Setting</span>
          <div onClick={handleAddItem}>
            <AddSvg />
          </div>
        </div>
        <div className="frametime-content">
          <table className="usertable label">
            <thead>
              <tr>
                <td>#</td>
                <td>Time</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {timelist.map((item: any, index: number) => (
                <tr key={index}>
                  <td>
                    <input
                      className={`${item.defined === 1 ? "disable" : ""}`}
                      type="radio"
                      name="default"
                      defaultChecked={item.defined}
                      disabled
                    />
                  </td>
                  <td>{item.time + item.type}</td>
                  <td>
                    <a href="#" onClick={() => handlemodal(true, item.id)}>
                      Edit
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal
        animation={false}
        show={isTypeshow}
        onHide={() => setIsTypeshow(false)}
        centered
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header>
          <span>{`${selected.id === 0 ? "ADD" : "EDIT"} FRAMETIME`}</span>
        </Modal.Header>
        <Modal.Body>
          <div className="frametimemodal">
            <div className="frametimefield">
              <div>
                <p>{"FrameTime :"}</p>
                <div className="frametimeinput">
                  <input
                    type="text"
                    value={selected.time}
                    onChange={(e) => handletime(e.target.value)}
                  />
                  <select
                    value={selected.type}
                    onChange={(e) => handletype(e.target.value)}
                  >
                    <option value="s">(s)</option>
                    <option value="m">(m)</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="defaultfield">
              <p>{"Default :"}</p>
              <input
                type="checkbox"
                checked={selected.defined === 1 ? true : false}
                onChange={(e) => handleDefault(e.target.checked)}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button role="discard" onClick={() => setIsTypeshow(false)}>
            Discard
          </button>
          <button role="submit" onClick={() => handleSubmit()}>
            Submit
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Frametime;

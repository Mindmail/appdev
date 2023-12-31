import {
  GET_FRAMETIME,
  GET_MUSICTYPE,
  GET_MUSIC,
  MusicTimeActions,
} from "./types";
import { Dispatch } from "redux";
import { AppState } from "..";
import { AppActions } from "../types";
import { apiClientwithToken } from "../apiClient";
import { t_framtime } from "../../types";

const FetchFrametime = (payload: any): MusicTimeActions => {
  return {
    type: GET_FRAMETIME,
    payload,
  };
};

const FetchMusicType = (payload: any): MusicTimeActions => {
  return {
    type: GET_MUSICTYPE,
    payload,
  };
};

const FetchMusic = (payload: any): MusicTimeActions => {
  return {
    type: GET_MUSIC,
    payload,
  };
};

export const GetFrametime = (): any => {
  return async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    await apiClientwithToken(localStorage.getItem("mindmail_admin_token"))
      .get("/admin/frametimes")
      .then((res) => dispatch(FetchFrametime(res.data.items)))
      .catch((e) => {
        console.log(e);
      });
  };
};

export const UpdateFrametime = (data: t_framtime): any => {
  return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    const updatedata = getState().musictimelist.frametime.map((item: any) => {
      item.defined = 0;
      if (item.id === data.id) {
        item.time = data.time;
        item.type = data.type;
        item.defined = data.defined;
      }
      return item;
    });
    dispatch(FetchFrametime(updatedata));
  };
};

//Music & time
export const GetMusicType = (): any => {
  return async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    await apiClientwithToken(localStorage.getItem("mindmail_admin_token"))
      .get("/admin/musictypes")
      .then((res) => dispatch(FetchMusicType(res.data.items)))
      .catch((e) => {
        console.log(e);
      });
  };
};

export const GetMusic = (id: number): any => {
  return async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    await apiClientwithToken(localStorage.getItem("mindmail_admin_token"))
      .get("/admin/musics/" + id)
      .then((res) => dispatch(FetchMusic(res.data.items)))
      .catch((e) => {
        console.log(e);
      });
  };
};

export const UpdateMusciType = (data: any): any => {
  return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    const updatedata = getState().musictimelist.musictype.map((item: any) => {
      if (item.id === data.id) {
        item.musictype = data.musictype;
      }
      return item;
    });
    dispatch(FetchMusicType(updatedata));
  };
};

import { EDIT_BUDDYAVATAR, GET_BUDDYAVATAR, BuddyAvatarActions } from "./types";
import { Dispatch } from "redux";
import { AppState } from "..";
import { AppActions } from "../types";
import { apiClientwithToken } from "../apiClient";

const FetchBuddyAvatarlist = (payload: any): BuddyAvatarActions => {
  return {
    type: GET_BUDDYAVATAR,
    payload,
  };
};

const FetchBuddyAvatarEdit = (payload: any): BuddyAvatarActions => {
  return {
    type: EDIT_BUDDYAVATAR,
    payload,
  };
};

export const GetBuddyAvatarList = (): any => {
  return async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    await apiClientwithToken(localStorage.getItem("mindmail_admin_token"))
      .get("/admin/chatbuddyavatars")
      .then((res) => dispatch(FetchBuddyAvatarlist(res.data.items)))
      .catch((e) => {
        console.log(e);
      });
  };
};

export const EditBuddyAvatar = (): any => {
  return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    console.log(`object`);
  };
};

import React, { useState } from "react";
import { LogoFull } from "../../assets/icons/SVG/LogoFull";
import SignIn from "../../components/AdminSetup/SignIn/Iindex";
import SignUp from "../../components/AdminSetup/SignUp";
import Forgot from "../../components/AdminSetup/Forgot";
import "./style.scss";

const AdminSetup: React.FC<{ history?: any; match?: any }> = ({ history }) => {
  const [signpage, setSignpage] = useState<number>(0);

  const handleStateClick = (state: number) => {
    setSignpage(state);
  };
  return (
    <div className="home-container bg-new-gradient">
      <div className="logo"><LogoFull /></div>
      <div className="right-container">
        <div className="form-container">
          <SignIn Onhandler={handleStateClick} history={history} />
        </div>
      </div>
    </div>
  );
};
export default AdminSetup;

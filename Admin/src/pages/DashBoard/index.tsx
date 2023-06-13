import React from "react";
import { Switch, Redirect } from "react-router-dom";
import PrivateRoute from "../PriavteRoute";
//import style
import "./style.scss";

//import aside menu
import AsdieMunu from "../../components/Layout/AsideMenu";
//import content component
const Home = React.lazy(() => import("./Home"));
const UserManage = React.lazy(() => import("./UserManage"));
const Setting1 = React.lazy(() => import("../../components/Dashboard/Settings/Setting1"));
const Setting2 = React.lazy(() => import("../../components/Dashboard/Settings/Setting2"));
const Setting3 = React.lazy(() => import("../../components/Dashboard/Settings/Setting3"));
const Setting4 = React.lazy(() => import("../../components/Dashboard/Settings/Setting4"));

const DashBoard: React.FC<{ history: any; match: any }> = ({ match }) => {
  return (
    <div className="dashboard">
      <div className="menu">
        <AsdieMunu />
      </div>
      <div className="content">
        {/* <div className="heaer">
          <Header />
        </div> */}
        <Switch>
          <PrivateRoute path={`${match.url}`} exact component={Home} />
          <PrivateRoute
            path={`${match.url}/usermanage`}
            exact
            component={UserManage}
          />
          <PrivateRoute
            path={`${match.url}/chatbuddy`}
            exact
            component={Setting1}
          />
          <PrivateRoute
            path={`${match.url}/musics`}
            exact
            component={Setting2}
          />
          <PrivateRoute
            path={`${match.url}/goals`}
            exact
            component={Setting3}
          />
          <PrivateRoute
            path={`${match.url}/videos`}
            exact
            component={Setting4}
          />
          <Redirect to="/error" />
        </Switch>
        {/* <div className="footer">
          <Footer />
        </div> */}
      </div>
    </div>
  );
};

export default DashBoard;

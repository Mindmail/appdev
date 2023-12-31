import React, { useState } from "react";
import { apiClientwithToken } from "../../../store/apiClient";

import "./style.scss";
interface postData {
  email: string;
  password: string;
}

const SignIn: React.FC<{ Onhandler?: any; history?: any }> = ({
  Onhandler,
  history,
}) => {
  const [fields, setFields] = useState<postData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<postData>({
    email: "",
    password: "",
  });

  const handleValidation = () => {
    const fieldErrors = {
      email: "",
      password: "",
    };
    let formIsValid = true;
    if (!fields["email"]) {
      formIsValid = false;
      fieldErrors["email"] = "Email is required";
    }
    if (typeof fields["email"] !== "undefined") {
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (!emailPattern.test(fields["email"])) {
        formIsValid = false;
        fieldErrors["email"] = "Email is not valid";
      }
    }
    //password
    if (!fields["password"]) {
      formIsValid = false;
      fieldErrors["password"] = "Password is required";
    } else {
      if (fields["password"].toLocaleLowerCase() === fields["password"]) {
        formIsValid = false;
        fieldErrors["password"] =
          "Password should have more than 1 upper case letter";
      } else if (fields["password"].length < 8) {
        formIsValid = false;
        fieldErrors["password"] = "Password should be more than 8 characters";
      }
    }
    setErrors(fieldErrors);
    return formIsValid;
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (handleValidation()) {
      apiClientwithToken(localStorage.getItem("mindmail_admin_token"))
        .post("/signin/admin", fields)
        .then((res) => {
          localStorage.setItem("mindmail_admin_token", res.data.token);
          history.push("/dashboard");
        })
        .catch((err) => {
          if (err.response === undefined) {
            console.log("something went wrong");
          } else {
            console.log(err.response.data);
          }
        });

    } else {
      return false;
    }
  };
  return (
    <form className="signin-content">
      <div>
        <p className="md-label color-primary font-weight-700">
          Welcome to Mindmail
        </p>
      </div>
      <div className="pt2">
        <p className="label">Email</p>{" "}
        <input
          type="text"
          name="email"
          placeholder="please input your email"
          value={fields.email}
          onChange={(e) => setFields({ ...fields, email: e.target.value })}
        />
        <p className="label color-danger">{errors.email}</p>
      </div>
      <div>
        <div className="forget">
          <span className="label">Password</span>
        </div>
        <p></p>
        <input
          type="password"
          name="password"
          placeholder="please input your password"
          value={fields.password}
          onChange={(e) => setFields({ ...fields, password: e.target.value })}
        />
        <p className="label color-danger">{errors.password}</p>
      </div>
      <div>
        <button className="font-weight-600 sm-label" onClick={handleSubmit}>
          Sign In
        </button>
      </div>
    </form>
  );
};

export default SignIn;

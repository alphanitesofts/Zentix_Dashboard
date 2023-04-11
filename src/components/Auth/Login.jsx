import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import BaseUrl from "../Sourcefiles/BaseUrl";

toast.configure();
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldStatus, setFieldStatus] = useState(false);

  const submitData = () => {
    setFieldStatus(true);
    if (!email || !password) {
      toast.warning("Please fill all fields");
    } else if (!email && password) {
      toast.warning("Please Enter your Email");
    } else if (email && !password) {
      toast.warning("Please Enter your Password");
    } else {
      const userObj = {
        phone: email,
        password: password,
      };

      axios
        .post(`${BaseUrl}login`, userObj)
        .then((res) => {
          localStorage.setItem("logIN", JSON.stringify(true));
          localStorage.setItem("email", JSON.stringify(email));
          localStorage.setItem("password", JSON.stringify(password));

          localStorage.setItem("user", JSON.stringify(res.data.user));

          toast.info("Successfully Logged In");
          setInterval(() => {
            window.location.reload(true);
          }, 1000);
        })
        .catch((error) => {
          toast.warn("Incorrect Credentials");
          console.log(error);
        });
    }
  };
  return (
    <div className="hold-transition login-page">
      <div className="login-box">
        <div className="login-logo">
          <a>
            <b>Zentix</b>
          </a>
        </div>
        <div className="card">
          <div className="card-body login-card-body">
            <img
              className="mb-3"
              src="dist/img/avatar.jpg"
              style={{ marginLeft: '100px', height: "120px", width: '120px', borderRadius: '50%', objectFit: 'cover', background: '#dfdfdf' }}
              alt=""
            />
            <div>
              <div
                className=" form-control formStyle d-flex"
                style={{
                  borderColor:
                    email === "" && fieldStatus === true ? "red" : "#ced4da",
                }}
              >
                <input
                  type="text"
                  className="placeHolderStyle"
                  name="Username"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Phone Number"
                />
                <span className="fas fa-phone" />
              </div>
              <p className="">
                {email === "" && fieldStatus === true ? (
                  <span className="text-danger">Enter Phone Number</span>
                ) : (
                  ""
                )}
              </p>

              <div
                className=" form-control formStyle d-flex"
                style={{
                  borderColor:
                    password === "" && fieldStatus === true ? "red" : "#ced4da",
                }}
              >
                <input
                  type="password"
                  className="placeHolderStyle"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span className="fas fa-lock" />
              </div>
              <p>
                {password === "" && fieldStatus === true ? (
                  <span className="text-danger">Enter Your Password</span>
                ) : (
                  ""
                )}
              </p>

              <div className="row">

                <div className="col-4 ms-auto">
                  <button
                    type="submit"
                    className="btn btn-outline-secondary btn-block"
                    onClick={submitData}
                  >
                    Sign In
                  </button>
                </div>
              </div>
            </div>

            <p className="mb-0">
              <Link
                to="/Register"
                className="text-center btn btn-block btn-outline-primary mt-2"
              >
                Register
              </Link>
            </p>
            <p className="mb-1 mt-2">
              <Link to="/Forgotpassword" className="btn btn-block btn-outline-danger">
                Forgot Your password
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

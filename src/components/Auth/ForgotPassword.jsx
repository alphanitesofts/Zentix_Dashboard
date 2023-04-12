import React, { useState } from "react";
import { Link } from "react-router-dom";
import baseUrl from "../Sourcefiles/BaseUrl";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [index, setIndex] = useState(2);
  const [checkPhone, setCheckPhone] = useState("");

  const [userAnswer, setUserAnswer] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [userQuestion, setuserQuestion] = useState("");

  const [fieldStatus, setFieldStatus] = useState(false);
  const [answerField, setAnswerField] = useState(false)


  const [loader, setLoader] = useState(false)
  const [questionLoader, setQuestionLoader] = useState(false)

  const getQuestion = () => {
    if (!checkPhone) {
      setFieldStatus(true);
      toast.warn("Please enter phone number!");
    } else {
      setLoader(true)
      var formdata = new FormData();
      formdata.append("phone", checkPhone);

      var requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
      };

      fetch(`${baseUrl}get_questions`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.status === "200") {
            setLoader(false)
            setIndex(index + 1);
            setuserQuestion(result.data[0].question);
            // alert(result.data[0].question)
            // toast.info(result.message)
            // alert(result.message)
          } else if (result.status === "401") {
            toast.warn(result.message);
            setLoader(false)
            // alert(result.message)
          }
          console.log(result.status);
          // alert(result.status)
        })
        .catch((error) => {
          toast.warn("Something went wrong");
          console.log("error", error);
        });
    }
  };

  const checkQuestion = () => {
    if (!userAnswer) {
      setAnswerField(true)
      toast.warn('Please write your security answer')
    }
    else {
      setQuestionLoader(true)
      var formdata = new FormData();
      formdata.append("phone", checkPhone);
      formdata.append("question", userQuestion);
      formdata.append("answer", userAnswer);

      var requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
      };

      fetch(`${baseUrl}question_check`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.status === "200") {
            setAnswerField(false)
            toast.info(result.message)
            setIndex(index + 1);
            setQuestionLoader()
          } else if (result.status === "401") {
            toast.warn(result.message);
          }
          console.log(result);
        })
        .catch((error) => {
          toast.warn("Something went wrong");
          console.log("error", error);
        });
    }
  };

  const updatePassword = () => {
    var formdata = new FormData();
    formdata.append("password", newPassword);
    formdata.append("confirm_password", confirmPassword);
    formdata.append("phone", checkPhone);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch(`${baseUrl}updatepassword`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "200") {
          // toast.info(result.message)
          setIndex(0);
        } else if (result.status === "401") {
          toast.warn(result.message);
        }
        console.log(result);
      })
      .catch((error) => {
        toast.warn("Something went wrong");
        console.log("error", error);
      });
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
            <div>
              {index === 0 ? (
                <>
                  <div>
                    <p className="login-box-msg mt-2">
                      You forgot your password? Here you can easily retrieve a
                      new password.
                    </p>
                    <div>
                      <div className="input-group mb-3">
                        <input
                          type="number"
                          className="form-control"
                          onChange={(e) => setCheckPhone(e.target.value)}
                          style={{
                            borderColor:
                              checkPhone === "" && fieldStatus === true
                                ? "red"
                                : "#ced4da",
                          }}
                          placeholder="Enter Your Phone"
                        />
                        <div className="input-group-append">
                          <div className="input-group-text">
                            <span className="fas fa-phone" />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12">
                          <button
                            className="btn btn-secondary btn-block"
                            onClick={getQuestion}
                          >
                            {
                              loader === true ? 'Loading...' : 'Request new password'
                            }

                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : null}

              {index === 1 ? (
                <>
                  <div>
                    <p className="login-box-msg mt-2">
                      Please enter the answer of your security question.
                    </p>
                    <div>
                      <fieldset disabled>
                        <div className="mb-3">
                          <label
                            htmlFor="disabledTextInput"
                            className="form-label"
                          >
                            Your Question
                          </label>
                          <input
                            type="text"
                            id="disabledTextInput"
                            className="form-control"
                            placeholder={userQuestion}
                          />
                        </div>
                      </fieldset>

                      <div className="input-group mb-3">
                        <input
                          type="phone"
                          className="form-control"
                          onChange={(e) => setUserAnswer(e.target.value)}
                          style={{
                            borderColor:
                              userAnswer === "" && answerField === true
                                ? "red"
                                : "#ced4da",
                          }}
                          placeholder="Enter Your Answer"
                        />
                        <div className="input-group-append">
                          <div className="input-group-text">
                            <span className="fas fa-clipboard" />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12">
                          <button
                            onClick={checkQuestion}
                            className="btn btn-secondary btn-block"
                          >
                            Summit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : null}

              {index === 2 ? (
                <>
                  <div>
                    <p className="login-box-msg mt-2">
                      Please enter your new password.
                    </p>
                    <div>
                      <div>
                        <div className="">
                          <label
                            htmlFor="exampleInputPassword1"
                            className="form-label mt-0 mb-0"
                          >
                            New Password
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            onChange={(e) => setNewPassword(e.target.value)}
                            style={{
                              borderColor:
                                checkPhone === "" && fieldStatus === true
                                  ? "red"
                                  : "#ced4da",
                            }}
                            id="exampleInputPassword1"
                          />
                        </div>
                        <div className="mb-3 mt-3">
                          <label
                            htmlFor="exampleInputPassword1"
                            className="form-label mt-0 mb-0"
                          >
                            Confirm Password
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            style={{
                              borderColor:
                                checkPhone === "" && fieldStatus === true
                                  ? "red"
                                  : "#ced4da",
                            }}
                            id="exampleInputPassword1"
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-12">
                          <button
                            onClick={updatePassword}
                            className="btn btn-secondary btn-block"
                          >
                            Summit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : null}
            </div>

            <div className="d-flex mt-3">
              <p className="mb-0 w-100 me-1">
                <Link
                  to="/"
                  className="text-center btn btn-block btn-outline-info mt-2"
                >
                  Login
                </Link>
              </p>
              <p className="mb-1 w-100 ms-auto mt-2 ms-1">
                <Link
                  to="/Register"
                  className="btn btn-block btn-outline-primary"
                >
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

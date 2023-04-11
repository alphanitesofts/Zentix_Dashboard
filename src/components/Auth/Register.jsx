import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import baseUrl from "../Sourcefiles/BaseUrl";

toast.configure();
const Register = () => {

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, serFirstname] = useState('')
  const [lastName, setLastname] = useState('')
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')

  const [fieldStatus, setFieldStatus] = useState(false);

  const [fatherName, setFatherName] = useState('')
  const [cnic, setCnic] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [userUsername, setUserUsername] = useState('')


  const checkReferral = () => {
    setFieldStatus(true);
    if (!name && !email && !password && !confirmPassword && !phone) {
      toast.warn("Fields are empty");
    }
    else {

      var formdata = new FormData();
      formdata.append("referal_code", "EEGH5F");

      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
      };

      fetch(`${baseUrl}checkcode`, requestOptions)
        .then(response => response.json())
        .then(result => {
          setFieldStatus(false);
          if (result.status === "200") {
            signUp()
          }
          else if (result.status === "400") {
            {
              toast.warn(result.message)
            }
          }
          console.log(result)
        })
        .catch(error => {
          console.log('error', error)
          toast.warn('Something went wrong...')
        });


    }
  }


  const signUp = () => {

    const signUpObj = {
      email: email,
      username: userUsername,
      cnic: cnic,
      phone: phone,
      password: password,
      password_confirmation: confirmPassword,
      code: name,
      role_id: "5",
      firstname: firstName,
      lastname: lastName,
      question: question,
      answer: answer,
      fathername: fatherName,
      dob: dateOfBirth,
      role_id: "5"
    };
    axios
      .post(`${baseUrl}register`, signUpObj)
      .then((res) => {
        console.log(res);
        toast.info("Successfully Added Member");
        setInterval(() => {
          window.location.reload(true);
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
        toast.warn('Error While Submitting your request')
      });
  };


  return (
    <div className="hold-transition register-page" >
      <div className="register-box-register">
        <div className="register-logo">
          <a>
            <b>Zentix</b>
          </a>
        </div>


        <div className="card">
          <div className="card-body register-card-body">
            <p className="login-box-msg">Register a new membership</p>
            <div>

              <div className="row">
                <div className="col-lg-6">
                  <div
                    className="form-control formStyle d-flex"
                    style={{
                      borderColor:
                        firstName === "" && fieldStatus === true ? "red" : "#ced4da",
                    }}
                  >
                    <input
                      type="text"
                      className=" placeHolderStyle"
                      placeholder="First Name"
                      onChange={(e) => serFirstname(e.target.value)}
                    />
                    <span className="fas fa-user-plus" />
                  </div>
                  <p>
                    {/* {name === "" && fieldStatus === true ? (
                      <span className="text-danger">Input field is empty</span>
                    ) : (
                      null
                    )} */}
                  </p>
                </div>
                <div className="col-lg-6">
                  <div
                    className="form-control formStyle d-flex"
                    style={{
                      borderColor:
                        lastName === "" && fieldStatus === true ? "red" : "#ced4da",

                    }}
                  >
                    <input
                      type="text"
                      className=" placeHolderStyle"
                      placeholder="Last Name"
                      onChange={(e) => setLastname(e.target.value)}
                    />
                    <span className="fas fa-user-plus" />
                  </div>
                  <p>
                    {/* {name === "" && fieldStatus === true ? (
                      <span className="text-danger">Input field is empty</span>
                    ) : (
                      null
                    )} */}
                  </p>
                </div>
                <div className="col-lg-12">
                  <div
                    className=" form-control formStyle d-flex"
                    style={{
                      borderColor:
                        name === "" && fieldStatus === true ? "red" : "#ced4da",
                    }}
                  >
                    <input
                      type="text"
                      className="placeHolderStyle "
                      placeholder="Referral Username"
                      onChange={(e) => setName(e.target.value)}
                    />
                    <span className="fas fa-signature" />
                  </div>
                  <p>
                    {/* {email === "" && fieldStatus === true ? (
                      <span className="text-danger">Input field is empty</span>
                    ) : (
                      ""
                    )} */}
                  </p>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-6">
                  <div
                    className="form-control formStyle d-flex"
                    style={{
                      borderColor:
                        fatherName === "" && fieldStatus === true ? "red" : "#ced4da",
                    }}
                  >
                    <input
                      type="text"
                      className=" placeHolderStyle"
                      placeholder="Father / Husband Name"
                      onChange={(e) => setFatherName(e.target.value)}
                    />
                    <span className="fas fa-signature" />
                  </div>
                  <p>
                    {/* {name === "" && fieldStatus === true ? (
                      <span className="text-danger">Input field is empty</span>
                    ) : (
                      ""
                    )} */}
                  </p>
                </div>
                <div className="col-lg-6">
                  <div
                    className=" form-control formStyle d-flex"
                    style={{
                      borderColor:
                        cnic === "" && fieldStatus === true ? "red" : "#ced4da",
                    }}
                  >
                    <input
                      type="phone"
                      className="placeHolderStyle "
                      placeholder="CNIC number"
                      onChange={(e) => setCnic(e.target.value)}
                    />
                    <span className="fas fa-address-card" />
                  </div>
                  <p>
                    {/* {email === "" && fieldStatus === true ? (
                      <span className="text-danger">Input field is empty</span>
                    ) : (
                      ""
                    )} */}
                  </p>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-6">
                  <div
                    className="form-control formStyle d-flex"
                    style={{
                      borderColor:
                        dateOfBirth === "" && fieldStatus === true ? "red" : "#ced4da",

                    }}
                  >
                    <input
                      type="text"
                      className=" placeHolderStyle"
                      placeholder="Date of Birth (dd/mm/yyyy)"
                      onChange={(e) => setDateOfBirth(e.target.value)}
                    />
                    <span className="fas fa-calendar-day" />
                  </div>
                  <p>
                    {/* {name === "" && fieldStatus === true ? (
                      <span className="text-danger">Input field is empty</span>
                    ) : (
                      ""
                    )} */}
                  </p>
                </div>
                <div className="col-lg-6">
                  <div
                    className="form-control formStyle d-flex"
                    style={{
                      borderColor:
                        phone === "" && fieldStatus === true
                          ? "red"
                          : "#ced4da",
                    }}
                  >
                    <input
                      type="phone"
                      className="placeHolderStyle"
                      placeholder="Phone Number"
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    <span className="fas fa-phone" />
                  </div>
                  <p>
                    {/* {confirmPassword === "" && fieldStatus === true ? (
                      <span className="text-danger">Input field is empty</span>
                    ) : (
                      ""
                    )} */}
                  </p>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-6">
                  <div
                    className="form-control formStyle d-flex"
                    style={{
                      borderColor:
                        email === "" && fieldStatus === true ? "red" : "#ced4da",
                    }}
                  >
                    <input
                      type="email"
                      className=" placeHolderStyle"
                      placeholder="Your Email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <span className="fas fa-envelope" />
                  </div>
                  <p>
                    {/* {name === "" && fieldStatus === true ? (
                      <span className="text-danger">Input field is empty</span>
                    ) : (
                      ""
                    )} */}
                  </p>
                </div>
                <div className="col-lg-6">
                  <div
                    className="form-control formStyle d-flex"
                    style={{
                      borderColor:
                        userUsername === "" && fieldStatus === true
                          ? "red"
                          : "#ced4da",
                    }}
                  >
                    <input
                      type="text"
                      className="placeHolderStyle"
                      placeholder="Your Username"
                      onChange={(e) => setUserUsername(e.target.value)}
                    />
                    <span className="fas fa-user-check" />
                  </div>
                  <p>
                    {/* {confirmPassword === "" && fieldStatus === true ? (
                      <span className="text-danger">Input field is empty</span>
                    ) : (
                      ""
                    )} */}
                  </p>
                </div>
              </div>


              <div className="row">
                <div className="col-lg-6">
                  <div
                    className="form-control formStyle d-flex"
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
                    {/* {password === "" && fieldStatus === true ? (
                      <span className="text-danger">Input field is empty</span>
                    ) : (
                      ""
                    )} */}
                  </p>
                </div>
                <div className="col-lg-6">
                  <div
                    className="form-control formStyle d-flex"
                    style={{
                      borderColor:
                        confirmPassword === "" && fieldStatus === true
                          ? "red"
                          : "#ced4da",
                    }}
                  >
                    <input
                      type="password"
                      className="placeHolderStyle"
                      placeholder="Confirm Password"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <span className="fas fa-lock" />
                  </div>
                  <p>
                    {/* {confirmPassword === "" && fieldStatus === true ? (
                      <span className="text-danger">Input field is empty</span>
                    ) : (
                      ""
                    )} */}
                  </p>
                </div>
              </div>



              <div className="input-group mb-3">
                <select
                  className="form-select textColor"
                  style={{ color: "black" }}
                  onChange={(e) => setQuestion(e.target.value)}
                  aria-label="Default select example"
                >
                  <option >Select Question</option>
                  <option value="1">What is your father name?</option>
                  <option value="2">What is your pet name?</option>
                  <option value="3">What is your Hobby?</option>
                  <option value="4">What you like?</option>
                </select>

                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fa-solid fa-key" />
                  </div>
                </div>
              </div>

              <p className="form-text">This question will help you incase you forget your password</p>

              <div
                className="form-control formStyle d-flex"
                style={{
                  borderColor:
                    answer === "" && fieldStatus === true ? "red" : "#ced4da",
                }}
              >
                <input
                  type="text"
                  className="placeHolderStyle"
                  placeholder="Answer"
                  onChange={(e) => setAnswer(e.target.value)}
                />
                <span className="fa-regular fa-clipboard" />
              </div>
              <p>
                {/* {phone === "" && fieldStatus === true ? (
                  <span className="text-danger">Input field is empty</span>
                ) : (
                  ""
                )} */}
              </p>

              <div className="row mt-1">
                <div className="col-4 ms-auto">
                  <button
                    className="btn btn-outline-secondary btn-block" onClick={checkReferral} >
                    Register
                  </button>
                </div>
              </div>
            </div>
            <Link to="/" className="mt-2 btn btn-block btn-outline-primary text-center">
              I already have a membership
            </Link>
          </div>
        </div>
      </div>
    </div>

  );
};
export default Register;

import React, { useState, useEffect } from "react";
import ChangePassword from "../Modals/ChangePassword";
import baseUrl from "../Sourcefiles/BaseUrl";
import { toast } from 'react-toastify';
import BaseUrlImages from '../Sourcefiles/BaseUrlImages'

const ViewProfile = () => {
  const [isInvested, setIsInvested] = useState("0");
  const [shouldShow, setShouldShow] = useState(false)
  const [roleID, setRoleID] = useState("");
  const [profile, setProfile] = useState('')
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [buttonLoader, setButtonLoader] = useState(false)

  useEffect(() => {
    SetLocalLogin()
  }, [])

  async function SetLocalLogin() {
    try {
      let user = await localStorage.getItem("user");
      let parsed_user = JSON.parse(user);
      if (parsed_user) {
        setRoleID(parsed_user);
        fetchUserState(parsed_user.id)
        setProfile(parsed_user.pro_pic)
        setEmail(parsed_user.email)
        setFirstName(parsed_user.firstname)
        setLastName(parsed_user.lastname)
      }
    } catch {
      return null;
    }
  };

  const fetchUserState = (id) => {
    var requestOptions = {
      method: "POST",
      redirect: "follow",
    };

    fetch(`${baseUrl}fetchuserwithid/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setIsInvested(result.data.state);
      })
      .catch((error) => console.log("error", error));
  };

  const updateProfile = () => {
    setButtonLoader(true)

    var formdata = new FormData();
    formdata.append("email", email);
    formdata.append("firstname", firstName);
    formdata.append("lastname", lastName);
    formdata.append("pro_pic", profile, "[PROXY]");

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };

    fetch(`${baseUrl}updateuserwithid/${roleID.id}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setButtonLoader(false)
        console.log(result)
        if (result.status === "200") {
          toast.info('Profile Updated')
          localStorage.setItem("user", JSON.stringify(result.user));
        }
        else if (result.status === "401") {
          toast.info(result.message)
        }
      })
      .catch(error => {
        console.log('error', error)
        toast.warn('Error while updating')
      });
  }

  function oncloseModal() {
    setShouldShow((prev) => (!prev))
  }


  return (
    <div className="content-wrapper scroll-view-two scrollbar-secondary-two">
      {roleID ?
        <ChangePassword
          showModal={shouldShow}
          closeModal={oncloseModal}
          userID={roleID}

        /> : null
      }
      <div className="p-3 d-flex">
        <h2 className="">My Profile</h2>
        <button
          onClick={oncloseModal}
          className="btn btn-sm btn-success ms-auto"
        >
          Change Password
        </button>
      </div>

      <div className="card border-success m-3 card-styles">
        <div className="card-body">
          <div className="d-flex">
            <img
              className="d-none d-md-block"
              // src="dist/img/avatar.jpg"
              src={!roleID.pro_pic ? `${BaseUrlImages}${roleID.pro_pic}` : "dist/img/avatar.jpg"}
              style={{ height: "120px", width: '120px', borderRadius: '50%', objectFit: 'cover', background: '#dfdfdf' }}
              alt=""
            />
            <div className="ms-3">
              <h5>Name</h5>
              <h6>{roleID != "" ? roleID.firstname : ""}&nbsp;{roleID != "" ? roleID.lastname : ""}</h6>
              <hr />
              <h5>User Name</h5>
              <h6>{roleID != "" ? roleID.username : ""}</h6>
            </div>
            <div className="ms-auto">
              <h5 className="me-auto">Referral Name</h5>
              <h6>{isInvested === "0" ? "InActive" : roleID.referal_code}</h6>
              <hr />
              <h5>Join Date</h5>
              <h6>{roleID != "" ? roleID.Idate : ""}</h6>
            </div>
          </div>
        </div>
      </div>

      <div className="card m-3 card-styles mb-5">
        <div className="card-body">

          <h5>{roleID != "" ? roleID.firstname : ""}&nbsp;{roleID != "" ? roleID.lastname : ""}'s Full Information</h5>
          <hr className="w-100" />

          <div className="row">
            <div className="col-lg-6">
              <div className="mb-3">
                <label for="disabledTextInput" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  onChange={(e) => setFirstName(e.target.value)}
                  defaultValue={roleID != "" ? roleID.firstname : ""}
                  className="form-control"
                  id="disabledTextInput"
                  aria-describedby="emailHelp"
                />
              </div>
            </div>

            <div className="col-lg-6">
              <div className="mb-3">
                <label for="disabledTextInput" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  onChange={(e) => setLastName(e.target.value)}
                  defaultValue={roleID != "" ? roleID.lastname : ""}
                  className="form-control"
                  id="disabledTextInput"
                  aria-describedby="emailHelp"
                />
              </div>
            </div>
          </div>

          <div className="row mt-5">
            <div className="col-lg-6">
              <label for="disabledTextInput" className="form-label">
                Email
              </label>
              <input
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                defaultValue={roleID != "" ? roleID.email : ""}
                className="form-control"
                id="disabledTextInput"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="col-lg-6">
              <fieldset disabled>
                <label for="disabledTextInput" className="form-label">
                  Mobile No#
                </label>
                <input
                  type="phone"
                  value={roleID != "" ? roleID.firstname : ""}
                  className="form-control"
                  id="disabledTextInput"
                  aria-describedby="emailHelp"
                />
              </fieldset>
            </div>
          </div>
          {/* <label for="disabledTextInput" className="form-label mt-3">
            Address
          </label>
          <input
            type="text"
            value={roleID != "" ? roleID.firstname : ""}
            className="form-control"
            id="disabledTextInput"
            aria-describedby="emailHelp"
          />

          <div className="row">
            <div className="col-lg-3">
              <label for="disabledTextInput" className="form-label mt-3">
                City
              </label>
              <input
                type="text"
                value={roleID != "" ? roleID.firstname : ""}
                className="form-control"
                id="disabledTextInput"
                aria-describedby="emailHelp"
              />
            </div>

            <div className="col-lg-3">
              <label for="disabledTextInput" className="form-label mt-3">
                State
              </label>
              <input
                type="text"
                value={roleID != "" ? roleID.firstname : ""}
                className="form-control"
                id="disabledTextInput"
                aria-describedby="emailHelp"
              />
            </div>

            <div className="col-lg-3">
              <label for="disabledTextInput" className="form-label mt-3">
                ZIP/Postal
              </label>
              <input
                type="text"
                value={roleID != "" ? roleID.firstname : ""}
                className="form-control"
                id="disabledTextInput"
                aria-describedby="emailHelp"
              />
            </div>

            <div className="col-lg-3">
              <label for="disabledTextInput" className="form-label mt-3">
                Country
              </label>
              <input
                type="text"
                value={roleID != "" ? roleID.firstname : ""}
                className="form-control"
                id="disabledTextInput"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="col-lg-12">
              <label for="disabledTextInput" className="form-label mt-3">
                Profile Pic
              </label>
              <input
                onChange={(e) => setProfile(e.target.files[0])}
                type="file"
                className="form-control"
                id="inputGroupFile01"
              />
            </div>
          </div> */}

          <div className="row">
            <div className="col-lg-12">
              <label for="disabledTextInput" className="form-label mt-3">
                Profile Pic
              </label>
              <input
                onChange={(e) => setProfile(e.target.files[0])}
                type="file"
                className="form-control"
                id="inputGroupFile01"
              />
            </div>
          </div>
          <button className="btn btn-outline-success mt-4 float-end" onClick={updateProfile}>
            {buttonLoader === true ? 'Loading ...' : 'Update Profile'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;

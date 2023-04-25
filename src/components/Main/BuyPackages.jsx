import axios from "axios";
import React, { useEffect, useState } from "react";
import BaseUrl from "../Sourcefiles/BaseUrl";
import BaseUrlImages from "../Sourcefiles/BaseUrlImages";
import BuyPackage from "../Modals/BuyPackage";
import baseUrl from "../Sourcefiles/BaseUrl";

const BuyPackages = () => {
  const [data, setData] = useState([]);
  const [userID, setUserID] = useState();
  const [loader, setLoader] = useState(false);
  const [shouldShow, setShouldShow] = useState(false);
  const [isInvested, setIsInvested] = useState("1");

  function oncloseModal() {
    setShouldShow((prev) => !prev);
  }

  const getPackages = () => {
    setLoader(true);
    axios
      .get(`${BaseUrl}fetchallpackage`)
      .then((res) => {
        setData(res.data.Packages);
        setLoader(false);
        console.log(res.data.Packages);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getPackages();
    SetLocalLogin();
  }, []);

  async function SetLocalLogin() {
    try {
      let user = await localStorage.getItem("user");
      let parsed_user = JSON.parse(user);
      if (parsed_user) {
        fetchUserState(parsed_user.id);
      }
    } catch {
      return null;
    }
  }

  function fetchUserState(id) {
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
  }

  return (
    <div className="scroll-view-two scrollbar-secondary-two content-wrapper">
      <h2 className="p-3" style={{ color: "#5e5873" }}>
        <b>Packages</b>
      </h2>
      {userID ? (
        <BuyPackage
          userInfo={userID}
          showModal={shouldShow}
          closeModal={oncloseModal}
        />
      ) : null}

      <div className="card border-success m-3">
        <h5 className="card-header pb-4">
          <b>Buy Package</b>
        </h5>
      </div>


      <div className="container">
        <div className="row text-center">
          {loader === true ? (
            <>
              <div className="">
                <div className="loader">
                  <div
                    className="spinner-border"
                    style={{ height: "5rem", width: "5rem" }}
                    role="status"
                  >
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            data.map((items) => {
              return (
                <>
                  <div className="col-lg-3">
                    <div
                      className="card plan-card"
                      style={{ borderRadius: "1rem" }}
                    >
                      <div className="card-block">
                        <div className="pt-3 pb-3">
                          <h1>
                            <i className="fa fa-trophy plan-icon" />
                          </h1>
                          <h6 className="text-uppercase text-primary">
                            {items.title}
                          </h6>
                        </div>
                        <div>
                          <h1 className="plan-price padding-b-15">
                            {items.price}
                            <span
                              className="text-muted m-l-10"
                              style={{
                                fontSize: "15px",
                                verticalAlign: "middle",
                              }}
                            >
                              <sup>&nbsp; one Time</sup>
                            </span>
                          </h1>
                          <div className="plan-div-border" />
                        </div>
                        <div className="plan-features pb-3 mt-3 text-muted padding-t-b-30">
                          <p>{items.coins}&nbsp;Coins</p>
                          <p>{items.pair}&nbsp;Pair Bonus</p>
                          <p>{items.description}</p>

                          {isInvested === "0" && (
                            <a
                              className="btn btn-primary"
                              onClick={() => {
                                oncloseModal();
                                setUserID(items);
                              }}
                            >
                              Buy Now
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default BuyPackages;

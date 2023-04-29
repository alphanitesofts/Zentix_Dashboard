import axios from "axios";
import React, { useEffect, useState } from "react";
import baseUrl from "../Sourcefiles/BaseUrl";

const UserReferrals = () => {
  const [data, setData] = useState([]);

  const [userID, setUserID] = useState("");
  const [refferalDate, setRefeeraldate] = useState("");
  const [userName, setUserName] = useState("");

  const [firstMember, setFirstMembers] = useState([]);
  const [secondMember, setSecondMembers] = useState([]);
  const [loader, setLoader] = useState(false);
  const [filterSearch, setFilterSearch] = useState("0");

  useEffect(() => {
    SetLocalLogin();
  }, []);

  async function SetLocalLogin() {
    try {
      let user = await localStorage.getItem("user");
      let parsed_user = JSON.parse(user);
      if (parsed_user) {
        getRefferals(parsed_user.id);
      }
    } catch {
      return null;
    }
  }

  const getRefferals = (id) => {
    setLoader(true);
    const userObj = {
      user_id: id,
    };
    axios
      .post(`${baseUrl}get_my_team`, userObj)
      .then((res) => {
        setLoader(false);
        console.log(res);
        setData(res.data);

        setFirstMembers(res.data.first_members);
        setSecondMembers(res.data.second_members);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadingSection = () => {
    if (firstMember.length < 1) {
      return <h4 className="text-center">No Data Available</h4>;
    } else {
      return <DataRender />;
    }
  };

  const DataRender = () => {
    return (
      <>
        {
          filterSearch === "0"
            ? firstFilteredData.map((items) => {
              return <Content items={items} />;
            })
            : secondFilterData.map((items) => {
              return <Content items={items} />;
            })
        }
      </>
    );
  };

  const firstFilteredData =
    userID && !userName && !refferalDate
      ? firstMember.filter((objects) => objects.id === Number(userID))
      : userName && !Number(userID) && !refferalDate
        ? firstMember.filter((objects) => objects.firstname === userName)
        : refferalDate && !Number(userID) && !userName
          ? firstMember.filter((objects) => objects.Idate === refferalDate)
          : Number(userID) && userName && !refferalDate
            ? firstMember.filter(
              (objects) =>
                objects.id === Number(userID) && objects.firstname == userName
            )
            : userName && refferalDate && !Number(userID)
              ? firstMember.filter(
                (objects) =>
                  objects.firstname === userName && objects.Idate == refferalDate
              )
              : Number(userID) && userName && refferalDate
                ? firstMember.filter(
                  (objects) =>
                    objects.id === Number(userID) &&
                    objects.firstname === userName &&
                    objects.Idate === refferalDate
                )
                : firstMember;

  const secondFilterData =
    userID && !userName && !refferalDate
      ? secondMember.filter((objects) => objects.id === Number(userID))
      : userName && !Number(userID) && !refferalDate
        ? secondMember.filter((objects) => objects.firstname === userName)
        : refferalDate && !Number(userID) && !userName
          ? secondMember.filter((objects) => objects.Idate === refferalDate)
          : Number(userID) && userName && !refferalDate
            ? secondMember.filter(
              (objects) =>
                objects.id === Number(userID) && objects.firstname == userName
            )
            : userName && refferalDate && !Number(userID)
              ? secondMember.filter(
                (objects) =>
                  objects.firstname === userName && objects.Idate == refferalDate
              )
              : Number(userID) && userName && refferalDate
                ? secondMember.filter(
                  (objects) =>
                    objects.id === Number(userID) &&
                    objects.firstname === userName &&
                    objects.Idate === refferalDate
                )
                : secondMember;

  function Content({ items }) {
    return (
      <tr>
        <td>{items.id}</td>
        <td>{items.firstname}</td>
        <td>{items.username}</td>
        <td>{items.email}</td>
        <td>{items.cnic}</td>
        <td>{items.phone}</td>
        <td>{items.Idate}</td>
      </tr>
    );
  }

  return (
    <div className="scroll-view-two scrollbar-secondary-two">
      <div className="content-wrapper">
        <h2 className="p-3">Referrals</h2>

        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card card-styles">
                  <div className="card-header">
                    <div className="d-flex">
                      <h3 className="card-title">
                        <b>My Referrals Users</b>
                      </h3>
                      <div className="ms-auto">
                        <select
                          class="form-select"
                          onChange={(e) => setFilterSearch(e.target.value)}
                          style={{ borderRadius: "10em" }}
                          aria-label="Default select example"
                        >
                          <option value={"0"}>First Members</option>
                          <option value={"1"}>Second Members</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="card-body table-responsive">
                    <div>
                      <div className="row">
                        <input
                          className="form-control col-lg-4 mb-2"
                          type="number"
                          placeholder="Search with User ID"
                          onChange={(e) => {
                            setUserID(e.target.value);
                          }}
                          aria-label="Search"
                          style={{ borderRadius: "10em" }}
                        />

                        <input
                          className="form-control col-lg-4 mb-2"
                          type="text"
                          placeholder="Search with Name"
                          onChange={(e) => setUserName(e.target.value)}
                          aria-label="Search"
                          style={{ borderRadius: "10em" }}
                        />

                        <input
                          className="form-control col-lg-4 mb-2"
                          type="text"
                          placeholder="Enter date in YYYY-MM-DD"
                          onChange={(e) => setRefeeraldate(e.target.value)}
                          aria-label="Search"
                          style={{ borderRadius: "10em" }}
                        />
                      </div>
                    </div>

                    {loader === true ? (
                      <>
                        <div>
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
                      <>
                        {filterSearch === "0" ? (
                          <h4 className="mt-3 mb-0">First Members</h4>
                        ) : (
                          <h4 className="mt-3 mb-0">Second Members</h4>
                        )}
                        <table
                          id="example2"
                          className="table mt-2  table-bordered table-hover  "
                        >
                          <thead className="table-success">
                            <tr>
                              <th>User ID</th>
                              <th>firstname</th>
                              <th>username</th>
                              <th>email</th>
                              <th>cnic</th>
                              <th>Phone No.</th>
                              <th>Date</th>
                            </tr>
                          </thead>
                          <tbody>{loadingSection()}</tbody>
                        </table>

                        {/* <h4 className="mt-5 mb-0">Second Referrals</h4>
                          <table
                            id="example2"
                            className="table mt-2 table-bordered table-hover  "
                          >
                            <thead className="table-success">
                              <tr>
                                <th>User ID</th>
                                <th>firstname</th>
                                <th>username</th>
                                <th>email</th>
                                <th>cnic</th>
                                <th>Phone No.</th>
                                <th>Date</th>
                              </tr>
                            </thead>
                            <tbody>
                              {
                                loadingSection()
                              }
                            </tbody>
                          </table> */}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default UserReferrals;

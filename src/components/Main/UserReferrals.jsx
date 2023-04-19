import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import baseUrl from "../Sourcefiles/BaseUrl";

const UserReferrals = () => {
  const [data, setData] = useState([])


  const [userID, setUserID] = useState("");
  const [refferalDate, setRefeeraldate] = useState("");
  const [userName, setUserName] = useState("");


  const [firstMember, setFirstMembers] = useState([])
  const [secondMember, setSecondMembers] = useState([])
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    SetLocalLogin();
  }, [])

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
  };

  const getRefferals = (id) => {
    setLoader(true)
    const userObj = {
      user_id: id
    }
    axios.post(`${baseUrl}get_my_team`, userObj)
      .then((res) => {
        setLoader(false)
        console.log(res)
        setData(res.data)

        setFirstMembers(res.data.first_members)
        setSecondMembers(res.data.second_members)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const loadingSection = () => {
    if (firstMember.length < 1) {
      return <h4 className='text-center'>No Data Available</h4>
    }
    else {
      return <DataRender />
    }
  }

  const DataRender = () => {
    return (
      <>
        {
          filteredData.map((items) => {
            return (
              <Content items={items} />
            )
          }
          )
        }
      </>
    )
  }

  const filteredData = userID && !userName && !refferalDate ?
    firstMember.filter((objects) => objects.id === (userID)) :
    userName && !userID && !refferalDate ?
      firstMember.filter((objects) => objects.firstname === userName) :
      refferalDate && !userID && !userName ?
        firstMember.filter((objects) => objects.Idate === refferalDate) :
        userID && userName && !refferalDate ?
          firstMember.filter((objects) => objects.id === (userID) && objects.firstname == userName) :
          userName && refferalDate && !userID ?
            firstMember.filter((objects) => objects.firstname === userName && objects.Idate == refferalDate) :
            userID && userName && refferalDate ?
              firstMember.filter((objects) => objects.id === (userID) && objects.firstname === userName && objects.Idate === refferalDate) :
              firstMember

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
    )
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
                    <h3 className="card-title">
                      <b>My Referrals Users</b>
                    </h3>
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


                    {
                      loader === true ?
                        <>
                          <div>
                            <div className="loader">
                              <div className="spinner-border" style={{ height: "5rem", width: "5rem" }} role="status">
                                <span className="sr-only">Loading...</span>
                              </div>
                            </div>
                          </div>
                        </> :

                        <>
                          <h4 className="mt-3 mb-0">First Referrals</h4>
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
                            <tbody>
                              {
                                firstMember.map((items) => {
                                  return (
                                    <>
                                      <tr>
                                        <td>{items.id}</td>
                                        <td>{items.firstname}</td>
                                        <td>{items.username}</td>
                                        <td>{items.email}</td>
                                        <td>{items.cnic}</td>
                                        <td>{items.phone}</td>
                                        <td>{items.Idate}</td>
                                      </tr>
                                    </>
                                  )
                                })
                              }
                            </tbody>
                          </table>


                          <h4 className="mt-5 mb-0">Second Referrals</h4>
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
                                secondMember.map((items) => {
                                  return (
                                    <>
                                      <tr>
                                        <td>{items.id}</td>
                                        <td>{items.firstname}</td>
                                        <td>{items.username}</td>
                                        <td>{items.email}</td>
                                        <td>{items.cnic}</td>
                                        <td>{items.phone}</td>
                                        <td>{items.Idate}</td>
                                      </tr>
                                    </>
                                  )
                                })
                              }
                            </tbody>
                          </table>


                        </>

                    }




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

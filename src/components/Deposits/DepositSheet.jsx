import React, { useEffect, useState } from "react";
import baseUrl from "../Sourcefiles/BaseUrl";
import axios from "axios";
import baseUrlImage from "../Sourcefiles/BaseUrlImages";

const DepositSheet = () => {
  const [userData, setUserData] = useState([]);
  const [totalDeposit, setTotalDeposit] = useState();

  const [loader, setLoader] = useState(false);

  const [status, setStatus] = useState("");
  const [amount, setUserAmount] = useState("");
  const [depositDate, setDepositDate] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    SetLocalLogin();
  }, []);

  async function SetLocalLogin() {
    try {
      let user = await localStorage.getItem("user");
      let parsed_user = JSON.parse(user);
      if (parsed_user) {
        getData(parsed_user.id);
        // setRoleID(parsed_user)
      }
    } catch {
      return null;
    }
  }

  const getData = (id) => {
    setLoader(true);
    const orderObj = {
      payer_id: id,
    };

    axios
      .post(`${baseUrl}fetchdepositwithid`, orderObj)
      .then((res) => {
        setLoader(false);
        setTotalDeposit(res.data.total_deposit);
        setUserData(res.data.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const filteredData =
    status && !amount && !userName && !depositDate
      ? userData.filter((objects) => objects.status === status)
      : amount && !status && !userName && !depositDate
        ? userData.filter((objects) => objects.amount === amount)
        : userName && !status && !amount && !depositDate
          ? userData.filter((objects) => objects.account_title === userName)
          : depositDate && !status && !userName && !amount
            ? userData.filter((objects) => objects.Idate === depositDate)
            : status && amount && !userName && !depositDate
              ? userData.filter((objects) => objects.status === status && objects.amount == amount)
              : status && !amount && userName && !depositDate
                ? userData.filter((objects) => objects.status === status && objects.account_title == amount)
                : status && !amount && !userName && depositDate
                  ? userData.filter((objects) => objects.status === status && objects.Idate == amount)
                  //  sequence 2
                  : !status && amount && userName && !depositDate
                    ? userData.filter((objects) => objects.amount === amount && objects.account_title == userName)
                    : !status && amount && !userName && depositDate
                      ? userData.filter((objects) => objects.amount === amount && objects.Idate == depositDate)
                      //  sequence 3
                      : !status && !amount && userName && depositDate
                        ? userData.filter((objects) => objects.account_title === userName && objects.Idate == depositDate)
                        //  sequence 4
                        : status && !amount && !userName && depositDate
                          ? userData.filter((objects) => objects.status === status && objects.Idate == depositDate)
                          : !status && !amount && userName && depositDate
                            ? userData.filter((objects) => objects.account_title === amount && objects.Idate == depositDate)
                            //  sequence 5
                            : status && amount && userName && !depositDate
                              ? userData.filter((objects) => objects.status === status && objects.amount == amount && objects.account_title == userName)
                              : status && amount && !userName && depositDate
                                ? userData.filter((objects) => objects.status === status && objects.amount == amount && objects.Idate == depositDate)
                                : status && !amount && userName && depositDate
                                  ? userData.filter((objects) => objects.status === status && objects.account_title == userName && objects.Idate == depositDate)
                                  : userData

  function Content({ items }) {
    return (
      <tr>
        <td>{items.id}</td>
        <td>{items.account_title}</td>
        <td>{items.amount}</td>
        <td>{items.account_no}</td>
        <td>{items.account_type}</td>
        <td>{items.account_subtype}</td>
        <td>
          <img
            src={`${baseUrlImage}${items.proof_image}`}
            className="img-fluid"
            style={{ cursor: "pointer", height: "70px" }}
            onClick={() =>
              window.open(`${baseUrlImage}${items.proof_image}`, "_blank")
            }
            alt="deposit images"
          />
        </td>
        {items.status === "approved" ? (
          <td className="text-success">{items.status}</td>
        ) : (
          <td className="text-danger">{items.status}</td>
        )}
        <td>{items.Idate}</td>
      </tr>
    );
  }

  const loadingSection = () => {
    if (userData.length < 1) {
      return <h4 className="text-center">No Data Available</h4>;
    } else {
      return <DataRender />;
    }
  };

  // filters condition
  const DataRender = () => {
    return (
      <>
        {filteredData.map((items) => {
          return <Content items={items} />;
        })}
      </>
    );
  };

  return (
    <div className="scroll-view-two scrollbar-secondary-two">
      <div className="content-wrapper">
        <h4 className="p-3" style={{ color: "#5e5873" }}>
          <b>Deposits</b>
        </h4>

        <div className="card m-3 bg-body card-styles">
          <div className="card-body d-flex">
            <h4 className="mt-2">Total Deposits</h4>
            <h3 className="ms-auto">
              Pkr <span className="text-danger">{totalDeposit}</span>
            </h3>
          </div>
        </div>
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card border-danger card-styles">
                  <div className="card-header">
                    <h3 className="card-title">
                      <b>Deposits Sheet</b>
                    </h3>
                  </div>

                  <div className="card-body table-responsive">
                    <div className="row">
                      <select
                        onChange={(e) => setStatus(e.target.value)}
                        className="form-select col-lg-3 mb-2"
                        style={{ borderRadius: "10em" }}
                        aria-label="Default select example"
                      >
                        <option value={""}>All</option>
                        <option value={"approved"}>Approved</option>
                        <option value={"unapproved"}>unapproved</option>
                      </select>

                      <input
                        className="form-control col-lg-3 mb-2"
                        type="number"
                        placeholder="Search with Amount"
                        onChange={(e) => {
                          setUserAmount(e.target.value);
                        }}
                        aria-label="Search"
                        style={{ borderRadius: "10em" }}
                      />

                      <input
                        className="form-control col-lg-3 mb-2"
                        type="text"
                        placeholder="Search with Name"
                        onChange={(e) => setUserName(e.target.value)}
                        aria-label="Search"
                        style={{ borderRadius: "10em" }}
                      />

                      <input
                        className="form-control col-lg-3 mb-2"
                        type="text"
                        placeholder="Enter date in YYYY-MM-DD"
                        onChange={(e) => setDepositDate(e.target.value)}
                        aria-label="Search"
                        style={{ borderRadius: "10em" }}
                      />
                    </div>
                    <table
                      id="example2"
                      className="table mt-3  table-bordered table-hover  "
                    >
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
                        <>
                          <thead className="table-success">
                            <tr>
                              <th>ID</th>
                              <th>Name</th>
                              <th>Amount</th>
                              <th>Account No</th>
                              <th>Account Type</th>
                              <th>Account Subtype</th>
                              <th>Image</th>
                              <th>Status</th>
                              <th>Date</th>
                            </tr>
                          </thead>
                          <tbody>{loadingSection()}</tbody>
                        </>
                      )}
                    </table>
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

export default DepositSheet;

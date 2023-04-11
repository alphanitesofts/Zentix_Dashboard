import React, { useState } from "react";

const CommissionSheet = () => {
  const [text, setText] = useState("");
  const [orderID, setOrderID] = useState("");
  const [orderDate, setOrderdate] = useState("");
  const [phone, setPhoneNo] = useState("");
  return (
    <div className="scroll-view-two scrollbar-secondary-two">
      <div className="content-wrapper">
      <h2 className="p-3" style={{color:"#5e5873"}}><b>Commission Sheet</b></h2>

        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card card-styles">
                <div className="card-header d-flex">
                    <div>
                      <h3 className="card-title">
                        <b>My Commission Sheet</b>
                      </h3>
                    </div>

                    <div className="ms-auto">
                      <select
                        className="form-select"
                        style={{ borderRadius: "10em" }}
                        aria-label="Default select example"
                      >
                        <option selected>Referral</option>
                        <option value={1}>1st referral</option>
                        <option value={2}>2nd referral</option>
                        <option value={3}>3rd referral</option>
                      </select>
                    </div>
                  </div>


                  <div className="card-body table-responsive">
                    <div className="form-group d-flex">
                      <select
                        className="form-select"
                        style={{ borderRadius: "10em" }}
                        aria-label="Default select example"
                      >
                        <option selected>Status</option>
                        <option value={1}>Approved</option>
                        <option value={2}>unapproved</option>
                      </select>
                      &nbsp;&nbsp;&nbsp;
                      <input
                        className="form-control"
                        type="number"
                        placeholder="Search with order ID"
                        onChange={(e) => {
                          setOrderID(e.target.value);
                        }}
                        aria-label="Search"
                        style={{ borderRadius: "10em" }}
                      />
                      &nbsp;&nbsp;&nbsp;
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Search with Phone"
                        onChange={(e) => setPhoneNo(e.target.value)}
                        aria-label="Search"
                        style={{ borderRadius: "10em" }}
                      />
                      &nbsp;&nbsp;&nbsp;
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Enter date in YYYY-MM-DD"
                        onChange={(e) => setOrderdate(e.target.value)}
                        aria-label="Search"
                        style={{ borderRadius: "10em" }}
                      />
                    </div>
                    <table
                      id="example2"
                      className="table  table-bordered table-hover  "
                    >
                      <thead className="table-success">
                        <tr>
                          {/* <th>Sr. No.</th>  */}
                          <th>Username</th>
                          <th>Name</th>
                          <th>email</th>
                          <th>Phone No.</th>
                          <th>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>h1</td>
                          <td>faraz</td>
                          <td>Lahore</td>
                          <td>4450</td>
                          <td>23-02-2023</td>
                        </tr>
                      </tbody>
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

export default CommissionSheet;

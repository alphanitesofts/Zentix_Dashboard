import React from "react";
import crouselImage1 from "../Sourcefiles/Images/crousel1.jpg";
import crouselImage2 from "../Sourcefiles/Images/crousel2.jpg";
import crouselImage3 from "../Sourcefiles/Images/crousel3.jpg";

const UserProfile = () => {
  return (
    <div className="content-wrapper scroll-view-two scrollbar-secondary-two">
      <h2 className="p-3">Dashboard</h2>

      <div className="ticker-wrapper-h mt-3 bg-danger">
        <ul className="news-ticker-h fs-5  text-white">
          <li>
            <a href>What is Lorem Ipsum?</a>
          </li>
          <li>
            <a href>Why do we use it?</a>
          </li>
          <li>
            <a href>Where does it come from?</a>
          </li>
          <li>
            <a href>Where can I get some?</a>
          </li>
        </ul>
      </div>

      <div className="row d-flex justify-content-center">
        <div className="col-lg-2">
          <div className="card bg-secondary crousel-support">
            <div className="card-body"></div>
          </div>
        </div>
        <div className="col-lg-8 mt-3">
          <div
            id="carouselExampleInterval"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner" style={{ height: "300px" }}>
              <div className="carousel-item active" data-bs-interval={5000}>
                <img src={crouselImage1} className="d-block w-100" alt="..." />
              </div>
              <div className="carousel-item" data-bs-interval={5000}>
                <img src={crouselImage2} className="d-block w-100" alt="..." />
              </div>
              <div className="carousel-item" data-bs-interval={5000}>
                <img src={crouselImage3} className="d-block w-100" alt="..." />
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleInterval"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleInterval"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true" />
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
        <div className="col-lg-2">
          <div className="card bg-secondary crousel-support">
            <div className="card-body  "></div>
          </div>
        </div>
      </div>

      <div className="ticker-wrapper-h mt-3 bg-danger">
        <ul className="news-ticker-h fs-5  text-white">
          <li>
            <a href>What is Lorem Ipsum?</a>
          </li>
          <li>
            <a href>Why do we use it?</a>
          </li>
          <li>
            <a href>Where does it come from?</a>
          </li>
          <li>
            <a href>Where can I get some?</a>
          </li>
        </ul>
      </div>

      <div className="card m-3">
        <div className="card-body">
          <h5 className="text-danger">Important Notice</h5>
          <p>Dear Users,</p>
          <p>
            On the Occasion of Holy Month Ramadan Ul Mubarak the office timing
            will be 10am to 4PM (Mon- Sat) 6 day in a week.
          </p>
          <br />
          <p>Sincerely,</p>
          <p>The Zantix Team.</p>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-4">
          <div
            className="card ms-3 me-3"
            style={{ backgroundColor: "#28c76f" }}
          >
            <div className="card-body text-white p-4 shadow rounded">
              <h4 className="text-end">1500 coins</h4>
              <p className="text-end">E-wallet</p>
              <div className="d-flex justify-content-end">
                <button className="btn btn-sm btn-light me-1 shadow-lg rounded">
                  View All
                </button>
                <button className="btn btn-sm btn-light ms-1 shadow-lg rounded">
                  Convert
                </button>
              </div>
              <div className="icon-profiles">
                <i className="fa-solid fa-wallet card-icon" />
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div
            className="card ms-3 me-3"
            style={{ backgroundColor: "#00bcd4" }}
          >
            <div className="card-body text-white p-4 shadow rounded">
              <h4 className="text-end">779 Commission</h4>
              <p className="text-end">E-wallet</p>
              <div className="d-flex justify-content-end">
                <button className="btn btn-sm btn-light me-1 shadow-lg rounded">
                  View All
                </button>
              </div>
              <div className="icon-profiles">
                <i className="fa-solid fa-wallet card-icon" />
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div
            className="card ms-3 me-3"
            style={{ backgroundColor: "#ff9f43" }}
          >
            <div className="card-body text-white p-4 shadow rounded">
              <h4 className="text-end">1100 Pkr</h4>
              <p className="text-end">Total Earning</p>
              <div className="d-flex justify-content-end">
                <button className="btn btn-sm btn-light me-1 shadow-lg rounded">
                  View All
                </button>
                <button className="btn btn-sm btn-light ms-1 shadow-lg rounded">
                  Convert
                </button>
              </div>
              <div className="icon-profiles">
                <i className="fa-solid fa-wallet card-icon" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-4 ms-auto">
          <div
            className="card ms-3 me-3"
            style={{ backgroundColor: "#ff9f43" }}
          >
            <div className="card-body text-white p-4 shadow rounded">
              <h4 className="text-end">1100 Pkr</h4>
              <p className="text-end">Register Points</p>
              <div className="d-flex justify-content-end">
                <button className="btn btn-sm btn-light me-1 shadow-lg rounded">
                  View All
                </button>
                <button className="btn btn-sm btn-light ms-1 shadow-lg rounded">
                  Convert
                </button>
              </div>
              <div className="icon-profiles">
                <i className="fa-solid fa-wallet card-icon" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

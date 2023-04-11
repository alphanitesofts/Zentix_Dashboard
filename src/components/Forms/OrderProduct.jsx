import React, { useEffect, useState } from "react";
import baseUrl from "../Sourcefiles/BaseUrl";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const OrderProduct = () => {

  const location = useLocation();
  const { productID } = location.state;

  const [userData, setUserData] = useState("")

  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [adress, setAdress] = useState("")
  const [direction, setDirection] = useState("")
  const [city, setCity] = useState("")
  const [zip, setZip] = useState("")
  const [fieldStatus, setFieldStatus] = useState(false);


  useEffect(() => { SetLocalLogin() }, [])

  async function SetLocalLogin() {
    try {
      let user = await localStorage.getItem("user");
      let parsed_user = JSON.parse(user);
      if (parsed_user) {
        setUserData(parsed_user.id);
      }
    } catch {
      return null;
    }
  };


  const orderPackage = (id) => {

    if (!name && !phone && !adress && !direction && !city && !zip) {
      setFieldStatus(true)
      toast.warn('Please fill all fields!')
    }
    else {
      var formdata = new FormData();
      formdata.append("user_id", userData);
      formdata.append("full_name", name);
      formdata.append("phone_number", phone);
      formdata.append("address", adress);
      formdata.append("additional_direction", direction);
      formdata.append("city", city);
      formdata.append("state", "Pakistan");
      formdata.append("zip", zip);
      formdata.append("package_id", productID);

      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
      };

      fetch(`${baseUrl}order_product`, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result)
          toast.info('Product is Shipping')
        })
        .catch(error => console.log('error', error));
    }
  }

  return (
    <div className="scroll-view-two scrollbar-secondary-two content-wrapper">
      <h2 className="p-3" style={{ color: "#5e5873" }}> <b>Order Products</b> </h2>

      <div className="card card-styles m-3">
        <div className="card-header">
          <h3 className="card-title pb-2" style={{ color: "#5e5873" }}>
            <b>Order Form</b>
          </h3>
        </div>

        <div className="row g-3 container m-1">
          <div className="col-md-6">
            <label htmlFor="inputEmail4" className="form-label" style={{ color: "#5e5873" }}>Full name</label>
            <input type="email" className="form-control" placeholder="Enter your full name"
              onChange={(e) => setName(e.target.value)}
              style={{
                borderColor:
                  name === "" && fieldStatus === true ? "red" : "#ced4da",
              }} id="inputEmail4" />
            <span className="icon me-4 mt-3">
              <i className="fa-solid fa-signature" />
            </span>
          </div>
          <div className="col-md-6">
            <label htmlFor="inputPassword4" className="form-label" style={{ color: "#5e5873" }}>Phone Number</label>
            <input type="number" className="form-control" placeholder="Enter your phone number"
              onChange={(e) => setPhone(e.target.value)}
              style={{
                borderColor:
                  phone === "" && fieldStatus === true ? "red" : "#ced4da",
              }} id="inputPassword4" />
            <span className="icon me-4 mt-3">
              <i className="fa-solid fa-phone" />
            </span>
          </div>
          <div className="col-lg-12">
            <div className="form-group">
              <label
                htmlFor="exampleFormControlTextarea1"
                className="form-label"
                style={{ color: "#5e5873" }}
              >
                Complete Address
              </label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows={3}
                defaultValue={""}
                placeholder="Enter your complete address"
                onChange={(e) => setAdress(e.target.value)}
                style={{
                  borderColor:
                    adress === "" && fieldStatus === true ? "red" : "#ced4da",
                }}
              />
            </div>
          </div>
          <div className="col-12">
            <label htmlFor="inputAddress2" className="form-label" style={{ color: "#5e5873" }}>Additional Direction</label>
            <input type="text" className="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor"
              onChange={(e) => setDirection(e.target.value)}
              style={{
                borderColor:
                  direction === "" && fieldStatus === true ? "red" : "#ced4da",
              }} />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputCity" className="form-label" style={{ color: "#5e5873" }}>City</label>
            <input type="text" className="form-control" placeholder="Enter your City name" id="inputCity"
              onChange={(e) => setCity(e.target.value)}
              style={{
                borderColor:
                  city === "" && fieldStatus === true ? "red" : "#ced4da",
              }} />
          </div>
          <div className="col-md-4">
            <label htmlFor="inputState" className="form-label" style={{ color: "#5e5873" }}>State/ Country</label>
            <input
              type="text"
              className="form-control"
              id="inputSuccess"
              value={"Pakistan"}
              placeholder="Enter Country Name"
            />
          </div>
          <div className="col-md-2">
            <label htmlFor="inputZip" className="form-label" style={{ color: "#5e5873" }}>Zip</label>
            <input type="text" className="form-control" placeholder="City Zip Code"
              onChange={(e) => setZip(e.target.value)}
              style={{
                borderColor:
                  zip === "" && fieldStatus === true ? "red" : "#ced4da",
              }} id="inputZip" />
          </div>

          <button type="submit" className="btn btn-outline-info w-25 mt-4 mb-3 me-2 ms-auto" onClick={orderPackage}>Order Now</button>
        </div>


      </div>
    </div>
  );
};

export default OrderProduct;

import React, { useState, useEffect } from 'react'
import { Modal } from 'pretty-modal'
import baseUrl from '../Sourcefiles/BaseUrl';
import { toast } from 'react-toastify';

const BuyPackage = ({ userInfo, showModal, closeModal }) => {

  const [userDataa, setuserDataa] = useState("");
  const [buttonLoader, setButtonLoader] = useState(false)


  async function SetLocalLogin() {
    try {
      let user = await localStorage.getItem("user");
      let parsed_user = JSON.parse(user);
      if (parsed_user) {
        setuserDataa(parsed_user);
      }
    } catch {
      return null;
    }
  };

  const buyPackage = () => {
    setButtonLoader(true)
    var formdata = new FormData();
    formdata.append("package_id", userInfo.id);
    formdata.append("investor_id", userDataa.id);
    formdata.append("investor_name", userDataa.firstname);
    formdata.append("applied_price", userInfo.price);
    formdata.append("coins", userInfo.coins);
    formdata.append("commission", userInfo.commission);
    formdata.append("pair", userInfo.pair);

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };

    fetch(`${baseUrl}AddInvestment`, requestOptions)
      .then(response => {
        response.json()
        //  to remove the error SyntaxError: Unexpected token '<', "<!DOCTYPE "... is not valid JSON error
        return response.json
      })
      .then(result => {
        setButtonLoader(false)
        console.log(result)

        if (result.status === "401") {
          toast.warn(result.message)
        }
        else if (result.status === "200") {
          toast.info("Package Bought Successfully!")
        }
      })
      .catch(error => {
        console.log('error', error)
        toast.warn('something went wrong ...')
      });
  }


  useEffect(() => {
    SetLocalLogin()
  }, [])


  return (
    <div>
      <div>
        <Modal
          onClose={() => { closeModal(false) }} open={showModal}
        >
          <div>
            <div className="modal fade right" id="modalAbandonedCart" tabIndex={-1} role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="false">
              <p className="heading">Product in the cart</p>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-3 d-none d-md-block">
                  <p />
                  <p className="text-center me-5"><i className="fas fa-shopping-cart fa-4x" /></p>
                </div>
                <div className="col-9">
                  <p className='text-center'>Would you like to buy {userInfo.title} for {userInfo.price} pkr? <br /> <br />
                    {userInfo.description}
                  </p>
                  <p>This package consists of:
                    <br />● {userInfo.coins} coins
                    <br />● {userInfo.commission} commission
                    <br />● {userInfo.pair} pair
                  </p>
                </div>
              </div>
            </div>
            <div className="modal-footer justify-content-center">
              <a type="button" className="btn btn-info" onClick={() => buyPackage()}> {buttonLoader === true ? 'Loading ... ' : <i className='fa-solid fa-check' />}  </a>
              <a type="button" className="btn btn-outline-info waves-effect" data-dismiss="modal" onClick={closeModal}>Cancel  &nbsp; <i className='fa-solid fa-xmark' /></a>
            </div>
          </div>

        </Modal>
      </div>
    </div>
  )
}

export default BuyPackage
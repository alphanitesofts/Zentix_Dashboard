import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./App.css";

//Structure
import Footer from "./components/Body/Footer";
import Navbar from "./components/Body/Navbar";
import Sidebar from "./components/Body/Sidebar";
import Error from "./components/Body/Error";

// Authentication
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import RecoverPassword from "./components/Auth/RecoverPassword";
import ForgotPassword from "./components/Auth/ForgotPassword";
import UserProfile from "./components/Main/UserProfile";
import DepositNow from "./components/Deposits/DepositNow";
import DepositSheet from "./components/Deposits/DepositSheet";
import DepositForm from "./components/Deposits/DepositForm";
import WithdrawNow from "./components/Withdraw/WithdrawNow";
import WithdrawSheet from "./components/Withdraw/WithdrawSheet";
import WithdrawForm from "./components/Withdraw/WithdrawForm";
import ImportantLinks from "./components/Main/ImportantLinks";
import UserReferrals from "./components/Main/UserReferrals";
import ViewProfile from "./components/Profiles/ViewProfile";
import HomePage from "./components/Main/HomePage";
import BuyPackages from "./components/Main/BuyPackages";
import OrderProduct from "./components/Forms/OrderProduct";
import CommissionSheet from "./components/Rewards/CommissionSheet";
import BonusSheet from "./components/Rewards/BonusSheet";
import CoinsSheet from "./components/Rewards/CoinsSheet";
import TotalRecords from "./components/Main/TotalRecords";
import DailyNotifications from "./components/Notifications/DailyNotifications";

function App() {
  const [login, SetLogin] = useState(false);

  const setLocalLogin = async () => {
    try {
      let userLogin = await localStorage.getItem("logIN");
      let parsed = JSON.parse(userLogin);
      if (parsed != null) {
        SetLogin(parsed);
      }
    } catch {
      return null;
    }
  };

  useEffect(() => {
    setLocalLogin();
  }, []);

  return (
    <div className="wrapper">
      <div className="">
        {login === false ? (
          <Router>
            <Routes>
              <Route path="/" exact element={<Login />} />
              <Route path="/Register" element={<Register />} />
              <Route path="/RecoverPassword" element={<RecoverPassword />} />
              <Route path="/ForgotPassword" element={<ForgotPassword />} />
            </Routes>
          </Router>
        ) : (
          <Router>
            <Navbar />
            <Sidebar />
            <Routes>
              <Route path="/" element={<HomePage />} />

              <Route path="/UserProfile" element={<UserProfile />} />

              <Route path="/ImportantLinks" element={<ImportantLinks />} />
              <Route path="/UserReferrals" element={<UserReferrals />} />
              <Route path="/ViewProfile" element={<ViewProfile />} />
              <Route path="/BuyPackages" element={<BuyPackages />} />
              <Route path="/TotalRecords" element={<TotalRecords />} />

              {/* notifications */}

              <Route
                path="/DailyNotifications"
                element={<DailyNotifications />}
              />

              {/* Rewards Sheet */}
              <Route path="/CommissionSheet" element={<CommissionSheet />} />
              <Route path="/Bonus-Sheet" element={<BonusSheet />} />
              <Route path="/CoinSheet" element={<CoinsSheet />} />

              {/* Deposit Sheet */}
              <Route path="/DepositNow" element={<DepositNow />} />
              <Route path="/DepositSheet" element={<DepositSheet />} />
              <Route path="/DepositForm" element={<DepositForm />} />

              {/* Withdraw Sheet */}
              <Route path="/WithdrawNow" element={<WithdrawNow />} />
              <Route path="/WithdrawSheet" element={<WithdrawSheet />} />
              <Route path="/WithdrawForm" element={<WithdrawForm />} />

              {/* forms */}
              <Route path="/OrderProduct" element={<OrderProduct />} />

              <Route path="*" element={<Error />} />
            </Routes>
            <Footer />
          </Router>
        )}
      </div>
    </div>
  );
}

export default App;

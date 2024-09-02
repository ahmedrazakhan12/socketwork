import React, { useEffect, useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import BarsDataset from "../charts/Bars";
import Footer from "../components/Footer";
import { useAppContext } from "../context/AppContext";
import ActiveSubscriptionCard from "./components/ActiveSubscription";
import Header from "./components/Header";
import { useSocialAuth } from "../context/SocialAuthContext";
import { getLoggedinUserData } from "../utils/helpers";

function Dashboard() {
  const {
    authUser,
    authUserSubscriptions
  } = useAppContext();
  const userType = authUser?.user?.user_type;
  const { Alert, setAlert } = useSocialAuth()
  const [ConfirmExpert, setConfirmExpert] = useState('')
  const [Appointments, setAppointments] = useState([])

  // console.log( )
  useEffect(
    () => {

      getLoggedinUserData(localStorage.getItem('token')).then(_ => {
        console.log(_?.data?.user, ' FETCHED USER')
        const userType = _?.data?.user?.user_type;

        setAppointments(_?.data?.user?.user_appointments)
        console.log(_?.data?.user?.user_appointments, ' USER_APPOINTMENTS SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS')

        // ask for becoming an expert
        if (userType != 'expert') {

          // const wannaBeExpert = confirm('Do You Want To Be An Expert?');
          setConfirmExpert(true ? 'expert' : 'user');
        }
      })


    }, []
  )


  const pendingAppointments = Appointments.filter(apt => apt?.status === 'pending').length
  const cancelledAppointments = Appointments.filter(apt => apt?.status === 'rejected').length
  const totalAppointments = Appointments.filter(apt => apt?.status !== 'pending').length

  // const acceptedAppointments = Appointments.filter(apt => apt?.status !== 'accepted').length





  return (
    <div className="min-h-screen bg-gray-100">
      {Alert && <div style={{ display: 'flex', padding: '1rem', justifyContent: 'space-between' }}>
        <span>

          {Alert?.message}
        </span>
        <span onClick={() => setAlert(null)} style={{ color: 'gray', cursor: "pointer" }}>

          {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg> */}
          X

        </span>
      </div>}      <Header />
      <section className="tk-scetiondb">
        <div className="container">
          <div className="row">
            <div className="col-xl-8 col-lg-7 col-md-12">
              <div className="tk-seller-counter">
                <ul className="tk-seller-counter-list" id="tk-counter-two">
                  <li>
                    <div className="tk-counter-contant">
                      <div className="tk-counter-icon-button">
                        <div className="tk-icon-green">
                          <i
                            className="bi bi-check-square"
                            style={{ color: "#22C55E" }}
                          ></i>
                        </div>
                        <div className="tk-counter-button">
                          <Link to="/appointments" className="tk-counter-button-active">
                            View
                          </Link>
                        </div>
                      </div>
                      <h3 className="tk-counter-value">
                        <span className="counter-value" data-count="0">
                          0
                        </span>
                      </h3>
                      <strong>Completed Appointments</strong>
                      <div className="tk-icon-watermark">
                        <i className="bi bi-check-square"></i>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="tk-counter-contant">
                      <div className="tk-counter-icon-button">
                        <div className="tk-icon-yellow">
                          <i
                            className="bi bi-watch"
                            style={{ color: "#EAB308" }}
                          ></i>
                        </div>
                        <div className="tk-counter-button">
                          <Link className="tk-counter-button-active" to="/appointments">
                            View
                          </Link>
                        </div>
                      </div>
                      <h3 className="tk-counter-value">
                        <span className="counter-value" data-count="0">
                          {userType === 'expert' ? totalAppointments : null}
                        </span>
                      </h3>
                      <strong> {userType === 'user' ? 'Upcoming Appointments' : 'Total Appointments'} </strong>
                      <div className="tk-icon-watermark">
                        <i className="bi bi-watch"></i>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="tk-counter-contant">
                      <div className="tk-counter-icon-button">
                        <div className="tk-icon-red">
                          <i
                            className="bi bi-x-square"
                            style={{ color: "#EF4444" }}
                          ></i>
                        </div>
                        <div className="tk-counter-button">
                          <Link className="tk-counter-button-active" to="/appointments">
                            View
                          </Link>
                        </div>
                      </div>
                      <h3 className="tk-counter-value">
                        <span className="counter-value" data-count="0">
                          {cancelledAppointments}
                        </span>
                      </h3>
                      <strong>Cancelled Appointments</strong>
                      <div className="tk-icon-watermark">
                        <i className="bi bi-x-square"></i>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="tk-counter-contant">
                      <div className="tk-counter-icon-button">
                        <div className="tk-icon-purple">
                          <i
                            className="bi bi-briefcase"
                            style={{ color: "#6366F1" }}
                          ></i>
                        </div>
                        <div className="tk-counter-button">
                          <Link className="tk-counter-button-active" to="/calllogs">
                            View
                          </Link>
                        </div>
                      </div>
                      <h3 className="tk-counter-value">
                        <span className="counter-value" data-count="0">
                          0
                        </span>
                      </h3>
                      <strong> Calls Logs </strong>
                      <div className="tk-icon-watermark">
                        <i className="bi bi-briefcase"></i>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="tk-counter-contant">
                      <div className="tk-counter-icon-button">
                        <div className="tk-icon-orange">
                          <i
                            className="bi bi-clock"
                            style={{ color: "#F97316" }}
                          ></i>
                        </div>
                        <div className="tk-counter-button">
                          <Link className="tk-counter-button-active" to="/transactions">
                            View
                          </Link>
                        </div>
                      </div>
                      <h3 className="tk-counter-value">
                        <span className="counter-value" data-count="0">
                          0
                        </span>
                      </h3>
                      <strong>Pending Transactions</strong>
                      <div className="tk-icon-watermark">
                        <i className="bi bi-clock"></i>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="tk-counter-contant">
                      <div className="tk-counter-icon-button">
                        <div className="tk-icon-orange">
                          <i
                            className="bi bi-clock"
                            style={{ color: "#F97316" }}
                          ></i>
                        </div>
                        <div className="tk-counter-button">
                          <Link className="tk-counter-button-active" to="/transactions">
                            View
                          </Link>
                        </div>
                      </div>
                      <h3 className="tk-counter-value">
                        <span className="counter-value" data-count="0">
                          {pendingAppointments}
                        </span>
                      </h3>
                      <strong>Pending Appointments</strong>
                      <div className="tk-icon-watermark">
                        <i className="bi bi-clock"></i>
                      </div>
                    </div>
                  </li>

                </ul>
              </div>
            </div>
            <div className="col-xl-4 col-lg-5 col-md-12">
              <div className="tk-seller-aside">
                <ul className="tk-aside-list">


                  <li className="w-100">
                    <div className="tk-list-detail tk-bglightgreen">
                      <div className="tk-list-name">
                        <div className="tk-list-icon tk-list-icon-green">
                          <i className="text-dark bi bi-bag"></i>
                        </div>
                        <div className="tk-list-heading" id="withdraw_amount">
                          <h5>${authUser?.total_withdrawal}</h5>
                          <div className="tk-income-detail">
                            <p>Funds withdraw</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="w-100">
                    <div className="tk-list-detail tk-bglightwheat">
                      <div className="tk-list-name">
                        <div className="tk-list-icon tk-list-icon-yellow">
                          <i className="text-dark bi bi-briefcase"></i>
                        </div>
                        <div className="tk-list-heading" id="available_balance">
                          <h5>${authUser?.user?.wallet}</h5>
                          <div className="tk-income-detail">
                            <p>Funds available in wallet</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {
          userType == 'expert' ? (
            <div className="container">
              <div className="row">
                <div className="col-lg-8 gy-4">
                  <div className="tk-seller-graph">
                    <div className="tb-dhb-mainheading tk-emptyheading">
                      <div className="tb-tabfiltertitle">
                        <h5>Clients</h5>
                      </div>
                    </div>
                    <div className="tk-themeschart">
                      <BarsDataset />
                    </div>
                  </div>

                </div>
                <div className="col-lg-4 gy-4">
                  <div className="tk-paymentways tk-project-box">
                    <div className=" tk-projectboxinner">
                      <div className="tk-seller-details">
                        <div className="tk-seller-heading">
                          <div className="tk-seller-name"></div>
                        </div>
                      </div>
                      <h5>Setup payouts Methods</h5>
                    </div>
                    <Link to="/add-wallet" className="tk-withdraw-button tk-withdrawamt">
                      <b>Withdraw now </b>
                    </Link>
                  </div>
                  <div className="tk-paymentways tk-project-box">
                    <div className=" tk-projectboxinner">
                      <ActiveSubscriptionCard profileData={authUserSubscriptions?.userPromotePackageDuration} />
                    </div>
                    {/* <Link to="/add-wallet" className="tk-withdraw-button tk-withdrawamt">
                    <b>Withdraw now </b>
                  </Link> */}
                  </div>

                  <div className="tk-advertisment-area"></div>
                </div>
              </div>
            </div>
          ) : (<div> </div>)
        }

      </section>
      {/* <FixedBottomNavigation /> */}
      <Footer />
    </div>
  );
}

export default Dashboard;

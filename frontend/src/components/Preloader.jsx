import React from 'react'
import loader from '../assets/svg/Preloader.svg'
function Preloader() {
  return (
    <div style={{height:'100vh',display :'flex',justifyContent : 'center',alignItems : 'center',opacity :"0.9"}}>
        <img src={loader} alt="" />
    </div>
  )
}


export default Preloader
// import React, { useState } from 'react';

// function Wizard() {
//   const [current, setCurrent] = useState(1);
//   const steps = 4;

//   const setProgressBar = (curStep) => {
//     const percent = ((100 / steps) * curStep).toFixed();
//     document.querySelector(".progress-bar").style.width = percent + "%";
//   };

//   const handleNextClick = () => {
//     const current_fs = document.querySelector(".step-" + current);
//     const next_fs = document.querySelector(".step-" + (current + 1));

//     document.querySelector("#progressbar li:nth-child(" + (current + 1) + ")").classList.add("active");

//     next_fs.style.display = "block";
//     let opacity = 1;

//     const animationInterval = setInterval(() => {
//       opacity -= 0.05;
//       current_fs.style.opacity = opacity;
//       next_fs.style.opacity = 1 - opacity;
//       if (opacity <= 0) {
//         clearInterval(animationInterval);
//         current_fs.style.display = "none";
//       }
//     }, 50);

//     setProgressBar(current + 1);
//     setCurrent(current + 1);
//   };

//   const handlePreviousClick = () => {
//     const current_fs = document.querySelector(".step-" + current);
//     const previous_fs = document.querySelector(".step-" + (current - 1));

//     document.querySelector("#progressbar li:nth-child(" + current + ")").classList.remove("active");

//     previous_fs.style.display = "block";
//     let opacity = 1;

//     const animationInterval = setInterval(() => {
//       opacity -= 0.05;
//       current_fs.style.opacity = opacity;
//       previous_fs.style.opacity = 1 - opacity;
//       if (opacity <= 0) {
//         clearInterval(animationInterval);
//         current_fs.style.display = "none";
//       }
//     }, 50);

//     setProgressBar(current - 1);
//     setCurrent(current - 1);
//   };
//   return (
//     <>
//       <div className="progress">
//         <div className="progress-bar"></div>
//       </div>
//       <div className="container-fluid">
//         <div className="row justify-content-center">
//           <div className="col-11 col-sm-10 col-md-10 col-lg-6 col-xl-5 text-center p-0 mt-3 mb-2">
//             <div className="card px-0 pt-4 pb-0 mt-3 mb-3">
//               <h2 id="heading">Sign Up Your User Account</h2>
//               <p>Fill all form fields to go to the next step</p>
//               <div id="msform">
//                 <ul id="progressbar">
//                   <li className="active" id="account"><strong>Account</strong></li>
//                   <li id="personal"><strong>Personal</strong></li>
//                   <li id="payment"><strong>Image</strong></li>
//                   <li id="confirm"><strong>Finish</strong></li>
//                 </ul>
//                 <div className="progress">
//                   <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuemin="0" aria-valuemax="100"></div>
//                 </div>
//                 <fieldset className={"step step-" + current}>
//                   <div className="form-card">
//                     <div className="row">
//                       <div className="col-7">
//                         <h2 className="fs-title">Account Information:</h2>
//                       </div>
//                       <div className="col-5">
//                         <h2 className="steps">Step 1 - 4</h2>
//                       </div>
//                     </div>
//                     <label className="fieldlabels">Email: *</label>
//                     <input type="email" name="email" placeholder="Email Id" />
//                     <label className="fieldlabels">Username: *</label>
//                     <input type="text" name="uname" placeholder="UserName" />
//                     <label className="fieldlabels">Password: *</label>
//                     <input type="password" name="pwd" placeholder="Password" />
//                     <label className="fieldlabels">Confirm Password: *</label>
//                     <input type="password" name="cpwd" placeholder="Confirm Password" />
//                   </div>
//                   <input type="button" name="next" className="next action-button" value="Next" />
//                 </fieldset>
//                 <fieldset className={"step step-" + (current + 1)}>
//                   <div className="form-card">
//                     <div className="row">
//                       <div className="col-7">
//                         <h2 className="fs-title">Personal Information:</h2>
//                       </div>
//                       <div className="col-5">
//                         <h2 className="steps">Step 2 - 4</h2>
//                       </div>
//                     </div>
//                     <label className="fieldlabels">First Name: *</label>
//                     <input type="text" name="fname" placeholder="First Name" />
//                     <label className="fieldlabels">Last Name: *</label>
//                     <input type="text" name="lname" placeholder="Last Name" />
//                     <label className="fieldlabels">Contact No.: *</label>
//                     <input type="text" name="phno" placeholder="Contact No." />
//                     <label className="fieldlabels">Alternate Contact No.: *</label>
//                     <input type="text" name="phno_2" placeholder="Alternate Contact No." />
//                   </div>
//                   <input type="button" name="next" className="next action-button" value="Next" />
//                   <input type="button" name="previous" className="previous action-button-previous" value="Previous" />
//                 </fieldset>
//                 <fieldset className={"step step-" + (current + 1)}>
//                   <div className="form-card">
//                     <div className="row">
//                       <div className="col-7">
//                         <h2 className="fs-title">Image Upload:</h2>
//                       </div>
//                       <div className="col-5">
//                         <h2 className="steps">Step 3 - 4</h2>
//                       </div>
//                     </div>
//                     <label className="fieldlabels">Upload Your Photo:</label>
//                     <input type="file" name="pic" accept="image/*" />
//                     <label className="fieldlabels">Upload Signature Photo:</label>
//                     <input type="file" name="pic" accept="image/*" />
//                   </div>
//                   <input type="button" name="next" className="next action-button" value="Submit" />
//                   <input type="button" name="previous" className="previous action-button-previous" value="Previous" />
//                 </fieldset>
//                 <fieldset>
//                   <div className="form-card">
//                     <div className="row">
//                       <div className="col-7">
//                         <h2 className="fs-title">Finish:</h2>
//                       </div>
//                       <div className="col-5">
//                         <h2 className="steps">Step 4 - 4</h2>
//                       </div>
//                     </div>
//                     <br /><br />
//                     <h2 className="purple-text text-center"><strong>SUCCESS !</strong></h2>
//                     <br />
//                     <div className="row justify-content-center">
//                       <div className="col-3">
//                         <img src="https://i.imgur.com/GwStPmg.png" className="fit-image" alt="Success" />
//                       </div>
//                     </div>
//                     <br /><br />
//                     <div className="row justify-content-center">
//                       <div className="col-7 text-center">
//                         <h5 className="purple-text text-center">You Have Successfully Signed Up</h5>
//                       </div>
//                     </div>
//                   </div>
//                 </fieldset>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Wizard;
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function MultiStepp() {
  const [current, setCurrent] = useState(1);

  // Define an array of step content
  const stepsContent = [
    // Step 1 content
    (
      <fieldset className="step step-1">
        {/* Content for step 1 */}
        <div className="form-card">
                    <div className="row">
                      <div className="col-7">
                        <h2 className="fs-title">Account Information:</h2>
                      </div>
                      <div className="col-5">
                        <h2 className="steps">Step 1 - 4</h2>
                      </div>
                    </div>
                    <label className="fieldlabels">Email: *</label>
                    <input type="email" name="email" placeholder="Email Id" />
                    <label className="fieldlabels">Username: *</label>
                    <input type="text" name="uname" placeholder="UserName" />
                    <label className="fieldlabels">Password: *</label>
                    <input type="password" name="pwd" placeholder="Password" />
                    <label className="fieldlabels">Confirm Password: *</label>
                    <input type="password" name="cpwd" placeholder="Confirm Password" />
                  </div>
        {/* Add other fields for step 1 */}
      </fieldset>
    ),

    // Step 2 content
    (
      <fieldset className="step step-2">
        {/* Content for step 2 */}
        <div className="form-card">
                    <div className="row">
                      <div className="col-7">
                        <h2 className="fs-title">Personal Information:</h2>
                      </div>
                      <div className="col-5">
                        <h2 className="steps">Step 2 - 4</h2>
                      </div>
                    </div>
                    <label className="fieldlabels">First Name: *</label>
                    <input type="text" name="fname" placeholder="First Name" />
                    <label className="fieldlabels">Last Name: *</label>
                    <input type="text" name="lname" placeholder="Last Name" />
                    <label className="fieldlabels">Contact No.: *</label>
                    <input type="text" name="phno" placeholder="Contact No." />
                    <label className="fieldlabels">Alternate Contact No.: *</label>
                    <input type="text" name="phno_2" placeholder="Alternate Contact No." />
                  </div>
        {/* Add other fields for step 2 */}
      </fieldset>
    ),

    // Step 3 content
    (
      <fieldset className="step step-3">
        {/* Content for step 3 */}
        <div className="form-card">
                    <div className="row">
                      <div className="col-7">
                        <h2 className="fs-title">Image Upload:</h2>
                      </div>
                      <div className="col-5">
                        <h2 className="steps">Step 3 - 4</h2>
                      </div>
                    </div>
                    <label className="fieldlabels">Upload Your Photo:</label>
                    <input type="file" name="pic" accept="image/*" />
                    <label className="fieldlabels">Upload Signature Photo:</label>
                    <input type="file" name="pic" accept="image/*" />
                  </div>
        {/* Add other fields for step 3 */}
      </fieldset>
    ),

    // Step 4 content
    (
      <fieldset className="step step-4">
        {/* Content for step 4 */}
        <div className="form-card">
                    <div className="row">
                      <div className="col-7">
                        <h2 className="fs-title">Finish:</h2>
                      </div>
                      <div className="col-5">
                        <h2 className="steps">Step 4 - 4</h2>
                      </div>
                    </div>
                    <br /><br />
                    <h2 className="purple-text text-center"><strong>SUCCESS !</strong></h2>
                    <br />
                    <div className="row justify-content-center">
                      <div className="col-3">
                        <img src="https://i.imgur.com/GwStPmg.png" className="fit-image" alt="Success" />
                      </div>
                    </div>
                    <br /><br />
                    <div className="row justify-content-center">
                      <div className="col-7 text-center">
                        <h5 className="purple-text text-center">You Have Successfully Signed Up</h5>
                      </div>
                    </div>
                  </div>
        {/* Add other content for step 4 */}
      </fieldset>
    ),
  ];

  const handleNextClick = () => {
    if (current < stepsContent.length) {
      setCurrent(current + 1);
    }
  };
  const stepNames = ["Account", "Personal", "Image", "Finish"];

  const handlePreviousClick = () => {
    if (current > 1) {
      setCurrent(current - 1);
    }
  };

  return (
    <>
      {/* Your progress bar */}
      <Header />
      <div className="progress">
      <div className="progress-bar" style={{ width: current === 4 ? '100%' : (current - 1) * 25 + '%' }}></div>

      </div>
      
      {/* Display current step content */}
      <div className="container-fluid">
         <div className="row justify-content-center">
           <div className="col-11 col-sm-10 col-md-10 col-lg-6 col-xl-5 text-center p-0 mt-3 mb-2">
             <div className="card p-4  mt-3 mb-3">
             <h2 id="heading">Complete Your Steps </h2>
              <p>Fill all form fields to go to the next step</p>
              <div id="msform">
              <ul id="progressbar">
        {stepNames.map((stepName, index) => (
          <li key={index} id={stepName} className={index < current ? 'active' : ''}>
            <strong>{stepName}</strong>
          </li>
        ))}
      </ul>
      {stepsContent[current - 1]}
      {current < stepsContent.length && (
     <input type="button" name="next" className="next action-button" value="Next" onClick={handleNextClick} />
     )}
       {current > 1 && (
          <input type="button" name="previous" className="previous action-button-previous" value="Previous" onClick={handlePreviousClick} />
        )}

      </div>

      </div>
      </div>
      </div>
      </div>


      <Footer />
    </>
  );
}

export default MultiStepp;



































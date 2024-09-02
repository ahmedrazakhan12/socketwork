import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useFrontEndContext } from "../context/FrontEndContext";

function Faqs() {
  const{
    faqData
  }=useFrontEndContext();
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header start */}
      <Header />
      {/* Header End */}
      <section className="tk-main-section tk-faq-question-section question-search-block__1 mb-4 ">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-10">
              <div className="tk-faq-search text-center">
                <div className="tk-maintitle tk-maintitlevtwo text-center">
                  <h5>Have question in mind?</h5>{" "}
                  <h2>Search from our common FAQs</h2>{" "}
                  <p>
                  At Zyacom, we understand that you may have questions about our products/services, policies, or processes. To make your experience smoother and more informative, we have compiled a comprehensive list of Frequently Asked Questions (FAQs). This section is designed to address common queries and provide clear, concise answers.
                  </p>{" "}
                </div>
              </div>
              <div className="tk-faq-acordian">
                <div className="tk-acoridan_title">
                  <h3>General inquiries FAQ's</h3>
                </div>
                <div className="tk-acordian">
                  <ul id="tk-accordion" className="tk-accordion">
                    {faqData?.map((faq,i)=>(
                        <li key={i}>
                        <div
                          className="tk-accordion_title collapsed"
                          data-bs-toggle="collapse"
                          role="button"
                          data-bs-target={`#collapse_0${i}`}
                          aria-expanded="false"
                        >
                          <h5>{faq.question}</h5>
                        </div>
                        <div
                          className="collapse"
                          id={`collapse_0${i}`}
                          data-bs-parent="#tk-accordion"
                        >
                          <div className="tk-accordion_info tk-accordion_info">
                            <p>
                            {faq.answer}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                   
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <div className="container send-question-block__2 ">
        <div className="row justify-content-center">
          <div className="col-xl-10">
            <div className="tk-question-section">
              <div className="tk-faq-search_title">
                <h5>Did’nt find your question here?</h5>{" "}
                <h2>Send us your question now</h2>{" "}
                <div className="tk-question_desc">
                  <p>
                    Lets send us now
                  </p>
                </div>
              </div>
              <a
                href="#"
                data-bs-toggle="modal"
                data-bs-target="#submitquestion"
                className="tk-btn-solid-lg tk-btn-yellow"
              >
                Submit your question <i className="bi bi-pencil-square"></i>{" "}
              </a>
            </div>
          </div>
        </div>
        <div
          className="modal fade tk-submitquestion "
          id="submitquestion"
          tabIndex="-1"
          aria-hidden="true"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="tk-popup_title">
                <h5>Submit your question</h5>
                <a href="#" data-bs-dismiss="modal">
                  <i className="bi bi-x"></i>
                </a>
              </div>

              <div className="modal-body tk-popup-content">
                <form className="tk-themeform">
                  <fieldset>
                    <div className="tk-themeform__wrap tk-themeform__wrapv2">
                      <div className="form-group">
                        <div className="tk-placeholderholder">
                          <label className="tk-required">Full name</label>
                          <input
                            type="text"
                            placeholder="Enter your full name"
                            className="form-control tk-themeinput "
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="tk-placeholderholder">
                          <label className="tk-required">Email address</label>
                          <input
                            type="email"
                            placeholder="Enter your email address"
                            className="form-control tk-themeinput "
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="tk-placeholderholder">
                          <label className="tk-required">Question subject</label>
                          <input
                            type="text"
                            placeholder="Add subject to your question"
                            className="form-control tk-themeinput "
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <div className="tk-placeholderholder">
                          <label className="tk-required">Description</label>
                          <textarea
                            placeholder="Enter description"
                            className="form-control tk-themeinput "
                          ></textarea>
                        </div>
                      </div>
                      <div className="tk-popup-terms form-group">
                        <div className="tk-form-checkbox">
                          <input
                            className="form-check-input form-check-input-lg"
                            type="checkbox"
                            defaultValue=""
                            id="tk-check"
                          />
                          <label
                            className="form-check-label tk-required"
                            htmlFor="tk-check"
                          >
                            <span>
                              {" "}
                              I have read and agree to all{" "}
                              <a href="#">Terms &amp; conditions</a>
                            </span>
                          </label>
                        </div>
                        <a href="#" className="tk-btn-solid-lg text-white">
                          <span>
                            Submit question now <i className="text-white bi bi-chevron-right"></i>{" "}
                          </span>
                        </a>
                      </div>
                    </div>
                  </fieldset>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <Footer />
    </div>
  );
}

export default Faqs;

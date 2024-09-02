import React from "react";
import Footer from "../components/Footer";
import Header from "./components/Header";

function Bookings() {
  return (
    <div className="min-h-screen bg-gray-100"> 
      <Header />
      <section  class="tk-main-bg tk-main-section">
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div className="tk-dhb-mainheading">
              <h3>Manage Bookings</h3>
              <div className="tk-sortby">
                <div className="tk-actionselect tk-actionselect2">
                  <span>Filter by</span>
                  <div className="tk-select">
                    <select
                      id="tk_gig_type"
                      className="form-control  "
                      tabindex="-1"
                      aria-hidden="true"
                    >
                      <option value="" selected="" data-select2-id="2">
                        {" "}
                       all bookings{" "}
                      </option>
                      <option value="publish" data-select2-id="16">
                        {" "}
                        today bookings{" "}
                      </option>
                      <option value="draft" data-select2-id="17">
                        {" "}
                        upcoming bookings{" "}
                      </option>
                      <option value="draft" data-select2-id="17">
                        {" "}
                        completed bookings{" "}
                      </option>
                    </select>
                    
                  </div>
                </div>
              </div>
            </div>
            <div className="tk-submitreview">
              <figure>
                <img
                  src="https://taskup.wp-guppy.com/images/empty.png"
                  alt="Oh, snap! there is no content to show this time"
                />
              </figure>
              <h4>Oh, snap! there is no content to show this time</h4>
            </div>
          </div>
        </div>
      </div>
      </section>
      <Footer />
    </div>
  );
}

export default Bookings;

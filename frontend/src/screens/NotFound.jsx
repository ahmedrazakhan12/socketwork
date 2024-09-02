import React from "react";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import Header from "../components/Header";

function NotFound() {
  return (
    <div classNameName="min-h-screen bg-gray-100">
      {/* Header start */}
      <Header />
      {/* Header End */}

      <section className="tk-main-section">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-md-8 m-auto">
              <div className="tk-errorpage">
                <figure>
                  <img src="https://taskup.wp-guppy.com/images/error/404.png" />
                </figure>
                <div className="tk-notfound-title">
                  <h2>Oh! Something went wrong</h2>
                  <em>
                    It looks like you came to an unknown galaxy or are lost in
                    nowhere. <Link to="/">Go to Homepage now</Link>
                  </em>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default NotFound;

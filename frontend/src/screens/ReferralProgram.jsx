import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useFrontEndContext } from "../context/FrontEndContext";

function ReferralProgram() {
  const { websiteData} = useFrontEndContext();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header start */}
      <Header />
      {/* Header End */}

      <section className="tk-main-section">
      <div className="container ">
          <div className="row justify-content-center">
            <div className="col-lg-10 col-xl-8">
              <div className="tk-title-centerv2">
                <div
                  className="tk-main-description"
                  dangerouslySetInnerHTML={{
                    __html: websiteData?.refferal_description,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default ReferralProgram;

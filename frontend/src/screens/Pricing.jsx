import React from "react";
import PriceBox from "../Expert/components/PriceBox";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useFrontEndContext } from "../context/FrontEndContext";

function Pricing() {
  const { subscriptionData , websiteData ,AUTHUSER} = useFrontEndContext();
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header start */}
      <Header />
      {/* Header End */}

      <section className=" tk-main-section-two tk-main-sectionv2 tk-categoriessection categories-block__2 pt-0 ">
        <div className="container  mt-4">
          <div className="row justify-content-center">
            <div className="col-lg-10 col-xl-8">
              <div className="tk-title-centerv2">
                <div className="tk-maintitlev2">
                  <span>Let’s Promote Yourself To A Higher Level</span>
                  <h2>{websiteData.pricing_page_heading}</h2>
                  {/* <h2>Subscription Offers</h2>      kitty */}
                </div>
                <div className="tk-main-description">
                  <p>
                  <div className="about__card-text" dangerouslySetInnerHTML={{ __html: websiteData.pricing_page_description }} />

                  </p>
                </div>
              </div>
            </div>
            <div className="price-box-container">
              {subscriptionData.map((pkg, index) => (
                <PriceBox
                  pkgid={pkg.id}
                  title={pkg.name}
                  subtitle={pkg.description}
                  price={pkg.amount}
                  duration={pkg.duration}
                  features={pkg.features}
                  counts={pkg.live_stream_counts}
                  wallet={AUTHUSER?.wallet}
                  isBtn={true}
                />
              ))}
            </div>
          </div>
        </div>
   
      </section>

      <Footer />
    </div>
  );
}

export default Pricing;

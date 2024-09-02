import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useFrontEndContext } from "../context/FrontEndContext";

function Privacy() {
  const { websiteData} = useFrontEndContext();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header start */}
      <Header />
      {/* Header End */}

      <section className="tk-main-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              {websiteData ? (
                <div dangerouslySetInnerHTML={{ __html: websiteData?.privacy_policy }} />

              ):(<p>Loading...</p> ) }

             
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

const TermsAndConditionsDataCompo = ({ data }) => {
  return (
    <div >
      {data.map((section, index) => (
        <div key={index} className="mt-4">
          <h4>
            <strong>{section.title}</strong>
          </h4>
          <p>{section.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Privacy;

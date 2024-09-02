import React from "react";
import LiveStreamItem from "../Expert/components/LiveStreamItem";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useFrontEndContext } from "../context/FrontEndContext";

function LiveStreams() {
  const { liveStreams } = useFrontEndContext();
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header start */}
      <Header />
      {/* Header End */}
      <section className="tk-main-section">
        <div className="container" data-select2-id="279">
          <div className="row">
            <div className="col-lg-12">
              <div className="tk-sort"></div>
            </div>
            {liveStreams.length > 0 ? (
              liveStreams
                .slice(0, 8)
                .map((singleData, index) => (
                  <LiveStreamItem singleData={singleData} key={index} />
                ))
            ) : (
              <p
                style={{
                  fontSize: "2rem",
                  // height: "100vh",
                  textAlign: "center",
                }}
              >
                Currently, No Experts Are Live!
              </p>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default LiveStreams;

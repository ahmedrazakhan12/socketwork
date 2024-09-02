import React, { useState } from "react";
import { baseUrlImage } from "../Api/BaseApi";
import mainAboutusImage from "../assets/images/aboutus/business-people-teamwork.png";
import Playstoreimg from "../assets/images/aboutus/pngwing.com (1).png";
import Appstoreimg from "../assets/images/aboutus/pngwing.com.png";


import expertGuide from "../assets/images/expert.png";
import Mobilebg from "../assets/images/mobile_bg.jpg";
import journeyImage from "../assets/images/ourjourney.png";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useFrontEndContext } from "../context/FrontEndContext";

function AboutUs() {
  const { websiteData} = useFrontEndContext();

  const [content, setContent] = useState({
    main_paragraph: `Welcome to Zyacom, where innovation meets expertise, creating a transformative platform that
    connects seekers and experts from around the world. At Zyacom, our mission is to empower
    individuals by providing an inclusive space where knowledge knows no bounds.`,
    our_vision: `Zyacom envisions a world where every person, regardless of age, background, or location, can
    share their skills and experiences while seeking guidance from a global community of experts.
    We are dedicated to breaking down barriers and fostering a culture of collaborative learning.`,
    our_journey: `Founded on the principles of transparency, collaboration, and innovation, Zyacom has been
    shaped by a team passionate about revolutionizing the way knowledge is shared. Our
    commitment to creating a semi-decentralized platform aims to combine the strengths of both
    centralized and decentralized systems, ensuring a secure and efficient environment.`,
    founder: `Barbara Jones, the visionary founder of Zyacom, has been the driving force behind our platform.
    Her unwavering dedication and innovative ideas have propelled Zyacom to new heights,
    creating a space where individuals can thrive based on their skills and commitment.`,
    join_us: `Whether you are an expert looking to share your knowledge or someone seeking guidance,
    Zyacom welcomes you to a community built on collaboration, empowerment, and growth.
    Explore Zyacom today and experience a platform where your potential truly matters.`,
    mobile_section_para: `Access expert advice anytime, anywhere with Zyacom
    convenient services. Have a dedicated expert available on
    your phone, ready to assist you whenever you need
    guidance.`,
  });
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header start */}
      <Header />
      {/* Header End */}

      <section className="tk-main-sectionv2 tk-ouraim-section  search-talent-block__1 ">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-10 col-xl-12">
              <div className="tk-title-centerv2">
                <div className="tk-maintitlev2">
                  <h1>About Us</h1>
                </div>
                <div className="tk-main-description">
                  <p>{websiteData?.about_us_subheading}</p>
                </div>
              </div>
            </div>
            <div className="col-xl-7 mt-5">
              <div className="tk-main-title-holder">
                <div className="tk-maintitle">
                  <h2>Our Vision </h2>
                </div>
                <div className="tk-main-description">
                <div className="about__card-text" dangerouslySetInnerHTML={{ __html: websiteData.our_vision_content }} />
                </div>
              </div>
            </div>

            <div className="col-md-12 col-xl-5">
              <div className="tk-about-image">
                <figure>
                {websiteData?.our_vision_image ? (
                <img src={baseUrlImage+websiteData?.our_vision_image} />
              ) : (
                <img src={mainAboutusImage} alt="image" />
              )} 
                  
                </figure>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="tk-main-section pt-0 tk-opportunities-sec opportunities-block__6 tk-opportunity-main">
        <div className="container ">
          <div className="row align-items-center gy-4">
            <div className="col-12 col-xl-6">
              <figure className="tk-motivation_img">
              {websiteData?.our_journey_image ? (
                <img src={baseUrlImage+websiteData?.our_journey_image} />
              ) : (
                <img src={journeyImage} alt="image" />
              )} 
              </figure>
            </div>
            <div className="col-12 col-xl-6">
              <div className="tk-main-title-holder pb-0">
                <div className="tk-maintitle">
                  <h2>Our Journey</h2>
                </div>
                <div className="tk-main-description">
                   <div className="about__card-text" dangerouslySetInnerHTML={{ __html: websiteData.our_journey_content }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <section className="tk-main-section tk-opportunities-sec opportunities-block__6 tk-opportunity-main">
        <div className="container ">
          <div className="row align-items-center gy-4">
            <div className="col-12 col-xl-6">
              <div className="tk-main-title-holder pb-0">
                <div className="tk-maintitle">
                  <h2>Meet Our Founder</h2>
                </div>
                <div className="tk-main-description">
                  <p>{content.founder ?? ""} </p>
                </div>
              </div>
            </div>

            <div className="col-12 col-xl-6">
              <figure className="tk-motivation_img">
                <img src="https://taskup.wp-guppy.com/demo-content/oportuninty.jpg" />
              </figure>
            </div>
          </div>
        </div>
      </section> */}

      <section
        className=" tk-experince-section mobile-app-block__3 "
        style={{
          backgroundImage: `url(${Mobilebg})`,
          backgroundSize: "cover",
        }}
      >
        <div className="tk-ourexperience ">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-12 col-xl-6">
                <div className="tk-main-title-holder tk-sectionapptitle">
                  <div className="tk-maintitle-two">
                    <span> Expert advice anytime anywhere </span>
                    <h2>
                      {" "}
                      <span>Have</span> Expert on your own phone
                    </h2>
                  </div>

                  <div className="tk-main-description">
                    <p>
                      {content.mobile_section_para}
                    </p>
                  </div>

                  <div className="tk-store-content d-flex align-items-center justify-content-start">
                    <a href="#">
                      <img
                        src={Appstoreimg}
                        alt="App store"
                        width={150}
                      />
                    </a>
                    <a href="#" >
                      <img
                        src={Playstoreimg}
                        alt="Play store"
                        width={150}
                      />
                    </a>
                  </div>
                  <div className="tk-appcompat">
                    <h6>
                      <i className="bi bi-bell"></i>This app is compatible with
                      android and iOS devices
                    </h6>
                  </div>
                </div>
              </div>
              <div className="col-md-6 d-xl-block d-none align-self-end">
                <figure className="tk-appiamge">
                  <img src={expertGuide} alt="users image" />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="tk-main-section tk-opportunities-sec opportunities-block__6 tk-opportunity-main">
        <div className="container ">
          <div className="row align-items-center gy-4">
            <div className="col-12 col-xl-12">
              <div className="tk-main-title-holder pb-0 text-center">
                <div className="tk-maintitle mt-3 "></div>
                <div className="tk-main-description">
                  <h2 className="text-center">Join Us</h2>
                  {/* <p>{websiteData?.join_us_content}</p> */}
                  <div className="about__card-text" dangerouslySetInnerHTML={{ __html: websiteData.join_us_content }} />
                </div>
                <strong className="mt-3">
                  Thank you for being a part of the Zyacom journey.
                </strong>{" "}
                <br />
                <strong className="mt-3">
                  Empower, Connect, Thrive - Zyacom.
                </strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER START */}
      <Footer />
      {/* FOOTER END */}
    </div>
  );
}

export default AboutUs;

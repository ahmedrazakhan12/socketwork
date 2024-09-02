import React, { useEffect, useRef, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
// import header from '../assets/images/header.jpg';
import { Skeleton } from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import { baseUrlImage, baseurl } from "../Api/BaseApi";
import PriceBox from "../Expert/components/PriceBox";
import backgroundImage from "../assets/images/IMG_5059_11zon.png";
import android from "../assets/images/android.png";
import cover_placeholder from "../assets/images/coverplaceholder.jpg";
import expertGuide from "../assets/images/expert.png";
import insta from "../assets/images/insta.png";
import ios from "../assets/images/ios.png";
import Mobilebg from "../assets/images/mobile_bg.jpg";
import snap from "../assets/images/sn.png";
import GlobalDialog from "../components/GlobalDialogue";
import JoyCard from "../components/JoyCard";
import BasicRating from "../components/RatingStars";
import SearchBox from "../components/SearchBox";
import { useAppContext } from "../context/AppContext";
import { useFrontEndContext } from "../context/FrontEndContext";
const num = 2;
function Main() {
  useEffect(() => {
    const sections = document.querySelectorAll(".scroll-animation");

    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.2, // Adjust this threshold as needed
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
          observer.unobserve(entry.target);
        }
      });
    }, options);

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, []);
  const OfferItem = ({ iconClass, title, description ,index}) => (
    <div className="col-md-4 col-sm-6" key={index}>
      <div className="item">
        <i className={iconClass}></i>
        <h4>{title}</h4>
      </div>
    </div>
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
  const offers = [
    {
      iconClass: "fas fa-phone",
      title: "Audio Calling",
    },
    {
      iconClass: "fas fa-video",
      title: "Video Calling",
    },
    {
      iconClass: "fas fa-microphone",
      title: "Audio Recorded Messages",
    },
    {
      iconClass: "fas fa-clock",
      title: "Time Scheduling",
    },
    {
      iconClass: "far fa-calendar-check",
      title: "Appointments",
    },
    {
      iconClass: "fas fa-video",
      title: "Live Streaming",
    },

    // Add more items similarly
  ];
  const globalDialogRef = useRef();

  const handleOpenDialog = () => {
    // Call openDialog method using the ref
    globalDialogRef.current.openDialog();
  };
  const globalDialogRef2 = useRef();

  const handleOpenDialog2 = () => {
    // Call openDialog method using the ref
    globalDialogRef2.current.openDialog();
  };

  const {
    categoriesData,
    featuredExperts,
    websiteData,
    subscriptionData,
    profileSubscriptionData,
    testimonials,
  } = useFrontEndContext();
  const { AUTHUSER } = useAppContext();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    axios
      .get(baseurl + "/auth-user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(({ data }) => {
        setCurrentUser(data?.user);
        console.log(data, "  auth-user");
      })
      .catch((error) => {
        console.log(error, " error while fetching the current user");
      });
  }, []);
  const HomePageHeading = ({ heading }) => {
    if (!heading) {
      return null; // If heading is undefined, return nothing
    }
  
    const splitHeading = heading.split(' ');
    const firstThreeWords = splitHeading.slice(0, 3).join(' ');
    const remainingWords = splitHeading.slice(3).join(' ');
  
    return (
      <h1>
        <span className="tk-yellow-clr">{firstThreeWords}</span> {remainingWords}
      </h1>
    );
  };
  
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header start */}
      <Header />
      {/* Header End */}
      <div
        className="tk-bannerv5 header-block__1 "
        style={{
          backgroundImage: `url(${
            websiteData?.banner_top_image
              ? baseUrlImage + websiteData?.banner_top_image
              : backgroundImage
          })`,
        }}
      >
        <div className=" container ">
          <div className="row align-content-center">
            <div className="col-xl-7">
              <div className="tk-banner-content">
                <div className="tk-bannerv3_title" >
                  <h1>
                    {/* <span className="tk-yellow-clr">Zyacom </span>
                    Coming Soon... */}
                    {/* {websiteData?.home_page_top_heading} */}
                  </h1>
                  <HomePageHeading heading={websiteData?.home_page_top_heading} />

                   {/* <h1>
                    <span className="tk-yellow-clr">Top 1% Experts </span>
                     are here to find the right answers for you.
                  </h1>  */}
                
                  <p style={{ fontWeight: "bolder" }}>
                    {/* Anywhere, Anytime get answers to your questions! */}
                    {websiteData?.home_page_top_subheading}
                  </p>
                </div>
                <ul className="tk-themebanner_list">
                  <li>
                    <Link
                      to={"/sign-up"}
                      className="tk-btn-solid-lg tk-btn-yellow"
                    >
                      {websiteData?.home_page_top_btn_1
                        ? websiteData?.home_page_top_btn_1
                        : "Become an Expert"}{" "}
                      <i className="bi bi-briefcase"></i>
                    </Link>
                  </li>
                  <li>
                    <Link to={"/experts"} className="tk-btn-solid-white">
                      {websiteData?.home_page_top_btn_1
                        ? websiteData?.home_page_top_btn_2
                        : "Need an Expert"}{" "}
                      <i className="bi bi-user-check"></i>
                    </Link>
                  </li>
                  <li className="tk-linestyle">
                    <img
                      src="https://taskup.wp-guppy.com/images/line.png"
                      alt="image"
                    />
                    <span>{websiteData?.start_from_here}</span>
                  </li>
                </ul>
                <ul id="tk-counter" className="tk-counter">
                  <li>
                    <h4>{websiteData?.experts_earnings}</h4>
                    <h6>{websiteData?.experts_earning_number}</h6>
                  </li>
                  <li>
                    <h4>{websiteData?.user_satisfaction}</h4>
                    <h6>{websiteData?.user_satisfaction_number}</h6>
                  </li>
                  <li>
                    <h4>{websiteData?.recurring_users}</h4>
                    <h6>{websiteData?.recurring_users_number}</h6>
                  </li>
                </ul>
              </div>
            </div>
            <SearchBox websiteData={websiteData} />
          </div>
        </div>
      </div>

      <section className=" tk-main-section-two tk-main-sectionv2  categories-block__2 pt-0 ">
        <div className="container ">
          <div className="row justify-content-center">
            <div className="col-lg-10 col-xl-8">
              <div className="tk-title-centerv2">
                <div id="popular-categories" className="tk-maintitlev2">
                  <span>
                    {websiteData?.homepage_category_heading
                      ? websiteData?.homepage_category_heading
                      : "Let’s make a quick start today"}
                  </span>
                  <h2>
                    {websiteData?.homepage_category_subheading
                      ? websiteData?.homepage_category_subheading
                      : "Explore Popular Categories"}
                  </h2>
                </div>
                <div className="tk-main-description">
                  <p>
                    {websiteData?.home_category_description
                      ? websiteData?.home_category_description
                      : `the popular categories of Zyacom most explored categories are listed below`}
                    Explore
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-12">
              <div className="tk-category_list">
                <ul className="tk-category_list">
                  {categoriesData ? (
                    categoriesData.slice(0, 8).map((category, index) => (
                      <li key={index} className="tk-category_item">
                        <></>
                        {loading ? (
                          <Skeleton
                            variant="rect"
                            width={"100%"}
                            height={200}
                          />
                        ) : (
                          <Link to={"/experts/?category=" + category?.id}>
                            <img
                              className="tk-category_img"
                              src={baseUrlImage + category.image}
                              alt={category.name}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = cover_placeholder;
                              }}
                            />
                          </Link>
                        )}
                        <div className="tk-category_info">
                          <h5>
                            <a>{category.name}</a>
                          </h5>
                        </div>
                        <ul className="tk-category_childlist">
                          {category.sub_categories
                            ?.slice(0, 4)
                            .map((subcategory, subIndex) => (
                              <Link
                                to={"/experts/?sub_category=" + subcategory?.id}
                              >
                                <li key={subIndex}>
                                  <a>
                                    <span>{subcategory.name}</span>
                                    {/* <em>({`3`})</em> */}
                                    <i className="bi bi-chevron-right"></i>
                                  </a>
                                </li>
                              </Link>
                            ))}
                          {/* <li className="tk-explore-features">
                            <strong>
                              <Link  style={{ color: "#ac04fc" }}>
                                Explore all
                              </Link>
                            </strong>
                          </li> */}
                        </ul>
                      </li>
                    ))
                  ) : (
                    <p>Not Found</p>
                  )}
                </ul>

                <div className="tk-btn2-wrapper">
                  <Link
                    to={"/categories"}
                    className="tk-btn-solid-lg tk-btn-yellow"
                  >
                    Explore All Categories <i className="bi bi bi bi-grid"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="scroll-animation tk-experince-section mobile-app-block__3 "
        style={{
          backgroundImage: `url(${
            websiteData?.home_app_banner_image
              ? baseUrlImage + websiteData?.home_app_banner_image
              : Mobilebg
          })`,
          backgroundSize: "cover",
        }}
      >
        <div className="tk-ourexperience ">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-12 col-xl-6">
                <div className="tk-main-title-holder tk-sectionapptitle">
                  <div className="tk-maintitle-two">
                    <span> {websiteData?.expert_advice_anytime_anywhere} </span>
                    <h2>
                      {" "}
                      {websiteData?.home_app_heading
                        ? websiteData?.home_app_heading
                        : "Have Expert on your own phone"}
                    </h2>
                  </div>

                  <div className="tk-main-description">
                    <p>
                      {websiteData?.home_app_description
                        ? websiteData?.home_app_description
                        : `Access expert advice anytime, anywhere with Zyacom
                      convenient services. Have a dedicated expert available on
                      your phone, ready to assist you whenever you need
                      guidance.`}
                    </p>
                  </div>

                  <div className="tk-store-content">
                    <a>
                      <img
                        src={ios}
                        alt="App store"
                      />
                    </a>
                    <a>
                      <img
                        src={android}
                        alt="Play store"
                      />
                    </a>
                  </div>
                  <div className="tk-appcompat">
                    <h6>
                      <i className="bi bi-bell"></i>
                      {websiteData?.this_app_is_compatible_with_and_ios_devices}
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
      <section className="scroll-animation tk-main-section tk-opportunities-sec opportunities-block__6 tk-opportunity-main pt-4 mt-5">
        <div className="container">
          <div className="row align-items-center gy-4">
            <div className="col-12 col-xl-6">
              <ReactPlayer
                url={`https://zyacom.com/backend/expert.mp4`}
                controls
                width={"100%"}
              />
            </div>
            <div className="col-12 col-xl-5">
              <div className="tk-main-title-holder pb-0">
                <div className="tk-maintitle">
                  <h2>{websiteData?.how_to_become_an_expert} </h2>
                </div>
                <div className="tk-main-description">
                  {/* Zyacom is a platform where there are no limitations for Experts of any kind. Experts of any stage can showcase their skills, experience, and knowledge on Zyacom, and anyone from any country or city can seek help from Experts. */}
                  <p>{websiteData?.become_a_expert} </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className=" tk-main-section-two tk-main-sectionv2 tk-projectsection projects-block__4 pb-1 ">
        <section className="scroll-animation tk-main-section tk-opportunities-sec opportunities-block__6 tk-opportunity-main pt-4 pb-1 mb-5">
          <div className="container">
            <div className="row align-items-center gy-4">
              <div className="col-12 col-xl-6">
                <div className="tk-main-title-holder pb-0">
                  <div className="tk-maintitle">
                    <h2>{websiteData?.how_to_become_a_user}</h2>
                  </div>
                  <div className="tk-main-description">
                    {/* Experts of legal age can showcase their skills */}
                    <p>{websiteData?.become_a_user} </p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-xl-6">
                <ReactPlayer
                  url={"https://zyacom.com/backend/user.mp4"}
                  controls
                  light={false}
                  width={"100%"}
                />
              </div>
            </div>
          </div>
        </section>
        <div className="container  mt-5 mb-5">
          <div className="row justify-content-center">
            <div className="col-sm-12">
              <div className="tk-main-title-holder">
                <div className="tk-maintitle">
                  <h3 className="tk-bold-weight">
                    {websiteData?.want_to_start_working_as_an_expert}{" "}
                    <Link
                      to="/sign-up"
                      style={{
                        textDecoration: "underline",
                        color: "#ac04fc",
                      }}
                    >
                      {websiteData?.sign_up}
                    </Link>{" "}
                    for free
                  </h3>
                  <h2>{websiteData?.featured_experts}</h2>
                </div>
                <div className="tk-btn2-wrapper">
                  <Link to="/experts" className="tk-sectionbtn">
                    {websiteData?.see_more_experts_button}
                    <i className="bi bi bi bi-grid"></i>
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-xl-12">
              <div className="row">
                {featuredExperts?.slice(0, 8)?.map((project, index) => (
                  <div className="col-md-3 col-12 mt-4" key={index}>
                    <div
                      className="card card-expert tk-topservicetask"
                      style={{ width: "100%" }}
                    >
                      <span className="tk-featuretag">Featured</span>
                      <img
                        src={`${baseUrlImage}` + `${project.image}`}
                        className="card-img-top card-img-top-expert "
                        alt="..."
                        style={{ height: "10rem" }}
                      />
                      <div className="card-body">
                        <h5 className="card-title card-title-expert">
                          {project.name}
                        </h5>
                        <BasicRating value={project?.average_rating} />
                        <ul className="tk-template-view justify-content-center">
                          <li>
                            <i className="bi bi-geo-alt"></i>
                            <span>{project.country}</span>
                          </li>
                          <li>
                            <i className="bi bi-geo-alt"></i>
                            <span>{project.state}</span>
                          </li>

                          {project.categories[0] && (
                            <li style={{ width: "145px" }}>
                              <span>{project.categories[0].name}</span>
                            </li>
                          )}

                          {project.sub_categories[0] && (
                            <li>
                              <span>{project.sub_categories[0].name}</span>
                            </li>
                          )}
                        </ul>

                        <Link
                          to={`/view-profile/${project.id}`}
                          className="tk-invite-bidbtn mt-lg-3 mt-0 view-profile-btn "
                        >
                          View Profile
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="scroll-animation tk-main-section tk-opportunities-sec opportunities-block__6 tk-opportunity-main pt-4 pb-4 ">
        <div className="container ">
          <div className="row align-items-center gy-4">
            <div className="col-12 col-xl-6">
              <figure className="tk-motivation_img">
                {websiteData?.why_we_different_image ? (
                  <img
                    src={baseUrlImage + websiteData?.why_we_different_image}
                  />
                ) : (
                  <img src="https://taskup.wp-guppy.com/demo-content/oportuninty.jpg" />
                )}
                {/* <img src="https://taskup.wp-guppy.com/demo-content/oportuninty.jpg" /> */}
                {/* <img src={websiteData?.why_we_different_image} /> */}
              </figure>
            </div>
            <div className="col-12 col-xl-6">
              <div className="tk-main-title-holder pb-0">
                <div className="tk-maintitle">
                  <h5>{websiteData?.why_we_different_heading}</h5>
                  <h2>{websiteData?.why_we_different_subheading}</h2>
                </div>

                <div className="tk-main-description">
                  <p>{websiteData?.why_we_different_description} </p>
                </div>
                <ul className="tk-motivation_list">
                  <li>
                    <span>
                      <i className="bi bi-check"></i>
                      {websiteData?.why_we_different_point1}
                    </span>
                  </li>
                  <li>
                    <span>
                      <i className="bi bi-check"></i>
                      {websiteData?.why_we_different_point2}
                    </span>
                  </li>
                  <li>
                    <span>
                      <i className="bi bi-check"></i>
                      {websiteData?.why_we_different_point3}
                    </span>
                  </li>
                  <li>
                    <span>
                      <i className="bi bi-check"></i>
                      {websiteData?.why_we_different_point4}
                    </span>
                  </li>
                  <li>
                    <span>
                      <i className="bi bi-check"></i>
                      {websiteData?.why_we_different_point5}
                    </span>
                  </li>
                  <li>
                    <span>
                      <i className="bi bi-check"></i>
                      {websiteData?.why_we_different_point6}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className=" tk-main-section-two tk-main-sectionv2  categories-block__2 ">
        <section className="we-offer-area text-center  ">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="tk-title-centerv2">
                  <div className="tk-maintitlev2">
                    <h2 id="special-feature">
                      {websiteData?.zyacom_special_features_heading}
                    </h2>
                  </div>
                  <div className="tk-main-description">
                    <p>{websiteData?.zyacom_special_features_description}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row our-offer-items less-carousel">
              {offers.map((offer, index) => (
                <OfferItem
                  index={index}
                  iconClass={offer.iconClass}
                  title={offer.title}
                  description={offer.description}
                />
              ))}
            </div>
          </div>
        </section>
        <div className="container  mt-4">
          <div className="row justify-content-center">
            <div className="col-lg-10 col-xl-8">
              <div className="tk-title-centerv2">
                <div className="tk-maintitlev2">
                  <span>{websiteData?.subscription_subheading}</span>
                  <h2>{websiteData?.subscription_heading}</h2>
                  {/* <h2>Subscription Offers</h2>      kitty */}
                </div>
                <div className="tk-main-description">
                  <p>{websiteData?.subscription_description}</p>
                </div>
              </div>
            </div>

            <div className="price-box-container">
              {subscriptionData?.map((pkg, index) => (
                <PriceBox
                  pkgid={pkg.id}
                  title={pkg.name}
                  subtitle={pkg.description}
                  price={pkg.amount}
                  duration={pkg.duration}
                  features={pkg?.features}
                  counts={pkg.live_stream_counts}
                  isBtn={true}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      <div className="share d-flex justify-content-center mb-3">
        <GlobalDialog
          ref={globalDialogRef2}
          title="Tell a Friend"
          actions={false}
          size={"xs"}
        >
          <div className="d-flex justify-content-around">
            <FacebookShareButton
              url={"www.zyacom.com"}
              formTarget="target_blank"
            >
              {(shareCount) => (
                <span className="myShareCountWrapper">{shareCount}</span>
              )}
              <FacebookIcon size={50} round={true} />
            </FacebookShareButton>

            <WhatsappShareButton
              url={"www.zyacom.com"}
              quote={"hello this is the zyacom website"}
              hashtag={"sasasasas"}
            >
              {(shareCount) => (
                <span className="myShareCountWrapper">{shareCount}</span>
              )}
              <WhatsappIcon size={50} round={true} />
            </WhatsappShareButton>
            <LinkedinShareButton
              url={"www.zyacom.com"}
              quote={"hello this is the zyacom website"}
              hashtag={"sasasasas"}
            >
              {(shareCount) => (
                <span className="myShareCountWrapper">{shareCount}</span>
              )}
              <LinkedinIcon size={50} round={true} />
            </LinkedinShareButton>
            <a href="https://www.instagram.com/">
              <img
                src={insta}
                style={{ height: "4.5rem", width: "4.5rem" }}
                alt=""
                srcset=""
              />
            </a>

            <a href="https://www.snapchat.com/">
              <img
                src={snap}
                style={{ height: "4rem", width: "4rem" }}
                alt=""
                srcset=""
              />
            </a>
          </div>
          <div className="col-4" style={{ marginTop: "1.4rem" }}></div>
        </GlobalDialog>
      </div>
      <section className="scroll-animation tk-main-section-two tk-main-sectionv2  categories-block__2 pt-0 mt-5">
        <div className="container ">
          <div className="row justify-content-center">
            <div className="col-lg-10 col-xl-8">
              <div className="tk-title-centerv2">
                <div id="sub" className="tk-maintitlev2">
                  <span>{websiteData?.promote_me_subheading}</span>
                  <h2>{websiteData?.promote_me_heading}</h2>
                </div>
                <div className="tk-main-description">
                  <p>{websiteData?.promote_me_description}</p>
                </div>
                <button
                  onClick={() => {
                    if (currentUser && currentUser?.user_type === "expert") {
                      handleOpenDialog();
                      return;
                    }

                    toast.error("Available Only For Expert!");
                  }}
                  className="tk-btn-solid-lg mt-3 text-white"
                  // disabled={!(currentUser?.user_type === "user" && !currentUser)}
                  style={{
                    ...(currentUser &&
                      currentUser?.user_type === "user" && {
                        backgroundColor: "gray",
                        cursor: "not-allowed",
                      }),
                  }}
                  title={
                    currentUser?.user_type === "user"
                      ? "Available Only For expert"
                      : ""
                  }
                  // style={}
                >
                  {websiteData?.promote_me_button}
                </button>
              </div>
            </div>
          </div>
          <GlobalDialog
            ref={globalDialogRef}
            title="Profile Packages"
            actions={false}
            size={"lg"}
          >
            <div className="container">
              <div className="row">
                {profileSubscriptionData.length > 0
                  ? profileSubscriptionData.map((profileData) => (
                      <div className="col-4" key={profileData.id}>
                        <JoyCard
                          profileData={profileData}
                          id={profileData.id}
                          key={profileData.id}
                        />
                      </div>
                    ))
                  : "No packages found"}
              </div>
            </div>
          </GlobalDialog>
        </div>
        <section className="home-testimonial testimonial-section mt-lg-5">
          <div className="container p-3">
            <div
              style={{ gap: "1rem" }}
              className="row testimonial-gridd d-flex justify-content-center testimonial-cards testimonial-pos"
            >
              <div className="tk-title-centerv2">
                <div className="tk-maintitlev2">
                  <span className="text-white">
                    {websiteData?.testimonials_subheading}
                  </span>
                  <h2
                    style={{
                      font: '700 2.25rem/1.2777777778em "Urbanist", sans-serif',
                    }}
                  >
                    {websiteData?.testimonials_heading}
                  </h2>
                </div>
              </div>
            </div>
            <div className="container testimonial-inner">
              <div className="row d-flex justify-content-center">
                {testimonials?.map((data, i) => (
                  <>
                    <div className="col-md-4 style-3" key={i}>
                      <div className="tour-item ">
                        <div className="tour-desc bg-white">
                          <div className="tour-text color-grey-3 text-center">
                            &ldquo;{data.description}&ldquo;
                          </div>
                          <div className="d-flex justify-content-center pt-2 pb-2">
                            <img
                              className="tm-people"
                              src={`${baseUrlImage}` + `${data.image}`}
                              alt=""
                            />
                          </div>
                          <div className="link-name d-flex justify-content-center">
                            {data.title}
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
        </section>
      </section>

      <section className="we-offer-area text-center  mt-3 mb-3">
        <div className="container">
          <div className="row justify-content-center">
            <div className=" col-lg-10 col-xl-8 ">
              <div
                className="tk-title-centerv2"
                dangerouslySetInnerHTML={{
                  __html: websiteData?.tell_friend_description,
                }}
              />
              <button
                onClick={handleOpenDialog2}
                style={{ margin: "0 0 4rem 0" }}
                className="tk-btn-solid-lg text-white"
              >
                {websiteData?.tell_a_friend_button}
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* Footer start */}
      <Footer />
      {/* Footer end */}
    </div>
  );
}

export default Main;

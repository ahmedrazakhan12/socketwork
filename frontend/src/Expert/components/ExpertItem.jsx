import React from "react";
import { Link } from "react-router-dom";
import { baseUrlImage } from "../../Api/BaseApi";
import BasicRating from "../../components/RatingStars";

export default function ExpertItem({ project, isOnline }) {
  return (
    <div>
      <div className="tk-project-wrapper-two tk-find-talent">
        {project.status && (
          <span className="tk-featureditem tippy">
            <i className=" bi bi-zap"></i>
          </span>
        )}
        <div className="tk-projectlisting">
          <div className="tk-price-holder">
            <div style={{ position: "relative" }} className="tk-project-img">
              <img src={`${baseUrlImage}` + `${project.image}`} alt="" />
              {isOnline && (
                <span
                  style={{
                    width: "5px",
                    height: "5px",
                    background: "green",
                    padding: "10px",
                    position: " absolute",
                    bottom: "-5px",
                    left: "-9px",
                    borderRadius: "50%",
                  }}
                ></span>
              )}
              {project?.ad_slot && (
                <div
                  style={{
                    fontSize: "0.8rem",
                    color: "white",
                    width: "1.9rem",
                    // height: "",
                    background: "gold",
                    padding: "0 10px",
                    position: " absolute",
                    top: "-5px",
                    left: "-9px",
                    borderRadius: "0.8rem",
                  }}
                >
                  {project?.ad_slot}
                </div>
              )}
              {project?.isLive ? (
                <div
                  style={{
                    fontSize: "0.8rem",
                    color: "white",
                    width: "2.5rem",
                    // height: "",
                    background: "red",
                    padding: "0 10px",
                    position: " absolute",
                    top: "-5px",
                    left: "-9px",
                    borderRadius: "0.8rem",
                  }}
                >
                  {"Live"}
                </div>
              ) : null}
            </div>

            <div className="">
              <Link
                to={`/experts`}
                style={{
                  textTransform: "capitalize",
                  fontSize: "18px",
                  fontWeight: "bold",
                }}
              >
                {project.name}
                {project.identity_verified === "1" && (
                  <i className="bi bi-check-circle tk-theme-tooltip tippy"></i>
                )}
              </Link>
              {project.bio && (
                <h5>
                  {project.bio.length > 50
                    ? project.bio.substring(0, 100) + "..."
                    : project.bio}
                </h5>
              )}
              <div className="tk-template-view">
                <BasicRating value={project.average_rating} />
                {!!project?.country ? (
                  <li>
                    <i className="bi bi-geo-alt"></i>
                    <span>{project.country}</span>
                  </li>
                ) : null}
                {!!project?.state ? (
                  <li>
                    <i className="bi bi-geo-alt"></i>
                    <span>{project.state}</span>
                  </li>
                ) : null}
                {!!project?.city ? (
                  <li>
                    <i className="bi bi-geo-alt"></i>
                    <span>{project.city}</span>
                  </li>
                ) : null}
              </div>
              <ul className="tk-template-view">
                {project?.languages &&
                  project?.languages?.map((cat, index) => (
                    <li key={index}>
                      <span>{cat.name}</span>
                    </li>
                  ))}
              </ul>
              <div>
                <ul className="tk-template-view">
                  <li>
                    <i className="bi bi-chat"></i>
                    <span>
                      {"reviews: "}&nbsp; {project.user_reviews_count}{" "}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="tk-price">
              <h4>
                {"$" + project.hourly_rate}
                <sup>/hourly</sup>
              </h4>
              <div className="tk-project-option">
                <Link
                  to={`/view-profile/${project.id}`}
                  className="tk-invite-bidbtn"
                >
                  View Profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

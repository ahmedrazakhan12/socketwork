import { Button, Tooltip } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { baseUrlImage } from "../../Api/BaseApi";
import cover_placeholder from "../../assets/images/coverplaceholder.jpg";

function LiveStreamItem({ singleData, key }) {
  const AUTHUSER = JSON.parse(localStorage.getItem("user"));
  return (
    <>
      <div id="gig_48" className="col-sm-12 col-md-6 col-lg-3" key={key}>
        <div className="tk-topservicetask">
          <figure className="tk-card__img">
            <a href="#">
              <img
                src={`${baseUrlImage}` + `${singleData.image}`}
                alt={singleData.name}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = cover_placeholder;
                }}
              />
            </a>
          </figure>

          <span className="tk-featuretag">Live</span>
          <div className="tk-sevicesinfo">
            <div className="tk-category_info">
              <h5 className="border-bottom border-1 pb-2">
                <a href="#">{singleData.name}</a>
              </h5>
              <h6>
                <a href="#">{singleData.live_stream.title}</a>
              </h6>
            </div>
            <ul className="tk-category_childlist">
              <li>
                <a href="#">
                  Price <span>${singleData.live_stream.price}</span>
                </a>
              </li>

              {AUTHUSER?.user_type !== "expert" ? (
                <Link
                  className="btn btn-primary text-center w-100 p-2"
                  target="_blank"
                  to={`${window.origin}/room/${singleData.live_stream.id}/user`}
                  style={{
                    color: "#fff !important",
                    backgroundColor: "#ac04fc",
                    border: "none",
                  }}
                >
                  Join
                </Link>
              ) : (
                <Tooltip title="Available Only For Users" placement="bottom">
                  <div className="justify-content-center d-flex">
                    <Button
                      variant="contained"
                      color="primary"
                      className="tk-btn-yellow-lg w-100"
                      // style={{ marginTop: `${isBtn ? '45px' : ''}` }}
                      disabled
                    >
                      Join
                    </Button>
                  </div>
                </Tooltip>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default LiveStreamItem;

import { Button, Pagination, Skeleton, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";

import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { baseUrlImage } from "../Api/BaseApi";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useFrontEndContext } from "../context/FrontEndContext";
import { placeHolderImage } from "../utils/constants";
import {
  fetchBlogs,
  formatDate,
  mapToObject,
  truncate,
} from "../utils/helpers";
import "./blogs.css";

export const posts = [
  {
    id: 1,
    title: "Space X Crashes",
    description: "In the recent some years, tehuteum teuhe ueu  ueu",
  },
  {
    id: 2,
    title: "Nasa is planing to...",
    description: "Lorem ipsum dolor sit amet amet doloro etuhu uhtem",
  },
  {
    id: 3,
    title: "Iran Attacks is...",
    description: "Consectetur adipiscing elit",
  },
];
export const recommendedTopics = [
  "Space X",
  "Nasa",
  "Space Technology",
  "Web Development",
  "Productivity",
  "Engineering",
  "Health",
  "Science",
  "Space X",
  "Nasa",
  "Space Technology",
  "Web Development",
  "Productivity",
  "Engineering",
  "Health",
  "Science",
];
export default function MyBlogs() {
  const [Blogs, setBlogs] = useState(null);
  const [Busy, setBusy] = useState(false);
  const nav = useNavigate();
  const [page, setPage] = React.useState(1);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const params = mapToObject(searchParams);
  const { websiteData } = useFrontEndContext();
  useEffect(() => {
    console.log("useEffect", params);
    async function fn() {
      try {
        setBusy(true);

        const data = await fetchBlogs(page, params?.search ?? "");

        setBlogs(data);
      } catch (error) {
        toast.error("Api-Error While Fetching Blogs");
        setBlogs([]);
        setBusy(false);
      }

      setBusy(false);
    }

    fn();
  }, [page, params?.search]);

  return (
    <>
      <Header />
      <div class="container pt-4" style={{ minHeight: "40rem" }}>
        <div className="row">
          {/* <h1 class="my-4">Explore The Blogs</h1> */}
          <div className="col-lg-12">
            {/* <img
              alt="Featured Post"
              className="  h-[400px] object-cover rounded-lg rounded"
              height={600}
              onError={(e) => (e.target.src = placeHolderImage)}
              src={websiteData?.blogs_banner_image || placeHolderImage}
              style={{
                aspectRatio: "1200/600",
                width: "100%",
                objectFit: "cover",
              }}
              width={1200}
            /> */}
<div class="header-blog" style={{backgroundImage:'linear-gradient(#040205a3, #4a0f6280), url(https://polydate.gmgsolution.com/public/uploads/configs/1718279794.png)'}} >
<h1 className="header-blog-heading">Read Our Blog</h1>
    </div>
            {!Busy && Blogs?.data?.length == 0 ? null : (
              <h2 style={{ margin: "2rem 0" }}>Popular Posts</h2>
            )}
            {/* {Busy && <h4>Loading...</h4>} */}
            <div className="row gap-3">
              {!Busy && Blogs?.data?.length == 0 ? (
                <div
                  style={{
                    fontSize: "30px",
                    display: "flex",
                    justifyContent: "center",
                    height: "10rem",
                    margin: "7rem 0 0 0"
                  }}
                >
                  No Blogs Found!
                </div>
              ) : null}

              {!Busy &&
                Blogs &&
                Blogs?.data?.map((blog, index) => (
                  <BlogCard key={"blog-card-" + index} {...blog} />
                ))}
              {Busy && (
                <div className="row gap-3" style={{ marginBottom: "4rem" }}>
                  {" "}
                  {[0, 0, 0].map((blog, index) => (
                    <Skeleton
                      variant="rectangular"
                      className="rounded"
                      width={295}
                      height={500}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* <Sidebar /> */}
        </div>
      </div>

      {!Busy && Blogs?.data?.length == 0 ? null : (
        <div className="d-flex justify-content-center my-4 pb-4">
          <Stack spacing={4} className="pb-4 mb-4">
            <Pagination
              variant="text"
              onChange={(e, value) => {
                console.log(value);
                setPage(value);
              }}
              count={Blogs?.last_page}
              color="secondary"
              size="large"
            />
          </Stack>
        </div>
      )}
      <Footer />
    </>
  );
}

function BlogCard({ title, content, created_at, image, id }) {
  const nav = useNavigate();
  return (
    <div
      class="col-md-6 col-lg-4 my-4 blog-card rounded"
      onClick={() => nav("/blogs/" + id)}
      style={{ width: "19rem" }}
    >
      {" "}
      <div class="">
        <img
          onError={(e) => (e.target.src = placeHolderImage)}
          src={`${
            baseUrlImage + image ||
            "https://dummyimage.com/600x400/c4c4c4/fff&text=No+Image+found"
          }`}
          style={{ height: "15rem" }}
          className="rounded"
        />
        <div class="pt-3">
          {/* <span style={{ background: "#9C27B0", padding: "0.3rem 0.8rem", fontSize: "0.8rem", borderRadius: "3rem", color: "white" }}>Category</span> */}
          <h5 class="mt-2" style={{ fontSize: "1.5rem" }}>
            {truncate(title, 16)}
          </h5>
          <span className="post-date">{formatDate(created_at)}</span>
          {/* <p >{truncate(content, 30)}</p> */}
          <p
            class="post-card-description"
            dangerouslySetInnerHTML={{ __html: truncate(content, 30) }}
          />

          <Button
            onClick={() => nav("/blogs/" + id)}
            variant="contained"
            color="secondary"
          >
            Read More
          </Button>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "3rem",
              paddingBottom: "1rem",
            }}
            className="blog-bottom"
          >
            <div className=""></div>
          </div>
        </div>
      </div>
    </div>
  );
}

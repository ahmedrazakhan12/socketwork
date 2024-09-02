import React, { useEffect, useState } from "react";
import { posts, recommendedTopics } from "./MyBlogs";
import { placeHolderImage } from "../utils/constants";
import { useLocation, useNavigate } from "react-router-dom";
import { mapToObject } from "../utils/helpers";

export default function Sidebar() {
  const nav = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const params = mapToObject(searchParams);

  return (
    <>
      <div
        className="col-lg-3 rounded px-3"
        style={{
          background: "#f2f2f2",
          border: "1px solid rgb(225, 225, 225)",
        }}
      >
        <h4 class="my-4">Search Posts</h4>
        <form
          style={{ border: "1px solid #9C27B0" }}
          onSubmit={(e) => {
            e.preventDefault();
            const fd = new FormData(e.target);
            const search_query = fd.get("search_query")?.toString() || "";
            nav("/blogs/?search=" + search_query);
          }}
          onChange={(e) => {
            nav("/blogs?search=" + e.target.value);
          }}
          className="bg-white d-flex justify-content-center align-items-center gap-2 rounded"
        >
          <input
            type="text"
            name="search_query"
            placeholder="Search The Blogs..."
            className="px-2 py-3 rounded"
            style={{ width: "100%" }}
            id=""
          />
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              style={{ height: "1.2rem", paddingRight: "0.6rem" }}
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </span>
        </form>
        <div className="categories  pt-3">
          <h5 className="">Categories</h5>
          <div className="categories-list" style={{ fontSize: "0.8rem" }}>
            <div
              style={{ cursor: "pointer" }}
              className="category-item category-item d-flex justify-content-between"
            >
              <span>All </span>
              <span>300+</span>
            </div>
            <div
              style={{ cursor: "pointer" }}
              className="category-item category-item d-flex justify-content-between"
            >
              <span>Web And App Development</span>
              <span>23</span>
            </div>
            <div
              style={{ cursor: "pointer" }}
              className="category-item category-item d-flex justify-content-between"
            >
              <span>Health And Science</span>
              <span>234</span>
            </div>
            <div
              style={{ cursor: "pointer" }}
              className="category-item category-item d-flex justify-content-between"
            >
              <span>Space Technology</span>
              <span>3</span>
            </div>
            <div
              style={{ cursor: "pointer" }}
              className="category-item category-item d-flex justify-content-between"
            >
              <span>Health And Science</span>
              <span>3</span>
            </div>
            <div
              style={{ cursor: "pointer" }}
              className="category-item category-item d-flex justify-content-between"
            >
              <span>Productivity And Engineering</span>
              <span>6</span>
            </div>
            <div
              style={{ cursor: "pointer" }}
              className="category-item category-item d-flex justify-content-between"
            >
              <span>Nasa News</span>
              <span>66</span>
            </div>
            <div
              style={{ cursor: "pointer" }}
              className="category-item category-item d-flex justify-content-between"
            >
              <span>Current Affairs</span>
              <span>2 </span>
            </div>
          </div>
        </div>
        <div className="posts-list mt-4">
          <h5>Popular Posts</h5>

          <div className="">
            {posts.map((item) => (
              <div
                key={item.id}
                style={{ borderBottom: "1px solid #E1E1E1" }}
                className="py-1 postlist-item d-flex gap-2 align-items-center"
              >
                <img
                  src={placeHolderImage}
                  style={{ height: "6rem", width: "6rem" }}
                />
                <div className="py-2">
                  <h6 style={{ margin: 0 }}>{item.title}</h6>
                  <p style={{ fontSize: "0.8rem", color: "gray" }}>
                    {item.description}
                  </p>
                </div>
              </div>
            ))}

            <div className="pt-5">
              <h5>Recommended Topics</h5>

              <div className="recomended-topics d-flex justify-content-center flex-wrap">
                {recommendedTopics.map((topic, index) => (
                  <span key={index} className="recommended-topic">
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

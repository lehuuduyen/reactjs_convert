import React, { Component, useEffect, useState } from "react";
import { FaHome, FaInfo } from "react-icons/fa";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { API_BACKEND } from "../helper/config";
import axios from "axios";

function Detail() {
  const [data, setData] = useState({});

  useEffect(() => {
    const slug = window.location.pathname.split("/")[2];
    const url = API_BACKEND + `post/${slug}`;
    axios
      .get(url)
      .then((res) => {
        const { data, message, error } = res.data;
        if (!error) {
          setData(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <section class="blog_area single-post-area all_post section_padding">
      <div class="container">
        <div class="row">
          <div class="col-lg-9 posts-list">
            <div class="single-post">
              <div class="feature-img">
                <img class="img-fluid" src={data.thumbnail} alt="" />
              </div>
              <div class="blog_details">
                <h1>{data.title}</h1>
                <div
                  dangerouslySetInnerHTML={{
                    __html: data.content.replace(
                      /\r\n\r\n/g,
                      "<br />"
                    ),
                  }}
                >
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-3">
            <div class="sidebar_widget">
              <div class="single_sidebar_wiget">
                <div class="sidebar_tittle">
                  <h3>Popular Feeds</h3>
                </div>
                <div class="single_catagory_post post_2 ">
                  <div class="category_post_img">
                    <img
                      src="https://themewagon.github.io/lifeleck/img/sidebar/sidebar_1.png"
                      alt=""
                    />
                  </div>
                  <div class="post_text_1 pr_30">
                    <a href="single-blog.html">
                      <h3>Subdue lesser beast winged bearing meat tree one</h3>
                    </a>
                    <p>
                      <span> By Michal</span> / March 30
                    </p>
                  </div>
                </div>
                <div class="single_catagory_post post_2 ">
                  <div class="category_post_img">
                    <img
                      src="https://themewagon.github.io/lifeleck/img/sidebar/sidebar_2.png"
                      alt=""
                    />
                  </div>
                  <div class="post_text_1 pr_30">
                    <a href="single-blog.html">
                      <h3>Subdue lesser beast winged bearing meat tree one</h3>
                    </a>
                    <p>
                      <span> By Michal</span> / March 30
                    </p>
                  </div>
                </div>
                <div class="single_catagory_post post_2">
                  <div class="category_post_img">
                    <img
                      src="https://themewagon.github.io/lifeleck/img/sidebar/sidebar_3.png"
                      alt=""
                    />
                  </div>
                  <div class="post_text_1 pr_30">
                    <a href="single-blog.html">
                      <h3>Subdue lesser beast winged bearing meat tree one</h3>
                    </a>
                    <p>
                      <span> By Michal</span> / March 30
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Detail;

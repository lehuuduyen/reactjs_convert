import React, { Component, useEffect, useState } from "react";
import { FaHome, FaInfo } from "react-icons/fa";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { API_BACKEND, IMAGE_EMPTY } from "../helper/config";
import axios from "axios";
import { Col, Image, Row } from "antd";

function DetailNews() {
  const [data, setData] = useState({});
  const [dataPopular, setDataPopular] = useState([]);

  useEffect(() => {
    const slug = window.location.pathname.split("/")[2];
    const url = API_BACKEND + `news/${slug}`;
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
  useEffect(() => {
    const urlPopular = API_BACKEND + `call-news-popular`;
    axios
      .get(urlPopular)
      .then((res) => {
        const { data, message, error } = res.data;
        if (!error) {
          setDataPopular(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <Row>
      <Col className="gutter-row" span={3}></Col>
      <Col
        class="blog_area single-post-area all_post section_padding"
        span={18}
      >
        <div class="">
          <div class="row">
            <div class="col-lg-8 posts-list" style={{ marginBottom: "50px" }}>
              <div class="single-post">
                <div class="blog_details">
                  <h1
                    dangerouslySetInnerHTML={{
                      __html: data.title,
                    }}
                  ></h1>
                  <span>{data.date}</span>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: data.content,
                    }}
                  ></div>
                </div>
              </div>
            </div>

            <div class="col-lg-3">
              <div class="sidebar_widget" style={{ paddingLeft: 20 }}>
                <div class="single_sidebar_wiget">
                  <div class="sidebar_tittle">
                    <h2 style={{ color: "orange" }}>Tin nổi bật</h2>
                  </div>
                  {dataPopular &&
                    dataPopular.map((item, id) => {
                      return (
                        <>
                          <div class="single_catagory_post post_2 ">
                            <div class="category_post_img">
                              <Link
                                to={`/news/${item.slug}`}
                               
                              >
                                <img
                                  src={
                                    item.urlToImage
                                      ? item.urlToImage
                                      : IMAGE_EMPTY
                                  }
                                  alt=""
                                />
                              </Link>
                            </div>
                            <br />
                            <div class="post_text_1 pr_30">
                              <Link
                                to={`/news/${item.slug}`}
                                
                              >
                                <h3>{item.title}</h3>
                              </Link>
                              <Link
                                to={`/news/${item.slug}`}
                                className="a_un_underline"
                              >
                                <span> {item.date}</span>
                              </Link>
                            </div>
                          </div>
                          <hr></hr>

                          <br></br>
                        </>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Col>
      <Col className="gutter-row" span={3}></Col>
    </Row>
  );
}

export default DetailNews;

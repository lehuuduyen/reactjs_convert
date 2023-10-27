import React, {  useEffect, useState } from "react";
import { API_BACKEND, IMAGE_EMPTY } from "../helper/config";
import axios from "axios";
import { Col, Image, Row } from "antd";
import { Link, useNavigate } from "react-router-dom";

function Detail() {
  const [data, setData] = useState({});
  const [dataPopular, setDataPopular] = useState([]);
  const navigate = useNavigate();

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
  }, [navigate]);
  useEffect(() => {
    const urlPopular = API_BACKEND + `post-popular`;
    axios
      .get(urlPopular)
      .then((res) => {
        const { data, message, error } = res.data;
        if (!error) {
          console.log(data);
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
        className="blog_area single-post-area all_post section_padding"
        span={18}
      >
        <div className="Detail">
          <Row >
            <Col lg={16} className=" posts-list" style={{ marginBottom: "50px" }}>
              <div className="single-post">
                <div className="feature-img">
                  <Image width={"100%"} src={data.urlToImage} />
                </div>
                <div className="blog_details">
                  <h1>{data.title}</h1>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: data.content,
                    }}
                  ></div>
                </div>
              </div>
            </Col>

            <Col lg={6}>
              <div className="sidebar_widget">
                <div className="single_sidebar_wiget">
                  <div className="sidebar_tittle">
                    <h2 style={{ color: "orange" }}>Tin nổi bật</h2>
                  </div>
                  {dataPopular &&
                    dataPopular.map((item, id) => {
                      return (
                        <>
                          <div className="single_catagory_post post_2 ">
                            <div className="category_post_img">
                              <Link to={`/blog/${item.slug}`}>
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
                            <div className="post_text_1 pr_30">
                              <Link to={`/blog/${item.slug}`}>
                                <h3 dangerouslySetInnerHTML={{
                      __html: item.title,
                    }}></h3>
                              </Link>
                              <p>
                                <Link to={`/blog/${item.slug}`} className="a_un_underline">
                                  <span> {item.date}</span>
                                </Link>
                              </p>
                            </div>
                          </div>
                          <hr></hr>

                          <br></br>
                        </>
                      );
                    })}
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Col>
      <Col className="gutter-row" span={3}></Col>
    </Row>
  );
}

export default Detail;

import React, { useEffect, useState } from "react";
import { API_BACKEND, IMAGE_EMPTY } from "../helper/config";
import axios from "axios";
import { Col, Image, Row, Skeleton } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

function DetailChuyenMuc() {
  const [data, setData] = useState({});
  const [dataPopular, setDataPopular] = useState([]);
  const navigate = useNavigate();
  function getDetail() {
    const slug = window.location.pathname.split("/")[2];
    const url = API_BACKEND + `post/${slug}`;
    axios
      .get(url)
      .then((res) => {
        const { data, message, error } = res.data;
        if (!error) {
          setData(data);
          getPopular();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function getPopular() {
    const urlPopular = API_BACKEND + `postpopular/chuyen-muc`;
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
  }
  useEffect(() => {
    setData({});
    setDataPopular([]);
    getDetail();
  }, [navigate]);
const meta = data.title
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{meta}</title>
        <meta name="keywords" content={meta} />
        <meta name="description" content={data.content} />

        <meta property="og:url" content={window.location.href} />
        <meta property="og:title" content={meta} />
        <meta property="og:description" content={meta} />
        <meta property="og:image" content={data.urlToImage} />
      </Helmet>
      <Row>
        <Col className="gutter-row" span={3}></Col>
        <Col
          className="blog_area single-post-area all_post section_padding"
          span={18}
        >
          <Row>
            <Col
              lg={16}
              className="Detail posts-list"
              style={{ marginBottom: "50px" }}
            >
              <div className="single-post">
                {Object.keys(data).length ? (
                  <div className="feature-img">
                    <Image width={"100%"} src={data.urlToImage} />
                  </div>
                ) : (
                  <>
                    <Skeleton
                      paragraph={{
                        rows: 4,
                      }}
                    ></Skeleton>{" "}
                    <Skeleton.Image active={true} />{" "}
                    <Skeleton
                      paragraph={{
                        rows: 20,
                      }}
                    ></Skeleton>{" "}
                  </>
                )}

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
                    {dataPopular.length > 0 ? (
                      <h2 style={{ color: "orange" }}>Tin nổi bật</h2>
                    ) : (
                      <Skeleton />
                    )}
                  </div>

                  {dataPopular.length > 0 ? (
                    dataPopular.map((item, id) => {
                      return (
                        <>
                          <div className="single_catagory_post post_2 ">
                            <div className="category_post_img">
                              <Link to={`/chuyenmuc/${item.slug}`}>
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
                              <Link to={`/chuyenmuc/${item.slug}`}>
                                <h3
                                  dangerouslySetInnerHTML={{
                                    __html: item.title,
                                  }}
                                ></h3>
                              </Link>
                              <p>
                                <Link
                                  to={`/chuyenmuc/${item.slug}`}
                                  className="a_un_underline"
                                >
                                  <span> {item.date}</span>
                                </Link>
                              </p>
                            </div>
                          </div>
                        </>
                      );
                    })
                  ) : (
                    <>
                      <Skeleton.Image active={true} width="100%" />
                      <Skeleton />
                      <Skeleton.Image active={true} width="100%" />
                      <Skeleton />
                      <Skeleton.Image active={true} width="100%" />
                      <Skeleton />
                    </>
                  )}
                </div>
              </div>
            </Col>
          </Row>
        </Col>
        <Col className="gutter-row" span={3}></Col>
      </Row>
    </>
  );
}

export default DetailChuyenMuc;

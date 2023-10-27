import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_BACKEND, IMAGE_EMPTY } from "../helper/config";
import axios from "axios";
import { Col, Row, message } from "antd";

function DetailNews() {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [dataPopular, setDataPopular] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  function getDetail(){
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
        messageApi.open({
          type: "error",
          content: `Bài viết không tồn tại`,
        });
        navigate("/news");
      });
  }
  function getPopular(){
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
  }
  useEffect(() => {
    getDetail()
    getPopular()
    
  }, [navigate]);
 
  return (
    <Row>
      {contextHolder}

      <Col className="gutter-row" span={3}></Col>
      <Col
        className="blog_area single-post-area all_post section_padding"
        span={18}
      >
        <div className="Detail">
          <Row className="row">
            <Col
              lg={16}
              className="posts-list"
              style={{ marginBottom: "50px" }}
            >
              <div className="single-post">
                <div className="blog_details">
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
            </Col>

            <Col lg={6}>
              <div className="sidebar_widget" style={{ paddingLeft: 20 }}>
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
                              <Link to={`/news/${item.slug}`}>
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
                            <div className="post_text_1 pr_30">
                              <Link to={`/news/${item.slug}`}>
                                <h3
                                  dangerouslySetInnerHTML={{
                                    __html: item.title,
                                  }}
                                ></h3>
                              </Link>
                              <a
                                href={`/news/${item.slug}`}
                                className="a_un_underline"
                              >
                                <span> {item.date}</span>
                              </a>
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

export default DetailNews;

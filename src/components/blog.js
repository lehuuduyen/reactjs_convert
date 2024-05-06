import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import { Col, Layout, Row } from "antd";
import { Content } from "antd/es/layout/layout";
import { API_BACKEND, IMAGE_EMPTY } from "../helper/config";
import axios from "axios";
import BlogsItem from "./BlogsItem";
import { Helmet } from "react-helmet-async";

function Blog(states) {
  const [listData, setListData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState([]);

  useEffect(() => {
    const url = API_BACKEND + `postscategory/blog`;
    setState(states);
    setLoading(true)
    axios(url, {
      mode: "no-cors",
      withCredentials: true,
      credentials: "same-origin",
    })
      .then((res) => {
        const { data, message, error } = res.data;
        if (!error) {
          setListData(data);
          setLoading(false)

        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // function to handle next and previous.
  const meta = "Blog _ convert68"
  //render
  const keywords = "blog convert68"
  const des = "chuyên mục blog chia sẻ tin tức tổng hợp của trang convert68 cho mọi người tham khảo"
  return (
    <Row>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{meta}</title>
        <meta name="keywords" content={keywords} />
        <meta name="description" content={des} />

        <meta property="og:url" content={window.location.href} />
        <meta property="og:title" content={meta} />
        <meta property="og:description" content={meta} />
      </Helmet>
      <Col className="gutter-row" span={3}></Col>
      <Col className=" gutter-row" span={18}>
        <div className="headline" style={{ textAlign:"center" }}>
          <h2 style={{ color: "red", fontSize: 35 }}>{state.category}</h2>
        </div>
        {/* spinner */}
        {loading && <Loading />}
        <Row gutter={24}>
          {/* news items mapping */}
          {!loading &&
            listData.map((items, id) => {
              return (
                <Col xs={24} sm={12} md={6} className="row"    style={{ margin: "10px 0px" }}
                key={items.url}>
               
                  <Layout>
                    <Content>
                      <BlogsItem
                        title={
                          (items.title ? items.title : "") + ".."
                        }
                        slug={items.slug}
                        description={
                          (items.short_description
                            ? items.short_description.slice(0, 85)
                            : "") + "..."
                        }
                        urlToImage={
                          items.urlToImage
                            ? items.urlToImage
                            : IMAGE_EMPTY
                        }
                        newsURL={items.urlToImage}
                      />
                    </Content>
                  </Layout>
                </Col>
              );
            })}
        </Row>
      </Col>
      <Col className="gutter-row" span={3}></Col>
    </Row>
  );
}

export default Blog;

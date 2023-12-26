import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import { Col, Layout, Row } from "antd";
import { Content } from "antd/es/layout/layout";
import { API_BACKEND, IMAGE_EMPTY } from "../helper/config";
import axios from "axios";
import BlogsItem from "./BlogsItem";
import { Helmet } from "react-helmet-async";
import ChuyenMucItem from "./ChuyenMucItem";

function ChuyenMuc(states) {
  const [listData, setListData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState([]);

  useEffect(() => {
    const url = API_BACKEND + `post`;
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
  const meta = "Danh sách blog"
  //render
  return (
    <Row>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{meta}</title>
        <meta name="keywords" content={meta} />
        <meta name="description" content={meta} />

        <meta property="og:url" content={window.location.href} />
        <meta property="og:title" content={meta} />
        <meta property="og:description" content={meta} />
      </Helmet>
      <Col className="gutter-row" span={3}></Col>
      <Col className=" gutter-row" span={18}>
        <div className="headline" style={{ textAlign:"center" }}>
          <h1 style={{ color: "red", fontSize: 35 }}>{state.category}</h1>
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
                      <ChuyenMucItem
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

export default ChuyenMuc;

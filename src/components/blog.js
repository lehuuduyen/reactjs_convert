import React, { Component, useEffect, useState } from "react";
import Loading from "./Loading";
import PropTypes from "prop-types";
import { Col, Layout, Row } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { API_BACKEND, IMAGE_EMPTY } from "../helper/config";
import axios from "axios";
import BlogsItem from "./BlogsItem";

function Blog(states) {
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

  //render
  return (
    <Row>
      <Col className="gutter-row" span={3}></Col>
      <Col className=" gutter-row" span={18}>
        <div className="text-center headline">
          <h1 style={{ color: "red", fontSize: 35 }}>{state.category}</h1>
        </div>
        {/* spinner */}
        {loading && <Loading />}
        <div className="row">
          {/* news items mapping */}
          {!loading &&
            listData.map((items, id) => {
              return (
                <div
                  className="col-md-4 col-sm-6 col-xs-12"
                  style={{ margin: "10px 0px" }}
                  key={items.url}
                >
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
                </div>
              );
            })}
        </div>
      </Col>
      <Col className="gutter-row" span={3}></Col>
    </Row>
  );
}

export default Blog;

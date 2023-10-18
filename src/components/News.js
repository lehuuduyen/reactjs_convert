import React, { Component, useEffect, useState } from "react";
import Loading from "./Loading";
import PropTypes from "prop-types";
import { Col, Image, Layout, Row } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { API_BACKEND } from "../helper/config";
import axios from "axios";
import BlogsItem from "./BlogsItem";
import NewsItem from "./NewsItem";
import { Link } from "react-router-dom";

function News(states) {
  const [listData, setListData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState([]);

  useEffect(() => {
    const url = API_BACKEND + `call-news`;
    setState(states);
    setLoading(true);
    axios(url, {
      mode: "no-cors",
      withCredentials: true,
      credentials: "same-origin",
    })
      .then((res) => {
        const { data, message, error } = res.data;
        if (!error) {
          setListData(data);
          setLoading(false);
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
        <div className="wrapper-24h ">
          <div
            className="width_common list-news-subfolder o-tab__content"
            id="_listhotnews"
            data-campaign="Stream"
          >
            {loading && <Loading />}
            {!loading &&
              listData.map((items, id) => {
                return (
                  <article
                    className="item-news item-news-common"
                    data-offset="1"
                  >
                    <span className="time-count"></span>
                    <div className="thumb-art">
                      <Image
                        fallback="https://e7.pngegg.com/pngimages/829/733/png-clipart-logo-brand-product-trademark-font-not-found-logo-brand.png"
                        itemprop="contentUrl"
                        style={{ transform: "translateX(-50%)", left: "50%" }}
                        loading="lazy"
                        intrinsicsize="220x132"
                        alt="Israel lắp lồng chống UAV trên nóc xe tăng hiện đại nhất"
                        className="lazy lazied thumb "
                        src={ items.urlToImage }
                        data-ll-status="loaded"
                      />
                    </div>
                    <h3 className="title-news">
                      <Link
                        data-medium="Item-1"
                        data-thumb="1"
                        to={`/news/${items.slug}`}
                        title="Israel lắp lồng chống UAV trên nóc xe tăng hiện đại nhất"
                        data-itm-source="#vn_source=TinNong&amp;vn_campaign=Stream&amp;vn_medium=Item-1&amp;vn_term=Desktop&amp;vn_thumb=1"
                        data-itm-added="1" >
                        <span dangerouslySetInnerHTML={{ __html:items.title }}>
                          
                        </span>

                      </Link>
                    </h3>
                    <p className="description">
                      <a
                        data-medium="Item-1"
                        data-thumb="1"
                        href="https://vnexpress.net/israel-lap-long-chong-uav-tren-noc-xe-tang-hien-dai-nhat-4665589.html"
                        title="Israel lắp lồng chống UAV trên nóc xe tăng hiện đại nhất"
                        data-itm-source="#vn_source=TinNong&amp;vn_campaign=Stream&amp;vn_medium=Item-1&amp;vn_term=Desktop&amp;vn_thumb=1"
                        data-itm-added="1"
                      >
                       {items.content}
                      </a>
                    </p>
                    <p className="meta-news">
                      <span className="time-public">
                        <span datetime="2023-10-17 14:06:06" timeago-id="240">
                          1h trước
                        </span>
                      </span>
                      <a
                        data-medium="Title-QuanSu"
                        href="/the-gioi/quan-su"
                        className="cat"
                        title="Quân sự"
                        data-itm-source="#vn_source=TinNong&amp;vn_campaign=Stream&amp;vn_medium=Title-QuanSu&amp;vn_term=Desktop"
                        data-itm-added="1"
                      >
                        Quân sự
                      </a>
                      <a
                        className="count_cmt"
                        href="https://vnexpress.net/israel-lap-long-chong-uav-tren-noc-xe-tang-hien-dai-nhat-4665589.html#box_comment_vne"
                        style={{
                          whiteSpace: "nowrap",
                          display: "inline-block",
                        }}
                      >
                        <span className="font_icon widget-comment-4665589-1">
                          12
                        </span>
                      </a>
                    </p>
                  </article>
                );
              })}
          </div>
        </div>
      </Col>

      <Col className="gutter-row" span={3}></Col>
    </Row>
  );
}

export default News;

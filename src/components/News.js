import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import { Col, Image, Row, Avatar, Divider, List, Skeleton } from "antd";
import { API_BACKEND, IMAGE_EMPTY } from "../helper/config";
import axios from "axios";

import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { Helmet } from "react-helmet-async";
function News() {
  const [listData, setListData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currPage, setCurrPage] = useState(1);
  const [total, setTotal] = useState(0);

  const appendData = () => {
    setCurrPage(currPage + 1);
    const url = API_BACKEND + `call-news?page=${currPage}`;
    setLoading(currPage === 1);

    axios(url, {
      mode: "no-cors",
      withCredentials: true,
      credentials: "same-origin",
    })
      .then((res) => {
        const { data, total, message, error } = res.data;
        if (!error) {
          setListData([...listData, ...data]);
          setTotal(total);
          setLoading(false);

          // message.success(`${data.length} more items loaded!`);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    appendData();
  }, []);
  // function to handle next and previous.
  const meta = "Danh sách tin tức"
  //render
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{meta}</title>
        <meta name="keywords" content={meta} />
        <meta name="description" content={meta} />

        <meta property="og:url" content={window.location.href} />
        <meta property="og:title" content={meta} />
        <meta property="og:description" content={meta} />
      </Helmet>
      <Row>
        {/* <Col className="gutter-row" span={3}></Col> */}
        <Col className=" gutter-row" span={24}>
          <div className="wrapper-24h">
            <div
              className="width_common list-news-subfolder o-tab__content"
              id="_listhotnews"
              data-campaign="Stream"
            >
              {loading && <Loading />}
              {listData && !loading && (
                <div
                  id="scrollableDiv"
                  style={{
                    height: "calc(100vh - 105px)",
                    overflowY: "auto",
                    width: "100vw",
                    // border: "1px solid rgba(140, 140, 140, 0.35)",
                  }}
                >
                  <InfiniteScroll
                    dataLength={listData.length}
                    next={(e) => appendData(e)}
                    hasMore={listData.length < total}
                    loader={
                      <Skeleton
                        avatar
                        paragraph={{
                          rows: 1,
                        }}
                        active
                      />
                    }
                    endMessage={
                      <Divider plain>It is all, nothing more 🤐</Divider>
                    }
                    scrollableTarget="scrollableDiv"
                  >
                    <List
                      dataSource={listData}
                      renderItem={(items) => (
                        <List.Item key={items.slug}>
                          <article
                            key={items.slug}
                            className="item-news item-news-common"
                            data-offset="1"
                          >
                            <span className="time-count"></span>
                            <div className="thumb-art">
                              <Image
                                fallback={IMAGE_EMPTY}
                                itemprop="contentUrl"
                                style={{
                                  transform: "translateX(-50%)",
                                  left: "50%",
                                }}
                                loading="lazy"
                                intrinsicsize="220x132"
                                alt={items.title}
                                className="lazy lazied thumb "
                                src={items.urlToImage}
                                data-ll-status="loaded"
                              />
                            </div>
                            <h3 className="title-news">
                              <Link
                                data-medium="Item-1"
                                data-thumb="1"
                                to={`/news/${items.slug}`}
                                title={items.title}
                                data-itm-source="#vn_source=TinNong&amp;vn_campaign=Stream&amp;vn_medium=Item-1&amp;vn_term=Desktop&amp;vn_thumb=1"
                                data-itm-added="1"
                              >
                                <span
                                  dangerouslySetInnerHTML={{
                                    __html: items.title,
                                  }}
                                ></span>
                              </Link>
                            </h3>
                            <p className="description">
                              <Link
                                className="a_un_underline"
                                data-medium="Item-1"
                                data-thumb="1"
                                to={`/news/${items.slug}`}
                                title={items.title}
                                data-itm-source="#vn_source=TinNong&amp;vn_campaign=Stream&amp;vn_medium=Item-1&amp;vn_term=Desktop&amp;vn_thumb=1"
                                data-itm-added="1"
                              >
                                <span>{items.content}</span>
                              </Link>
                            </p>
                            <p className="description">
                              <Link
                                className="a_un_underline"
                                data-medium="Item-1"
                                data-thumb="1"
                                to={`/news/${items.slug}`}
                                title={items.title}
                                data-itm-source="#vn_source=TinNong&amp;vn_campaign=Stream&amp;vn_medium=Item-1&amp;vn_term=Desktop&amp;vn_thumb=1"
                                data-itm-added="1"
                              >
                                <p className="meta-news">
                                  <span className="time-public">
                                    <span
                                      datetime="2023-10-17 14:06:06"
                                      timeago-id="240"
                                    >
                                      {items.date}
                                    </span>
                                  </span>
                                </p>
                              </Link>
                            </p>
                          </article>
                        </List.Item>
                      )}
                    />
                  </InfiniteScroll>
                </div>
              )}
            </div>
          </div>
        </Col>

        {/* <Col className="gutter-row" span={3}></Col> */}
      </Row>
    </>
  );
}

export default News;

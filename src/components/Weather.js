import React, { Component, useEffect, useState } from "react";
import Loading from "./Loading";
import PropTypes from "prop-types";
import { Col, Layout, Row } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { API_BACKEND } from "../helper/config";
import axios from "axios";
import BlogsItem from "./BlogsItem";

function Weather(states) {
  const [listData, setListData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState([]);

  useEffect(() => {
    const url = API_BACKEND + `post`;
    setState(states);
    axios(url, {
      mode: "no-cors",
      withCredentials: true,
      credentials: "same-origin",
    })
      .then((res) => {
        const { data, message, error } = res.data;
        if (!error) {
          setListData(data);
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
       
      </Col>
      <Col className="gutter-row" span={3}></Col>
    </Row>
  );
}

export default Weather;

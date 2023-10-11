import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import React, { Component } from "react";
import { Link } from "react-router-dom";
function onclick(params) {
    console.log(params)
}
export class NewsItem extends Component {
  
  render() {
    return (
      <Link style={{ textDecoration: "none" }} to={`/detail/${(this.props.slug)?this.props.slug:this.props.title}`}>
        <Card
          hoverable
          style={{ width: "100%", height: "100%" }}
          cover={<img alt="example" src={this.props.imageURL} loading={true} />}
        >
          <div class="ant-card-meta">
            <div class="ant-card-meta-detail">
              <div class="ant-card-meta-title">
                <h2>{this.props.title}</h2>
              </div>
              <div
                class="ant-card-meta-description"
                dangerouslySetInnerHTML={{
                  __html: this.props.description.replace(/\r\n\r\n/g, "<br />"),
                }}
              ></div>
            </div>
          </div>
        </Card>
      </Link>
    );
  }
}

export default NewsItem;

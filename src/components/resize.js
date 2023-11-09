import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import {
  Card,
  Col,
  InputNumber,
  Layout,
  Row,
  Upload,
  Image as ImgAnt,
  Button,
  Checkbox,
} from "antd";

import { Content } from "antd/es/layout/layout";
import { API_BACKEND, IMAGE_EMPTY } from "../helper/config";
import axios from "axios";
import BlogsItem from "./BlogsItem";
import Title from "./Title";
import Resizer from "react-image-file-resizer";
import { Helmet } from "react-helmet-async";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
function Resize(states) {
  // function to handle next and previous.
  const [sizeWidthHeight, setSizeWidthHeight] = useState([0, 0]);
  const [sizeCheckBox, setCheckBox] = useState(true);
  const [sizeDefaultWidthHeight, setSizeDefaultWidthHeight] = useState([0, 0]);
  const [img, setImg] = useState({});

  const onChangeWidth = (value) => {
    if (sizeCheckBox) {
      let tileHeight = Math.round(
        value / (sizeDefaultWidthHeight[0] / sizeDefaultWidthHeight[1])
      );
      setSizeWidthHeight([value, tileHeight]);
    } else {
      setSizeWidthHeight([value, sizeWidthHeight[1]]);
    }
  };
  const onChangeHeight = (value) => {
    if (sizeCheckBox) {
      let tileWidtth = Math.round(
        value * (sizeDefaultWidthHeight[0] / sizeDefaultWidthHeight[1])
      );
      setSizeWidthHeight([tileWidtth, value]);
    } else {
      setSizeWidthHeight([sizeWidthHeight[0], value]);
    }
  };
  const clickDefault = (value) => {
    setSizeWidthHeight([sizeDefaultWidthHeight[0], sizeDefaultWidthHeight[1]]);
  };
  const clickDownload = (value) => {
    Resizer.imageFileResizer(
      img,
      sizeWidthHeight[0],
      sizeWidthHeight[1],
      "",
      100,
      0,
      (uri) => {
        var a = document.createElement("a"); //Create <a>
        console.log("data:image/png;base64," + uri);
        a.href = uri; //Image Base64 Goes here
        a.download = img.name; //File name Here
        a.click();
      },
      "base64",
      sizeWidthHeight[0],
      sizeWidthHeight[1]
    );
  };
  const onChangeCheck = (e) => {
    setCheckBox(e.target.checked);
  };
  const meta = "Chuyển đổi kích thước hình ảnh"
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
      <Col xs={20} md={13} lg={15}>
        <Card className="convert convert__box">
          <Row style={{ widht: "100%" }}>
            <Title>Chuyển đổi kích thước hình ảnh</Title>
            <Upload.Dragger
              name="file"
              multiple={true}
              accept={"image/*"}
              // onChange={(e) => onChange(e)}
              beforeUpload={(file) => {
                var img = new Image();
                console.log(file);
                let _URL = window.URL || window.webkitURL;
                var objectUrl = _URL.createObjectURL(file);
                img.onload = function () {
                  setSizeWidthHeight([this.width, this.height]);
                  setSizeDefaultWidthHeight([this.width, this.height]);
                };
                img.src = objectUrl;
                getBase64(file).then((result) => {
                  file.preview = result;
                  setImg(file);
                });
                return false;
              }}
              maxCount={1}
              showUploadList={{ showDownloadIcon: true }}
              itemRender={(originNode, file, fileList, { preview, remove }) => {
                console.log();
                return (
                  <div style={{ marginTop: "10px" }}>
                    <ImgAnt
                      style={{
                        width: sizeWidthHeight[0],
                        height: sizeWidthHeight[1],
                      }}
                      src={img.preview}
                      alt={img.name}
                    />
                  </div>
                );
              }}
            >
              <div>
                <img
                  src="/upload.png"
                  alt="upload icon"
                  style={{ width: 50, height: 50 }}
                />
              </div>
              <p>Bấm để tải lên hoặc kéo thả file vào tại đây </p>
            </Upload.Dragger>
          </Row>
        </Card>
      </Col>
      <Col xs={20} md={4} lg={4}>
        <Card className="convert convert__box">
          <Row>
            <Col>
              <p>
                <Button type="primary" onClick={clickDefault}>
                  Mặc định
                </Button>
              </p>
              <p>
                <strong>Width:</strong>{" "}
                <InputNumber
                  min={0}
                  max={5000}
                  value={sizeWidthHeight[0]}
                  onChange={onChangeWidth}
                />
              </p>
              <p>
                <strong>Height:</strong>{" "}
                <InputNumber
                  min={0}
                  max={5000}
                  value={sizeWidthHeight[1]}
                  onChange={onChangeHeight}
                />
              </p>
              <p>
                <Checkbox
                  defaultChecked={sizeCheckBox}
                  onChange={onChangeCheck}
                >
                  Giữ tỷ lệ ban đầu
                </Checkbox>
              </p>
              <p>
                <Button
                  type="primary"
                  style={{ background: "green", borderColor: "white" }}
                  onClick={clickDownload}
                >
                  Tải về
                </Button>
              </p>
            </Col>
          </Row>
        </Card>
      </Col>
    </>
  );
}

export default Resize;

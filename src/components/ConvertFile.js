import {
  Badge,
  Button,
  Card,
  Col,
  Divider,
  message,
  Row,
  Upload,
  SettingOutlined,
  Menu,
} from "antd";
import "./ConvertFile.css";
import React, { useEffect, useState } from "react";
import Title from "./Title";
import ItemUpload from "./ItemUpload";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { CloudUploadOutlined, DeleteOutlined } from "@ant-design/icons";
import ConvertGuide from "./ConvertGuide";
import Resize from "./resize";
import { Helmet } from "react-helmet-async";
const maxUpload = 10;
const typeAccept = ["image/png", "image/jpg", "image/jpeg", "image/jpeg","video/mp4"];

function ConvertFile() {
  const [fileList, setFileList] = useState([]);
  const [params, setParams] = useState(["PNG", "TINYPNG"]);
  const [messageApi, contextHolder] = message.useMessage();
  const { id } = useParams();
  const navigator = useNavigate();
  useEffect(() => {
    setFileList([]);
    if (id && id !== "resize") {
      const splitId = id.split("-");
      setParams([splitId[1].toUpperCase(), splitId[3].toUpperCase()]);
    }
    return () => {
      setParams([]);
    };
  }, [id]);

  function onChange(info) {
    const isValidType = typeAccept.includes(info.file.type);
    const isValidSize = info.file.size;
    const indexFile = info.fileList.findIndex(
      (item) => item.uid === info.file.uid
    );
    const __fileList = [];
    if (info.fileList.length > maxUpload) {
      messageApi.open({
        type: "error",
        content: `Giới hạn upload là ${maxUpload} file`,
      });
    }
    info.fileList.map((item) => {
      const validSize = (item.type =="video/mp4")?true :item.size / 1024 <= 5 * 1024;
      const validType = typeAccept.includes(item.type);
      if (validType && validSize) {
        console.log(item);
        __fileList.push(item);
      }
    });

    if (isValidSize / 1024 > 5 * 1024 && info.file.type !="video/mp4") {
      info.fileList.splice(indexFile, 1);
      messageApi.open({
        type: "error",
        content: `${info.file.name} kích thước quá lớn, chỉ được tối đa 5MB`,
      });
    }
    if (!isValidType) {
      info.fileList.splice(indexFile, 1);
      messageApi.open({
        type: "error",
        content: `${info.file.name} không đúng định dạng, chỉ được dùng định dạng PNG, JPG và JPEG`,
      });
    }

    const newFileList = __fileList.map((file) => {
      if (file.response) {
        file.url = file.response.url;
      }
      return file;
    });
    setFileList(newFileList);
    console.log(fileList);
  }

  const onRemoveAll = () => {
    setFileList([]);
  };

  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  const items = [
    getItem("Nén Ảnh", "/convert/chuyen-png-sang-tinypng"),
    getItem("Chuyển đổi kích thước hình ảnh", "/convert/resize"),
    getItem("Chuyển đổi file", "sub1", "", [
      getItem(
        "PNG",
        "g1",
        null,
        [
          getItem("JPEG", "/convert/chuyen-png-sang-jpeg"),
          getItem("JPG", "/convert/chuyen-png-sang-jpg"),
          getItem("PDF", "/convert/chuyen-png-sang-pdf"),
        //   getItem("ICO", "/convert/chuyen-png-sang-ico"),
        ],
        "group"
      ),
      getItem(
        "JPG",
        "g2",
        null,
        [
          getItem("PNG", "/convert/chuyen-jpg-sang-png"),
          getItem("PDF", "/convert/chuyen-jpg-sang-pdf"),
        //   getItem("ICO", "/convert/chuyen-jpg-sang-ico"),
        ],
        "group"
      ),
      getItem(
        "JPEG",
        "g3",
        null,
        [
          getItem("PNG", "/convert/chuyen-jpeg-sang-png"),
          getItem("PDF", "/convert/chuyen-jpeg-sang-pdf"),
        //   getItem("ICO", "/convert/chuyen-jpeg-sang-ico"),
        ],
        "group"
      ),
      getItem(
        "MP4",
        "g2",
        null,
        [
          getItem("M3U8", "/convert/chuyen-mp4-sang-m3u8"),
        ],
        "group"
      )
    ]),
  ];
  const onClick = (e) => {
    navigator(e.key);
  };
  let meta = "Chuyển đổi " + params[0] + " sang " + params[1];
  let metaDes = "Chuyển đổi " + params[0] + " sang " + params[1];
 
  if(id === undefined){
         meta = "Convert 68 - Trang Web Chỉnh Sửa Chuyển Đổi Ảnh Miễn Phí";
         metaDes = "Convert 68 - Trang Web Chỉnh Sửa Chuyển Đổi Ảnh Miễn Phí";
  }else  if (params[0] ===  'PNG' && params[1] === 'TINYPNG') {
         meta = "Convert 68 - Trang Web Chỉnh Sửa Chuyển Đổi Ảnh Miễn Phí - Nén Ảnh";
         metaDes = "Convert 68 - Trang Web Chỉnh Sửa Chuyển Đổi Ảnh Miễn Phí - Nén Ảnh";
  }
  return (
    <Row gutter={20}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{meta}</title>
        <meta name="keywords" content={meta} />
        <meta name="description" content={meta} />

        <meta property="og:url" content={window.location.href} />
        <meta property="og:title" content={meta} />
        <meta property="og:description" content={metaDes} />
      </Helmet>
      {contextHolder}
      <Col xs={24} md={7} lg={5}>
        <Menu
          onClick={onClick}
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          items={items}
        />
      </Col>
      {id === "resize" ? (
        <Resize></Resize>
      ) : (
        <Col xs={24} md={17} lg={19}>
          <Card className="convert convert__box">
            <Row>
              <Col sm={14}>
                {!id || params[1] === "TINYPNG" ? (
                  <Title>Giải nén Hình ảnh</Title>
                ) : (
                  <Title>
                    Chuyển đổi <b>{params[0]}</b> sang <b>{params[1]}</b>
                  </Title>
                )}
              </Col>
              {fileList.length > 1 && (
                <Col sm={10}>
                  <div className="action">
                    {/* <Button
                    type="primary"
                    className="btn__upload"
                    icon={<CloudUploadOutlined style={{ color: "white" }} />}
                    size="large"
                  >
                    Convert All
                  </Button> */}
                    <Button
                      type="dashed"
                      danger
                      icon={<DeleteOutlined />}
                      size="large"
                      onClick={() => onRemoveAll()}
                    >
                      Remove All
                    </Button>
                  </div>
                </Col>
              )}
            </Row>
            <Upload.Dragger
              name="file"
              multiple={true}
              accept={"image/*"}
              onChange={(e) => onChange(e)}
              beforeUpload={(file) => {
                return false;
              }}
              maxCount={maxUpload}
              fileList={fileList}
              showUploadList={{ showDownloadIcon: true }}
              itemRender={(originNode, file, fileList, { preview, remove }) => {
                const percent = file.percent;
                if (percent === 100) {
                  return <h1>thanh cong</h1>;
                }
                return (
                  <ItemUpload
                    file={file}
                    percent={percent}
                    fileTo={params[1]}

                    params={params}
                    onRemove={(file) => remove()}
                  />
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
          </Card>
          <ConvertGuide from={params[0]} to={params[1]} />
        </Col>
      )}
    </Row>
  );
}

export default ConvertFile;

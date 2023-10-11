import { Badge, Button, Card, Col, Divider, message, Row, Upload } from "antd";
import "./ConvertFile.css";
import React, { useEffect, useState } from "react";
import Title from "./Title";
import ItemUpload from "./ItemUpload";
import { NavLink, useParams } from "react-router-dom";
import { CloudUploadOutlined, DeleteOutlined } from "@ant-design/icons";
import ConvertGuide from "./ConvertGuide";
const maxUpload = 10;
const typeAccept = ["image/png", "image/jpg", "image/jpeg"];

function ConvertFile() {
  const [fileList, setFileList] = useState([]);
  const [params, setParams] = useState(["PNG", "ICO"]);
  const [messageApi, contextHolder] = message.useMessage();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const splitId = id.split("-");
      setParams([splitId[1].toUpperCase(), splitId[3].toUpperCase()]);
    }
  }, [id]);

  function onChange(info) {
    const isValidType = typeAccept.includes(info.file.type);
    const indexFile = info.fileList.findIndex(
      (item) => item.uid === info.file.uid
    );
    const __fileList = [];
	if(info.fileList.length > maxUpload){
		messageApi.open({
			type: "error",
			content: `Giới hạn upload là ${maxUpload} file`,
		  });
	}
    info.fileList.map((item) => {
      if (typeAccept.includes(item.type)) {
        __fileList.push(item);
      }
    });
    if (!isValidType) {
      info.fileList.splice(indexFile, 1);
      messageApi.open({
        type: "error",
        content: `${info.file.name} không đúng định dạng , chỉ được dùng định dạng PNG, JPG và JPEG`,
      });
    }

    const newFileList = __fileList.map((file) => {
      if (file.response) {
        file.url = file.response.url;
      }
      return file;
    });
    setFileList(newFileList);
  }

  const onRemoveAll = () => {
    setFileList([]);
  };

  const onConvertAll = () => {};

  return (
    <Row gutter={20}>
      {contextHolder}
      <Col xs={24} md={7} lg={5}>
        <Card className="convert convert__list">
          <Divider orientation="left">
            <b>PNG</b>
          </Divider>
          <div className="convert__list--wrap">
            <NavLink
              to="/convert/chuyen-png-sang-tinypng"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <Badge status="default" color="white" text="TINYPNG" />
            </NavLink>
            <NavLink
              to="/convert/chuyen-png-sang-jpeg"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <Badge status="default" color="white" text="JPEG" />
            </NavLink>
            <NavLink
              to="/convert/chuyen-png-sang-jpg"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <Badge status="default" color="white" text="JPG" />
            </NavLink>
            <NavLink
              to="/convert/chuyen-png-sang-pdf"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <Badge status="default" color="white" text="PDF" />
            </NavLink>
            <NavLink
              to="/convert/chuyen-png-sang-ico"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <Badge status="default" color="white" text="ICO" />
            </NavLink>
          </div>
          <Divider orientation="left">
            <b>JPG</b>
          </Divider>
          <div className="convert__list--wrap">
            <NavLink
              to="/convert/chuyen-jpg-sang-tinypng"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <Badge status="default" color="white" text="TINYPNG" />
            </NavLink>
            <NavLink
              to="/convert/chuyen-jpg-sang-png"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <Badge status="default" color="white" text="PNG" />
            </NavLink>
            <NavLink
              to="/convert/chuyen-jpg-sang-pdf"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <Badge status="default" color="white" text="PDF" />
            </NavLink>
            <NavLink
              to="/convert/chuyen-jpg-sang-ico"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <Badge status="default" color="white" text="ICO" />
            </NavLink>
          </div>
          <Divider orientation="left">
            <b>JPEG</b>
          </Divider>
          <div className="convert__list--wrap">
            <NavLink
              to="/convert/chuyen-jpeg-sang-png"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <Badge status="default" color="white" text="PNG" />
            </NavLink>
            <NavLink
              to="/convert/chuyen-jpeg-sang-pdf"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <Badge status="default" color="white" text="PDF" />
            </NavLink>
            <NavLink
              to="/convert/chuyen-jpeg-sang-ico"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <Badge status="default" color="white" text="ICO" />
            </NavLink>
          </div>
        </Card>
      </Col>
      <Col xs={24} md={17} lg={19}>
        <Card className="convert convert__box">
          <Row>
            <Col sm={14}>
              <Title>
                Chuyển đổi <b>{params[0]}</b> sang <b>{params[1]}</b>
              </Title>
            </Col>
            {fileList.length > 1 && (
              <Col sm={10}>
                <div className="action">
                  <Button
                    type="primary"
                    className="btn__upload"
                    icon={<CloudUploadOutlined style={{ color: "white" }} />}
                    size="large"
                  >
                    Convert All
                  </Button>
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
                  onRemove={(file) => remove()}
                />
              );
            }}
          >
            <div>
              <img src="/upload.png" alt="upload icon" style={{ width: 50 }} />
            </div>
            <p>Bấm để tải lên hoặc kéo thả file vào tại đây </p>
          </Upload.Dragger>
        </Card>
        <ConvertGuide from={params[0]} to={params[1]} />
      </Col>
    </Row>
  );
}

export default ConvertFile;

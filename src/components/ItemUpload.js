import React, {
  useEffect,
  useState
} from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Image,
  Progress,
  Row,
  Select,
  Spin,
  Tag,
  Tooltip,
} from "antd";
import {
  ArrowRightOutlined,
  CloudUploadOutlined,
  DeleteOutlined,
  DownloadOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import "./ConvertFile.css";
import axios from "axios";
import {
  API_BACKEND
} from "../helper/config";
import {
  useNavigate,
  useParams
} from "react-router-dom";
import imageCompression from 'browser-image-compression';

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });



function ItemUpload(props) {
  const {
    file
  } = props;
  const [error, setError] = useState("");
  const [defaultValue, setDefaultValue] = useState('');
  const [optionType, setOptionType] = useState([]);
  const [downloadLink, setDownloadLink] = useState("");
  const [checkTiny, setCheckTiny] = useState(false);
  const [statusUpload, setStatusUpload] = useState(0); // 0: Submit, 1: Loading, 2: Success, 3: Error
  const [fileConverted, setFileConverted] = useState({});
  const [percent, setPercent] = useState(0);
  const [isException, setIsException] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const {
    id
  } = useParams();
  // const navigator = useNavigate();
  // useEffect(() => {
  //   if (id) {
  //     const splitId = id.split("-");
  //     console.log('splitId',splitId);
  //     setParams([splitId[1].toUpperCase(), splitId[3].toUpperCase()]);
  //     console.log('params',params);

  //   }
  // }, [navigator]);



  useEffect(() => {
    let CONVERT_OPTIONS = {
      mp4: ["m3u8"],
      jpeg: ["png", "gif", "pdf", "ico","webp"],
      jpg: ["png", "gif", "pdf", "ico","webp"],
      png: ["jpeg", "jpg", "pdf", "ico","webp"],
      webp: ["jpeg", "jpg", "pdf", "ico","png"],
    };
    if (!id || props.params[1] === "TINYPNG") {
      CONVERT_OPTIONS = {
        jpg: ["tinyPNG"],
        jpeg: ["tinyPNG"],
        png: ["tinyPNG"],
      };
    }

    if (file) {
      const dataType = file.type.split("/")[1];
      const options =
        CONVERT_OPTIONS[dataType] &&
        CONVERT_OPTIONS[dataType].map((item) => {
          return {
            value: item,
            label: item.toUpperCase()
          };
        });
      if (!file.url && !file.preview) {
        getBase64(file.originFileObj).then(result => {
          file.preview = result
        });
      }

      setOptionType(options);
      setSelectedOption(props.fileTo.toLowerCase())
      // options && setSelectedOption(options[0].value);
    }
  }, [file]);

  const onChangeType = (value) => {
    setSelectedOption(value);
  };

  const handleDownloadClick = () => {
    if (checkTiny) {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", downloadLink, true);
      xhr.responseType = "blob";
      xhr.onload = function () {
        const urlCreator = window.URL || window.webkitURL;
        const imageUrl = urlCreator.createObjectURL(this.response);
        const tag = document.createElement("a");
        tag.href = imageUrl;
        tag.download = fileConverted.name;
        document.body.appendChild(tag);
        tag.click();
        document.body.removeChild(tag);
      };
      xhr.send();

    } else {
      let img = downloadLink.split("&type=")[1];
      let type = img.split("&file_name=")[0];
      let imageName = img.split("&file_name=")[1];
      
      const xhr = new XMLHttpRequest();
      xhr.open("GET", downloadLink, true);
      xhr.responseType = "blob";
      
      xhr.onload = function () {
        if (this.status === 200) {
          const urlCreator = window.URL || window.webkitURL;
          const imageUrl = urlCreator.createObjectURL(this.response);
      
          const tag = document.createElement("a");
          tag.href = imageUrl;
          tag.download = imageName + "." + type;
          document.body.appendChild(tag);
          tag.click();
          document.body.removeChild(tag);
        } else {
          console.error("Failed to download the image.");
        }
      };
      
      xhr.send();
    }

  };

  const onRetryFile = () => {
    setFileConverted({});
    setDownloadLink("");
    setCheckTiny(false)
    setStatusUpload(0);
  };

  const handleUploadClick = async (file, _this) => {
    setStatusUpload(1);

    if (selectedOption == 'tinypng') {
      const imageFile = file.originFileObj;
      const options = {
        initialQuality:0.5,
        useWebWorker: true,
      }

      try {
        const compressedFile = await imageCompression(imageFile, options);
        const downloadLink = URL.createObjectURL(compressedFile);
        const json = {}
        json['oldSize'] = Math.round(imageFile.size,1);
        json['newSize'] = parseFloat(compressedFile.size / 1024).toFixed(2)+' KB';
        console.log(`Math.round(compressedFile.size / 1024 +' KB',1)`, compressedFile.size);
        console.log(`Math.round(compressedFile.size / 1024 +' KB',1)`, Math.round(compressedFile.size / 1024 +' KB',1));
        json['percent'] = parseFloat(100 - (compressedFile.size * 100 / imageFile.size)).toFixed(2) + " %";
        json['name'] = imageFile.name;
        setFileConverted(json);
        setCheckTiny(true)
        setDownloadLink(downloadLink);
        setStatusUpload(compressedFile.size);

        console.log('size', imageFile.size); // true
        console.log(`compressedFile size ${compressedFile.size } `); // smaller than maxSizeMB

      } catch (error) {
        console.log(error);
      }

    }else if(selectedOption == 'm3u8'){
      const imageFile = file.originFileObj;
      
    } else {
      let formData = new FormData();
      formData.append("file", file.originFileObj);
      formData.append("to", selectedOption);

      const config = {
        onUploadProgress: (progressEvent) => {
          setPercent(progressEvent.progress * 100);
        },
      };

      axios
        .post(API_BACKEND + "format-file", formData, config)
        .then((res) => {
          const {
            data,
            message,
            error
          } = res.data;
          if (res.data.success) {
            setFileConverted(JSON.parse(data));
            setDownloadLink(message);
            setStatusUpload(2);
          } else {
            setError(error || res.data);
            setStatusUpload(3);
          }
        })
        .catch((err) => {
          setStatusUpload(0);
          setIsException(true);
        });
    }

  };

  return (
        <Card className="card_upload">
          <Row align="middle" gutter={20}>
            <Col xs={24} lg={8}>
              <Row align="middle" justify="start" gutter={20}>
                <Col xs={4}>
                  <Image
                    style={{ maxHeight: 40 }}
                    src={(file.type!='video/mp4')?file.preview:"https://static.thenounproject.com/png/1813969-200.png"}
                    alt={file.name}
                  />
                </Col>
                <Col xs={20}>
                  <Tooltip title={file.name}>
                    <div className="truncate">{file.name}</div>
                  </Tooltip>
                </Col>
              </Row>
            </Col>
            <Col xs={24} lg={16}>
              {statusUpload === 1 ? (
                <Row>
                  <Progress
                    strokeColor={{ "0%": "#243B55", "100%": "#141E30" }}
                    percent={percent}
                    showInfo={false}
                    status={isException ? "exception" : "normal"}
                  />
                </Row>
              ) : (
                <Row align="middle">
                  <Col sm={15} md={10}>
                    {statusUpload !== 3 && (
                      <Row gutter={20} align="middle">
                        <Col>
                          <Select
                            // defaultValue='pdf'
                            value={selectedOption}
                            disabled={downloadLink && fileConverted}
                            onChange={(value) => onChangeType(value)}
                            id={file.uid}
                            style={{ width: 120 }}
                            options={optionType}
                            size="large"
                          />
                        </Col>
                        <Col>
                          <Tag color="red">
                            <b>{Math.round(file.size / 1024)}KB</b>
                          </Tag>
                          &nbsp;
                          <ArrowRightOutlined />
                          &nbsp;&nbsp;
                          <Tag color="success">
                            <Spin spinning={statusUpload === 1}>
                              <b>{fileConverted.newSize || "... KB"}</b>
                            </Spin>
                          </Tag>
                          &nbsp;&nbsp;
                          {fileConverted.percent ? (
                            <Tag color="blue">
                              <b st>{fileConverted.percent}</b>
                            </Tag>
                          ) : (
                            ""
                          )}
                        </Col>
                      </Row>
                    )}
                  </Col>
                  <Col
                    sm={statusUpload === 3 ? 24 : 9}
                    md={statusUpload === 3 ? 24 : 14}
                    style={{ textAlign: "right" }}
                    className="action"
                  >
                    {statusUpload === 0 || statusUpload === 1 ? (
                      <div className="action">
                        <Button
                          loading={statusUpload === 1}
                          type="primary"
                          className="btn__upload"
                          icon={<CloudUploadOutlined style={{ color: "white" }} />}
                          size="large"
                          onClick={() => handleUploadClick(file)}
                        >
                          Upload
                        </Button>
                        <Tooltip title="Remove file">
                          <Button
                            size="large"
                            type="dashed"
                            danger
                            icon={<DeleteOutlined style={{ color: "#cf1323" }} />}
                            onClick={(file) => props.onRemove(file)}
                            style={{ marginLeft: "5px" }}
                          ></Button>
                        </Tooltip>
                      </div>
                    ) : (
                      <div className="action">
                        {statusUpload === 3 && (
                          <Alert message={error} type="error" showIcon />
                        )}
                        {statusUpload !== 3 && (
                          <div
                            onClick={() => handleDownloadClick()}
                            className="btn__download"
                          >
                            <DownloadOutlined />
                            Download
                          </div>
                        )}
                        <Tooltip title="Try another type">
                          <Button
                            size="large"
                            type="primary"
                            ghost
                            icon={<ReloadOutlined style={{ color: "#2267c7" }} />}
                            onClick={() => onRetryFile()}
                            style={{ marginLeft: "5px" }}
                          ></Button>
                        </Tooltip>
                      </div>
                    )}
                  </Col>
                </Row>
              )}
            </Col>
          </Row>
        </Card>
      );
        }

        export default ItemUpload;
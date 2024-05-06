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
  const meta = "thay đổi kích thước ảnh - conver68.com"
  const des = "convert68 thay đổi kích thước ảnh JPG, PNG, SVG hoặc GIF miễn phí nhanh chóng. chuyển đổi kích thước nhiều ảnh cùng lúc bằng cách xác định kích thước theo pixel hoặc phần trăm"
  const key = "thay đổi kích thước ảnh, chuyển đổi kích thước hình ảnh"
  //render
  return (
    <>
       <Helmet>
        <meta charSet="utf-8" />
        <title>{meta}</title>
        <meta name="keywords" content={key} />
        <meta name="description" content={des} />

        <meta property="og:url" content={window.location.href} />
        <meta property="og:title" content={meta} />
        <meta property="og:description" content={meta} />
      </Helmet>
      <Col xs={20} md={13} lg={15}>
        <Card className="convert convert__box">
          <Row style={{ widht: "100%" }}>
            <h1>Thay Đổi kích thước ảnh</h1>
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
              <p>Với trình <strong><a href="https://convert68.com" title="chỉnh sửa hình ảnh miễn phí">chỉnh sửa hình ảnh miễn phí</a></strong> này, bạn không cần phải cài đặt phần mềm hay sử dụng những công cụ khác để chỉnh sửa kích thước ảnh của mình. Không chỉ hỗ trợ các tính năng đơn giản như giải nén ảnh, định dạng file, hệ thống của chúng tôi còn hỗ trợ cho bạn tính năng thay đổi kích thước ảnh online. Chỉ với một cú click duy nhất, bạn đã có thể thay đổi kích thước ảnh một cách dễ dàng và tiện lợi.</p>
          <h2>Giới Thiệu Tính Năng Thay Đổi Kích Thước Ảnh tại convert68 </h2>
          <p>Chức năng thay đổi kích thước ảnh là một tính năng cho phép người dùng thay đổi kích thước của hình ảnh một cách dễ dàng và nhanh chóng. Việc thay đổi kích thước ảnh giúp người dùng điều chỉnh độ phân giải, kích thước của hình ảnh theo mục đích sử dụng mà không làm giảm chất lượng hình ảnh.</p>
          <p>Với một loạt các tùy chọn kích thước ảnh hiện có, Convert68 cho phép các bạn tùy chỉnh kích thước ảnh theo chiều ngang và chiều cao tùy ý chỉ với một cú click chuột.</p>
          <p>Bạn không cần cài đặt thêm phần mềm hay phải có kiến thức chuyên môn để thay đổi kích thước ảnh, việc duy nhất cần làm là tải ảnh lên, chọn size và tải ảnh về khi chỉnh sửa xong. Ngoài ra, hệ thống cũng hỗ trợ thay đổi kích thước file giúp bạn có hình ảnh đẹp nhất và cho phép chỉnh sửa nhiều ảnh cùng lúc.</p>
          <p>Lý Do Nên Sử Dụng Tính Năng Thay Đổi Kích Thước Ảnh Tại Convert68</p>
          <h2>Lý Do Nên Sử Dụng Tính Năng Thay Đổi Kích Thước Ảnh Tại Convert68</h2>
          <h3>Miễn phí, dễ dàng sử dụng:</h3>
          <p><strong><a href="https://convert68.com">Convert68</a></strong> là một công cụ hoàn toàn miễn phí, không yêu cầu đăng ký hoặc đăng nhập. Bạn không cần phải tải các phần mềm của bên thứ ba khác, không chiếm dung lượng lưu trữ, cũng không cần lo lắng máy sẽ nhiễm phần mềm độc hại hay virus.</p>
          <p>Với giao diện trực quan và đơn giản, trang web cho phép bất cứ ai, ngay cả những người không chuyên về chỉnh sửa ảnh, cũng có thể sử dụng tính năng thay đổi kích thước ảnh một cách dễ dàng. Như vậy, bạn có thể sử dụng tính năng thay đổi kích thước ảnh mọi lúc, mọi nơi mà không bị bất cứ giới hạn nào.</p>
          <h3>Tốc độ nhanh, điều chỉnh kích thước ảnh dễ dàng:</h3>
          <p>Với một cú click chuột, Convert68 sẽ ngay lập tức thực hiện thay đổi kích thước ảnh của bạn. Không cần chờ đợi lâu, điều này giúp bạn tiết kiệm thời gian và tăng năng suất làm việc. Không những chỉnh sửa một ảnh, mà công cụ này cũng có khả năng thay đổi hàng loạt các file ảnh.</p>
          <p>Tiện ích này giúp tiết kiệm thời gian và tiết kiệm chi phí, nhất là trong trường hợp người dùng cần chụp hoặc phải chỉnh sửa một thư viện ảnh đồ sộ. Các bức ảnh được trả về sẽ cho kích thước giống hệt nhau, phù hợp với nhu cầu chỉnh sửa của bạn trước khi chỉnh sửa. Đây cũng là một ưu điểm vượt trội của công cụ online so với phần mềm offline.</p>
          <h3>Thao tác đơn giản không làm giảm chất lượng:</h3>
          <p>Giao diện được thiết kế theo hướng tối giản, giúp tất cả người dùng đều có thể dễ dàng sử dụng. Các thao tác để thay đổi kích thước ảnh sẽ bao gồm tải ảnh lên website và chờ xử lý, sau đó tải xuống website là người dùng đã hoàn tất.</p>
          <p>Tuỳ thuộc vào kích thước ảnh tải lên website sẽ có thời gian chờ khác nhau nhưng nhìn chung quá trình xử lý nếu lâu cũng sẽ diễn ra tầm 1-2 phút, hoặc là một vài giây nếu bạn cần chỉnh sửa thêm ảnh. Đặc biệt, hình ảnh sau khi thay đổi kích thước vẫn sắc nét và chất lượng không thay đổi.</p>
          <h2>Hướng Dẫn Sử Dụng Tính Năng Thay Đổi Kích Thước Ảnh tại convert</h2>
          <p>Để sử dụng tính năng thay đổi kích thước ảnh trên Convert68, bạn chỉ cần làm như sau:</p>
          <ul><li>Bước 1: Mở máy tính của bạn và nhấp vào đường link: Convert68.com</li>
          <li>Bước 2: Tải lên ảnh mà bạn muốn thay đổi kích thước bằng cách kéo và thả ảnh vào vùng chọn hoặc nhấp vào nút "Chọn ảnh" và lưu trong máy tính của bạn.</li>
          <li>Bước 3: Chọn kích thước bạn muốn thay đổi trên ảnh của mình. Bạn có thể chọn lựa các kích thước mong muốn hoặc tự do thay đổi kích thước theo chiều ngang và chiều cao mong muốn.</li>
          <li>Bước 4: Sau khi đã chọn kích thước, nhấp vào nút "Thay đổi kích thước" và chờ cho công cụ hoàn tất việc thay đổi kích thước.</li>
          <li>Bước 5: Cuối cùng, bạn có thể tải xuống ảnh đã được thay đổi kích thước bằng cách nhấp vào nút "Tải xuống".</li></ul>
          <p>kết luận:</p>
          <p>Với Convert68, việc thay đổi kích thước hình ảnh không còn là nỗi lo. Công cụ này không những giúp bạn tiết kiệm thời gian mà còn đảm bảo hình ảnh của bạn sẽ luôn đẹp và phù hợp với từng mục đích sử dụng. Chỉ với một cú click chuột, bạn có thể thay đổi kích thước ảnh một cách dễ dàng và nhanh chóng. Hãy trải nghiệm tính năng này ngay hôm nay và cảm nhận những tiện ích mà Convert68 mang lại!</p>
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

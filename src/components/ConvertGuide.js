import {Card, Col, Divider, Row} from "antd";
import Title from "./Title";
import "./ConvertFile.css";

function ConvertGuide(props){
	const {from, to} = props;

	return <Card style={{marginTop: 20}} className="guide">
		<Title>Làm cách nào để chuyển đổi {from} sang {to} trực tuyến?</Title>
		<div>Hướng dẫn từng bước để chuyển đổi {from} sang {to} miễn phí. Nó hoạt động trên PC (Windows, Mac, Linux) và thiết bị di động (iPhone, Android).</div>
		<Divider></Divider>
		<Row gutter={20} justify='center'>
			<Col sm={8} className="guide__item">
				<div className="img"><img src="/images/guide-upload.png" alt="upload"/></div>
				<h3 className="title">Tải lên tệp {from}</h3>
				<div>
					<p>Kéo và thả tệp {from} của bạn vào khu vực tải lên.</p>
					<p>Kích thước tệp tối đa là 100 MB.</p>
				</div>
			</Col>
			<Col sm={8} className="guide__item">
				<div className="img"><img src="/images/guide-process.png" alt="upload"/></div>
				<h3 className="title">đổi {from} sang {to}</h3>
				<div>
					<p>Nhấp vào "Chuyển đổi" để thay đổi {from} thành {to}</p>
					<p>Quá trình chuyển đổi thường mất vài giây.</p>
				</div>
			</Col>
			<Col sm={8} className="guide__item">
				<div className="img"><img src="/images/guide-download.png" alt="upload"/></div>
				<h3 className="title">Tải xuống tệp {to}</h3>
				<div>
					<p>Bây giờ bạn có thể tải xuống tệp {to}.</p>
					<p>Liên kết tải xuống chỉ hoạt động trên thiết bị của bạn.</p>
				</div>
			</Col>
		</Row>
	</Card>
}
export default ConvertGuide;
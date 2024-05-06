import {Card, Col, Divider, Row} from "antd";
import Title from "./Title";
import "./ConvertFile.css";

function ConvertGuideNenAnh(props){
	const {from, to} = props;

	return <Card style={{marginTop: 20}} className="guide">
		<h1>Giải Nén Hình Ảnh - Giảm Dung Lượng Hình Ảnh Hàng Loạt</h1>
		<div>Hướng dẫn từng bước để để giảm dung lượng hình ảnh miễn phí. Trang web hoạt động trên PC (Windows, Mac, Linux) và thiết bị di động (iPhone, Android), có thể giải nén mọi thể loại Như png, jpg, jpeg để hoạt động tốt hơn.</div>
		<Divider></Divider>
		<Row gutter={20} justify='center'>
			<Col sm={8} className="guide__item">
				<div className="img"><img src="/images/guide-upload.png" alt="upload"/></div>
				<h3 className="title">Tải lên tệp png / JPG / JPEG</h3>
				<div>
					<p>Kéo và thả tệp cần giải nén của bạn vào khu vực tải lên.</p>
					<p>Kích thước tệp tối đa là 100 MB.</p>
				</div>
			</Col>
			<Col sm={8} className="guide__item">
				<div className="img"><img src="/images/guide-process.png" alt="upload"/></div>
				<h3 className="title">Giải Nén / Giảm Dung lượng Hình Ảnh</h3>
				<div>
					<p>Nhấp vào UPdate để giải nén</p>
					<p>Quá trình chuyển đổi thường mất vài giây.</p>
				</div>
			</Col>
			<Col sm={8} className="guide__item">
				<div className="img"><img src="/images/guide-download.png" alt="upload"/></div>
				<h3 className="title">Tải xuống tệp đã hoàn thành giản Nén</h3>
				<div>
					<p>Bây giờ bạn có thể tải xuống tệp hoàn thành .</p>
					<p>Liên kết tải xuống chỉ hoạt động trên thiết bị của bạn.</p>
				</div>
			</Col>
		</Row>
		<p><a href="https://convert68.com">Convert68</a> là một công cụ chỉnh sửa hình ảnh trực tuyến hoàn toàn miễn phí giúp người dùng giải nén ảnh một cách nhanh chóng và dễ dàng. Đây không chỉ đơn giản là công cụ hỗ trợ giải nén tệp tin hình ảnh, mà còn có những tính năng nổi bật mang lại trải nghiệm tốt cho người dùng. Với khả năng tương thích cao và tốc độ xử lý nhanh, công cụ này là một lựa chọn tốt cho tất cả các thiết bị.</p>
		<h2>Tại Sao Cần Giải Nén - Giảm Dung Lượng Hình Ảnh ?</h2>
		<p>Giải nén ảnh hay giảm dung lượng ảnh là việc nén dung lượng tệp mà không ảnh hưởng đến chất lượng hoặc chức năng của nó. Việc sử dụng chức năng giải nén ảnh được sử dụng để giảm kích cỡ của file ảnh mà vẫn mang lại chất lượng tệp cao nhất có thể.</p>
		<p>Khi một bức ảnh được tạo ra nó thường có dung lượng lớn,  độ phân giải cao nếu không giải nén nó thì bạn sẽ rất khó để có thể truyền tải bức ảnh này tới với người khác. Giả sử, bạn muốn đăng bức ảnh đó lên trên mạng xã hội, gửi email hoặc thậm chí đăng lên trang web, thì việc giữ cho dung lượng của ảnh ở mức thấp là cần thiết nhằm tăng tốc độ tải trang và giảm dung lượng lưu trữ.</p>
		<p>Quá trình này có thể bao gồm các bước như nén ảnh, giảm dung lượng, lựa chọn định dạng file phù hợp và xoá bỏ các nội dung không cần thiết khỏi file ảnh. Mục đích chính là việc thực hiện giảm dung lượng nhưng vẫn đảm bảo được chất lượng hình ảnh cao.</p>
		<h2>Cách Sử Dụng Công Cụ Giải Nén Hình Ảnh Tại Convert68</h2>
		<ul><li>Bước 1: Truy cập trang web: Đầu tiên, hãy truy cập vào trang web Convert68 bằng cách nhập "convert68.com" vào thanh tìm kiếm của các trang trình duyệt như google, cốc cốc, safari, chrome,...v.v. </li>
		    <li>Bước 2: Chọn công cụ giải nén hình ảnh: Trên trang chủ của Convert68, bạn sẽ thấy nhiều công cụ khác nhau. Tìm và nhấp vào công cụ "Giải Nén Hình Ảnh" để truy cập vào chức năng giải nén.</li>
		    <li>Bước 3: Tải lên hình ảnh: Bạn có thể tải lên hình ảnh một cách thuận tiện bằng cách kéo và thả các tệp hình ảnh hoặc nhấp vào nút "Chọn tập tin" để duyệt qua các tệp hình ảnh trên thiết bị của bạn.</li>
		    <li>Bước 4: Bắt đầu giải nén: Khi bạn đã hoàn tất cài đặt, nhấp vào nút "Bắt đầu" để bắt đầu quá trình giải nén. Hệ thống sẽ xử lý các hình ảnh và tạo ra link tải xuống các hình ảnh đã giải nén hoàn tất. </li>
		    <li>Bước 5: Tải xuống hình ảnh đã giải nén: Sau khi quá trình giải nén thành công, bạn có thể tải xuống các hình ảnh đã giải nén bằng cách nhấp vào link được cung cấp, tải file về và sử dụng ngay. </li></ul>
		<h2>Việc nén ảnh / giảm dung lượng ảnh có tác dụng gì?</h2>
		<h3>Đối Với Người dùng</h3>
		<p>việc giảm dung lượng ảnh sẽ giúp mang lại nhiều lợi ích cho người dùng như:</p>
            <ul>
                <li>hạ thấp dung lượng hình ảnh, Dễ dàng gửi đi cho người khác</li>
                <li>Hỗ trợ tiết kiệm bộ nhớ lưu trữ trên máy tính.</li>
            </ul>
        <h3>Đối Với Trang Web </h3>
        <p>việc giảm dung lượng hình ảnh trên trang web sẽ giúp tối ưu cho trang mở được nhanh hơn và giúp cho trang dễ dàng lên top, có những lợi ích như sau:</p>
            <ul>
                <li>hạ thấp dung lượng hình ảnh, giúp trang web truy cập được nhanh và ổn định</li>
                <li>Không chiếm nhiều dung lượng của trang, giúp tăng tối ưu hình ảnh cho trang web</li>
                <li>Giúp cho trang web được đánh giá tốt và có lợi thế cho việc giữ và leo top</li>
            </ul>
        <p>Kết luận:</p>
<p>Giải nén ảnh hay giảm dung lượng hình ảnh là một bước quan trọng trong quá trình tối ưu hóa hình ảnh. Bằng cách sử dụng công cụ giải nén ảnh trực tuyến Convert68, bạn có thể dễ dàng giảm kích thước file mà không làm mất đi chất lượng hình ảnh. Đồng thời, việc sử dụng công cụ chỉnh sửa hình ảnh này còn giúp các bạn nhận được những lợi ích không ngờ tới. Hãy bắt đầu giải nén ảnh của bạn ngay hôm nay!</p>

	</Card>
}
export default ConvertGuideNenAnh;
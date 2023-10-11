import React, {useEffect, useState} from "react";
import {Alert, Button, Card, Col, Image, Modal, Progress, Row, Select, Spin, Tag, Tooltip} from "antd";
import {
	ArrowRightOutlined,
	CloudUploadOutlined,
	DeleteOutlined,
	DownloadOutlined,
	ReloadOutlined
} from "@ant-design/icons";
import "./ConvertFile.css";
import axios from "axios";

const getBase64 = (file) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});


const CONVERT_OPTIONS = {
	jpeg: ["png", "gif", "pdf", "ico"],
	jpg: ["tinyPNG", "png", "gif", "pdf", "ico"],
	png: ["tinyPNG", "jpeg", "jpg", "pdf", "ico"],
}


function ItemUpload(props) {
	const {file} = props;
	const [previewOpen, setPreviewOpen] = useState(false);
	const [previewImage, setPreviewImage] = useState("");
	const [previewTitle, setPreviewTitle] = useState("");
	const [error, setError] = useState("")
	const [optionType, setOptionType] = useState([]);
	const [downloadLink, setDownloadLink] = useState('');
	const [statusUpload, setStatusUpload] = useState(0); // 0: Submit, 1: Loading, 2: Success, 3: Error
	const [fileConverted, setFileConverted] = useState({});
	const [percent, setPercent] = useState(0);
	const [isException, setIsException] = useState(false);
	const [selectedOption, setSelectedOption] = useState('')

	useEffect(async () => {
		if (file) {
			const dataType = file.type.split("/")[1];
			const options = CONVERT_OPTIONS[dataType] && CONVERT_OPTIONS[dataType].map((item) => {
				return {value: item, label: item.toUpperCase()}
			})
			if (!file.url && !file.preview) {
				file.preview = await getBase64(file.originFileObj);
			}
			setOptionType(options)
			options && setSelectedOption(options[0].value)
		}
	}, [file])


	const handlePreview = async (file) => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj);
		}
		setPreviewImage(file.url || file.preview);
		setPreviewOpen(true);
		setPreviewTitle(
			file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
		);
	};

	const onChangeType = (value) => {
		setSelectedOption(value);
	}

	const handleCancel = () => setPreviewOpen(false);

	const handleDownloadClick = () => {
		const xhr = new XMLHttpRequest();
		xhr.open("GET", downloadLink, true);
		xhr.responseType = "blob";
		xhr.onload = function () {
			const urlCreator = window.URL || window.webkitURL;
			const imageUrl = urlCreator.createObjectURL(this.response);
			const tag = document.createElement("a");
			tag.href = imageUrl;
			tag.download = downloadLink.lastIndexOf("/") + 1;
			document.body.appendChild(tag);
			tag.click();
			document.body.removeChild(tag);
		};
		xhr.send();
	};

	const onRetryFile = () => {
		setFileConverted({});
		setDownloadLink('');
		setStatusUpload(0)
	}

	const handleUploadClick = (file, _this) => {
		setStatusUpload(1);
		let formData = new FormData();
		formData.append("file", file.originFileObj);
		formData.append("to", selectedOption);

		const config = {
			onUploadProgress: progressEvent => {
				setPercent(progressEvent.progress * 100)
			}
		}

		axios.post('http://convert.getlinktraffic.space/convert.php', formData, config).then((res) => {
			const {data, message, error} = res.data;
			if (res.data.success) {
				setFileConverted(JSON.parse(data))
				setDownloadLink(message)
				setStatusUpload(2);
			} else {
				setError(error || res.data)
				setStatusUpload(3)
			}
		}).catch((err) => {
			setStatusUpload(0)
			setIsException(true)
		});
	};


	return <Card className="card_upload">
		<Row align='middle' gutter={20}>
			<Col xs={24} lg={8}>
				<Row align='middle' justify='start' gutter={20}>
					<Col xs={4}>
						<Image
							style={{maxHeight: 40}}
							src={file.preview}
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
				{statusUpload === 1 ?
					<Row>
						<Progress
							strokeColor={{'0%': '#243B55', '100%': '#141E30'}}
							percent={percent} showInfo={false} status={isException ? 'exception' : 'normal'}/>
					</Row> :
					<Row align='middle'>
						<Col sm={15} md={10}>
							{statusUpload !== 3 && <Row gutter={20} align='middle'>
								<Col>
									<Select
										value={selectedOption}
										disabled={downloadLink && fileConverted}
										onChange={(value) => onChangeType(value)}
										id={file.uid}
										style={{width: 120}}
										options={optionType}
										size="large"
									/>
								</Col>
								<Col>
									<Tag color="red">
										<b>{Math.round(file.size / 1024)}KB</b>
									</Tag>&nbsp;<ArrowRightOutlined/>&nbsp;
									<Tag color="success">
										<Spin spinning={statusUpload === 1}>
											<b>{fileConverted.newSize || '... KB'}</b>
										</Spin>
									</Tag>
								</Col>
							</Row>}
						</Col>
						<Col sm={statusUpload === 3 ? 24 : 9} md={statusUpload === 3 ? 24 : 14} style={{textAlign: 'right'}} className="action">
							{statusUpload === 0 || statusUpload === 1 ? <div className="action">
								<Button
									loading={statusUpload === 1}
									type="primary"
									className="btn__upload"
									icon={
										<CloudUploadOutlined
											style={{color: "white"}}
										/>
									}
									size="large"
									onClick={() => handleUploadClick(file)}
								>Upload</Button>
								<Tooltip title="Remove file">
									<Button
										size="large"
										type="dashed"
										danger
										icon={
											<DeleteOutlined
												style={{color: "#cf1323"}}
											/>
										}
										onClick={(file) => props.onRemove(file)}
										style={{marginLeft: "5px"}}
									></Button>
								</Tooltip>
							</div> : <div className="action">
								{statusUpload === 3 && <Alert message={error} type="error" showIcon/>}
								{statusUpload !== 3 &&
									<div onClick={() => handleDownloadClick()} className="btn__download"><DownloadOutlined/>Download
									</div>}
								<Tooltip title="Try another type">
									<Button
										size="large"
										type='primary'
										ghost
										icon={
											<ReloadOutlined
												style={{color: "#2267c7"}}
											/>
										}
										onClick={() => onRetryFile()}
										style={{marginLeft: "5px"}}
									></Button>
								</Tooltip>
							</div>}

						</Col>
					</Row>}
			</Col>
		</Row>
		<Modal
			open={previewOpen}
			title={previewTitle}
			footer={null}
			onCancel={handleCancel}
		>
			<img
				alt="example"
				style={{
					width: "100%",
				}}
				src={previewImage}
			/>
		</Modal>
	</Card>
}

export default ItemUpload;
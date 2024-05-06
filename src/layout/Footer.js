import {Button, Col, Drawer, Layout, Row} from "antd";
import {Link, NavLink} from "react-router-dom";
import './Header.css';
import LinkButton from "../components/LinkButton";
import { useState} from "react";
import {InteractionOutlined, MenuOutlined} from '@ant-design/icons';
import { Footer } from "antd/es/layout/layout";

const {Header} = Layout;

const MENU = [
	{label: 'Blog', to: '/blog'},
	// {label: 'Tin tức nước ngoài', to: '/news'},
	{label: 'Chuyên mục', to: '/chuyenmuc'},
	// {label: 'Khoa Học', to: '/science'},
	// {label: 'Công Nghệ', to: '/tech'},
]

function FooterCustom() {
	const [open, setOpen] = useState(false);

	const showDrawer = () => {
		setOpen(true);
	};

	const onClose = () => {
		setOpen(false);
	};

	return <Footer style={{ textAlign: 'center' }}>
	Convert68 ©{new Date().getFullYear()} Trình Duyệt Chỉnh Sửa Hình Ảnh Miễn Phí
  </Footer>
}

export default FooterCustom;
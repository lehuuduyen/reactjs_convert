import {Button, Col, Drawer, Layout, Row} from "antd";
import {Link, NavLink} from "react-router-dom";
import './Header.css';
import LinkButton from "../components/LinkButton";
import {useEffect, useState} from "react";
import {InteractionOutlined, MenuOutlined} from '@ant-design/icons';

const {Header} = Layout;

const MENU = [
	{label: 'Blog', to: '/blog'},
	{label: 'Tin tức nước ngoài', to: '/news'},
	{label: 'Thời tiết', to: '/health'},
	// {label: 'Khoa Học', to: '/science'},
	// {label: 'Công Nghệ', to: '/tech'},
]

function HeaderCustom() {
	const [open, setOpen] = useState(false);

	const showDrawer = () => {
		setOpen(true);
	};

	const onClose = () => {
		setOpen(false);
	};

	return <Header className="header" style={{
		position: 'sticky',
		top: 0,
		zIndex: 100,
		width: '100%',
		marginBottom: 20,
		display: 'flex',
		alignItems: 'center',
	}}>
		<Layout>
			<Row>
				<Col xs={18} lg={4} className="header__logo">
					<Link to=""><h1>Newsmonk</h1></Link>
				</Col>
				<Col xs={0} lg={20} className="header__right">
					<Row>
						<Col xs={18}>
							<nav className="header__nav">
								{MENU.map((item, index) =>
									<NavLink key={index} to={item.to}
													 className={({isActive}) => (isActive ? 'active' : '')}>{item.label}</NavLink>)}
							</nav>
						</Col>
						<Col xs={6} className="header__action">
							<LinkButton to="/convert">Chuyển đổi File</LinkButton>
						</Col>
					</Row>
				</Col>
				<Col xs={6} lg={0}>
					<div className='action'>
						<NavLink to="/convert" className="btn__upload"><InteractionOutlined style={{color: 'white', fontSize: 20}}/></NavLink>
						<Button type="primary" onClick={showDrawer} icon={<MenuOutlined/>} className='btn__upload'>
						</Button>
						<Drawer placement="right" onClose={onClose} open={open} className='menu_drawer'>
							{MENU.map((item, index) => <NavLink key={index} to={item.to} onClick={onClose}>{item.label}</NavLink>)}
						</Drawer>
					</div>
				</Col>
			</Row>
		</Layout>
	</Header>
}

export default HeaderCustom;
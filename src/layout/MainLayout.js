import Header from "./Header";
import Footer from "./Footer";
import React from "react";
import {Outlet} from "react-router-dom";

function MainLayout() {
	return <>
		<Header/>
		<Outlet/>
		<Footer/>

	</>
}

export default MainLayout;
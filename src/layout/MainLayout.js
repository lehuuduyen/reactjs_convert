import Header from "./Header";
import React from "react";
import {Outlet} from "react-router-dom";

function MainLayout() {
	return <>
		<Header/>
		<Outlet/>
	</>
}

export default MainLayout;
import "./App.css";
// f59178ab70df48bc83797911eebc20d9
import React from "react";
//react-router
import { Route, Routes as ReactRoutes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Blog from "./components/blog";
import MainLayout from "./layout/MainLayout";
import Detail from "./components/Detail";
import Weather from "./components/Weather";
import News from "./components/News";
import DetailNews from "./components/DetailNews";
import ChuyenMuc from "./components/ChuyenMuc";
import ChuyenMucItem from "./components/ChuyenMucItem";
import DetailChuyenMuc from "./components/DetailChuyenMuc";

function App() {
  return (
    <ReactRoutes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/convert/" element={<Home />} />
        <Route path="/weather/" element={<Weather />} />
        <Route path="/convert/:id" element={<Home />} />
        <Route path="/blog/:id" element={<Detail />} />
        <Route path="/chuyenmuc/:id" element={<DetailChuyenMuc />} />

        <Route
          path="/blog"
          element={
            <Blog key={"Blog"} pageSize={9} country="in" category="Blog" />
          }
        ></Route>
        <Route
          path="/chuyenmuc"
          element={
            <ChuyenMuc key={"Chuyenmuc"} pageSize={9} country="in" category="Chuyenmuc" />
          }
        ></Route>
        {/* <Route
          path="/news"
          element={
            <News
              key={"Tin mới nhất"}
              pageSize={9}
              country="in"
              category="Tin mới nhất"
            />
          }
        ></Route> */}
      </Route>
    </ReactRoutes>
  );
}

export default App;

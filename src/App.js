import "./App.css";
// f59178ab70df48bc83797911eebc20d9
import React from "react";
//react-router
import {Route, Routes as ReactRoutes} from "react-router-dom";
import Home from "./pages/Home/Home";
import Blog from "./components/blog";
import MainLayout from "./layout/MainLayout";
import Detail from "./components/Detail";
import Weather from "./components/Weather";

function App() {
	return (
		<ReactRoutes>
		<Route element={<MainLayout/>}>
			<Route index element={<Home/>}/>
			<Route path="/convert/" element={<Home/>}/>
			<Route path="/weather/" element={<Weather/>}/>
			<Route path="/convert/:id" element={<Home/>}/>
			<Route path="/blog/:id" element={<Detail/>}/>

			<Route
				path="/blog"
				element={
					<Blog
						key={"Blog"}
						pageSize={9}
						country="in"
						category="Blog"
					/>
				}
			></Route>
			
			{/* <Route exact path="/Science">
              <News
                key={"science"}
                pageSize={9}
                country="in"
                category="science"
              />
            </Route>
            <Route exact path="/Entertainment">
              <News
                key={"entertainment"}
                pageSize={9}
                country="in"
                category="entertainment"
              />
            </Route>
            <Route exact path="/Sports">
              <News
                key={"sports"}
                pageSize={9}
                country="in"
                category="sports"
              />
            </Route>
            <Route exact path="/Tech">
              <News
                key={"tech"}
                pageSize={9}
                country="in"
                category="technology"
              />
            </Route>
            <Route exact path="/Health">
              <News
                key={"health"}
                pageSize={9}
                country="in"
                category="health"
              />
            </Route> */}
		</Route>
		</ReactRoutes>
	);
}

export default App;

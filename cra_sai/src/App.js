import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Route } from "react-router-dom";
import SAI_Aside from "./components/SAI_Aside";
import Button from "./components/Button";
import Modal from "./components/Modal";
import Tabmenu from "./components/TabMenu";
import Header from "./components/Header";
import Home from "./components/Home";

const App = () => {
	return (
		<div className="sai">
			<BrowserRouter>
				<Header />
				<div className="sai_container">
					<SAI_Aside />
					<section className="sai_container">
						<Route path="/Home" exact={true} component={Home} />
						<Route path="/Button" exact={true} component={Button} />
						<Route path="/Modal" exact={true} component={Modal} />
						<Route path="/Tabmenu" exact={true} component={Tabmenu} />
						{/* <Route path="/Swiper" exact={true} component={Swiper} /> */}
						{/* <Route path="/Weather" exact={true} component={Weather} /> */}
						{/* <Route path="/Video" exact={true} component={Video} /> */}
						{/* <Route path="/Form" exact={true} component={Form} /> */}
						{/* <Route path="/Tooltip" exact={true} component={Tooltip} /> */}
						{/* <Route path="/Bingo" exact={true} component={Bingo} /> */}
					</section>
				</div>
			</BrowserRouter>
		</div>
	);
};

export default App;

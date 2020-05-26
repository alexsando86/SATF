import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Route } from "react-router-dom";
import SAI_Aside from "./components/SAI_Aside";
import Button from "./components/Button";
import Modal from "./components/Modal";
import Tabmenu from "./components/TabMenu";

const App = () => {
	return (
		<div className="sai">
			<BrowserRouter>
				<SAI_Aside />
				<section className="sai_container">
					<Route path="/Button" exact={true} component={Button} />
					<Route path="/Modal" exact={true} component={Modal} />
					<Route path="/TabMenu" exact={true} component={Tabmenu} />
				</section>
			</BrowserRouter>
		</div>
	);
};

export default App;

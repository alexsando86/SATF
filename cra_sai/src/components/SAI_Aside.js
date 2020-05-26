import React from "react";
import { Route, Link } from "react-router-dom";

const SAI_Aside = () => {
	return (
		<aside className="sai_aside">
			<div className="sai_menu">
				<ul>
					<li>
						<Link to="/Button">Button</Link>
					</li>
					<li>
						<Link to="/Modal">Modal</Link>
					</li>
					<li>
						<Link to="/TabMenu">Tab Menu</Link>
					</li>
					<li>
						<a href="#">Swiper</a>
					</li>
					<li>
						<a href="#">Weahter</a>
					</li>
					<li>
						<a href="#">Video</a>
					</li>
					<li>
						<a href="#">Form</a>
					</li>
					<li>
						<a href="#">Tooltip</a>
					</li>
					<li>
						<a href="#">Promotion Bingo</a>
					</li>
				</ul>
			</div>
		</aside>
	);
};

export default SAI_Aside;

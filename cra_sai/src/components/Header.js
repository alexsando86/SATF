import React from "react";
import { Link } from "react-router-dom";

function Header() {
	return (
		<div className="sai_header">
			<div className="sai_header_logo">
				<Link to="/Home">SAI HOME</Link>
			</div>
		</div>
	);
}

export default Header;

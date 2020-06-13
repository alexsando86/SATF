import React from "react";
import { Link } from "react-router-dom";
import SAILOGO from "../images/common/logo_sai.png";

function Header() {
	return (
		<div className="sai_header">
			<div className="sai_header_logo">
				<Link to="/Home">
					<img src={SAILOGO} alt="logo" />
				</Link>
			</div>
		</div>
	);
}

export default Header;

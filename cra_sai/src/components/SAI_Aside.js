import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";

const SAI_Aside = () => {
	const addrUrls = ["/Button", "/Modal", "/TabMenu", "/Swiper", "/Weather", "/Video", "/Form", "/Tooltip", "/Bingo"];
	const [selectedIndex, setSelectedIndex] = useState(0);

	function addRemoveActiveClass(idx) {
		setSelectedIndex(idx);
	}

	return (
		<aside className="sai_aside">
			<div className="sai_menu">
				<ul>
					{addrUrls.map((elem, idx) => (
						<li key={idx} className={idx === selectedIndex ? "active" : ""}>
							<Link to={elem} onClick={(e) => addRemoveActiveClass(idx)}>
								{elem.slice(1)}
							</Link>
						</li>
					))}
				</ul>
			</div>
		</aside>
	);
};

export default SAI_Aside;

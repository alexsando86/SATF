import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";

const SAI_Aside = () => {
	const saiMenuLiRef = useRef([]);
	const [addrUrls, setAddrUrls] = useState([]);
	const [clsName, setClsName] = useState("");

	useEffect(() => {
		let addrUrls = ["/Button", "/Modal", "/TabMenu", "/Swiper", "/Weather", "/Video", "/Form", "/Tooltip", "/Bingo"];
		saiMenuLiRef.current = new Array(addrUrls.length);
		setAddrUrls(addrUrls);
		setClsName("active");
	}, [clsName]);

	function addRemoveActiveClass(e) {
		const liElem = e.target.parentNode;

		if (!liElem.classList.contains(clsName)) {
			liElem.classList.add(clsName);
		}
	}

	return (
		<aside className="sai_aside">
			<div className="sai_menu">
				<ul>
					{addrUrls.map((elem, idx) => (
						<li key={idx} ref={saiMenuLiRef.current[idx]}>
							<Link to={elem} onClick={addRemoveActiveClass}>
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

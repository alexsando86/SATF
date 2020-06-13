import React, { useRef, useState, useEffect } from "react";

const Modal = () => {
	const saiModalBtn = useRef([]);
	const saiModalWrap = useRef(null);
	const [data, setData] = useState([]);

	useEffect(() => {
		let data = ["modal1", "modal2", "modal3", "modal4", "modal5"];
		saiModalBtn.current = new Array(data.length);
		setData(data);
	}, []);

	function addActiveClass(e) {
		const self = e.target.dataset.modalCount;
		saiModalWrap.current.className = 'sai_modal_wrap';
		saiModalWrap.current.classList.add(self, "active");
	}

	function removeActiveClass(e) {
		let self = e.target;
		if (!self.classList.contains("sai_modal_cts")) {
			saiModalWrap.current.classList.add("out");
		}
	}

	return (
		<React.Fragment>
			<div className="sai_contents">
				<div className="sai_modal_btnset">
					{data.map((el, i) => (
						<button key={i} type="button" className="sai_modal_btn" data-modal-count={el} ref={saiModalBtn.current[i]} onClick={addActiveClass}>
							{el}
						</button>
					))}
				</div>
			</div>
			<div className="sai_modal_wrap" ref={saiModalWrap}>
				<div className="sai_modal" onClick={removeActiveClass}>
					<div className="sai_modal_cts">안녕하세요 SAI Modal 입니다.</div>
				</div>
			</div>
		</React.Fragment>
	);
};
export default Modal;

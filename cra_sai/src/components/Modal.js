import React, { useEffect } from "react";

const Modal = () => {
	function addActiveClass(e) {
		const self = e.target.dataset.modalCount;
		document.querySelector(".sai_modal_wrap").classList.add(self, "active");
	}

	return (
		<React.Fragment>
			<div className="sai_contents">
				<div className="sai_modal_btnset">
					<button type="button" className="sai_modal_btn" data-modal-count="modal1" onClick={addActiveClass}>
						Modal1
					</button>
					<button type="button" className="sai_modal_btn" data-modal-count="modal2">
						Modal2
					</button>
					<button type="button" className="sai_modal_btn" data-modal-count="modal3">
						Modal3
					</button>
					<button type="button" className="sai_modal_btn" data-modal-count="modal4">
						Modal4
					</button>
					<button type="button" className="sai_modal_btn" data-modal-count="modal5">
						Modal5
					</button>
				</div>
			</div>
			<div className="sai_modal_wrap">
				<div className="sai_modal">
					<div className="sai_modal_cts">안녕하세요 SAI Modal 입니다.</div>
				</div>
			</div>
		</React.Fragment>
	);
};
export default Modal;

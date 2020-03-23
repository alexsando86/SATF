$(function() {
	var timeLine = new TimelineMax();
	timeLine.staggerFrom(".main_menu_lst li", 1, { left: "90%", scale: 0.2, ease: Power3.easeOut }, 0.15);

	$(".main_menu_lst li").hover(
		function() {
			TweenMax.to($(this), 0.2, { left: "90%", scale: "1.1" });
		},
		function() {
			TweenMax.to($(this), 0.2, { left: "90%", scale: "1" });
		}
	);

	var btnClick = false;

	$(".btn_order").on({
		click: function() {
			if (!btnClick) {
				btnClick = true;
				btnProgress.init();
			}
		}
	});
});

const btnProgress = {
	init: function() {
		this.progress();
	},
	progress: function() {
		const btnOrder = document.querySelector(".btn_order");
		const btnOrderWrap = document.querySelector(".btn_order_wrap");
		const btnOrderTxt = document.querySelector(".btn_order_txt");
		const btnOrderPer = document.querySelector(".btn_order_per");
		const btnOrderStatus = document.querySelector(".per_status");
		const btnOrderCheck = document.querySelector(".complete_check");
		const btnOrderTm1 = TweenMax;
		const btnOrderTl1 = gsap.timeline();
		var startCount = 0,
			tm = 0.8,
			num = { var: startCount },
			numbers = document.getElementById("counter");

		btnOrderTm1.to(btnOrder, 0.7, { width: 100, height: 100, borderRadius: "100%", ease: "none" });
		btnOrderTm1.to(btnOrderWrap, 0.7, { width: 100, height: 100, ease: "none" });
		btnOrderTm1.to(btnOrderTxt, 0.7, { fontSize: 13, top: 24, ease: "none" });
		btnOrderTm1.to(btnOrderPer, 0.7, { fontSize: 25, top: 38, ease: "none" });
		btnOrderTm1.to(btnOrderStatus, 0.7, { width: 100, top: 0, left: 0, onComplete: countIt, ease: "none" });

		function countIt() {
			TweenMax.to(num, tm, { var: 100, onUpdate: changeNumber, onComplete: completeHandler, ease: Linear.easeNone });
		}

		function changeNumber() {
			numbers.innerHTML = num.var.toFixed();
		}

		function completeHandler() {
			btnOrderTm1.fromTo(btnOrder, 0.3, { scale: 0.9, yoyo: true, repeat: 3 }, { scale: 1.1, yoyo: true, onComplete: active2, repeat: 3 });
		}

		function active2() {
			btnOrderTm1.to(btnOrderTxt, { opacity: 0 });
			btnOrderTm1.to(btnOrderPer, { opacity: 0 });
			btnOrderTm1.to(btnOrderStatus, 0.3, { backgroundColor: "#009836" });
			btnOrderTm1.to(btnOrder, 0.3, { width: 130, height: 50, borderRadius: "24px", backgroundColor: "#009836" });
			btnOrderTl1.to(btnOrderCheck, 0.5, { display: "block", height: 15 }).to(btnOrderCheck, 1, { width: 25 });
		}
	}
};

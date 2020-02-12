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
});

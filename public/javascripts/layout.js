var url= window.location.href;
if(url.length<=22){
	$('#main-container').removeClass("ui fourteen wide column").addClass("ui sixteen wide column");
	$('#left-menu-container').hide()
}
if(window.location.href.indexOf("employees") > -1) {
	$('#flm-employee-module-button').css({'background-color': '#d19992'});
}
if(window.location.href.indexOf("payslip") > -1) {
	$('#flm-payslip-module-button').css({'background-color': '#d19992'});
}
if(window.location.href.indexOf("AR_view") > -1) {
	$('#flm-AR-module-button').css({'background-color': '#d19992'});
}
if(window.location.href.indexOf("checkvoucher") > -1) {
	$('#flm-check-voucher-module-button').css({'background-color': '#d19992'});
}
if(window.location.href.indexOf("pettycash") > -1) {
	$('#flm-petty-cash-module-button').css({'background-color': '#d19992'});
}

$('.ui.sidebar').sidebar('attach events', '.item.sidebar-button');
$('.ui.sidebar').sidebar({
	dimPage: false,
	closable: true
});

$('.sidebar .dropdown').dropdown({
	onHide: function(){
		$('.sidebar').css('z-index', 1);
	},
	onShow: function(){
		$('.sidebar').css('z-index', 103);
	},
	on: 'hover',
	dimPage: false
});
$('#employee-dropdown').click(function(){
	window.location.href = '/employees';
});
$('#controlpanel-dropdown').click(function(){
	window.location.href = '/controlpanel';
});

		script.
			$('.ui.sidebar').sidebar('attach events', '.item.sidebar-button');
			$('.ui.sidebar').sidebar({
				dimPage: false,
				closable: true
			});

		script.
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
		script.
			$(document).ready(function () {
				if(window.location.href.indexOf("employee") > -1) {
					$('#flm-employee-module-button').css({'background-color': '#d19992'});
				}
			});

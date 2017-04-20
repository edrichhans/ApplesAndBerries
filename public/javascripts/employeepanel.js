	script(type='text/javascript').
		var eID = -1;
		// Trigger action when the contexmenu is about to be shown
		$('tr').on("contextmenu", function (event) {
			eID = parseInt($(this).children('td').eq(1).attr('data-eid'));
			// Avoid the real one
			event.preventDefault();
			// Show contextmenu
			$(".custom-menu").finish().toggle(100).
			// In the right position (the mouse)
			css({
				top: event.pageY - 13 + "px",
				left: event.pageX + "px"
			});
		});


		// If the document is clicked somewhere
		$(document).bind("mousedown", function (e) {
			// If the clicked element is not the menu
			if (!$(e.target).parents(".custom-menu").length > 0) {
				// Hide it
				e.preventDefault();
				$(".custom-menu").hide(100);
			}
		});


		// If the menu element is clicked
		$(".custom-menu li").click(function(){
			// This is the triggered action name
			switch($(this).attr("data-action")) {
				// A case for each action. Your actions here
				case "edit":
					window.location = '/employees/editEmployee?eID=' + eID;
					break;
				case "delete":
					$('.small.modal').modal('show');
					break;
			}			
			$(".custom-menu").hide(100);
		});

		$('.submit#delete').click(function(){
			//- console.log(eID);
			$.post('/employees/deleteEmployee', {
				eID: eID
			}, function(){
				alert('delete success!');
				window.location.reload();
			});
		});

		$(document).ready(function(){
			var employee = $.grep(employees, function(e){ return e.eID === parseInt(eID) });
			console.log("em", employee);
			employee = employee[0];

			$('input#eID').val(employee.eID);
			$('input#inputName').val(employee.name);
			$('input#inputStartDate').val(employee.startDate);
			$('input#inputBirthday').val(employee.birthday);
			$('select#selectPosition').val((employee.position).toString()).change();
			$('select#selectStatus').val((employee.status).toString()).change();
			$('input#inputDependents').val(employee.dependents);
			$('input#inputBaseSalary').val(employee.salary);

			$('form#selectEmployee').addClass('hide');
			$('form#editEmployee').removeClass('hide');
		});
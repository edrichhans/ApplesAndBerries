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
			//- alert($(this).parent().attr('data-eid'));
			break;
		//- case "delete":
		//- 	$('.small.modal').modal('show');
		//- 	break;
	}			
		// Hide it AFTER the action was triggered
	$(".custom-menu").hide(100);
});

$('.submit').click(function(){
	$.post('/employees/deleteEmployee', {
		eID: eID
	}, function(){
		alert('delete success!');
		window.location.reload();
	});
});

var sendAjax = function(values, link, success_function){
	return $.ajax({
		url: link,
		type: "POST",
		datatype: "json",
		data: JSON.stringify(values),
		contentType: "application/json; charset=utf-8",
		cache: "false",
		timeout: "10000",
		complete: function(){
			console.log('process complete')
		},
		success: success_function(),
		error: function(){
			console.log('process error')
		},
	});
}

$('.ui.checkbox input').click(function(event){
	event.stopPropagation();
	//- return false;
})

$('#delete-payslip-button').click(function(){
	var checkboxes = $('.ui.checkbox input:checked').map(function(i, element){
		return $(element).data('an');
	});
	//- console.log(checkboxes);
	sendAjax(checkboxes, '/deletePaySlip', function(){
		console.log('process success');
		window.location.reload();
	});
});

$('tr.entry').click(function(){
	console.log($(this).data('an'));
	//adviceNumber, eID, issuedBy, dateIssued, company, deductibles_name, deductibles, allowance_name, allowance, startDate, endDate, PHreduc, SSSreduc, HDMFreduc, EmployerPH, EmployerSSS, EmployerHDMF, BIR, total
	sendAjax([$(this).data('an')], '/viewAllPaySlip', function(){
		console.log("process success");
	})
	.done(data => {
		console.log(data.data);
		$('#AN span').text(data.data[0].adviceNumber);
		$('#name span').text(data.data[1].name);
		$('#dateToday span').text(data.data[0].dateIssued);
		$('#company span').text(data.data[0].company);
		$('#dateStart span').text(data.data[0].startDate);
		$('#dateEnd span').text(data.data[0].endDate);
		$('#gross span').text(data.data[1].salary);
		$('#philHealth span').text(data.data[0].PHreduc);
		$('#SSS span').text(data.data[0].SSSreduc);
		$('#HDMF span').text(data.data[0].PHreduc);
		$('#BIR span').text(data.data[0].BIR);
		$('#philHealthER span').text(data.data[0].EmployerPH);
		$('#SSSER span').text(data.data[0].EmployerSSS);
		$('#HDMFER span').text(data.data[0].EmployerHDMF);
		try{
			data.data[0].deductibles.forEach(function(value, index){
				$('table#deductibles-table tbody').append('<tr><td>'+ data.data[0].deductibles_name[index] +'</td><td>'+ value +'</td></tr>');
			});

			data.data[0].allowance.forEach(function(value, index){
				$('table#allowance-table tbody').append('<tr><td>'+ data.data[0].allowance_name[index] +'</td><td>'+ value +'</td></tr>');
			});
		}
		catch(err){
			console.log(err);
		}
		$("#total span").text(data.data[0].total);
		$('.ui.basic.modal.view').modal('show');
	});
});

$('.ui.modal.view')
.modal({
	onHide: function(){
		$('.ui.modal').find('tbody tr').remove();
		$('#philHealth span').text('N/A');
		$('#SSS span').text('N/A');
		$('#HDMF span').text('N/A');
		$('#AN span').text('N/A');
	}
});

$('#print-payslip-button').click(function(){
		$('table#payslip-view-table').printThis({
			header: "<div style='width: 100%; margin: 0 auto;'><img style='width: 25%;' src='images/header.png'></img></div>"
		});
	});

$(document).ready(function(){
	$('#payslip-view-table').DataTable();
});
	
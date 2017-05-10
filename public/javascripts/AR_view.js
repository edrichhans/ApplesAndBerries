	// script(type='text/javascript').
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

$('#print-AR-button').click(function(){
	$('table').printThis({
		header: "<div style='width: 100%; margin: 0 auto;'><img style='width: 20%;' src='images/header.png'></img></div>"
	});
});

$('#delete-AR-button').click(function(){
	$('#confirm-delete-modal').modal('show');

	$('.submit#delete').click(function(){
		var checkboxes = $('.ui.checkbox input:checked').map(function(i, element){
			return $(element).data('an');
		});
		//- console.log(checkboxes);
		sendAjax(checkboxes, '/deleteAR', function(){
			$('#alert-delete-modal').modal('show');
			$('.submit#delete-alert').click(function(){
				window.location.reload();
			});
		});
	});
});

$(document).ready(function(){

	$.fn.dataTable.moment('ll');
	$.fn.dataTable.moment('LL');

	$('#AR-view-table').DataTable();
});

$('#ar-master-checkbox').change(function(){
	if(this.checked) $('.ar-checkbox').attr('checked', true);
	else $('.ar-checkbox').attr('checked', false);
});


$('#add-AR-button').hover(
	function(){ $('#add-AR-label').css('display','inline-block')},
		function(){ $('#add-AR-label').css('display', 'none')
});

$('#edit-AR-button').hover(
	function(){ $('#edit-AR-label').css('display','inline-block')},
		function(){ $('#edit-AR-label').css('display', 'none')
});

$('#delete-AR-button').hover(
	function(){ $('#delete-AR-label').css('display','inline-block')},
		function(){ $('#delete-AR-label').css('display', 'none')
});

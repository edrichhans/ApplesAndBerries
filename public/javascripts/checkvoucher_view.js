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

$('#delete-CV-button').click(function(){
	$('#confirm-delete-modal').modal('show');

	$('.submit#delete').click(function(){
		var checkboxes = $('.ui.checkbox input:checked').map(function(i, element){
			return $(element).data('an');
		});
		//- console.log(checkboxes);
		sendAjax(checkboxes, '/deleteCheckvoucher', function(){
			$('#alert-delete-modal').modal('show');
			$('.submit#delete-alert').click(function(){
				window.location.reload();
			});
		});
	});
});

$('#print-check-voucher-button').click(function(){
	$('table').printThis({
		header: "<div style='width: 100%; margin: 0 auto;'><img style='width: 20%;' src='images/header.png'></img></div>"
	});
});


$(document).ready(function(){
	$('#check-voucher-view-table').DataTable();
});

$('#cv-master-checkbox').change(function(){
	if(this.checked) $('.cv-checkbox').attr('checked', true);
	else $('.cv-checkbox').attr('checked', false);
});

$('#add-CV-button').hover(
	function(){ $('#add-CV-label').css('display','inline-block')},
		function(){ $('#add-CV-label').css('display', 'none')
});

$('#edit-CV-button').hover(
	function(){ $('#edit-CV-label').css('display','inline-block')},
		function(){ $('#edit-CV-label').css('display', 'none')
});

$('#delete-CV-button').hover(
	function(){ $('#delete-CV-label').css('display','inline-block')},
		function(){ $('#delete-CV-label').css('display', 'none')
});


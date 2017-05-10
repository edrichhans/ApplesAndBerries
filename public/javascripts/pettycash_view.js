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

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

$('#print-petty-cash-button').click(function(){
	$('table').printThis({
		header: "<div style='width: 100%; margin: 0 auto;'><img style='width: 20%;' src='images/header.png'></img></div>"
	});
});

$('#delete-petty-cash-button').click(function(){
	$('#confirm-delete-modal').modal('show');

	$('.submit#delete').click(function(){
		var checkboxes = $('.ui.checkbox input:checked').map(function(i, element){
			return $(element).data('an');
		});
		//- console.log(checkboxes);
		sendAjax(checkboxes, '/deletePettycash', function(){
			$('#alert-delete-modal').modal('show');
			$('.submit#delete-alert').click(function(){
				window.location.reload();
			});
		})
		.then((data) => {
			console.log(data);
			console.log('process success');
		});
	});
});

$(document).ready(function(){
	$.fn.dataTable.moment('ll');
	$.fn.dataTable.moment('LL');
	
	$('#petty-cash-view-table').DataTable();
});


$('#pettycash-master-checkbox').change(function(){
	if(this.checked) $('.pettycash-checkbox').attr('checked', true);
	else $('.pettycash-checkbox').attr('checked', false);
});

$('#add-petty-cash-button').hover(
	function(){ $('#add-petty-cash-label').css('display','inline-block')},
		function(){ $('#add-petty-cash-label').css('display', 'none')
});

$('#edit-petty-cash-button').hover(
	function(){ $('#edit-petty-cash-label').css('display','inline-block')},
		function(){ $('#edit-petty-cash-label').css('display', 'none')
});

$('#delete-petty-cash-button').hover(
	function(){ $('#delete-petty-cash-label').css('display','inline-block')},
		function(){ $('#delete-petty-cash-label').css('display', 'none')
});

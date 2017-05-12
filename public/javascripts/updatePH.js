$('.ui.dropdown').dropdown();

$(document).ready(function(){
	function compareCredit(a,b) {
		if (a.credit < b.credit)
			return -1;
		if (a.credit > b.credit)
			return 1;
		return 0;
	}

	function compareBracket(a,b) {
		if (a.bracket < b.bracket)
			return -1;
		if (a.bracket > b.bracket)
			return 1;
		return 0;
	}

	philHealth.sort(compareBracket);

	for(var i = 0; i < philHealth.length; i++){
		if(philHealth[i].range.to != null)
			$('#PHTable').append('<tr><td><input class="bracket" style="border:none;" type="number" value="' + parseFloat(philHealth[i].bracket) + '" disabled></td><td><input class="from" style="border:none;" type="number" value="' + parseFloat(philHealth[i].range.from) + '" disabled></td><td><input class="to" style="border:none;" type="number" value="' + parseFloat(philHealth[i].range.to) + '" disabled></td><td><input class="base" style="border:none;" type="number" value="' + parseFloat(philHealth[i].base) + '" disabled></td><td><input class="premium" style="border:none;" type="number" value="' + parseFloat(philHealth[i].premium) + '" disabled></td><td><input class="share" style="border:none;" type="number" value="' + parseFloat(philHealth[i].share) + '" disabled></td>');
		else{
			$('#PHTable').append('<tr><td><input class="bracket" style="border:none;" type="number" value="' + parseFloat(philHealth[i].bracket) + '" disabled></td><td><input class="from" style="border:none;" type="number" value="' + parseFloat(philHealth[i].range.from) + '" disabled></td><td><input class="to " style="border:none;" type="text" value="infinity" disbaled disabled></td><td><input class="base" style="border:none;" type="number" value="' + parseFloat(philHealth[i].base) + '" disabled></td><td><input class="premium" style="border:none;" type="number" value="' + parseFloat(philHealth[i].premium) + '" disabled></td><td><input class="share" style="border:none;" type="number" value="' + parseFloat(philHealth[i].share) + '" disabled></td>');
		}
	}

	// console.log(metadata);
});

var sendAjax = function(values, link){
	$.ajax({
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
		success: function(){
			console.log('process success')
		},
		error: function(){
			console.log('process error')
		},
	});
}

$('#PHUpdate').click(function(event){
	event.preventDefault();
	$("input").css({'border': '1px solid rgba(34, 36, 38, 0.15)', 'border-radius': '0.28571429rem'}).prop('disabled', false);

});

$('#PHSubmit.submit').click(function(){
	$('.small.modal').modal('show');
});

$('#confirmPH').click(function(){
	var values = [];
	$('#PHTable tbody tr').each(function(index, doc){
		var dict = {bracket: parseFloat($(doc).find('.bracket').val()), range: {from: parseFloat($(doc).find('.from').val()), to: parseFloat($(doc).find('.to').val())}, base: parseFloat($(doc).find('.base').val()), premium: parseFloat($(doc).find('.premium').val()), share: parseFloat($(doc).find('.share').val())}
		values.push(dict);
	});
	// $('.small.modal').modal('show');
	sendAjax(values, "/updatePHComp");
	console.log(values);
});

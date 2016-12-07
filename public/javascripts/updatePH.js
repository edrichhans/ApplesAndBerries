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
			$('#PHTable').append('<tr><td><input class="bracket" type="number" value="' + parseFloat(philHealth[i].bracket) + '"></td><td><input class="from" type="number" value="' + parseFloat(philHealth[i].range.from) + '"></td><td><input class="to" type="number" value="' + parseFloat(philHealth[i].range.to) + '"></td><td><input class="base" type="number" value="' + parseFloat(philHealth[i].base) + '"></td><td><input class="premium" type="number" value="' + parseFloat(philHealth[i].premium) + '"></td><td><input class="share" type="number" value="' + parseFloat(philHealth[i].share) + '"></td>');	
		else{
			$('#PHTable').append('<tr><td><input class="bracket" type="number" value="' + parseFloat(philHealth[i].bracket) + '"></td><td><input class="from" type="number" value="' + parseFloat(philHealth[i].range.from) + '"></td><td><input class="to " type="text" value="infinity" disbaled></td><td><input class="base" type="number" value="' + parseFloat(philHealth[i].base) + '"></td><td><input class="premium" type="number" value="' + parseFloat(philHealth[i].premium) + '"></td><td><input class="share" type="number" value="' + parseFloat(philHealth[i].share) + '"></td>');	
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

$('#PHSubmit.submit').click(function(){
	var values = [];
	$('#PHTable tbody tr').each(function(index, doc){
		var dict = {bracket: parseFloat($(doc).find('.bracket').val()), range: {from: parseFloat($(doc).find('.from').val()), to: parseFloat($(doc).find('.to').val())}, base: parseFloat($(doc).find('.base').val()), premium: parseFloat($(doc).find('.premium').val()), share: parseFloat($(doc).find('.share').val())}
		values.push(dict);
	});
	sendAjax(values, "/updatePHComp");
	console.log(values);
	$('.small.modal').modal('show');
});
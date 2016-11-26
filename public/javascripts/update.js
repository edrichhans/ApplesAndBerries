$('.ui.dropdown').dropdown();

$(document).ready(function(){
	function compareCredit(a,b) {
		if (a.credit < b.credit)
			return -1;
		if (a.credit > b.credit)
			return 1;
		return 0;
	}

	sss.sort(compareCredit);
	for(var i = 0; i < sss.length; i++){
		if(sss[i].range.to != null){
			$('#SSSTable').append('<tr><td><input class="from" type="number" value="' + parseFloat(sss[i].range.from) + '"></td><td><input class="to" type="number" value="' + parseFloat(sss[i].range.to) + '"></td><td><input class="credit" type="number" value="' + parseFloat(sss[i].credit) + '"></td><td><input class="totalER" type="number" value="' + parseFloat(sss[i].totalER) + '"></td><td><input class="totalEE" type="number" value="' + parseFloat(sss[i].totalEE) + '"></td><td><input class="EC" type="number" value="' + parseFloat(sss[i].EC) + '"></td><td><input class="total" type="number" value="' + parseFloat(sss[i].total) + '"></td>')
		}
		else{
			$('#SSSTable').append('<tr><td><input class="from" type="number" value="' + parseFloat(sss[i].range.from) + '"></td><td><input class="to" type="text" value="infinity" disabled></td><td><input class="credit" type="number" value="' + parseFloat(sss[i].credit) + '"></td><td><input class="totalER" type="number" value="' + parseFloat(sss[i].totalER) + '"></td><td><input class="totalEE" type="number" value="' + parseFloat(sss[i].totalEE) + '"></td><td><input class="EC" type="number" value="' + parseFloat(sss[i].EC) + '"></td><td><input class="total" type="number" value="' + parseFloat(sss[i].total) + '"></td>')
		}
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
});

$('#SSSSubmit.submit').click(function(){
	var values = [];
	$('#SSSTable tbody tr').each(function(index, doc){
		var dict = {range: {from: parseFloat($(doc).find('.from').val()), to: parseFloat($(doc).find('.to').val())}, credit: parseFloat($(doc).find('.credit').val()), totalER: parseFloat($(doc).find('.totalER').val()), totalEE: parseFloat($(doc).find('.totalEE').val()), EC: parseFloat($(doc).find('.EC').val()), total: parseFloat($(doc).find('.total').val())}
		values.push(dict);
	});
	sendAjax(values, "/updateSSSComp");
	console.log(values);
});

$('#updateDropdown').change(function(){
	if($(this).val() == 'SSS'){
		$('#SSS').removeClass('hide');
		$('#PhilHealth').addClass('hide');
	}
	else if($(this).val() == 'PhilHealth'){
		$('#PhilHealth').removeClass('hide');	
		$('#SSS').addClass('hide');
	}
	else if($(this).val() == 'BIR'){
		$('#PhilHealth').addClass('hide');	
		$('#SSS').addClass('hide');
	}
});
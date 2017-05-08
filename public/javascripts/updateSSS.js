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

	sss.sort(compareCredit);
	for(var i = 0; i < sss.length; i++){
		if(sss[i].range.to != null){
			$('#SSSTable').append('<tr><td><input class="from" style="border:none;" type="number" value="' + parseFloat(sss[i].range.from) + '" disabled></td><td><input class="to" style="border:none;" type="number" value="' + parseFloat(sss[i].range.to) + '" disabled></td><td><input class="credit" style="border:none;" type="number" value="' + parseFloat(sss[i].credit) + '" disabled></td><td><input class="totalER" style="border:none;" type="number" value="' + parseFloat(sss[i].totalER) + '" disabled></td><td><input class="totalEE" style="border:none;" type="number" value="' + parseFloat(sss[i].totalEE) + '" disabled></td><td><input class="EC" style="border:none;" type="number" value="' + parseFloat(sss[i].EC) + '" disabled></td><td><input class="total" style="border:none;" type="number" value="' + parseFloat(sss[i].total) + '" disabled></td>')
		}
		else{
			$('#SSSTable').append('<tr><td><input class="from" style="border:none;" type="number" value="' + parseFloat(sss[i].range.from) + '"></td><td><input class="to" style="border:none;" type="text" value="infinity" disabled></td><td><input class="credit" style="border:none;" type="number" value="' + parseFloat(sss[i].credit) + '"></td><td><input class="totalER" style="border:none;" type="number" value="' + parseFloat(sss[i].totalER) + '"></td><td><input class="totalEE" style="border:none;" type="number" value="' + parseFloat(sss[i].totalEE) + '"></td><td><input class="EC" style="border:none;" type="number" value="' + parseFloat(sss[i].EC) + '"></td><td><input class="total" style="border:none;" type="number" value="' + parseFloat(sss[i].total) + '"></td>')
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

$('#SSSUpdate').click(function(event){
	event.preventDefault();
	$("input").css({'border': '1px solid rgba(34, 36, 38, 0.15)', 'border-radius': '0.28571429rem'}).prop('disabled', false);

});


$('#SSSSubmit.submit').click(function(){
	$('.small.modal').modal('show');
});

$('#confirmSSS').click(function(){
	var values = [];
	$('#SSSTable tbody tr').each(function(index, doc){
		var dict = {range: {from: parseFloat($(doc).find('.from').val()), to: parseFloat($(doc).find('.to').val())}, credit: parseFloat($(doc).find('.credit').val()), totalER: parseFloat($(doc).find('.totalER').val()), totalEE: parseFloat($(doc).find('.totalEE').val()), EC: parseFloat($(doc).find('.EC').val()), total: parseFloat($(doc).find('.total').val())}
		values.push(dict);
	});
	sendAjax(values, "/updateSSSComp");
	console.log(values);
	// $('.small.modal').modal('show');
});

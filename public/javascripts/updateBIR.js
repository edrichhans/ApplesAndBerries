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
	
	console.log(metadata);

	function compareDep(a, b){
		if (a.dep < b.dep)
			return -1;
		if (a.dep > b.dep)
			return 1;
		return 0;
	}

	bir.sort(compareDep);
	$('#BIRTable').append('<tr><td>Exemption</td>');
	for(var k = 0; k < (metadata.hash).length; k++){
		$('#BIRTable tr').last().append('<td><input class="exempt" style="border:none;" type="number" value="' + parseFloat((metadata.hash)[k][0]) + '" disabled></td>');
	}
	$('#BIRTable').append('</tr>');

	$('#BIRTable').append('<tr><td>Status</td>');
	for(var k = 0; k < (metadata.hash).length; k++){
		$('#BIRTable tr').last().append('<td><input class="status" style="border:none;" type="number" value="' + parseFloat((metadata.hash)[k][1]) + '" disabled></td>');
	}
	$('#BIRTable').append('</tr>');

	for(var i = 0; i < bir.length; i++){
		$('#BIRTable').append('<tr><td><input class="dep" style="border:none;" type="text" value="' + parseFloat(bir[i].dep) + '"disabled></td>');
		for(var j = 0; j < (bir[i].ranges).length; j++){
			$('#BIRTable tr').last().append('<td><input class="from" style="border:none;" type="number" value="' + parseFloat((bir[i].ranges)[j]) + '" disabled></td>');
		}
		$('#BIRTable').append('</tr>');
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

$('#BIRSubmit.submit').click(function(){
	$('.small.modal').modal('show');
})

$('#BIRUpdate').click(function(event){
	event.preventDefault();
	$("input").css({'border': '1px solid rgba(34, 36, 38, 0.15)', 'border-radius': '0.28571429rem'}).prop('disabled', false);

});


$('#confirmBIR').click(function(){
	var values = [];
	var hash = [{"name":"BIR", "hash":[]}];
	$('#BIRTable tbody tr').each(function(index, doc){
		if(index == 0){
			$(this).find('td').each(function(i, exempt){
				var field = $(exempt).find('input').val();
				if(field != null) (hash[0].hash).push([parseFloat(field)]);
			});
		}
		else if(index == 1){
			$(this).find('td').each(function(i, status){
				var field = $(status).find('input').val();
				if(field != null) (hash[0].hash)[i-1].push(parseFloat(field));
			});
		}
		else{
			var ranges = [];
			$(this).find('td').each(function(i, val){
				if(i != 0){
					ranges.push(parseFloat($(val).find('input').val()));
				}
			});
			var dict = {"dep":index-2, "ranges": ranges};
			values.push(dict);
		}
	});
	sendAjax([hash, values], "/updateBIRComp");
});
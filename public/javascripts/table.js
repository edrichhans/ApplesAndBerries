console.log(employees);
console.log(transactions);

function toCommaString(arr){
	var ret = ''
	for(var i = 0; i < arr.length; i++){
		ret += arr[i].toString();
		if(i < arr.length-1){
			ret += ', ';
		}
	}
	return ret;
}

if(employees){
	$('.eID').each(function(index, currentElement){
		var item = $(this);
		var employee = $.grep(employees, function(e){ return e.eID === parseInt(item.attr("value")); });
		console.log(employee);
		$(this).after("<td>" + employee[0].salary + "</td>");
		$(this).after("<td>" + employee[0].name + "</td>");
	});
	$('.endDate').each(function(index, currentElement){
		$(this).after('<td>' + toCommaString(transactions[index].allowance) + '</td>');
		$(this).after('<td>' + toCommaString(transactions[index].allowance_name) + '</td>');
		$(this).after('<td>' + toCommaString(transactions[index].deductibles) + '</td>');
		$(this).after('<td>' + toCommaString(transactions[index].deductibles_name) + '</td>');
	})
}

$('#print-button').click(function(){
	$('table').printThis({
		header: "<img style='width: 20%;' src='images/header.png'></img><div class='header-print'>Payslip</div>"
	});
});
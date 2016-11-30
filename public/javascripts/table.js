console.log(employees);

if(employees){
	$('.eID').each(function(index, currentElement){
		var item = $(this);
		var employee = $.grep(employees, function(e){ return e.eID === parseInt(item.attr("value")); });
		console.log(employee);
		$(this).after("<td>" + employee[0].salary + "</td>");
		$(this).after("<td>" + employee[0].name + "</td>");
	});
}

$('#print-button').click(function(){
	$('table').printThis();
});
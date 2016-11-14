console.log(employees);

if(employees){
	$('.eID').each(function(index, currentElement){
		var employee = $.grep(employees, function(e){ return e.eID == $(this).text(); });
		$(this).after("<td>" + employee[0].name + "</td>");
		// console.log(employee[0].name);
	});
}

$('#print-button').click(function(){
	$('table').printThis();
});
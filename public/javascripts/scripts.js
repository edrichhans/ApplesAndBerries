$('#rangestart').calendar({
  type: 'date',
  endCalendar: $('#rangeend')
});
$('#rangeend').calendar({
  type: 'date',
  startCalendar: $('#rangestart')
});
$('#checkDate').calendar({
	type: 'date',
});

$('#startDate').calendar({
	type: 'date'
});

$('#add-field').click(function(){
	$('#pettyCash-particulars').append('<div class="two fields pettyCash-field addition"><div class="field"><label>Particulars</label><div class="ui input particulars-input"><input name="particulars" type="text" placeholder="Name"/></div></div><div class="field"><label>Amount</label><div class="ui input amount-input"><input name="amount" type="number" placeholder="Amount..."/></div></div></div>');
});
$('#remove-field').click(function(){
	$('.addition').slice(-1).remove();
});


$('.ui.dropdown').dropdown();

$('#add-deductibles').click(function(){
	$('#deductibles-side').before('<div class="field deductibles addition"><div class="two fields"><div class="field"><label>Deductibles</label><div class="ui input deductibles-name"><input name="deductibles_name" type="text" placeholder="Item"></div></div><div class="field"><label>Amount</label><div class="ui input deductibles-amount"><input name="deductibles" type="number" placeholder="Amount..."></div></div></div></div>');
});

$('#add-allowance').click(function(){
	$('#allowance-side').before('<div class="field allowance addition"><div class="two fields"><div class="field"><label>Allowance</label><div class="ui input allowance-name"><input name="allowance_name" type="text" placeholder="Item"></div></div><div class="field"><label>Amount</label><div class="ui input allowance-amount"><input name="allowance" type="number" placeholder="Amount..."></div></div></div></div>');
});

$('#delete-deductibles').click(function(){
	$('.deductibles.addition').slice(-1).remove();
});

$('#delete-allowance').click(function(){
	$('.allowance.addition').slice(-1).remove();
});

$('.submit').click(function(){
	$('form').submit();
});

$('#pettyCash-preview').click(function(){
	var total = 0;
	$('#name span').text($('#name-input input').val());
	$('#dateToday span').text($('#date-input input').val());
	$('.pettyCash-field').each(function(){
		total += parseFloat($(this).find('.amount-input input').val())
		$('table#particulars-table tbody').append("<tr><td>" + $(this).find('.particulars-input input').val() + "</td><td>" + $(this).find('.amount-input input').val() + "</td></tr>");
	});

	$('#total span').text(total);

	$('.ui.modal')
		.modal({
			onHide: function(){
				$('.ui.modal').find('tbody tr').remove();
			}
		})
		.modal('setting', 'transition', 'horizontal flip')
		.modal('show');
});

$('#checkVoucher-preview').click(function(){
	$('#name span').text($('#name-input input').val());
	$('#dateToday span').text($('#date-input input').val());
	$('#particulars span').text($('#particularsDropdown').val());
	$('#amount span').text($('#amount-input input').val());

	$('.ui.modal')
		.modal('setting', 'transition', 'horizontal flip')
		.modal('show');
});

$('#AR-preview').click(function(){
	$('#name span').text($('#name-input input').val());
	$('#dateToday span').text($('#date-input input').val());
	$('#particulars span').text($('#particulars-input input').val());
	$('#amount span').text($('#amount-input input').val());

	$('.ui.modal')
		.modal('setting', 'transition', 'horizontal flip')
		.modal('show');
});

$('#payslip-preview').click(function(){
	var employee = $.grep(employees, function(e){ return e.eID === parseInt($('#employeeDropdown').val()); });

	if($('.checkbox#thirteenth input').val() == '0'){
		var deductibles_sum = 0;
		var allowance_sum = 0;

		$('.deductibles-amount input').each(function(){
			deductibles_sum += parseFloat($(this).val());
		});
		$('.allowance-amount input').each(function(){
			allowance_sum += parseFloat($(this).val());
		});

		function getHDMF(salary){
			if(salary <= 1500) return salary*0.01;
			else return salary*0.02;
		}

		for(var i = 0; i < philHealth.length; i++){
			if(philHealth[i].range.to == null) philHealth[i].range.to = Infinity;
		}
		for(var i = 0; i < sss.length; i++){
			if(sss[i].range.to == null) sss[i].range.to = Infinity;
		}

		var dep = employee[0].dependents;
		if(dep >= 4){
			dep = 4;
		}

		var phVal = $.grep(philHealth, function(p){ return (p.range.from <= employee[0].salary) && (p.range.to+1 > employee[0].salary);});
		var sssVal = $.grep(sss, function(p){ return (p.range.from <= employee[0].salary) && (p.range.to+1 > employee[0].salary);});
		var hdmfVal = getHDMF(employee[0].salary);
		var birVal = $.grep(bir, function(p){ return (p.dep == dep)});

		var hash = metadata.hash;

		var bracket = 0;
		for(bracket = 0; bracket < (birVal[0].ranges).length; bracket++){
			if(employee[0].salary < (birVal[0].ranges)[bracket]){
				break;
			}
		}
		bracket -= 1;

		var tax = ((employee[0].salary - (birVal[0].ranges)[bracket]) * hash[bracket][1]) + hash[bracket][0];
		tax = Math.round(tax*100)/100

		console.log(tax);

		var total = employee[0].salary - deductibles_sum + allowance_sum - phVal[0].share - parseFloat(sssVal[0].totalEE) - hdmfVal - tax;


		$('#philHealth span').text(phVal[0].share);
		$('#SSS span').text(sssVal[0].totalEE);
		$('#HDMF span').text(hdmfVal);
		$('#BIR span').text(tax);

		$('.deductibles').each(function(){
			$('table#deductibles-table tbody').append('<tr><td>'+ $(this).find(".deductibles-name input").val() +'</td><td>'+ $(this).find(".deductibles-amount input").val() +'</td></tr>')
		})

		$('.allowance').each(function(){
			$('table#allowance-table tbody').append('<tr><td>'+ $(this).find(".allowance-name input").val() +'</td><td>'+ $(this).find(".allowance-amount input").val() +'</td></tr>')
		})
		$('#total span').text(total);
	}
	else{
		$('#total span').text(employee[0].salary);
	}
	$('#gross span').text(employee[0].salary);
	var m_names = new Array("Jan", "Feb", "Mar", 
	"Apr", "May", "Jun", "Jul", "Aug", "Sep", 
	"Oct", "Nov", "Dec");

	var d = new Date();
	var curr_date = d.getDate();
	var curr_month = d.getMonth();
	var curr_year = d.getFullYear();
	$('#dateToday span').text(curr_date + " " + m_names[curr_month] 
	+ ", " + curr_year);
	$('#dateStart span').text($('#rangestart .ui.input input').val());
	$('#dateEnd span').text($('#rangeend .ui.input input').val());
	$('#company span').text($('#companyDropdown').val().toUpperCase());

	$('.ui.modal')
		.modal({
			onHide: function(){
				$('.ui.modal').find('tbody tr').remove();
				$('#philHealth span').text('N/A');
				$('#SSS span').text('N/A');
				$('#HDMF span').text('N/A');
			}
		})
		.modal('setting', 'transition', 'horizontal flip')
		.modal('show');
});

$('.print').click(function(){
	$('.ui.modal .content').printThis();
	$('.submit').toggleClass('disabled');
});

$('#employeeDropdown').change(function(){
	var employee = $.grep(employees, function(e){ return e.eID === parseInt($('#employeeDropdown').val()); });
	$('#name span').text(employee[0].name);
});

$('.checkbox#thirteenth').checkbox({
	onChecked: function(){
		$('.checkbox#thirteenth input').val(1);
		$('form').attr('action', '/thirteenth');
		$('form').attr('name', '/thirteenth');
		$('.allowance').find('input').prop('disabled', true);
		$('.deductibles').find('input').prop('disabled', true);
		$('#add-deductibles').addClass('disabled');
		$('#delete-deductibles').addClass('disabled');
		$('#add-allowance').addClass('disabled');
		$('#delete-allowance').addClass('disabled');
	},
	onUnchecked: function(){
		$('.checkbox#thirteenth input').val(0);
		$('form').attr('action', '/payslip');
		$('form').attr('name', '/payslip');
		$('.allowance').find('input').prop('disabled', false);
		$('.deductibles').find('input').prop('disabled', false);
		$('#add-deductibles').removeClass('disabled');
		$('#delete-deductibles').removeClass('disabled');
		$('#add-allowance').removeClass('disabled');
		$('#delete-allowance').removeClass('disabled');
	}
});

//==================== Edit Employee ===============================

$('.button#chooseEditEmployee').click(function(event){
	event.preventDefault();
	var employee = $.grep(employees, function(e){ return e.eID === parseInt($('#employeeDropdown').val()); });
	employee = employee[0];

	$('input#eID').val(employee.eID);
	$('input#inputName').val(employee.name);
	$('input#inputStartDate').val(employee.startDate);
	$('input#inputBirthday').val(employee.birthday);
	$('select#selectPosition').val((employee.position).toString()).change();
	$('select#selectStatus').val((employee.status).toString()).change();
	$('input#inputDependents').val(employee.dependents);
	$('input#inputBaseSalary').val(employee.salary);

	$('form#selectEmployee').addClass('hide');
	$('form#editEmployee').removeClass('hide');
});

//==================================================================
$('.ui.form#payslip')
	.form({
		employeeDropdown:{
			identifier: 'employeeDropdown',
			rules:[
				{
					type: 'empty',
					prompt: 'Please select an employee'
				}
			]
		},
		companyDropdown:{
			identifier: 'companyDropdown',
			rules:[
				{
					type: 'empty',
					prompt: 'Please select an company'
				}
			]
		},
		// deductibles:{
		// 	identifier: 'deductibles',
		// 	rules:[
		// 		{
		// 			type: 'empty',
		// 			prompt: 'Please enter deductibles'
		// 		}
		// 	]
		// },
		// allowance:{
		// 	identifier: 'allowance',
		// 	rules:[
		// 		{
		// 			type: 'empty',
		// 			prompt: 'Please enter allowance'
		// 		}
		// 	]
		// },
		startDate:{
			identifier: 'startDate',
			rules:[
				{
					type: 'empty',
					prompt: 'Please enter start date'
				}
			]
		},
		endDate:{
			identifier: 'endDate',
			rules:[
				{
					type: 'empty',
					prompt: 'Please enter end date'
				}
			]
		},
	});

$('.ui.form#AR')
	.form({
		name:{
			identifier: 'name',
			rules:[
				{
					type: 'empty',
					prompt: 'Please enter name'
				}
			]
		},
		date:{
			identifier: 'date',
			rules:[
				{
					type: 'empty',
					prompt: 'Please enter date'
				}
			]
		},
		particulars:{
			identifier: 'particulars',
			rules:[
				{
					type: 'empty',
					prompt: 'Please enter particulars'
				}
			]
		},
		amount:{
			identifier: 'amount',
			rules:[
				{
					type: 'empty',
					prompt: 'Please enter amount'
				}
			]
		},
	});

$('.ui.form#pettycash')
	.form({
		name:{
			identifier: 'name',
			rules:[
				{
					type: 'empty',
					prompt: 'Please enter name'
				}
			]
		},
		date:{
			identifier: 'date',
			rules:[
				{
					type: 'empty',
					prompt: 'Please enter date'
				}
			]
		},
		particulars:{
			identifier: 'particulars',
			rules:[
				{
					type: 'empty',
					prompt: 'Please enter particulars'
				}
			]
		},
		amount:{
			identifier: 'amount',
			rules:[
				{
					type: 'empty',
					prompt: 'Please enter amount'
				}
			]
		},
	});

$('.ui.form#checkvoucher')
	.form({
		name:{
			identifier: 'name',
			rules:[
				{
					type: 'empty',
					prompt: 'Please enter name'
				}
			]
		},
		date:{
			identifier: 'date',
			rules:[
				{
					type: 'empty',
					prompt: 'Please enter date'
				}
			]
		},
		particulars:{
			identifier: 'particulars',
			rules:[
				{
					type: 'empty',
					prompt: 'Please select particulars'
				}
			]
		},
		amount:{
			identifier: 'amount',
			rules:[
				{
					type: 'empty',
					prompt: 'Please enter amount'
				}
			]
		},
	});

$('.ui.form#addemployee')
	.form({
		name:{
			identifier: 'name',
			rules:[
				{
					type: 'empty',
					prompt: 'Please enter name'
				}
			]
		},
		start:{
			identifier: 'start',
			rules:[
				{
					type: 'empty',
					prompt: 'Please select birthday'
				}
			]
		},
		birthday:{
			identifier: 'birthday',
			rules:[
				{
					type: 'empty',
					prompt: 'Please select birthday'
				}
			]
		},
		position:{
			identifier: 'position',
			rules:[
				{
					type: 'empty',
					prompt: 'Please select position'
				}
			]
		},
		status:{
			identifier: 'status',
			rules:[
				{
					type: 'empty',
					prompt: 'Please select status'
				}
			]
		},
		salary:{
			identifier: 'salary',
			rules:[
				{
					type: 'empty',
					type   : 'integer[0..]',
					prompt: 'Please enter salary'
				}
			]
		},
		dependents:{
			identifier: 'dependents',
			rules:[
				{
					type: 'empty',
					type   : 'integer[0..]',
					prompt: 'Please enter dependents'
				}
			]
		}
	});
$('.ui.form#editEmployee')
	.form({
		name:{
			identifier: 'name',
			rules:[
				{
					type: 'empty',
					prompt: 'Please enter name'
				}
			]
		},
		start:{
			identifier: 'start',
			rules:[
				{
					type: 'empty',
					prompt: 'Please select birthday'
				}
			]
		},
		birthday:{
			identifier: 'birthday',
			rules:[
				{
					type: 'empty',
					prompt: 'Please select birthday'
				}
			]
		},
		position:{
			identifier: 'position',
			rules:[
				{
					type: 'empty',
					prompt: 'Please select position'
				}
			]
		},
		status:{
			identifier: 'status',
			rules:[
				{
					type: 'empty',
					prompt: 'Please select status'
				}
			]
		},
		salary:{
			identifier: 'salary',
			rules:[
				{
					type: 'empty',
					type   : 'integer[0..]',
					prompt: 'Please enter salary'
				}
			]
		},
		dependents:{
			identifier: 'dependents',
			rules:[
				{
					type: 'empty',
					type   : 'integer[0..]',
					prompt: 'Please enter dependents'
				}
			]
		}
	});
$('.ui.form#login')
	.form({
		username:{
			identifier: 'username',
			rules:[
				{
					type: 'empty',
					prompt: 'Please enter username'
				}
			]
		},
		password:{
			identifier: 'password',
			rules:[
				{
					type: 'empty',
					prompt: 'Please enter password'
				}
			]
		}
	});

$('.ui.form#addUser')
	.form({
		username:{
			identifier: 'username',
			rules:[
				{
					type: 'empty',
					prompt: 'Please enter username'
				}
			]
		},
		password:{
			identifier: 'password',
			rules:[
				{
					type: 'empty',
					prompt: 'Please enter password'
				}
			]
		},
		repass:{
			identifier: 'repass',
			rules:[
				{
					type: 'empty',
					type: 'match[password]',
					prompt: 'Passwords don\'t match'
				}
			]
		}
	});
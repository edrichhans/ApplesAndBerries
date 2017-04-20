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
	$('#AN span').text(an[0].number);
	console.log(an[0].number);

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
	$('#AN span').text(an.number);

	$('.ui.modal')
		.modal('setting', 'transition', 'horizontal flip')
		.modal('show');
});

$('#AR-preview').click(function(){
	$('#name span').text($('#name-input input').val());
	$('#dateToday span').text($('#date-input input').val());
	$('#particulars span').text($('#particulars-input input').val());
	$('#amount span').text($('#amount-input input').val());
	$('#AN span').text(an.number);

	$('.ui.modal')
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
		email:{
			identifier: 'email',
			rules:[
				{
					type: 'empty',
					type: 'email',
					prompt: 'e-mail format invalid'
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

	$('.ui.form#reset')
		.form({
			password:{
				identifier: 'password',
				rules:[
					{
						type: 'empty',
						prompt: 'Please enter password'
					}
				]
			},
			confirm:{
				identifier: 'confirm',
				rules:[
					{
						type: 'empty',
						type: 'match[password]',
						prompt: 'Passwords don\'t match'
					}
				]
			}
		});
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

$('#add-field').click(function(){
	$('#pettyCash-particulars').append('<div class="two fields"><div class="field"><label>Particulars</label><div class="ui input"><input name="name" type="text" placeholder="Name"/></div></div><div class="field"><label>Amount</label><div class="ui input"><input name="amount" type="number" placeholder="Amount..."/></div></div></div>')
});

$('.ui.dropdown').dropdown();

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
		deductibles:{
			identifier: 'deductibles',
			rules:[
				{
					type: 'empty',
					prompt: 'Please enter deductibles'
				}
			]
		},
		allowance:{
			identifier: 'allowance',
			rules:[
				{
					type: 'empty',
					prompt: 'Please enter allowance'
				}
			]
		},
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
					prompt: 'Please enter salary'
				}
			]
		},
		dependents:{
			identifier: 'dependents',
			rules:[
				{
					type: 'empty',
					prompt: 'Please enter dependents'
				}
			]
		}
	});
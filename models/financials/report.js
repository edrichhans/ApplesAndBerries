var Excel = require('exceljs');
var Promise = require('promise');
require('datejs');
var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X' ,'Y', 'Z'];


function initialize(worksheet){
	worksheet.properties.defaultRowHeight = 20;
	worksheet.getColumn(1).alignment = {
		horizontal: 'left'
	};
	worksheet.getRow(1).font = {
		bold: true
	};
}

var check_date = function(arr, inputDate){
	var obj = {};
	for(var i = 0; i < arr.length; i++){
		var dateIssued;
		if(inputDate == 'date'){
			dateIssued = new Date(arr[i][inputDate]);
		}
		else{
			dateIssued = arr[i][inputDate];
		}
		var date = ("0" + (dateIssued.getMonth()+1)).slice(-2) + '-' + (dateIssued.getYear()+1900).toString();
		console.log(date);
		date = date.substring(0,7);
		if(obj[date] === undefined) obj[date] = [arr[i]];
		else{
			// console.log(arr[i]);
			obj[date].push(arr[i]);
		}
	}
	return obj;
}

var merge_paySlip = function(paySlipWorksheet){
	var i = 2;
	var start = i;
	while(1){
		var cell_A_next = paySlipWorksheet.getCell('A' + (i+1).toString()).value;
		var cell_B_next = paySlipWorksheet.getCell('B' + (i+1).toString()).value;
		var cell_R_next = paySlipWorksheet.getCell('R' + (i+1).toString()).value;
		if(cell_R_next == 'Total:'){
			console.log('total: ', i);
			break;
		}
		else if(cell_B_next != null || cell_R_next == "Subtotal:"){ //if main entry in row
			if(cell_R_next == "Subtotal:"){
				add_line(paySlipWorksheet, 0, 20, i);
			}
			//operation here
			console.log('start: ', start);
			console.log('main entry: ', i);
			for(var letter = 0; letter < 8; letter ++){
				paySlipWorksheet.mergeCells(alphabet[letter] + start.toString() + ':' + alphabet[letter] + i.toString());
			}
			for(var letter = 12; letter < 20; letter ++){
				paySlipWorksheet.mergeCells(alphabet[letter] + start.toString() + ':' + alphabet[letter] + i.toString());
			}
			paySlipWorksheet.getRow(start).commit();
			start = i+1;
		}
		i++;
	}
	// return;
}

var add_line_to_range = function(worksheet, subtotal_letter, end){
	var i = 2;
	var start = i;
	while(1){
		var cell_next = worksheet.getCell(subtotal_letter + (i+1).toString()).value;
		if(cell_next == 'Total:'){
			console.log('total: ', i);
			break;
		}
		else if(cell_next == "Subtotal:"){ //if main entry in row
			if(cell_next == "Subtotal:"){
				add_line(worksheet, 0, end, i);
			}
			worksheet.getRow(start).commit();
			start = i+1;
		}
		i++;
	}
}

var add_line = function(worksheet, from, to, i){
	for(var letter = from; letter < to; letter++){
		var cell = alphabet[letter] + (i+1).toString();
		console.log("CELL", cell);
		worksheet.getCell(cell).border ={
			top: {style: 'thin'},
			bottom: {style: 'double'}
		}
		// paySlipWorksheet.getRow(i+1).commit();
	}
}

exports.report = function(req, res){
	var db = req.db;
	var paySlip = db.get('paySlip');
	var AR = db.get('AR');
	var checkVoucher = db.get('checkVoucher');
	var pettyCash = db.get('pettyCash');
	var employees = db.get('Employees');

	paySlip.find({}).then((paySlipData) => { 
	// console.log('PASOK1');
		AR.find({}).then((ARData) => {
		// console.log('PASOK2');
			checkVoucher.find({}).then((checkVoucherData)=> {
		// console.log('PASOK3');
				pettyCash.find({}).then((pettyCashData) => {
		// console.log('PASOK4');
					employees.find({}).then((employee) => {	
		// console.log('PASOK5');
						var workbook = new Excel.Workbook();
						workbook.creator = 'Apples and Berries';
						workbook.lastModifiedBy = 'Apples and Berries';
						workbook.created = new Date();
						workbook.modified = new Date();
						var paySlipSheet = workbook.addWorksheet('Pay Slip');
						var ARSheet = workbook.addWorksheet('Ackowledgement Receipts');
						var checkVoucherSheet = workbook.addWorksheet('Check Voucher');
						var pettyCashSheet = workbook.addWorksheet('Petty Cash');
						var paySlipWorksheet = workbook.getWorksheet('Pay Slip');
						var ARWorksheet = workbook.getWorksheet('Ackowledgement Receipts');
						var checkVoucherWorksheet = workbook.getWorksheet('Check Voucher');
						var pettyCashWorksheet = workbook.getWorksheet('Petty Cash');					

						initialize(paySlipWorksheet);
						initialize(ARWorksheet);
						initialize(checkVoucherWorksheet);
						initialize(pettyCashWorksheet);

						paySlipWorksheet.columns = [
							{header: 'AN', key: 'an', width: 5},
							{header: 'Issued By', key: 'issued', width: 15},
							{header: 'Date Issued', key: 'date_issued', width: 15},
							{header: 'eID', key: 'eID', width: 5},
							{header: 'Name', key: 'name', width: 20},
							{header: 'Base Salary', key: 'base', width: 10},
							{header: 'Start Date', key: 'start', width: 15},
							{header: 'End Date', key: 'end', width: 15},
							{header: 'Deductibles', key: 'deduct', width: 15},
							{header: 'Amount', key: 'deduct_amt', width: 10},
							{header: 'Allowances', key: 'allow', width: 15},
							{header: 'Amount', key: 'allow_amt', width: 10},
							{header: 'PhilHealth', key: 'ph', width: 10},
							{header: 'HDMF', key: 'hdmf', width: 10},
							{header: 'SSS', key: 'sss', width: 10},
							{header: 'ER PhilHealth', key: 'er_ph', width: 10},
							{header: 'ER HDMF', key: 'er_hdmf', width: 10},
							{header: 'ER SSS', key: 'er_sss', width: 10},
							{header: 'BIR', key: 'bir', width: 10},
							{header: 'Net', key: 'net', width: 10}
						];
						paySlipWorksheet.getColumn('base').numFmt = '#,##0.00;[Red]\-#,##0.00';
						paySlipWorksheet.getColumn('deduct_amt').numFmt = '#,##0.00;[Red]\-#,##0.00';
						paySlipWorksheet.getColumn('allow_amt').numFmt = '#,##0.00;[Red]\-#,##0.00';
						paySlipWorksheet.getColumn('ph').numFmt = '#,##0.00;[Red]\-#,##0.00';
						paySlipWorksheet.getColumn('hdmf').numFmt = '#,##0.00;[Red]\-#,##0.00';
						paySlipWorksheet.getColumn('sss').numFmt = '#,##0.00;[Red]\-#,##0.00';
						paySlipWorksheet.getColumn('er_ph').numFmt = '#,##0.00;[Red]\-#,##0.00';
						paySlipWorksheet.getColumn('er_hdmf').numFmt = '#,##0.00;[Red]\-#,##0.00';
						paySlipWorksheet.getColumn('er_sss').numFmt = '#,##0.00;[Red]\-#,##0.00';
						paySlipWorksheet.getColumn('bir').numFmt = '#,##0.00;[Red]\-#,##0.00';
						paySlipWorksheet.getColumn('net').numFmt = '#,##0.00;[Red]\-#,##0.00';
						paySlipWorksheet.getRow(1).alignment = {
							horizontal: 'center'
						}

						ARWorksheet.columns = [
							{header: 'AN', key: 'an', width: 5},
							{header: 'Issued By', key: 'issued', width: 15},
							{header: 'Name', key: 'name', width: 25},
							{header: 'Date', key: 'date', width: 20},
							{header: 'Particulars', key: 'part', width: 15},
							{header: 'Amount', key: 'amt', width: 10}
						];
						ARWorksheet.getColumn('amt').numFmt = '#,##0.00;[Red]\-#,##0.00';
						ARWorksheet.getRow(1).alignment = {
							horizontal: 'center'
						}
						
						checkVoucherWorksheet.columns = [
							{header: 'AN', key: 'an', width: 5},
							{header: 'Issued By', key: 'issued', width: 15},
							{header: 'Name', key: 'name', width: 25},
							{header: 'Date', key: 'date', width: 20},
							{header: 'Particulars', key: 'part', width: 15},
							{header: 'Amount', key: 'amt', width: 10}
						];
						checkVoucherWorksheet.getColumn('amt').numFmt = '#,##0.00;[Red]\-#,##0.00';
						checkVoucherWorksheet.getRow(1).alignment = {
							horizontal: 'center'
						}

						pettyCashWorksheet.columns = [
							{header: 'AN', key: 'an', width: 5},
							{header: 'Issued By', key: 'issued', width: 15},
							{header: 'Name', key: 'name', width: 25},
							{header: 'Date', key: 'date', width: 20},
							{header: 'Particulars', key: 'part', width: 15},
							{header: 'Amount', key: 'amt', width: 10},
							{header: 'Qty', key: 'qty', width: 10},
							{header: 'Total', key: 'total', width: 15}
						];
						pettyCashWorksheet.getColumn('amt').numFmt = '#,##0.00;[Red]\-#,##0.00';
						pettyCashWorksheet.getColumn('total').numFmt = '#,##0.00;[Red]\-#,##0.00';
						pettyCashWorksheet.getRow(1).alignment = {
							horizontal: 'center'
						}
						
						// console.log("HI", paySlipData);
						var paySlip_month = check_date(paySlipData, 'dateIssued');
						console.log("JELLOO", paySlip_month);
						var total = 0;
						for(month in paySlip_month){		
							paySlipWorksheet.addRow({
								issued: month,
							}).commit();	
							var subtotal = 0;
							for(var entry = 0; entry < paySlip_month[month].length; entry++){	
								var paySlip_month_entry = paySlip_month[month][entry];
								var entry_total = paySlip_month_entry.total;

								if(paySlip_month_entry.deductibles_name === undefined){
									paySlip_month_entry.deductibles_name = [];
									paySlip_month_entry.deductibles = [];
									paySlip_month_entry.allowance_name = [];
									paySlip_month_entry.allowance = [];
								}

								paySlipWorksheet.addRow({
									an: paySlip_month_entry.adviceNumber,
									issued: paySlip_month_entry.issuedBy,
									date_issued: paySlip_month_entry.dateIssued.toString('MMMM d, yyyy'),
									eID: paySlip_month_entry.eID,
									name: employee[0].name,
									base: employee[0].salary,
									start: paySlip_month_entry.startDate,
									end: paySlip_month_entry.endDate,
									deduct: (paySlip_month_entry.deductibles_name)[0],
									deduct_amt: (paySlip_month_entry.deductibles)[0],
									allow: (paySlip_month_entry.allowance_name)[0],
									allow_amt: (paySlip_month_entry.allowance)[0],
									ph: paySlip_month_entry.PHreduc,
									hdmf: paySlip_month_entry.HDMFreduc,
									sss: paySlip_month_entry.SSSreduc,
									er_ph: paySlip_month_entry.EmployerPH,
									er_hdmf: paySlip_month_entry.EmployerHDMF,
									er_sss: paySlip_month_entry.EmployerSSS,
									bir: paySlip_month_entry.BIR,
									net: entry_total
								}).commit();
								var i = 1;
								console.log("HEREEE");
								while(i < paySlip_month_entry.deductibles.length || i < paySlip_month_entry.allowance.length){
									paySlipWorksheet.addRow({
										deduct: paySlip_month_entry.deductibles_name[i],
										deduct_amt: paySlip_month_entry.deductibles[i],
										allow: paySlip_month_entry.allowance_name[i],
										allow_amt: paySlip_month_entry.allowance[i],
									}).commit();
									i++;
								}
								subtotal += parseFloat(entry_total);
							}
							total += subtotal;
							paySlipWorksheet.addRow({
								er_sss: "Subtotal:",
								net: subtotal
							}).commit();
						}
						paySlipWorksheet.addRow({
							er_sss: "Total:",
							net: total
						}).commit();

						var AR_month = check_date(ARData, 'date');
						total = 0;
						for(month in AR_month){
							ARWorksheet.addRow({
								issued: month,
							}).commit();
							var subtotal = 0;
							for(var entry = 0; entry < AR_month[month].length; entry++){
								var AR_month_entry = AR_month[month][entry];
								var entry_total = AR_month_entry.amount;
								ARWorksheet.addRow({
									an: AR_month_entry.adviceNumber,
									issued: AR_month_entry.issuedBy,
									name: AR_month_entry.name,
									date: AR_month_entry.date,
									part: AR_month_entry.particulars,
									amt: entry_total
								}).commit();
								subtotal += parseFloat(entry_total);
							}
							total += subtotal;
							ARWorksheet.addRow({
								part: "Subtotal:",
								amt: subtotal
							}).commit();
						}
						ARWorksheet.addRow({
							part: "Total:",
							amt: total
						}).commit();
						var checkVoucher_month = check_date(checkVoucherData, 'date');
						total = 0;
						for(month in checkVoucher_month){
							checkVoucherWorksheet.addRow({
								issued: month,
							}).commit();
							var subtotal = 0;
							for(var entry = 0; entry < checkVoucher_month[month].length; entry++){
								var checkVoucher_month_entry = checkVoucher_month[month][entry];
								var entry_total = parseFloat(checkVoucher_month_entry.amount);
								checkVoucherWorksheet.addRow({
									an: checkVoucher_month_entry.adviceNumber,
									issued: checkVoucher_month_entry.issuedBy,
									name: checkVoucher_month_entry.name,
									date: checkVoucher_month_entry.date,
									part: checkVoucher_month_entry.particulars,
									amt: entry_total
								}).commit();
								subtotal += parseFloat(entry_total);
							}
							total += subtotal;
							checkVoucherWorksheet.addRow({
								part: "Subtotal:",
								amt: subtotal
							}).commit();
						}
						checkVoucherWorksheet.addRow({
							part: "Total:",
							amt: subtotal
						}).commit();

						var pettyCash_month = check_date(pettyCashData, 'date');
						console.log('pettyCash_month', pettyCash_month);

						total = 0;
						for(month in pettyCash_month){
							pettyCashWorksheet.addRow({
								issued: month,
							}).commit();
							var subtotal = 0;
							for(var entry = 0; entry < pettyCash_month[month].length; entry++){
								var pettyCash_month_entry = pettyCash_month[month][entry];
								var entry_total = parseFloat(pettyCash_month_entry.items[0][1]) * parseFloat(pettyCash_month_entry.items[0][2]);
								pettyCashWorksheet.addRow({
									an: pettyCash_month_entry.adviceNumber,
									issued: pettyCash_month_entry.issuedBy,
									name: pettyCash_month_entry.name,
									date: pettyCash_month_entry.date,
									part: pettyCash_month_entry.items[0][0],
									amt: pettyCash_month_entry.items[0][1],
									qty: pettyCash_month_entry.items[0][2],
									total: entry_total
								}).commit();
								console.log('HEREEE');
								for(var item = 1; item < pettyCash_month_entry.items.length; item++){
									var entry = parseFloat(pettyCash_month_entry.items[item][1]) * parseFloat(pettyCash_month_entry.items[item][2]);
									entry_total += entry;
									pettyCashWorksheet.addRow({
										part: pettyCash_month_entry.items[item][0],
										amt: pettyCash_month_entry.items[item][1],
										qty: pettyCash_month_entry.items[item][2],
										total: entry
									}).commit();
								}
								console.log('HEREEE after');
								subtotal += entry_total;
							}
							total += subtotal;
							pettyCashWorksheet.addRow({
								qty: "Subtotal:",
								total: subtotal
							}).commit();
						}
						pettyCashWorksheet.addRow({
							qty: "Total:",
							total: total
						}).commit();

						merge_paySlip(paySlipWorksheet);
						add_line_to_range(ARWorksheet, 'E', 6);
						add_line_to_range(checkVoucherWorksheet, 'E', 6);
						add_line_to_range(pettyCashWorksheet, 'G', 8);

						console.log('LAST');
						workbook.xlsx.writeFile("uploads/report.xlsx");
					});
				});
			});
		});
	});
	return new Promise((resolve, reject) => {
		return resolve();
	});
}
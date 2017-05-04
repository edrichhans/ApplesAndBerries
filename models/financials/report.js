var Excel = require('exceljs');
var Promise = require('promise');

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
		else if(cell_B_next != null || cell_R_next == "Subtotal: 	"){ //if main entry in row
			//operation here
			console.log('start: ', start);
			console.log('main entry: ', i);
			paySlipWorksheet.mergeCells('A' + start.toString() + ':A' + i.toString());
			paySlipWorksheet.mergeCells('B' + start.toString() + ':B' + i.toString());
			paySlipWorksheet.mergeCells('C' + start.toString() + ':C' + i.toString());
			paySlipWorksheet.mergeCells('D' + start.toString() + ':D' + i.toString());
			paySlipWorksheet.mergeCells('E' + start.toString() + ':E' + i.toString());
			paySlipWorksheet.mergeCells('F' + start.toString() + ':F' + i.toString());
			paySlipWorksheet.mergeCells('G' + start.toString() + ':G' + i.toString());
			paySlipWorksheet.mergeCells('H' + start.toString() + ':H' + i.toString());
			paySlipWorksheet.mergeCells('M' + start.toString() + ':M' + i.toString());
			paySlipWorksheet.mergeCells('N' + start.toString() + ':N' + i.toString());
			paySlipWorksheet.mergeCells('O' + start.toString() + ':O' + i.toString());
			paySlipWorksheet.mergeCells('P' + start.toString() + ':P' + i.toString());
			paySlipWorksheet.mergeCells('Q' + start.toString() + ':Q' + i.toString());
			paySlipWorksheet.mergeCells('R' + start.toString() + ':R' + i.toString());
			paySlipWorksheet.mergeCells('S' + start.toString() + ':S' + i.toString());
			paySlipWorksheet.mergeCells('T' + start.toString() + ':T' + i.toString());
			paySlipWorksheet.getRow(start).commit();
			start = i+1;
		}
		i++;
	}
	// return;
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
							{header: 'Employee ID', key: 'eID', width: 5},
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

						ARWorksheet.columns = [
							{header: 'AN', key: 'an', width: 5},
							{header: 'Issued By', key: 'issued', width: 15},
							{header: 'Name', key: 'name', width: 25},
							{header: 'Date', key: 'date', width: 20},
							{header: 'Particulars', key: 'part', width: 15},
							{header: 'Amount', key: 'amt', width: 10}
						];
						
						checkVoucherWorksheet.columns = [
							{header: 'AN', key: 'an', width: 5},
							{header: 'Issued By', key: 'issued', width: 15},
							{header: 'Name', key: 'name', width: 25},
							{header: 'Date', key: 'date', width: 20},
							{header: 'Particulars', key: 'part', width: 15},
							{header: 'Amount', key: 'amt', width: 10}
						];

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
									date_issued: paySlip_month_entry.dateIssued.toString(),
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
								var entry_total = checkVoucher_month_entry.amount;
								checkVoucherWorksheet.addRow({
									an: checkVoucher_month_entry.adviceNumber,
									issued: checkVoucher_month_entry.issuedBy,
									name: checkVoucher_month_entry.name,
									date: checkVoucher_month_entry.date,
									part: checkVoucher_month_entry.particulars,
									amt: checkVoucher_month_entry.amount
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
								var entry_total = checkVoucher_month_entry.amount;
								pettyCashWorksheet.addRow({
									an: pettyCash_month_entry.adviceNumber,
									issued: pettyCash_month_entry.issuedBy,
									name: pettyCash_month_entry.name,
									date: pettyCash_month_entry.date,
									part: pettyCash_month_entry.items[0][0],
									amt: pettyCash_month_entry.items[0][1],
									qty: pettyCash_month_entry.items[0][2]
								}).commit();
								console.log('HEREEE');
								for(var item = 1; item < pettyCash_month_entry.items.length; item++){
									pettyCashWorksheet.addRow({
										part: pettyCash_month_entry.items[item][0],
										amt: pettyCash_month_entry.items[item][1],
										qty: pettyCash_month_entry.items[item][2]
									}).commit();
								}
								console.log('HEREEE after');
								subtotal += parseFloat(entry_total);
							}
							total += subtotal;
							pettyCashWorksheet.addRow({
								part: "Subtotal:",
								amt: subtotal
							}).commit();
						}
						pettyCashWorksheet.addRow({
							part: "Total:",
							amt: total
						}).commit();

						merge_paySlip(paySlipWorksheet);
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
var Excel = require('exceljs');

function initialize(worksheet){
  worksheet.properties.defaultRowHeight = 20;
  worksheet.getColumn(1).alignment = {
    horizontal: 'left'
  };
  worksheet.getRow(1).font = {
    bold: true
  };
}

exports.report = function(req, res, callBack){
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

            console.log('ASDFASDF');  

            paySlipWorksheet.columns = [
              {header: 'AN', key: 'an', width: 5},
              {header: 'Issued By', key: 'issued', width: 15},
              {header: 'Employee ID', key: 'eID', width: 5},
              {header: 'Name', key: 'name', width: 25},
              {header: 'Base Salary', key: 'base', width: 10},
              {header: 'Start Date', key: 'start', width: 10},
              {header: 'End Date', key: 'end', width: 10},
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
              {header: 'Amount', key: 'amt', width: 10}
            ];
            
            for(var entry = 0; entry < paySlipData.length; entry++){      
              // console.log(entry);
              // console.log(paySlipData[entry]);
              paySlipWorksheet.addRow({
                an: paySlipData[entry].adviceNumber,
                issued: paySlipData[entry].issuedBy,
                eID: paySlipData[entry].eID,
                name: employee[0].name,
                base: employee[0].salary,
                start: paySlipData[entry].startDate,
                end: paySlipData[entry].endDate,
                deduct: paySlipData[entry].deductibles_name,
                deduct_amt: paySlipData[entry].deductibles,
                allow: paySlipData[entry].allowance_name,
                allow_amt: paySlipData[entry].allowance,
                ph: paySlipData[entry].PHreduc,
                hdmf: paySlipData[entry].HDMFreduc,
                sss: paySlipData[entry].SSSreduc,
                er_ph: paySlipData[entry].EmployerPH,
                er_hdmf: paySlipData[entry].EmployerHDMF,
                er_sss: paySlipData[entry].EmployerSSS,
                bir: paySlipData[entry].BIR,
                net: paySlipData[entry].total
              }).commit();
            }

            for(var entry = 0; entry < ARData.length; entry++){
              ARWorksheet.addRow({
                an: ARData[entry].adviceNumber,
                issued: ARData[entry].issuedBy,
                name: ARData[entry].name,
                date: ARData[entry].date,
                part: ARData[entry].particulars,
                amt: ARData[entry].amount
              }).commit();
            }

            for(var entry = 0; entry < checkVoucherData.length; entry++){
              checkVoucherWorksheet.addRow({
                an: checkVoucherData[entry].adviceNumber,
                issued: checkVoucherData[entry].issuedBy,
                name: checkVoucherData[entry].name,
                date: checkVoucherData[entry].date,
                part: checkVoucherData[entry].particulars,
                amt: checkVoucherData[entry].amount
              }).commit();entry
            }

            for(var entry = 0; entry < pettyCashData.length; entry++){
              pettyCashWorksheet.addRow({
                an: pettyCashData[entry].adviceNumber,
                issued: pettyCashData[entry].issuedBy,
                name: pettyCashData[entry].name,
                date: pettyCashData[entry].date,
                part: pettyCashData[entry].items[0][0],
                amt: pettyCashData[entry].items[0][1]
              }).commit();
              for(var item = 1; item < pettyCashData[entry].items.length; item++){
                pettyCashWorksheet.addRow({
                  part: pettyCashData[entry].items[item][0],
                  amt: pettyCashData[entry].items[item][1]
                }).commit();
              }
            }            

            workbook.xlsx.writeFile("uploads/report.xlsx");
          });
        });
      });
    });
  });
  callBack();
}
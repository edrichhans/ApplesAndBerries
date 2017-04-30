from pymongo import MongoClient
from colorama import init
from colorama import Fore, Style

init()


def deductibles(db, employeeDropdown, companyDropdown, deductibles_name, deductibles, allowance_name, allowance, startDate, endDate, username):

	paySlip = db["paySlip"];
	PhilHealth = db["PhilHealth"];
	Employees = db["Employees"];
	SSS = db["SSS"];
	BIR = db["BIR"];
	adviceNumbers = db["adviceNumbers"];
	metadata = db["metadata"];
	eID = int(employeeDropdown);
	company = companyDropdown;
	deductibles_name = deductibles_name;
	deductibles = deductibles;
	allowance_name = allowance_name;
	allowance = allowance;
	startDate = startDate;
	endDate = endDate;
	issuedBy = username;

	for i in range(0, len(deductibles)):

			print i+1, "test case: ", deductibles[i],
			try:

				deductibles[i] = float(deductibles[i]);
				print (Fore.GREEN + "SUCCESS\n")

			except ValueError:

				print (Fore.RED + "FAIL\n")

			print (Style.RESET_ALL)



def allowance(db, employeeDropdown, companyDropdown, deductibles_name, deductibles, allowance_name, allowance, startDate, endDate, username):

	paySlip = db["paySlip"];
	PhilHealth = db["PhilHealth"];
	Employees = db["Employees"];
	SSS = db["SSS"];
	BIR = db["BIR"];
	adviceNumbers = db["adviceNumbers"];
	metadata = db["metadata"];
	eID = int(employeeDropdown);
	company = companyDropdown;
	deductibles_name = deductibles_name;
	deductibles = deductibles;
	allowance_name = allowance_name;
	allowance = allowance;
	startDate = startDate;
	endDate = endDate;
	issuedBy = username;

	for i in range(0, len(allowance)):

			print i+1, "test case: ", allowance[i],
			try:

				allowance[i] = float(allowance[i]);
				print (Fore.GREEN + "SUCCESS\n")

			except ValueError:

				print (Fore.RED + "FAIL\n")

			print (Style.RESET_ALL)

def advicenumber(db, collection, employeeDropdown, companyDropdown, deductibles_name, deductibles, allowance_name, allowance, startDate, endDate, username):

	paySlip = db["paySlip"];
	PhilHealth = db["PhilHealth"];
	Employees = db["Employees"];
	SSS = db["SSS"];
	BIR = db["BIR"];
	adviceNumbers = db["adviceNumbers"];
	metadata = db["metadata"];
	eID = int(employeeDropdown);
	company = companyDropdown;
	deductibles_name = deductibles_name;
	deductibles = deductibles;
	allowance_name = allowance_name;
	allowance = allowance;
	startDate = startDate;
	endDate = endDate;
	issuedBy = username;


	doc = adviceNumbers.find_one({"name": collection})

	if  doc != None:

		oldAdviceNumber = doc['number'];
		print ("Old Advice Number: " + Fore.YELLOW + str(oldAdviceNumber) + "\n")
		adviceNumbers.update({"name": "paySlip"}, {'$inc':{"number": 1}});
		doc = adviceNumbers.find_one({"name": "paySlip"})
		currentAdviceNumber = doc['number'];

		if currentAdviceNumber == oldAdviceNumber + 1:

			print (Style.RESET_ALL + "New Advice Number: " + Fore.GREEN + str(currentAdviceNumber) + "  SUCCESS\n")
		
		else:

			print (Style.RESET_ALL + Fore.RED + "FAIL\n")

	else:

		print (Style.RESET_ALL + "No existing document of name: " + Fore.RED + collection + "  FAIL\n")


def HDMF(salary):
	
	if (salary < 0):

		return 0
	
	elif (salary <= 1500 and salary >= 0):

		return salary*0.01;
	
	else:

		return salary*0.02;

def getSum(arr):

	result = 0

	for i in range (0, len(arr)):

		result += arr[i];
		
	return result;
	
	
def insertToDB(db, employeeDropdown, companyDropdown, deductibles_name, deductibles, allowance_name, allowance, startDate, endDate, username):

	paySlip = db["paySlip"];
	PhilHealth = db["PhilHealth"];
	Employees = db["Employees"];
	SSS = db["SSS"];
	BIR = db["BIR"];
	adviceNumbers = db["adviceNumbers"];
	metadata = db["metadata"];
	eID = int(employeeDropdown);
	company = companyDropdown;
	deductibles_name = deductibles_name;
	deductibles = deductibles;
	allowance_name = allowance_name;
	allowance = allowance;
	startDate = startDate;
	endDate = endDate;
	issuedBy = username;

	hash = [];
	docs = metadata.find_one({"name": "BIR"})
	hash = docs['hash'];


	employee = Employees.find_one({"eID": 6})

	if employee == None:

		return ["employee", False]

	PHdoc = PhilHealth.find_one({"range.to": {'$gte': employee['salary']}, "range.from": {'$lte': employee['salary']}})

	if PHdoc == None:

		return ["PHdoc", False]

	SSSdoc = SSS.find_one({"range.to": {'$gte': employee['salary']}, "range.from": {'$lte': employee['salary']}})

	if SSSdoc == None:

		return ["SSSdoc", False]

	deps = employee['dependents']
				
	if (deps < 0):

		return ["dep", False]

	elif (deps >= 4):

		deps = 4

	BIRdoc = BIR.find_one({"dep": deps})

	if BIRdoc == None:

		return ["BIRdoc", False]

	range = BIRdoc['ranges']

	i = 0
	while i < len(range):

		if (employee['salary'] < range[i]):

			break

		i = i + 1
		
	i -= 1
	tax = ((employee['salary'] - range[i]) * hash[i][1]) + hash[i][0]
	tax = round(tax*100, 0)/100

	EE = float(SSSdoc['totalEE']);
	ER = float(SSSdoc['totalER']);
	hdmf = HDMF(employee['salary']);
	hdmf = round(hdmf*100, 0)/100;

	doc = adviceNumbers.find_one({"name": "paySlip"})
	currentAdviceNumber = doc['number'];

	jsondata = {
		"eID": eID,
		"adviceNumber": currentAdviceNumber,
		"issuedBy": issuedBy,
		"dateIssued": "March 28, 2017",
		"company": company,
		"deductibles_name": deductibles_name,
		"deductibles": deductibles,
		"allowance_name": allowance_name,
		"allowance": allowance,
		"startDate": startDate,
		"endDate": endDate,
		"PHreduc": PHdoc['share'],
		"SSSreduc": EE,
		"HDMFreduc": hdmf,
		"EmployerPH": PHdoc['share'],
		"EmployerSSS": ER,
		"EmployerHDMF": employee['salary']*0.02,
		"BIR": tax,
		"total": employee['salary'] - getSum(deductibles) + getSum(allowance) - PHdoc['share'] - EE - hdmf - tax
	}

	paySlip.insert_one(jsondata)

	return ["all", True]
	

client = MongoClient('mongodb://localhost:27017/')

db = client.ApplesAndBerries

# #------------------------------------------------------------------------------
# #valid test cases
# 	#0 to inf

# #invalid test cases
# 	#1)negative values
# 	#2)char and symbols
# 	#3)weird non numeric combinations

# print ("Test values for deductibles\n")

deductibles(db, 1, "Berries", ["samplededuc", "samplededuc2", "samplededuc3", "samplededuc4", "samplededuc5"],
[0.0000,999999.999999, -9999999.999999, "-a#*gad?12", "--0122.000.12"], ['sampleallow'], [1000], "March 1, 2017", "March 31, 2017", "Edrich")

#------------------------------------------------------------------------------
#valid test cases
	#0 to inf

#invalid test cases
	#1)negative values
	#2)char and symbols
 	#3)weird non numeric combinations

# print ("Test values for allowance")
allowance(db, 1, "Berries", ["samplededuc"], [1000.00], 
["sampledallow", "sampledallow2", "sampledallow3", "sampledallow4", "sampledallow5"], [0.0000,999999.999999, -9999999.999999, "-a#*gad?12", "--0122.000.12"], 
"March 1, 2017", "March 31, 2017", "Edrich")

#-------------------------------------------------------------------------------
#should increment if collection is found
#should fail if no matching collection in db found

# print ("Test value for advicenumber")
advicenumber(db, "laladudu", 1, "Berries", ["samplededuc"], [1000.00], ["sampledallow"], [1000.00], "March 1, 2017", "March 31, 2017", "Edrich")
advicenumber(db, "paySlip", 1, "Berries", ["samplededuc"], [1000.00], ["sampledallow"], [1000.00], "March 1, 2017", "March 31, 2017", "Edrich")

#-------------------------------------------------------------------------------
#valid test cases
	#1) salary >= 0 and <= 1500

if HDMF(0) == 0:

	print (Style.RESET_ALL + "Salary: 0" + Fore.GREEN + "  SUCCESS\n")

else:

	print (Style.RESET_ALL + "Salary: 0" + Fore.RED + "  FAIL\n")

if HDMF(1500) == 15:

	print (Style.RESET_ALL + "Salary: 1500" + Fore.GREEN + "  SUCCESS\n")

else:

	print (Style.RESET_ALL + "Salary: 1500" + Fore.RED + "  FAIL\n")

	#2) salary > 1500

if HDMF(1501) == 30.02:

	print (Style.RESET_ALL + "Salary: 1501" + Fore.GREEN + "  SUCCESS\n")

else:

	print (Style.RESET_ALL + "Salary: 1501" + Fore.RED + "  FAIL\n")

#invalid test cases
 	#1) salary < 0

if HDMF(-9999) == 0:

	print (Style.RESET_ALL + "Salary: -99999" + Fore.GREEN + "  SUCCESS\n")

else:

	print (Style.RESET_ALL + "Salary: 0" + Fore.RED + "  FAIL\n")

 	#2) salary is not a valid float
		#UI has prevented this from ever happening

#----------------------------------------------------------------------------------
#valid test case
 	#normal floats

if getSum([12.50, -1.2345, 09.09, 00.000, -0.00, -0.01]) == 20.3455:

	print (Style.RESET_ALL + "Sum is correct" + Fore.GREEN + "  SUCCESS\n")

else:

	print (Style.RESET_ALL + "Sum is incorrect" + Fore.RED + "  FAIL\n")

#invalid test cases
 	#none since numbers are provided beforehand in database

 #----------------------------------------------------------------------------------

#valid test
	#successful insert

#invalid test
	#failed insert

	#failed collection get from database

value = insertToDB(db, 0, "Berries", ["samplededuc"], [1000.00], ['sampleallow'], [1000.00], "March 1, 2017", "March 31, 2017", "Edrich")

if value[1] == True:

	print (Style.RESET_ALL + "Insert ok" + Fore.GREEN + "  SUCCESS\n")

else:

	print (Style.RESET_ALL + "Failure at: " + Fore.RED + value[0] + "  FAIL\n")

#---------------------------------------------------------------------------------
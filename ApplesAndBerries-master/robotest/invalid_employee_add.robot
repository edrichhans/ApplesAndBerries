*** Settings ***
Documentation     A test suite containing tests related to invalid employee add.
...
...               These tests are data-driven by their nature. They use a single
...               keyword, specified with Test Template setting, that is called
...               with different arguments to cover different scenarios.
...
...               This suite also demonstrates using setups and teardowns in
...               different levels.
Suite Setup       Open Browser To Main Menu
Suite Teardown	  Close Browser
Resource          employee_resource.robot
Test Template     Wrong Input In Fields Should Fail


*** Test Cases ***               
Empty Name                 
Empty Startdate           
Empty Birthday
Empty Position
Empty Status
Empty Dependents
Empty Salary

*** Keywords ***
Wrong Input In Fields Should Fail
    [Arguments]    ${name}    ${startdate}    ${birthday}    ${position}	${status}	${dependents}	${salary}
	Go To Employee Panel
    Click Button	addemp
    Wait Until Page Contains    Add Employee
    Location Should Be 			${ADD EMPLOY URL}
    Input EmpName				${name}
    Select Status 				${status}
    Input StartDate 			${startdate}
    Input Birthday  			${birthday}
    Select Position 			${position}
    Input Dependents 			${position}
    Input Salary 				${salary}
    Submit Form
    Location Should Be    ${EMPLOY URL}

Input EmpName
	[Arguments]    ${name}
    Input Text    name    ${name}

Input StartDate
	[Arguments]    ${startdate}
    Input Text    startdate    ${startdate}

Input Birthday
	[Arguments]    ${birthday}
    Input Text    birthday    ${birthday}

Select Position
	[Arguments]    ${position}
	Click Element	xpath=//body/div/div[2]/form/div[3]/div/div		
	Select From List By Index	    position     ${position}

Select Status
	[Arguments]    ${status}
	Click Element	xpath=//body/div/div[2]/form/div[3]/div[2]/div
	Select From List By Index	    status       ${status}
	
Input Dependents
	[Arguments]    ${dependents}
	Input Text    dependents 	 ${deoendents}

Input Salary
	[Arguments]    ${salart}
	Input Text	  salary 		${salary}
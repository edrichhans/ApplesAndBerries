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
Empty Name                 ${EMPTY}	  12/30/2017	12/30/1997   0   0   100   100000
Empty Startdate            Chacha${SPACE}Beatboy	${EMPTY}   12/30/1997   0   0   100   100000
Empty Birthday 			   Chacha${SPACE}Beatboy	12/30/2017	 ${EMPTY}   0   0   100   100000
Empty Dependents 		   Chacha${SPACE}Beatboy	12/30/2017	 12/30/1997   0   0   ${EMPTY}   100000
Empty Salary 			   Chacha${SPACE}Beatboy	12/30/2017	 12/30/1997   0   0   100   ${EMPTY}
Char Dependents 		   Chacha${SPACE}Beatboy	12/30/2017	 12/30/1997   0   0   gray   100000
Char Salary 			   Chacha${SPACE}Beatboy	12/30/2017	 12/30/1997   0   0   100   gray

*** comment ***

Empty Position 			   Chacha${SPACE}Beatboy	12/30/2017	 12/30/1997   ${EMPTY}   0   100   100000
Empty Status 			   Chacha${SPACE}Beatboy	12/30/2017	 12/30/1997   0   ${EMPTY}   100   100000

*** Keywords ***
Wrong Input In Fields Should Fail
    [Arguments]    ${name}    ${startdate}    ${birthday}    ${position}	${status}	${dependents}	${salary}
    Go To Employee Panel
    Input EmpName				${name}
    Select Status 				${status}
    Input StartDate 			${startdate}
    Input Birthday  			${birthday}
    Select Position 			${position}
    Input Dependents 			${dependents}
    Input Salary 				${salary}
    Submit Form
    Location Should Be    ${ADD EMPLOY URL}
    Go Back Home

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
	Input Text    dependents 	 ${dependents}

Input Salary
	[Arguments]    ${salary}
	Input Text	  salary 		${salary}

Add an 
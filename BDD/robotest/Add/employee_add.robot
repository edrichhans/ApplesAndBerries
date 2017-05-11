*** Settings ***
Documentation     A test suite with a single test for adding an employee.
...
...               This test has a workflow that is created using keywords in
...               the imported resource file.
Suite Setup       Open Browser To Main Menu
Suite Teardown	  Close Browser
Test Template     Check Add Employee Status
Resource          menu_resource.robot

*** Test Cases ***         NAME              STARTDATE     BIRTHDAY    POSITION    STATUS    DEPENDENTS   SALARY      
Empty Name                 ${EMPTY}          12/30/2017    12/30/1997   0   0   100   100000
Empty Startdate            Chacha Beatboy    ${EMPTY}      12/30/1997   0   0   100   100000
Empty Birthday             Chacha Beatboy    12/30/2017    ${EMPTY}     0   0   100   100000
Empty Dependents           Chacha Beatboy    12/30/2017    12/30/1997   0   0   ${EMPTY}   100000
Empty Position             Chacha Beatboy    12/30/2017    12/30/1997   ${EMPTY}   0   100   100000
Empty Status               Chacha Beatboy    12/30/2017    12/30/1997   0   ${EMPTY}   100   100000
Empty Salary               Chacha Beatboy    12/30/2017    12/30/1997   0   0   100   ${EMPTY}
Char Dependents            Chacha Beatboy    12/30/2017    12/30/1997   0   0   gray   100000
Char Salary                Chacha Beatboy    12/30/2017    12/30/1997   0   0   100   gray
Correct Admin              Chacha Beatboy    12/30/2017    12/30/1997   0   0   5   40000
   
    
*** Keywords ***
Check Add Employee Status
    [Arguments]    ${name}    ${startdate}    ${birthday}    ${position}    ${status}   ${dependents}   ${salary}
    Go To Employee Panel
    Input EmpName       ${name}
    Select Status       ${status}
    Input StartDate     ${startdate}
    Input Birthday      ${birthday}
    Select Position     ${position}
    Input Dependents    ${dependents}
    Input Salary        ${salary}
    Submit Form
    Wait Until Page Contains   Employees
    Location Should Be    ${EMPLOY URL}
    
Input EmpName
    [Arguments]    ${name}
    Input Text    name         ${name}

Input StartDate
    [Arguments]    ${startdate}
    Input Text    startdate    ${startdate}

Input Birthday
    [Arguments]    ${birthday}
    Input Text    birthday     ${birthday}

Select Position
    [Arguments]    ${position}
	Click Element	xpath=//body/div/div[3]/div/form/div[3]/div/div
	Select From List By Index	    position     ${position}

Select Status
    [Arguments]    ${status} 
	Click Element	xpath=//body/div/div[3]/div/form/div[3]/div[2]/div
	Select From List By Index	status   ${status}
	
Input Dependents
    [Arguments]    ${dependents}
	Input Text    dependents 	 ${dependents}

Input Salary
    [Arguments]    ${salary}
	Input Text	  salary 		${salary}
	
Go To Employee Panel
    Click Element              employee-module-button
    Wait Until Page Contains   Employees
    Location Should Be         ${EMPLOY URL}
    Click Button               add-employee-button
    Wait Until Page Contains    Add employee
    Location Should Be          ${ADD EMPLOY URL}

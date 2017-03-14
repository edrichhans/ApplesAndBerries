*** Settings ***
Documentation     A test suite with a single test for adding an employee.
...
...               This test has a workflow that is created using keywords in
...               the imported resource file.
Suite Setup       Open Browser To Main Menu
Suite Teardown	  Close Browser
Resource          menu_resource.robot

*** Test Cases ***
Check Add Employee Status
	Go To Employee Panel
    Input EmpName
    Select Status
    Input StartDate
    Input Birthday 
    Select Position
    Input Dependents
    Input Salary
    Submit Form
    Wait Until Page Contains   Employees
    Location Should Be    ${EMPLOY URL}
    
    
*** Keywords ***
Input EmpName
    Input Text    name    Chacha${SPACE}BeatBoy

Input StartDate
    Input Text    startdate    12/30/2017

Input Birthday
    Input Text    birthday    12/30/1997

Select Position
	Click Element	xpath=//body/div/div/div[3]/div/form/div[3]/div/div
	Click Element   xpath=//body/div/div/div[3]/div/form/div[3]/div/div/div/div[2]

Select Status
	Click Element	xpath=//body/div/div/div[3]/div/form/div[3]/div[2]/div
	Click Element   xpath=//body/div/div/div[3]/div/form/div[3]/div[2]/div/div/div[2]
	
Input Dependents
	Input Text    dependents 	 0

Input Salary
	Input Text	  salary 		18000
	
Go To Employee Panel
    Click Button               employee-module-button
    Wait Until Page Contains   EmployeePanel
    Location Should Be         ${EMPLOY URL}
    Click Button                xpath=//body/div/div/div[3]/div/div[2]/button
    Wait Until Page Contains    Add Employee
    Location Should Be          ${ADD EMPLOY URL}

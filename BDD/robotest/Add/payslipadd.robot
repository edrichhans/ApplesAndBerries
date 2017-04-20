*** Settings ***
Documentation     A test suite with a single test for adding a payslip.
...
...               This test has a workflow that is created using keywords in
...               the imported resource file.
Suite Setup       Open Browser To Main Menu
Suite Teardown	  Close Browser
Resource          menu_resource.robot

*** Test Cases ***
Check Add Payslip Status
	Go To Payslip Panel
    Select Employee
    Select Company
    Input StartDate
    Input EndDate
    Input Deductibles 
    Input Allowance
    Check Preview
    Wait Until Page Contains   Apples and Berries Payroll System
    Location Should Be    ${WELCOME URL}
    
    
*** Keywords ***
Select Employee
    Click Element   xpath=//body/div/div/div[3]/div/form/div/div
    Click Element   xpath=//body/div/div/div[3]/div/form/div/div/div[2]/div

Input StartDate
    Input Text    startDate    12/30/2017

Input EndDate
    Input Text    endDate    12/30/2017    

Input Deductibles
    Input Text    deductibles_name    asdgad
    Input Text    deductibles         10000

Select Company
	Click Element   xpath=//body/div/div/div[3]/div/form/div[2]/div
    Click Element   xpath=//body/div/div/div[3]/div/form/div[2]/div/div[2]/div
	
Input Allowance
	Input Text    allowance_name 	 asfasg
    Input Text    allowance          10000

Check Preview
    Click Element       payslip-preview
    Submit Form
	
Go To Payslip Panel
    Click Element               payslip-module-button
    Wait Until Page Contains   Payslip
    Location Should Be         ${PAYSLIP URL}
    Click Button                add-payslip-button
    Wait Until Page Contains    Issue Payslip
    Location Should Be          ${ADD PAYSLIP URL}

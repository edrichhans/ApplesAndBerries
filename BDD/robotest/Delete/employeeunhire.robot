*** Settings ***
Documentation     A test suite with a single test for unhiring an employee.
...
...               This test has a workflow that is created using keywords in
...               the imported resource file.
Resource          menu_resource.robot

*** Test Cases ***
Check Unhired Employee Status
    Open Browser To Main Menu
	Go To Employee Panel
    Unhire Employee
    Location Should Be    ${EMPLOY URL}?addemployee=&birthday=&status=
    [Teardown]            Close Browser
    
    
*** Keywords ***
Unhire Employee
    Open Context Menu          xpath=//table[@id="employee-view-table"]/tbody/tr/td
    Click Element              xpath=//body/div/div/div[3]/ul/li[2]
    Click Element              xpath=//div[@id="delete"]
	
Go To Employee Panel
    Click Element              employee-module-button
    Wait Until Page Contains   Employees
    Location Should Be         ${EMPLOY URL}

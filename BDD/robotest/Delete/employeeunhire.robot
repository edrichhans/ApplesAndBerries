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
    Location Should Be    ${EMPLOY URL}
    [Teardown]            Close Browser
    
    
*** Keywords ***
Unhire Employee
    Open Context Menu          xpath=//body/div/div[3]/div/div[3]/div/table/tbody/tr
    Click Element              xpath=//body/div/div[3]/ul/li[2]
    Choose Ok On Next Confirmation
    Click Element              xpath=//body/div[2]/div/div[3]/div
    Confirm Action
	
Go To Employee Panel
    Click Element              employee-module-button
    Wait Until Page Contains   Employees
    Location Should Be         ${EMPLOY URL}

*** Settings ***
Documentation     A test suite with a single test for deleting a payslip entry.
...
...               This test has a workflow that is created using keywords in
...               the imported resource file.
Resource          menu_resource.robot

*** Test Cases ***
Check Delete Payslip Status
    Open Browser To Main Menu
	Go To Payslip Panel
    Delete Payslip Entry
    Location Should Be    ${PAYSLIP URL}
    [Teardown]      Close Browser
    
    
*** Keywords ***
Delete Payslip Entry
    Select Checkbox             xpath=//table[@id="payslip-view-table"]/tbody/tr/td/div/input
    Click Element               delete-payslip-button
	
Go To Payslip Panel
    Click Element               payslip-module-button
    Wait Until Page Contains    Payslip
    Location Should Be          ${PAYSLIP URL}
    
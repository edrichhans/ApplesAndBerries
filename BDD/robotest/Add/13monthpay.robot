*** Settings ***
Documentation     A test suite with a single test for adding 13th month pay.
...
...               This test has a workflow that is created using keywords in
...               the imported resource file.
Test Setup        Go To Payslip Panel
Test Teardown     Close Browser
Resource          menu_resource.robot

*** Test Cases ***  
    
*** Keywords ***
Go To Payslip Panel
    Open Browser To Main Menu
    Click Element               payslip-module-button
    Wait Until Page Contains   Payslip
    Location Should Be         ${PAYSLIP URL}
    Click Button                add-payslip-button
    Wait Until Page Contains    Issue Payslip
    Location Should Be          ${ADD PAYSLIP URL}

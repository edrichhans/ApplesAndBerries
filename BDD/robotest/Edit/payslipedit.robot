*** Settings ***
Documentation     A test suite with a single test for editing info of payslip value.
...
...               This test has a workflow that is created using keywords in
...               the imported resource file.
Test Teardown     Close Browser
Resource          menu_resource.robot

*** Test Cases ***
Check Edit Payslip Status
    Open Browser To Main Menu
    Open Payslip Table
    Payslip Values Update
    Location Should Be       ${WELCOME URL}

*** Keywords ***        
Open Payslip Table
    Click Element    payslip-module-button
    Location Should Be     ${PAYSLIP URL}
    Open Context Menu      xpath=//table[@id="payslip-view-table"]/tbody/tr
    Click Element          xpath=//body/div/div/div[3]/ul/li

Payslip Values Update
    Click Element              xpath=//body/div/div/div[3]/div/form/div/div
    Click Element              xpath=//body/div/div/div[3]/div/form/div/div/div[2]/div
    Click Element              xpath=//body/div/div/div[3]/div/form/div[2]/div
    Click Element              xpath=//body/div/div/div[3]/div/form/div[2]/div/div[2]/div
    Input Text                 startDate        January 1, 100
    Input Text                 endDate          September 13, 275760
    Input Text                 deductibles_name         sampleDE
    Input Text                 deductibles              123.123
    Input Text                 allowance_name           sampleAL
    Input Text                 allowance                123.123
    Click Element              payslip-preview
    Click Element              xpath=//body/div[2]/div/i
    Submit Form
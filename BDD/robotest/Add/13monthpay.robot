*** Settings ***
Documentation     A test suite with a single test for adding 13th month pay.
...
...               This test has a workflow that is created using keywords in
...               the imported resource file.
Test Teardown     Close Browser
Resource          menu_resource.robot

*** Test Cases ***  
Go To Payslip Panel
    Open Browser To Main Menu
    Click Element               payslip-module-button
    Wait Until Page Contains   Payslip
    Location Should Be         ${PAYSLIP URL}
    Click Button                add-payslip-button
    Wait Until Page Contains    Issue Payslip
    Location Should Be          ${ADD PAYSLIP URL}
    Choose Employee
    Choose Company
    Enter Startdate
    Enter Enddate
    Enter Deductibles And Amount
    Enter Allowance And Amount
    Toggle Slider
    Submit Form Now
    Location Should Be         ${WELCOME URL}

*** Keywords ***
Choose Employee
    Click Element              xpath=//form/div/div
    Click Element              xpath=//form/div/div/div[2]/div[1]

Choose Company
    Click Element              xpath=//form/div[2]/div
    Click Element              xpath=//form/div[2]/div/div[2]/div[1]

Enter Startdate
    Input Text                 startDate      12/29/2017

Enter Enddate
    Input Text                 endDate      12/30/2017

Enter Deductibles And Amount
    Input Text                 deductibles_name      item
    Input Text                 deductibles           1000.1000

Enter Allowance And Amount
    Input Text                 allowance_name      item
    Input Text                 allowance           1000.1000

Toggle Slider
    Click Element              thirteenth

Submit Form Now
    Submit Form
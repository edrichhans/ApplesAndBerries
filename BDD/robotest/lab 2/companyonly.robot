*** Settings ***
Documentation     A test suite with a single test for checking if entering only one's company with choosing an employee first will allow a preview.
...
...               This test has a workflow that is created using keywords in
...               the imported resource file.
Suite Setup       Open Browser To Main Menu
Suite Teardown    Close Browser
Resource          menu_resource.robot

*** Test Cases ***
Go To Payslip Panel
    Click Element              payslip-module-button
    Wait Until Page Contains   Payslip View
    Location Should Be         ${PAYSLIP URL}
    Click Button               xpath=//body/div/div/div[3]/div/div[2]/button
    Wait Until Page Contains   Add Payslip
    Location Should Be         ${ADD PAYSLIP URL}
    Click Element              xpath=//body/div/div/div[3]/div/form/div[2]/div
    Click Element              xpath=//body/div/div/div[3]/div/form/div[2]/div/div[2]/div
    Click Element              payslip-preview
    Click Element              xpath=//body/div[2]/div/i
    Submit Form
    Location Should Be    ${WELCOME URL}
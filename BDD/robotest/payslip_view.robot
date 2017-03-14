*** Settings ***
Documentation     A test suite with a single test for going to payslip page.
...
...               This test has a workflow that is created using keywords in
...               the imported resource file.
Suite Setup       Open Browser To Main Menu
Suite Teardown	  Close Browser
Resource          payslip_resource.robot

*** Test Cases ***
Go To Payslip Panel
    Click Element              xpath=//body/div/div[2]/div[2]/div[2]/div[2]/div
    Wait Until Page Contains   Payslip View
    Location Should Be         ${PAYSLIP URL}
    Click Button               xpath=//body/div/div[2]/div[2]/div[2]/button
    Wait Until Page Contains   Add Payslip
    Location Should Be         ${ADD PAYSLIP URL}
    Go Back Home
    

*** Settings ***
Documentation     A test suite with a single test for adding a CV.
...
...               This test has a workflow that is created using keywords in
...               the imported resource file.
Suite Setup       Open Browser To Main Menu
Suite Teardown	  Close Browser
Resource          menu_resource.robot

*** Test Cases ***
Check Add CV Status
	Go To CV Panel
    Input Name
    Input Date
    Input Particulars
    Check Preview
    Wait Until Page Contains   Apples and Berries Payroll System
    Location Should Be    ${WELCOME URL}
    
    
*** Keywords ***
Input Name
    Input Text    name         Chacha Beatboy

Input Date
    Input Text    date         12/30/2017

Input Particulars
    Click Element       xpath=//form[@id="checkvoucher"]/div[4]/div
    Click Element       xpath=//form[@id="checkvoucher"]/div[4]/div/div[2]/div
    Input Text    amount         10000

Check Preview
    Click Element       checkVoucher-preview
    Submit Form
	
Go To CV Panel
    Click Element              check-voucher-module-button
    Wait Until Page Contains   Check Voucher
    Location Should Be         ${CV URL}
    Click Button                add-CV-button
    Wait Until Page Contains    Check Voucher
    Location Should Be          ${ADD CV URL}

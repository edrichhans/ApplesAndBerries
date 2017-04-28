*** Settings ***
Documentation     A test suite with a single test for deleting a CV entry.
...
...               This test has a workflow that is created using keywords in
...               the imported resource file.
Suite Setup       
Suite Teardown    Close Browser
Resource          menu_resource.robot

*** Test Cases ***
Check Delete CV Status
    Open Browser To Main Menu
	Go To CV Panel
    Delete CV Entry
    Location Should Be    ${CV URL}
    [Teardown]     Close Browser
    
    
*** Keywords ***
Delete CV Entry
    Select Checkbox             xpath=//table[@id="check-voucher-view-table"]/tbody/tr/td/div/input
    Click Button                delete-checkVoucher-button
	
Go To CV Panel
    Click Element              check-voucher-module-button
    Wait Until Page Contains   Check Voucher
    Location Should Be         ${CV URL}

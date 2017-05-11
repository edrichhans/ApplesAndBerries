*** Settings ***
Documentation     A test suite with a single test for deleting an AR entry.
...
...               This test has a workflow that is created using keywords in
...               the imported resource file.
Resource          menu_resource.robot

*** Test Cases ***
Check Add AR Status
    Open Browser To Main Menu
	Go To AR Panel
    Delete AR Entry
    Location Should Be    ${AR URL}
    [Teardown]      Close Browser
    
    
*** Keywords ***
Delete AR Entry
    Select Checkbox            xpath=//table[@id="AR-view-table"]/tbody/tr/td/div/input
    Click Button               delete-AR-button
    Click Element              delete
    Click Element              delete-alert
	
Go To AR Panel
    Click Element              control-panel-module-button
    Wait Until Page Contains   Manage Financials
    Location Should Be         ${INDEX FINANCIALS}
    Click Element              AR-module-button
    Wait Until Page Contains   Acknowledgment Receipt
    Location Should Be         ${AR URL}

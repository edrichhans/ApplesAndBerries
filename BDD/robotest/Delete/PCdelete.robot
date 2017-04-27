*** Settings ***
Documentation     A test suite with a single test for deleting a Petty Cash entry.
...
...               This test has a workflow that is created using keywords in
...               the imported resource file.
Resource          menu_resource.robot

*** Test Cases ***
Check Delete PC Status
    Open Browser To Main Menu
    Go To PC Panel
    Delete PC Entry
    Location Should Be    ${PC URL}
    [Teardown]    Close Browser
    
    
*** Keywords ***
Delete PC Entry
    Select Checkbox            xpath=//table[@id="petty-cash-view-table"]/tbody/tr/td/div/input
    Click Element              delete-pettyCash-button
    
Go To PC Panel
    Click Element              petty-cash-module-button
    Wait Until Page Contains   Petty Cash
    Location Should Be         ${PC URL}
   
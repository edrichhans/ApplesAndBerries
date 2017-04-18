*** Settings ***
Documentation     A test suite with a single test for adding a Petty Cash.
...
...               This test has a workflow that is created using keywords in
...               the imported resource file.
Suite Setup       Open Browser To Main Menu
Suite Teardown    Close Browser
Resource          menu_resource.robot

*** Test Cases ***
Check Add PC Status
    Go To PC Panel
    Input Name
    Input Date
    Input Particulars
    Check Preview
    Wait Until Page Contains   Petty Cash
    Location Should Be    ${PC URL}
    
    
*** Keywords ***
Input Name
    Input Text    name         Chacha Beatboy

Input Date
    Input Text    date         12/30/2017

Input Particulars
    Input Text    particulars    asfadf
    Input Text    amount         10000

Check Preview
    Click Element       pettyCash-preview
    Submit Form
    
Go To PC Panel
    Click Element              petty-cash-module-button
    Wait Until Page Contains   Petty Cash
    Location Should Be         ${PC URL}
    Click Button                add-petty-cash-button
    Wait Until Page Contains    Petty Cash
    Location Should Be          ${ADD PC URL}

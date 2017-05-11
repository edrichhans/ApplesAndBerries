*** Settings ***
Documentation     A test suite with a single test for adding a Petty Cash.
...
...               This test has a workflow that is created using keywords in
...               the imported resource file.
Resource          menu_resource.robot

*** Test Cases *** 
Check Add PC Status
    Open Browser To Main Menu
    Go To PC Panel
    Input Name 
    Input Date  
    Input Particulars1 
    Check Preview
    Wait Until Page Contains   Petty Cash
    Location Should Be    ${PC URL}
    [Teardown]     Close Browser

Check Add PC Status
    Open Browser To Main Menu
    Go To PC Panel
    Input Name 
    Input Date  
    Input Particulars2 
    Check Preview
    Wait Until Page Contains   Petty Cash
    Location Should Be    ${PC URL}
    [Teardown]     Close Browser

Check Add PC Status
    Open Browser To Main Menu
    Go To PC Panel
    Input Name 
    Input Date  
    Input Particulars3 
    Check Preview
    Wait Until Page Contains   Petty Cash
    Location Should Be    ${PC URL}
    [Teardown]     Close Browser

Check Add PC Status
    Open Browser To Main Menu
    Go To PC Panel
    Input Name 
    Input Date  
    Input Particulars4 
    Check Preview
    Wait Until Page Contains   Petty Cash
    Location Should Be    ${PC URL}
    [Teardown]     Close Browser
    
*** Keywords ***  
Input Name
    Input Text     name        Chacha Beatboy

Input Date
    Input Text     date        12/30/2017

Input Particulars1
    Input Text     xpath=//div[@id="pettyCash-particulars"]/div/div/div/input     item1
    Input Text     xpath=//div[@id="pettyCash-particulars"]/div/div[2]/div/input          1000.1000
    Input Text     xpath=//div[@id="pettyCash-particulars"]/div/div[3]/div/input      5
    Click Element     add-field
    Input Text     xpath=//div[@id="pettyCash-particulars"]/div[2]/div/div/input     item2
    Input Text     xpath=//div[@id="pettyCash-particulars"]/div[2]/div[2]/div/input          2000.1000
    Input Text     xpath=//div[@id="pettyCash-particulars"]/div[2]/div[3]/div/input      5

Input Particulars2
    Input Text     xpath=//div[@id="pettyCash-particulars"]/div/div/div/input     item1
    Input Text     xpath=//div[@id="pettyCash-particulars"]/div/div[2]/div/input          1000.1000
    Input Text     xpath=//div[@id="pettyCash-particulars"]/div/div[3]/div/input      5
    Click Element     add-field
    Input Text     xpath=//div[@id="pettyCash-particulars"]/div[2]/div/div/input     ${EMPTY}
    Input Text     xpath=//div[@id="pettyCash-particulars"]/div[2]/div[2]/div/input          ${EMPTY}
    Input Text     xpath=//div[@id="pettyCash-particulars"]/div[2]/div[3]/div/input      5

Input Particulars3
    Input Text     xpath=//div[@id="pettyCash-particulars"]/div/div/div/input     item1
    Input Text     xpath=//div[@id="pettyCash-particulars"]/div/div[2]/div/input          1000.1000
    Input Text     xpath=//div[@id="pettyCash-particulars"]/div/div[3]/div/input      5
    Click Element     add-field
    Input Text     xpath=//div[@id="pettyCash-particulars"]/div[2]/div/div/input     item2
    Input Text     xpath=//div[@id="pettyCash-particulars"]/div[2]/div[2]/div/input          -2000.1000
    Input Text     xpath=//div[@id="pettyCash-particulars"]/div[2]/div[3]/div/input      5

Input Particulars4
    Input Text     xpath=//div[@id="pettyCash-particulars"]/div/div/div/input     item1
    Input Text     xpath=//div[@id="pettyCash-particulars"]/div/div[2]/div/input          1000.1000
    Input Text     xpath=//div[@id="pettyCash-particulars"]/div/div[3]/div/input      5
    Click Element     add-field
    Input Text     xpath=//div[@id="pettyCash-particulars"]/div[2]/div/div/input     item2
    Input Text     xpath=//div[@id="pettyCash-particulars"]/div[2]/div[2]/div/input          adfhak
    Input Text     xpath=//div[@id="pettyCash-particulars"]/div[2]/div[3]/div/input      5

Check Preview
    Click Element       pettyCash-preview
    Click Element       xpath=//body/div[2]/div/i
    Submit Form
    
Go To PC Panel
    Click Element              control-panel-module-button
    Wait Until Page Contains   Manage Financials
    Location Should Be         ${INDEX FINANCIALS}
    Click Element              petty-cash-module-button
    Wait Until Page Contains   Petty Cash
    Location Should Be         ${PC URL}
    Click Button                add-petty-cash-button
    Wait Until Page Contains    Petty Cash
    Location Should Be          ${ADD PC URL}

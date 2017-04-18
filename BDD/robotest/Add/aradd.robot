*** Settings ***
Documentation     A test suite with a single test for adding an AR.
...
...               This test has a workflow that is created using keywords in
...               the imported resource file.
Suite Setup       Open Browser To Main Menu
Suite Teardown	  Close Browser
Resource          menu_resource.robot

*** Test Cases ***
Check Add AR Status
	Go To AR Panel
    Input Name
    Input Date
    Input Particulars
    Check Preview
    Wait Until Page Contains   Acknowledgment Receipt
    Location Should Be    ${AR URL}
    
    
*** Keywords ***
Input Name
    Input Text    name         Chacha Beatboy

Input Date
    Input Text    date         12/30/2017

Input Particulars
    Input Text    particulars    asdgad
    Input Text    amount         10000

Check Preview
    Click Element       AR-preview
    Submit Form
	
Go To AR Panel
    Click Element              AR-module-button
    Wait Until Page Contains   Acknowledgment Receipt
    Location Should Be         ${AR URL}
    Click Button                add-AR-button
    Wait Until Page Contains    Acknowledgement Receipt
    Location Should Be          ${ADD AR URL}

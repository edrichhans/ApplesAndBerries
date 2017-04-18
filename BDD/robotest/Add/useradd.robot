*** Settings ***
Documentation     A test suite with a single test for adding a user of the application.
...
...               This test has a workflow that is created using keywords in
...               the imported resource file.
Suite Setup       Open Browser To Main Menu
Suite Teardown	  Close Browser
Resource          menu_resource.robot

*** Test Cases ***
Check Add New User Status
    Open Browser To Main Menu
	Go To Control Panel
    Input UserName
    Input Password
    Reinput Password
    Input Dependents
    Input Salary
    Submit Form
    Wait Until Page Contains   Main Menu
    Location Should Be    ${WELCOME URL}
    
    
*** Keywords ***
Input UserName
    Input Text    username         Adrian Sing

Input Password
    Input Text    password         password

Reinput Password
    Input Text    repass           password
	
Go To Control Panel
    Click Element              control-panel-module-button
    Wait Until Page Contains   Control Panel
    Location Should Be         ${CONTROL PANEL URL}
    Click Element               add-user-button
    Wait Until Page Contains    Create User
    Location Should Be          ${ADD USER URL}

*** Settings ***
Documentation     A test suite with a single test for adding a user of the application.
...
...               This test has a workflow that is created using keywords in
...               the imported resource file.
Test Template     Check Add New User Status
Resource          menu_resource.robot

*** Test Cases ***          username       password
Empty Username                             password
Empty Password              Adrian Sing
Correct Input               Adrian Sing    password

*** Keywords ***
Check Add New User Status
    [Arguments]      ${username}     ${password}
    Open Browser To Main Menu
    Go To Control Panel
    Input UserName   ${username}
    Input Password   ${password}
    Reinput Password     ${password}
    Submit Form
    Wait Until Page Contains   Main Menu
    Location Should Be    ${WELCOME URL}
    [Teardown]      Close Browser

Input UserName
    [Arguments]      ${username}
    Input Text    username         ${username}

Input Password
    [Arguments]      ${password}
    Input Text    password         ${password}

Reinput Password
    [Arguments]      ${password}
    Input Text    repass           ${password}
	
Go To Control Panel
    Click Element              control-panel-module-button
    Wait Until Page Contains   Control Panel
    Location Should Be         ${CONTROL PANEL URL}
    Click Element               add-user-button
    Wait Until Page Contains    Create User
    Location Should Be          ${ADD USER URL}

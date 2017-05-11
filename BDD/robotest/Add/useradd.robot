*** Settings ***
Documentation     A test suite with a single test for adding a user of the application.
...
...               This test has a workflow that is created using keywords in
...               the imported resource file.
Test Template     Check Add New User Status
Resource          menu_resource.robot

*** Test Cases ***          username       password     email
Empty Username              ${EMPTY}       password     blablabla
Empty Password              Adrian Sing    ${EMPTY}     blablabla
Empty Email                 Adrian Sing    password     ${EMPTY}
Correct Input               Adrian Sing    password     sing.adrian69@gmail.com

*** Keywords ***
Check Add New User Status
    [Arguments]      ${wusername}     ${wpassword}      ${email}
    Open Browser To Main Menu
    Go To Control Panel
    Input WUserName   ${wusername}
    Input Email      ${email}
    Input WPassword   ${wpassword}
    Reinput Password     ${wpassword}
    Submit Form
    Wait Until Page Contains   Main Menu
    Location Should Be    ${WELCOME URL}
    [Teardown]      Close Browser

Input WUserName
    [Arguments]      ${wusername}
    Input Text    username         ${wusername}

Input Email
    [Arguments]      ${email}
    Input Text    email         ${email}

Input WPassword
    [Arguments]      ${wpassword}
    Input Text    password         ${wpassword}

Reinput Password
    [Arguments]      ${wpassword}
    Input Text    repass           ${wpassword}
	
Go To Control Panel
    Click Element              manage-users-button
    Wait Until Page Contains   Manage Users
    Location Should Be         ${MANAGE USERS}
    Click Element               add-user-button
    Wait Until Page Contains    Create User
    Location Should Be          ${ADD USER URL}

*** Settings ***
Documentation     A test suite with a single test for deleting a user of the application.
...
...               This test has a workflow that is created using keywords in
...               the imported resource file.
Resource          menu_resource.robot

*** Test Cases ***
Check Delete User Status
    Open Browser To Main Menu
	Go To Control Panel
    Delete User
    Wait Until Page Contains   Main Menu
    Location Should Be    ${WELCOME URL}
    [Teardown]            Close Browser
    
    
*** Keywords ***
Delete User
    Click Element              username
    Click Element              xpath=//form[@name="deleteUser"]/div/select/option[2]
    Click Element              confirm
    Click Element              xpath=//body/div[2]/div/div[3]/div
	
Go To Control Panel
    Click Element              manage-users-button
    Wait Until Page Contains   Manage Users
    Location Should Be         ${MANAGE USERS}
    Click Element               delete-user-button
    Wait Until Page Contains    Delete User
    Location Should Be          ${DEL USER URL}

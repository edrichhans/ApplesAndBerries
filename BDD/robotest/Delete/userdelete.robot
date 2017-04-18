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
    Click Element              xpath=//body/div/div[3]/div/form/div/select/option[5]
    Click Element              confirm
    Click Element              xpath=//body/div[2]/div/div[3]/div
	
Go To Control Panel
    Click Element              control-panel-module-button
    Wait Until Page Contains   Control Panel
    Location Should Be         ${CONTROL PANEL URL}
    Click Element               delete-user-button
    Wait Until Page Contains    Delete User
    Location Should Be          ${DEL USER URL}

*** Settings ***
Documentation     A test suite with a single test for valid login.
...
...               This test has a workflow that is created using keywords in
...               the imported resource file.
Test Setup        Go To Login Page
Test Template     Login With Valid Credentials Should Pass
Resource          resource.robot

*** Test Cases ***		Username		Password
Invalid Username                 invalid          ${VALID PASSWORD}
Invalid Password                 ${VALID USER}    invalid
Invalid Username And Password    invalid          whatever
Empty Username                   ${EMPTY}         ${VALID PASSWORD}
Empty Password                   ${VALID USER}    ${EMPTY}
Empty Username And Password      ${EMPTY}         ${EMPTY}
Valid Admin				edrichhans		password
Valid Non Admin			bob				password

*** Keywords ***
Login With Valid Credentials Should Pass
	[Arguments]    ${username}    ${password}
	Open Browser To Login Page
    Input Username    ${username}
    Input Password    ${password}
    Wait Until Page Contains     Main Menu
    Location Should Be           ${WELCOME URL}
    [Teardown]    Close Browser
*** Settings ***
Documentation     A test suite with a single test for valid login.
...
...               This test has a workflow that is created using keywords in
...               the imported resource file.
Suite Setup       Open Browser To Login Page
Suite Teardown    Close Browser
Test Setup        Go To Login Page
Test Template     Login With Valid Credentials Should Pass
Resource          resource.robot

*** Test Cases ***		Username		Password
Valid Admin				edrichhans		password
Valid Non Admin			bob				password

*** Keywords ***
Login With Valid Credentials Should Pass
	[Arguments]    ${username}    ${password}
    Input Username    ${username}
    Input Password    ${password}
    Submit Credentials
    Wait Until Page Contains   Apples and Berries Payroll System
    Location Should Be    ${WELCOME URL}
    Click Element		  dropdown
    Click Element		  logoutbtn
   
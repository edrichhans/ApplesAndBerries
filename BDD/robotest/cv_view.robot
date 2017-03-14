*** Settings ***
Documentation     A test suite with a single test for going to CV page.
...
...               This test has a workflow that is created using keywords in
...               the imported resource file.
Suite Setup       Open Browser To Main Menu
Suite Teardown	  Close Browser
Resource          menu_resource.robot

*** Test Cases ***
Go To CV Panel
    Click Element              xpath=//body/div/div[2]/div[2]/div[3]/div[2]/div
    Wait Until Page Contains   CV View
    Location Should Be         ${CV URL}
    Click Button               xpath=//body/div/div[2]/div[2]/div[2]/button
    Wait Until Page Contains   Add CV
    Location Should Be         ${ADD CV URL}
    Go Back Home

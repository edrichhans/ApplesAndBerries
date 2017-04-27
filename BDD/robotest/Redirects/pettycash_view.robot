*** Settings ***
Documentation     A test suite with a single test for going to Petty Cash page.
...
...               This test has a workflow that is created using keywords in
...               the imported resource file.
Suite Setup       Open Browser To Main Menu
Suite Teardown	  Close Browser
Resource          menu_resource.robot

*** Test Cases ***
Go To Petty Cash Panel
    Click Element              petty-cash-module-button
    Wait Until Page Contains   PettyCash View
    Location Should Be         ${PC URL}
    Click Button               xpath=//body/div/div/div[3]/div/div[2]/button
    Wait Until Page Contains   Add PettyCash
    Location Should Be         ${ADD PC URL}
    Go Back Home

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
    Click Element              control-panel-module-button
    Click Element			   check-voucher-module-button
    Wait Until Page Contains   Check Voucher
    Location Should Be         ${CV URL}
    Click Button               add-CV-button]
    Location Should Be         ${ADD CV URL}
    Go Back Home

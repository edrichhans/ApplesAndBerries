*** Settings ***
Documentation     A test suite with a single test for going to PhilHealth page in Control Panel.
...
...               This test has a workflow that is created using keywords in
...               the imported resource file.
Suite Setup       Open Browser To Main Menu
Suite Teardown	  Close Browser
Resource          menu_resource.robot

*** Test Cases ***
Go To Petty Cash Panel
    Click Element              check-voucher-module-button
    Wait Until Page Contains   Update Tables
    Location Should Be         ${UPDATE TABLES}
    Click Element              PhilHealth-module-button
    Wait Until Page Contains   PH View
    Location Should Be         ${PHILHEALTH URL}
    Go Back Home

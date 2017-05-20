*** Settings ***
Documentation     A test suite with a single test for going to SSS page in Control Panel.
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
    Click Element              SSS-module-button
    Wait Until Page Contains   SSS View
    Location Should Be         ${SSS URL}
    Go Back Home

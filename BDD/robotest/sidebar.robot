*** Settings ***
Documentation     A test suite with a single test for sidebar.
...
...               This test has a workflow that is created using keywords in
...               the imported resource file.
Suite Setup       Open Browser To Main Menu
Suite Teardown	  Close Browser
Resource          menu_resource.robot

*** Test Cases ***
Click Sidebar Options
    Click Element              flm-employee-module-button
    Wait Until Page Contains   Employees
    Go Back Home
    Click Element              flm-payslip-module-button
    Wait Until Page Contains   Payslip View
    Go Back Home
    Click Element              flm-AR-module-button
    Wait Until Page Contains   AR View
    Go Back Home
    Click Element              flm-check-voucher-module-button
    Wait Until Page Contains   CV View
    Go Back Home
    Click Element              flm-petty-cash-button
    Wait Until Page Contains   PettyCash View
    Go Back Home
    Click Element              flm-control-panel-module-button
    Wait Until Page Contains   Control Panel
    Go Back Home

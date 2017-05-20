*** Settings ***
Documentation     A test suite with a single test for going to AR page.
...
...               This test has a workflow that is created using keywords in
...               the imported resource file.
Suite Setup       Open Browser To Main Menu
Suite Teardown	  Close Browser
Resource          menu_resource.robot

*** Test Cases ***
Go To AR Panel
	Click Element              control-panel-module-button
    Click Element              AR-module-button
    Wait Until Page Contains   Acknowledgment Receipt
    Location Should Be         ${AR URL}
    Click Button               add-AR-button
    Wait Until Page Contains   Add AR
    Location Should Be         ${ADD AR URL}
    Go Back Home

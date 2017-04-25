*** Settings ***
Documentation     A test suite with a single test for editing info of BIR value.
...
...               This test has a workflow that is created using keywords in
...               the imported resource file.
Test Template     Check Edit BIR Status
Resource          menu_resource.robot

*** Test Cases ***

*** Keywords ***        
Check Edit BIR Status
    Open Browser To Main Menu
    Open BIR Table
    BIR Values Update
    Location Should Be       ${WELCOME URL}

Open BIR Table
    Click Element    control-panel-module-button
    Location Should Be     ${CONTROL PANEL URL}
    Click Element    BIR-module-button

BIR Values Update
    Click Button     BIRUpdate
    Click Button     BIRSubmit
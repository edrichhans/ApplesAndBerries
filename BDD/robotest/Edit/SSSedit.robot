*** Settings ***
Documentation     A test suite with a single test for editing info of SSS value.
...
...               This test has a workflow that is created using keywords in
...               the imported resource file.
Test Template     Check Edit SSS Status
Test Teardown     Close Browser
Resource          menu_resource.robot

*** Test Cases ***      Value
No Value       			${EMPTY}
Zero Value 				0
Decimal Value           2.2
Negative Value          -2.2
Large Value             99999999999999

*** Keywords ***        
Check Edit SSS Status
	[Arguments]    ${value}
    Open Browser To Main Menu
    Open SSS Table
    SSS Values Update        ${value}
    Location Should Be       ${WELCOME URL}

Open SSS Table
    Click Element    check-voucher-module-button
    Location Should Be     ${UPDATE TABLES}
    Click Element    SSS-module-button

SSS Values Update
	[Arguments] 	 ${value}
    Click Button     SSSUpdate
    Input Text       xpath=//table[@id="SSSTable"]/tbody/tr/td/input      ${value}
    Click Button     SSSSubmit
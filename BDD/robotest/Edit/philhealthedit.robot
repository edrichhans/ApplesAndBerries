*** Settings ***
Documentation     A test suite with a single test for editing info of philhealth value.
...
...               This test has a workflow that is created using keywords in
...               the imported resource file.
Test Template     Check Edit Philhealth Status
Test Teardown     Close Browser
Resource          menu_resource.robot

*** Test Cases ***      Value
No Value       			${EMPTY}
Zero Value 				0
Decimal Value           2.2
Negative Value          -2.2
Large Value             99999999999999

*** Keywords ***        
Check Edit Philhealth Status
	[Arguments]    ${value}
    Open Browser To Main Menu
    Open Philhealth Table
    Philhealth Values Update     ${value}
    Location Should Be       ${WELCOME URL}

Open Philhealth Table
    Click Element    check-voucher-module-button
    Location Should Be     ${UPDATE TABLES}
    Click Element    PhilHealth-module-button

Philhealth Values Update
	[Arguments] 	 ${value}
    Click Button     PHUpdate
    Input Text       xpath=//table[@id="PHTable"]/tbody/tr/td/input      ${value}
    Click Button     PHSubmit
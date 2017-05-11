*** Settings ***
Documentation     A test suite with a single test for adding a CV.
...
...               This test has a workflow that is created using keywords in
...               the imported resource file.
Test Template     Check Add CV Status
Resource          menu_resource.robot

*** Test Cases ***       Name            Date          Particulars           Amount
Empty Name              ${EMPTY}       12/30/2017        1                   1000.00
Empty Date              Client A       ${EMPTY}          1                   1000.00
Empty Particulars       Client A       12/30/2017        ${EMPTY}            1000.00
Particulars 1           Client A       12/30/2017        1                   1000.00
Particulars 2           Client A       12/30/2017        2                   1000.00
Particulars 3           Client A       12/30/2017        3                   1000.00
Empty Amount            Client A       12/30/2017        1                   ${EMPTY}
Zero Amount             Client A       12/30/2017        1                   0.0
Negative Amount         Client A       12/30/2017        1                   -1000.00
Large Amount            Client A       12/30/2017        1                   999999999999999999.9999999999999
Weird Amount            Client A       12/30/2017        1                   -00001234.-00001234
Weird Amount 2          Client A       12/30/2017        1                   12345asdf
Weird Amount 3          Client A       12/30/2017        1                   asd.123
Correct Input           Client A       12/30/2017        1                   1000.1000
    

*** Keywords ***
Check Add CV Status
    [Arguments]     ${name}      ${date}      ${particulars}       ${amount}
    Open Browser To Main Menu
    Go To CV Panel
    Input Name     ${name}
    Input Date     ${date}
    Input Particulars     ${particulars}       ${amount}
    Check Preview
    Location Should Be    ${WELCOME URL}
    [Teardown]      Close Browser

Input Name
    [Arguments]     ${name}
    Input Text    name         ${name}

Input Date
    [Arguments]     ${date}
    Input Text    date         ${date}

Input Particulars
    [Arguments]     ${particulars}       ${amount}
    Click Element       xpath=//form[@id="checkvoucher"]/div[4]/div
    Click Element       xpath=//form[@id="checkvoucher"]/div[4]/div/div[2]/div[${particulars}]
    Input Text      amount         ${amount}

Check Preview
    Click Element       checkVoucher-preview
    Click Element       xpath=//body/div[2]/div/i
    Submit Form
	
Go To CV Panel
    Click Element              control-panel-module-button
    Wait Until Page Contains   Manage Financials
    Location Should Be         ${INDEX FINANCIALS}
    Click Element              check-voucher-module-button
    Wait Until Page Contains   Check Voucher
    Location Should Be         ${CV URL}
    Click Button                add-CV-button
    Wait Until Page Contains    Check Voucher
    Location Should Be          ${ADD CV URL}

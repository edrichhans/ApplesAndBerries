*** Settings ***
Documentation     A test suite with a single test for adding a Petty Cash.
...
...               This test has a workflow that is created using keywords in
...               the imported resource file.
Test Template     Check Add PC Status
Resource          menu_resource.robot

*** Test Cases ***       Name            Date          Particulars           Amount
Empty Name              ${EMPTY}       12/30/2017        Item                1000.00
Empty Date              Client A       ${EMPTY}          Item                1000.00
Empty Particulars       Client A       12/30/2017        ${EMPTY}            1000.00
Empty Amount            Client A       12/30/2017        Item                ${EMPTY}
Zero Amount             Client A       12/30/2017        Item                0.0
Negative Amount         Client A       12/30/2017        Item                -1000.00
Large Amount            Client A       12/30/2017        Item                999999999999999999.9999999999999
Weird Amount            Client A       12/30/2017        Item                -00001234.-00001234
Weird Amount 2          Client A       12/30/2017        Item                12345asdf
Weird Amount 3          Client A       12/30/2017        Item                asd.123
Correct Input           Client A       12/30/2017        Item                1000.1000
    
*** Keywords ***
Check Add PC Status
    [Arguments]     ${name}      ${date}      ${particulars}       ${amount}
    Open Browser To Main Menu
    Go To PC Panel
    Input Name      ${name}
    Input Date      ${date} 
    Input Particulars      ${particulars}       ${amount}
    Check Preview
    Wait Until Page Contains   Petty Cash
    Location Should Be    ${PC URL}
    [Teardown]     Close Browser
    
Input Name
    [Arguments]    ${name}
    Input Text     name         ${name}

Input Date
    [Arguments]    ${date}     
    Input Text     date         ${date}

Input Particulars
    [Arguments]    ${particulars}       ${amount}
    Input Text     particulars     ${particulars}
    Input Text     amount          ${amount}

Check Preview
    Click Element       pettyCash-preview
    Click Element       xpath=//body/div[2]/div/i
    Submit Form
    
Go To PC Panel
    Click Element              petty-cash-module-button
    Wait Until Page Contains   Petty Cash
    Location Should Be         ${PC URL}
    Click Button                add-petty-cash-button
    Wait Until Page Contains    Petty Cash
    Location Should Be          ${ADD PC URL}

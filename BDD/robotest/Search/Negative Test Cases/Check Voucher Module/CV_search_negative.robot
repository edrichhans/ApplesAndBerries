*** Settings ***
Documentation     A test suite with positive test cases for the search feature in the CV module.
...
...               This test has a workflow that is created using keywords in
...               the imported resource file.
Test Template     CV Search
Resource          menu_resource.robot

***Variables***
${Search Input Text Locator}        jquery=input:first

*** Test Cases ***                          Seach Input         Filename
Search: AN Item Does Not Exist              111                 eID
Search: Issued By Item Does Not Exist       masteraf            Issued By
Search: Name Item Does Not Exist            Chris Evans         Name
Search: Date Item Does Not Exist            Sept 11, 2001       Date
Search: Particulars Item Does Not Exist     World Trade         Particulars
Search: Amount Item Does Not Exist          333                 Amount



*** Keywords ***
CV Search
    [Arguments]                         ${search_input}         ${Filename}
    Open Browser To Main Menu
    Click Element                       manage-financials-module-button
    Click Element                       check-voucher-module-button
    Wait Until Page Contains            Check Voucher
    Location Should Be                  ${CV URL}
    Input Search Item                   ${search_input}
    Capture Page Screenshot             filename=selenium-screenshot-negative_search-${Filename}.png
    Table Should Contain                check-voucher-view-table                  No matching records found
    [Teardown]                          Close Browser



Input Search Item
    [Arguments]                         ${search_input}
    Input Text                          ${Search Input Text Locator}       ${search_input}



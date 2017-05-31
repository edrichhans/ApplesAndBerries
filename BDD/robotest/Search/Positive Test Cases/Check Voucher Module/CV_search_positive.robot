*** Settings ***
Documentation     A test suite with positive test cases for the search feature in the CV module.
...
...               This test has a workflow that is created using keywords in
...               the imported resource file.
Test Template     CV Search
Resource          menu_resource.robot

***Variables***
${Search Input Text Locator}        jquery=input:first

*** Test Cases ***                  Seach Input         Filename
Search: AN Item Exists              13                  eID
Search: Issued By Item Exists       edrichhans          Issued By
Search: Name Item Exists            Edrich Chua         Name
Search: Date Item Exists            December 6, 2016    Date
Search: Particulars Item Exists     Rental              Particulars
Search: Amount Item Exists          500                 Amount



*** Keywords ***
CV Search
    [Arguments]                         ${search_input}         ${Filename}
    Open Browser To Main Menu
    Click Element                       manage-financials-module-button
    Click Element                       check-voucher-module-button
    Wait Until Page Contains            Check Voucher
    Location Should Be                  ${CV URL}
    Input Search Item                   ${search_input}
    Capture Page Screenshot             filename=selenium-screenshot-positive_search-${Filename}.png
    Table Should Contain                check-voucher-view-table                  ${search_input}
    [Teardown]                          Close Browser



Input Search Item
    [Arguments]                         ${search_input}
    Input Text                          ${Search Input Text Locator}       ${search_input}



*** Settings ***
Documentation     A test suite with positive test cases for the search feature in the AR module.
...
...               This test has a workflow that is created using keywords in
...               the imported resource file.
Test Template     AR Search
Resource          menu_resource.robot

***Variables***
${Search Input Text Locator}        jquery=input:first

*** Test Cases ***                  Seach Input         Filename
Search: AN Item Exists              307                 eID
Search: Issued By Item Exists       edrichhans          Issued By
Search: Name Item Exists            Edrich Chua         Name
Search: Date Item Exists            February 9, 2017    Date
Search: Particulars Item Exists     food                Particulars
Search: Amount Item Exists          10                  Amount



*** Keywords ***
AR Search
    [Arguments]                         ${search_input}         ${Filename}
    Open Browser To Main Menu
    Click Element                       manage-financials-module-button
    Click Element                       AR-module-button
    Wait Until Page Contains            Acknowledgment Receipt
    Location Should Be                  ${AR URL}
    Input Search Item                   ${search_input}
    Capture Page Screenshot             filename=selenium-screenshot-positive_search-${Filename}.png
    Table Should Contain                AR-view-table                  ${search_input}
    [Teardown]                          Close Browser



Input Search Item
    [Arguments]                         ${search_input}
    Input Text                          ${Search Input Text Locator}       ${search_input}



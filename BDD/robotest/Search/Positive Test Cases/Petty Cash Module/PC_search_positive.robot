*** Settings ***
Documentation     A test suite with positive test cases for the search feature in the PC module.
...
...               This test has a workflow that is created using keywords in
...               the imported resource file.
Test Template     PC Search
Resource          menu_resource.robot

***Variables***
${Search Input Text Locator}        jquery=input:first

*** Test Cases ***                  Seach Input         Filename
Search: AN Item Exists              303                 AN
Search: Issued By Item Exists       edrichhans          Issued By
Search: Name Item Exists            Ian Veneracion      Name
Search: Date Item Exists            May 15, 2017        Date
Search: Items Item Exists           Milo                Items
Search: Price Item Exists           150                 Price
Search: Qty Item Exists             856                 Qty



*** Keywords ***
PC Search
    [Arguments]                         ${search_input}         ${Filename}
    Open Browser To Main Menu
    Click Element                       manage-financials-module-button
    Click Element                       petty-cash-module-button
    Wait Until Page Contains            Petty Cash
    Location Should Be                  ${PC URL}
    Input Search Item                   ${search_input}
    Capture Page Screenshot             filename=selenium-screenshot-positive_search-${Filename}.png
    Table Should Contain                petty-cash-view-table                  ${search_input}
    [Teardown]                          Close Browser



Input Search Item
    [Arguments]                         ${search_input}
    Input Text                          ${Search Input Text Locator}       ${search_input}



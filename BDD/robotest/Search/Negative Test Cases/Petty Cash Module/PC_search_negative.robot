*** Settings ***
Documentation     A test suite with positive test cases for the search feature in the PC module.
...
...               This test has a workflow that is created using keywords in
...               the imported resource file.
Test Template     PC Search
Resource          menu_resource.robot

***Variables***
${Search Input Text Locator}        jquery=input:first

*** Test Cases ***                      Seach Input         Filename
Search: AN Item Does Not Exist              111                 AN
Search: Issued By Item Does Not Exist       leonardo            Issued By
Search: Name Item Does Not Exist            Tom Cruise          Name
Search: Date Item Does Not Exist            June 28, 2007       Date
Search: Items Item Does Not Exist           Goblet of Fire      Items
Search: Price Item Does Not Exist           222                 Price
Search: Qty Item Does Not Exist             333                 Qty



*** Keywords ***
PC Search
    [Arguments]                         ${search_input}         ${Filename}
    Open Browser To Main Menu
    Click Element                       manage-financials-module-button
    Click Element                       petty-cash-module-button
    Wait Until Page Contains            Petty Cash
    Location Should Be                  ${PC URL}
    Input Search Item                   ${search_input}
    Capture Page Screenshot             filename=selenium-screenshot-negative_search-${Filename}.png
    Table Should Contain                petty-cash-view-table                  No matching records found
    [Teardown]                          Close Browser



Input Search Item
    [Arguments]                         ${search_input}
    Input Text                          ${Search Input Text Locator}       ${search_input}



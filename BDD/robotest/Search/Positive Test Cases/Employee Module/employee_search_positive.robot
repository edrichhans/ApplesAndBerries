*** Settings ***
Documentation     A test suite with positive test cases for the search feature in the employee module.
...
...               This test has a workflow that is created using keywords in
...               the imported resource file.
Test Template     Employee Search
Resource          menu_resource.robot

***Variables***
${Search Input Text Locator}        jquery=input:first

*** Test Cases ***                  Seach Input         Filename
Search: eID Item Exists             90                  eID
Search: Name Item Exists            Edrich              Name
Search: Start Date Item Exists      January             Start Date
Search: Birthday Item Exists        December 1, 2016    Birthday
Search: Position Item Exists        Teacher             Position
Search: Status Item Exists          Married             Status
Search: Dependents Item Exists      5                   Dependents
Search: Salary Item Exists          25000               Salary



*** Keywords ***
Employee Search
    [Arguments]                         ${search_input}         ${Filename}
    Open Browser To Main Menu
    Click Element                       employee-module-button
    Wait Until Page Contains            Employees
    Location Should Be                  ${EMPLOY URL}
    Input Search Item                   ${search_input}
    Capture Page Screenshot             filename=selenium-screenshot-positive_search-${Filename}.png
    Table Should Contain                employee-view-table                  ${search_input}
    [Teardown]                          Close Browser



Input Search Item
    [Arguments]                         ${search_input}
    Input Text                          ${Search Input Text Locator}       ${search_input}



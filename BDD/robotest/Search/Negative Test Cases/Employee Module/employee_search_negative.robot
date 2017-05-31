*** Settings ***
Documentation     A test suite with negative test cases for the search feature in the employee module.
...
...               This test has a workflow that is created using keywords in
...               the imported resource file.
Test Template     Employee Search
Resource          menu_resource.robot

***Variables***
${Search Input Text Locator}        jquery=input:first

*** Test Cases ***                      Seach Input         Filename
Search: eID Item Does Not Exist             111                 eID
Search: Name Item Does Not Exist            Iron Man            Name
Search: Start Date Item Does Not Exist      June                Start Date
Search: Birthday Item Does Not Exist        June 17, 1996       Birthday
Search: Position Item Does Not Exist        Second              Position
Search: Status Item Does Not Exist          Complicated         Status
Search: Dependents Item Does Not Exist      222                 Dependents
Search: Salary Item Does Not Exist          333                 Salary



*** Keywords ***
Employee Search
    [Arguments]                         ${search_input}         ${Filename}
    Open Browser To Main Menu
    Click Element                       employee-module-button
    Wait Until Page Contains            Employees
    Location Should Be                  ${EMPLOY URL}
    Input Search Item                   ${search_input}
    Capture Page Screenshot             filename=selenium-screenshot-negative_search-${Filename}.png
    Table Should Contain                employee-view-table                  No matching records found
    [Teardown]                          Close Browser


Input Search Item
    [Arguments]                         ${search_input}
    Input Text                          ${Search Input Text Locator}       ${search_input}



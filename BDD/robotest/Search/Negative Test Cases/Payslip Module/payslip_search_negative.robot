*** Settings ***
Documentation     A test suite with negative test cases for the search feature in the payslip module.
...
...               This test has a workflow that is created using keywords in
...               the imported resource file.
Test Template     Payslip Search
Resource          menu_resource.robot

***Variables***
${Search Input Text Locator}        jquery=input:first

*** Test Cases ***                      Seach Input         Filename
Search: AN Item Does Not Exist                  111             AN
Search: Name Item Does Not Exist                ironman         Name
Search: Base Salary Item Does Not Exist         222             Base Salary
Search: Start Date Item Does Not Exist          August 30       Start Date
Search: End Date Item Does Not Exist            June 1          End Date
Search: Deductibles Item Does Not Exist         333             Deductibles
Search: Allowance Item Does Not Exist           444             Allowance
Search: PhilHealth Item Does Not Exist          555             PhilHealth
Search: SSS Item Does Not Exist                 666             SSS
Search: HDMF Item Does Not Exist                777             HDMF
Search: BIR Tax Item Does Not Exist             888             BIR Tax
Search: Net Item Does Not Exist                 999             Net



*** Keywords ***
Payslip Search
    [Arguments]                     ${search_input}     ${Filename}
    Open Browser To Main Menu
    Click Element                   payslip-module-button
    Wait Until Page Contains        Payslip
    Location Should Be              ${PAYSLIP URL}
    Input Search Item               ${search_input}
    Capture Page Screenshot         filename=selenium-screenshot-negative_search-${Filename}.png
    Table Should Contain            payslip-view-table                  No matching records found
    [Teardown]                      Close Browser



Input Search Item
    [Arguments]                     ${search_input}
    Input Text                      ${Search Input Text Locator}        ${search_input}



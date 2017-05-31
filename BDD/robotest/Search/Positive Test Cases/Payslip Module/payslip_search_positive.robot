*** Settings ***
Documentation     A test suite with positive test cases for the search feature in the payslip module.
...
...               This test has a workflow that is created using keywords in
...               the imported resource file.
Test Template     Payslip Search
Resource          menu_resource.robot

***Variables***
${Search Input Text Locator}        jquery=input:first

*** Test Cases ***                  Seach Input         Filename
Search: AN Item Exists                  604             AN
Search: Name Item Exists                af              Name
Search: Base Salary Item Exists         3000            Base Salary
Search: Start Date Item Exists          April 1         Start Date
Search: End Date Item Exists            May 31          End Date
Search: Deductibles Item Exists         150             Deductibles
Search: Allowance Item Exists           100             Allowance
Search: PhilHealth Item Exists          125             PhilHealth
Search: SSS Item Exists                 363.3           SSS
Search: HDMF Item Exists                2000            HDMF
Search: BIR Tax Item Exists             2083.25         BIR
Search: Net Item Exists                 9311.7          Net



*** Keywords ***
Payslip Search
    [Arguments]                         ${search_input}         ${Filename}
    Open Browser To Main Menu
    Click Element                       payslip-module-button
    Wait Until Page Contains            Payslip
    Location Should Be                  ${PAYSLIP URL}
    Input Search Item                   ${search_input}
    Capture Page Screenshot             filename=selenium-screenshot-positive_search-${Filename}.png
    Table Should Contain                payslip-view-table                  ${search_input}
    [Teardown]                          Close Browser



Input Search Item
    [Arguments]                         ${search_input}
    Input Text                          ${Search Input Text Locator}       ${search_input}



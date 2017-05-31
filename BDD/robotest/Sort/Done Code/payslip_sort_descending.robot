*** Settings ***
Documentation     A test suite with descending test cases for the sorting feature in the payslip module.
...
...               This test has a workflow that is created using keywords in
...               the imported resource file.
Test Template     Payslip Sort Descending Order
Resource          menu_resource.robot



*** Test Cases ***                  Current Sorted Column       First Expected Value        Last Expected Value       Filename
Descending Sort by AN                              2                   611                   603                      des_sort_AN
Descending Sort by Name                            3                   HOHOHO                Adrian Sing              des_sort_Name
Descending Sort by Base Salary                     4                   100000                3000                     des_sort_Base Salary
Descending Sort by Start Date                      5                   December 29, 2017     May 1, 2017              des_sort_Start Date
Descending Sort by End Date                        6                   December 30, 2017     May 31, 2017             des_sort_End Date
Descending Sort by Deductibles                     7                   100                   ${EMPTY}                 des_sort_Deductibles
Descending Sort by Allowance                       8                   100                   ${EMPTY}                 des_sort_Allowance
Descending Sort by PhilHealth                      9                   437.5                 0                        des_sort_PhilHealth
Descending Sort by SSS                             10                  581.3                 0                        des_sort_SSS
Descending Sort by HDMF                            11                  2000                  0                        des_sort_HDMF
Descending Sort by BIR Tax                         12                  25083.23              ${EMPTY}                 des_sort_BIR Tax
Descending Sort by Net                             13                  71897.97              1500                     des_sort_Net



*** Keywords ***
Payslip Sort Descending Order
    [Arguments]                         ${Current Sorted Column}        ${First Expected Value}       ${Last Expected Value}    {Filename}
    Open Browser To Main Menu
    Click Element                       payslip-module-button
    Wait Until Page Contains            Payslip
    Location Should Be                  ${PAYSLIP URL}
    Click Element                       xpath=//table[@id='payslip-view-table']/thead/tr/th[${Current Sorted Column}]
    Click Element                       xpath=//table[@id='payslip-view-table']/thead/tr/th[${Current Sorted Column}]
    Capture Page Screenshot             filename=selenium-screenshot-${Filename}.png
    Check if Descending Order            ${Current Sorted Column}        ${First Expected Value}       ${Last Expected Value}
    [Teardown]                          Close Browser


Check if Descending Order
    [Arguments]                         ${Current Sorted Column}                    ${First Expected Value}                       ${Last Expected Value}
    Table Cell Should Contain           xpath=//table[@id='payslip-view-table']          2        ${Current Sorted Column}        ${First Expected Value}
    Table Cell Should Contain           xpath=//table[@id='payslip-view-table']         -1        ${Current Sorted Column}        ${Last Expected Value}


*** Settings ***
Documentation     A test suite with ascending test cases for the sorting feature in the payslip module.
...
...               This test has a workflow that is created using keywords in
...               the imported resource file.
Test Template     Payslip Sort Ascending Order
Resource          menu_resource.robot



*** Test Cases ***                  Current Sorted Column       First Expected Value        Last Expected Value       Filename
Ascending Sort by AN                              2                   597                   609                       asc_sort_AN
Ascending Sort by Name                            3                   Adrian Sing           Edrich                    asc_sort_Name
Ascending Sort by Base Salary                     4                   3000                  10000                     asc_sort_Base Salary
Ascending Sort by Start Date                      5                   April 1, 2017         August 1, 2017            asc_sort_Start Date
Ascending Sort by End Date                        6                   April 30, 2017        August .1, 2017           asc_sort_End Date
Ascending Sort by Deductibles                     7                   ${EMPTY}              0                         asc_sort_Deductibles
Ascending Sort by Allowance                       8                   ${EMPTY}              0                         asc_sort_Allowance
Ascending Sort by PhilHealth                      9                   0                     125                       asc_sort_PhilHealth
Ascending Sort by SSS                             10                  0                     363.3                     asc_sort_SSS
Ascending Sort by HDMF                            11                  0                     200                       asc_sort_HDMF
Ascending Sort by BIR Tax                         12                  ${EMPTY}              0                         asc_sort_BIR Tax
Ascending Sort by Net                             13                  1500                  HOHOHO                    asc_sort_Net



*** Keywords ***
Payslip Sort Ascending Order
    [Arguments]                         ${Current Sorted Column}        ${First Expected Value}       ${Last Expected Value}    ${Filename}
    Open Browser To Main Menu
    Click Element                       payslip-module-button
    Wait Until Page Contains            Payslip
    Location Should Be                  ${PAYSLIP URL}
    Click Element                       xpath=//table[@id='payslip-view-table']/thead/tr/th[${Current Sorted Column}]
    Capture Page Screenshot             filename=selenium-screenshot-${Filename}.png
    Check if Ascending Order            ${Current Sorted Column}        ${First Expected Value}       ${Last Expected Value}
    [Teardown]                          Close Browser


Check if Ascending Order
    [Arguments]                         ${Current Sorted Column}                    ${First Expected Value}                       ${Last Expected Value}
    Table Cell Should Contain           xpath=//table[@id='payslip-view-table']          2        ${Current Sorted Column}        ${First Expected Value}
    Table Cell Should Contain           xpath=//table[@id='payslip-view-table']         -1        ${Current Sorted Column}        ${Last Expected Value}


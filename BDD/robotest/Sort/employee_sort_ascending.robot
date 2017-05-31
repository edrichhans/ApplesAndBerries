*** Settings ***
Documentation     A test suite with ascending test cases for the sorting feature in the employee module.
...
...               This test has a workflow that is created using keywords in
...               the imported resource file.
Test Template     Payslip Sort Ascending Order
Resource          menu_resource.robot



*** Test Cases ***                  Current Sorted Column
Ascending Sort: eID                                 2                
Ascending Sort: Name                               3        
Ascending Sort: Start Date                         4        
Ascending Sort: Birthday                           5        
Ascending Sort: Position                           6        
Ascending Sort: Status                             7
Ascending Sort: Dependents                         8
Ascending Sort: Salary                             9


*** Keywords ***
Payslip Sort Ascending Order
    [Arguments]                         ${Current Sorted Column}
    Open Browser To Main Menu
    Click Element                       payslip-module-button
    Wait Until Page Contains            Payslip
    Location Should Be                  ${PAYSLIP URL}
    Click Element                       xpath=//table[@id='payslip-view-table']/thead/tr/th[${Current Sorted Column}]
    Check if Ascending Order            ${Current Sorted Column}
    



    [Teardown]                          Close Browser


Check if Ascending Order
    [Arguments]                         ${Current Sorted Column}
    Table Cell Should Contain       xpath=//table[@id='payslip-view-table']             2               ${Current Sorted Column}                 11

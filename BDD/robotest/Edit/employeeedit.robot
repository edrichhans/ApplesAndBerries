*** Settings ***
Documentation     A test suite with a single test for editing info of an employee.
...
...               This test has a workflow that is created using keywords in
...               the imported resource file.
Test Template     Check Edit Employee Status
Resource          menu_resource.robot

*** Test Cases ***      Ordinal     Position    Status     Dependents      Salary
First Employee          1           1           1          3               30000
Empty Position          1           ${EMPTY}           1          3               30000
Empty Status            1           1           ${EMPTY}          3               30000
Negative Dependents           1           1           1           -3              30000
Floatnum Dependents           1           1           1           3.5             30000
Char Dependents               1           1           1           abc             30000
Weird Input Dependents        1           1           1           0-3.a.-2c       30000
Zero Dependent/Salary         1           1           1           0               0
All Empty                     1           ${EMPTY}    ${EMPTY}    ${EMPTY}        ${EMPTY} 

Second Employee         2           2           2          69              10
Empty Position          2           ${EMPTY}           1          3               30000
Empty Status            2           1           ${EMPTY}          3               30000
Negative Dependents           2           1           1           -3              30000
Floatnum Dependents           2           1           1           3.5             30000
Char Dependents               2           1           1           abc             30000
Weird Input Dependents        2           1           1           0-3.a.-2c       30000
Zero Dependent/Salary         2           1           1           0               0
All Empty                     2           ${EMPTY}    ${EMPTY}    ${EMPTY}        ${EMPTY} 
    	
*** Keywords ***        
Check Edit Employee Status
    [Arguments]     ${ordinal}   ${position}   ${status}   ${dependents}   ${salary}
    Open Browser To Main Menu
    Go To Employee Panel
    Edit Employee Info         ${ordinal}   ${position}   ${status}   ${dependents}   ${salary}
    [Teardown]                 Close Browser

Go To Employee Panel
    Click Element              employee-module-button
    Wait Until Page Contains   Employees
    Location Should Be         ${EMPLOY URL}

Edit Employee Info
    [Arguments]    ${ordinal}   ${position}   ${status}   ${dependents}   ${salary}
    ${eid}      Get Text        xpath=//body/div/div[3]/div/div[3]/div/table/tbody/tr[${ordinal}]/td[2]
    Open Context Menu           xpath=//body/div/div[3]/div/div[3]/div/table/tbody/tr[${ordinal}]
    Click Element               xpath=//body/div/div[3]/ul/li[1]
    Wait Until Page Contains    Edit Employee
    Location Should Be          http://localhost:8000/employees/editEmployee?eID=${eid}
    Edit Position               ${position}
    Edit Status                 ${status}
    Edit Dependents             ${dependents}
    Edit Salary                 ${salary}
    Click Element               confirm
    Click Element               xpath=//body/div[2]/div/div[3]/div
    Wait Until Page Contains    Main Menu
    Location Should Be          ${WELCOME URL}
    
Edit Position
    [Arguments]      ${position}
    Run Keyword If   '${position}'!='${EMPTY}'    Click Element    xpath=//body/div/div[3]/form/div[3]/div/div    
    Run Keyword If   '${position}'!='${EMPTY}'    Click Element    xpath=//body/div/div[3]/form/div[3]/div/div/div[2]/div[${position}]

Edit Status
    [Arguments]      ${status}
    Run Keyword If   '${status}'!='${EMPTY}'      Click Element    xpath=//body/div/div[3]/form/div[3]/div[2]/div   
    Run Keyword If   '${status}'!='${EMPTY}'      Click Element    xpath=//body/div/div[3]/form/div[3]/div[2]/div/div[2]/div[${status}]

Edit Dependents
    [Arguments]      ${dependents}
    Input Text       inputDependents        ${dependents}

Edit Salary
    [Arguments]      ${salary}
    Input Text       inputBaseSalary        ${salary}
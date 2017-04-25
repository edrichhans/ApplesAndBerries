*** Settings ***
Documentation     A test suite with a single test for adding payslip.
...
...               This test has a workflow that is created using keywords in
...               the imported resource file.
Test Setup        Go To Payslip Panel
Test Teardown     Close Browser
Resource          menu_resource.robot

*** Test Cases ***  Employee    Company    Startdate    Enddate    Deductibles    Amount    Allowance     Cash
Negative Value
    Click Element              xpath=//body/div/div/div[3]/div/form/div/div
    Click Element              xpath=//body/div/div/div[3]/div/form/div/div/div[2]/div
    Click Element              xpath=//body/div/div/div[3]/div/form/div[2]/div
    Click Element              xpath=//body/div/div/div[3]/div/form/div[2]/div/div[2]/div
    Input Text                 startDate        January 1, 100
    Input Text                 endDate          September 13, 275760
    Input Text                 deductibles_name         sampleDE
    Input Text                 deductibles              -123.123
    Input Text                 allowance_name           sampleAL
    Input Text                 allowance                -123.123
    Click Element              payslip-preview
    Click Element              xpath=//body/div[2]/div/i
    Submit Form
    Location Should Be         ${PAYSLIP URL}

0 Value
    Click Element              xpath=//body/div/div/div[3]/div/form/div/div
    Click Element              xpath=//body/div/div/div[3]/div/form/div/div/div[2]/div
    Click Element              xpath=//body/div/div/div[3]/div/form/div[2]/div
    Click Element              xpath=//body/div/div/div[3]/div/form/div[2]/div/div[2]/div
    Input Text                 startDate        January 1, 100
    Input Text                 endDate          September 13, 275760
    Input Text                 deductibles_name         sampleDE
    Input Text                 deductibles              0
    Input Text                 allowance_name           sampleAL
    Input Text                 allowance                0
    Click Element              payslip-preview
    Click Element              xpath=//body/div[2]/div/i
    Submit Form
    Location Should Be         ${PAYSLIP URL}

Normal Value
    Click Element              xpath=//body/div/div/div[3]/div/form/div/div
    Click Element              xpath=//body/div/div/div[3]/div/form/div/div/div[2]/div
    Click Element              xpath=//body/div/div/div[3]/div/form/div[2]/div
    Click Element              xpath=//body/div/div/div[3]/div/form/div[2]/div/div[2]/div
    Input Text                 startDate        January 1, 100
    Input Text                 endDate          September 13, 275760
    Input Text                 deductibles_name         sampleDE
    Input Text                 deductibles              123.123
    Input Text                 allowance_name           sampleAL
    Input Text                 allowance                123.123
    Click Element              payslip-preview
    Click Element              xpath=//body/div[2]/div/i
    Submit Form
    Location Should Be         ${WELCOME URL}

Large Value
    Click Element              xpath=//body/div/div/div[3]/div/form/div/div
    Click Element              xpath=//body/div/div/div[3]/div/form/div/div/div[2]/div
    Click Element              xpath=//body/div/div/div[3]/div/form/div[2]/div
    Click Element              xpath=//body/div/div/div[3]/div/form/div[2]/div/div[2]/div
    Input Text                 startDate        January 1, 100
    Input Text                 endDate          September 13, 275760
    Input Text                 deductibles_name         sampleDE
    Input Text                 deductibles              123123123123123123
    Input Text                 allowance_name           sampleAL
    Input Text                 allowance                123123123123123123
    Click Element              payslip-preview
    Click Element              xpath=//body/div[2]/div/i
    Submit Form
    Location Should Be         ${WELCOME URL}

Weird Value
    Click Element              xpath=//body/div/div/div[3]/div/form/div/div
    Click Element              xpath=//body/div/div/div[3]/div/form/div/div/div[2]/div
    Click Element              xpath=//body/div/div/div[3]/div/form/div[2]/div
    Click Element              xpath=//body/div/div/div[3]/div/form/div[2]/div/div[2]/div
    Input Text                 startDate        January 1, 100
    Input Text                 endDate          September 13, 275760
    Input Text                 deductibles_name         sampleDE
    Input Text                 deductibles              -0123.-0123.-0123.-00
    Input Text                 allowance_name           sampleAL
    Input Text                 allowance                -0123.-0123.-0123.-00
    Click Element              payslip-preview
    Click Element              xpath=//body/div[2]/div/i
    Submit Form
    Location Should Be         ${PAYSLIP URL}

Employee Only Test
    Click Element              xpath=//body/div/div/div[3]/div/form/div/div
    Click Element              xpath=//body/div/div/div[3]/div/form/div/div/div[2]/div
    Click Element              payslip-preview
    Click Element              xpath=//body/div[2]/div/i
    Submit Form
    Location Should Be    ${WELCOME URL}

Company Only Test
    Click Element              xpath=//body/div/div/div[3]/div/form/div[2]/div
    Click Element              xpath=//body/div/div/div[3]/div/form/div[2]/div/div[2]/div
    Click Element              payslip-preview
    Click Element              xpath=//body/div[2]/div/i
    Submit Form
    Location Should Be    ${WELCOME URL}

Dates Only Test
    Input Text                 startDate        January 1, 100
    Input Text                 endDate          September 13, 275760
    Click Element              payslip-preview
    Click Element              xpath=//body/div[2]/div/i
    Submit Form
    Location Should Be    ${WELCOME URL}

Employee And Company Test
    Click Element              xpath=//body/div/div/div[3]/div/form/div/div
    Click Element              xpath=//body/div/div/div[3]/div/form/div/div/div[2]/div
    Click Element              xpath=//body/div/div/div[3]/div/form/div[2]/div
    Click Element              xpath=//body/div/div/div[3]/div/form/div[2]/div/div[2]/div
    Click Element              payslip-preview
    Click Element              xpath=//body/div[2]/div/i
    Submit Form
    Location Should Be         ${WELCOME URL}

Employee And Dates Test
    Click Element              xpath=//body/div/div/div[3]/div/form/div/div
    Click Element              xpath=//body/div/div/div[3]/div/form/div/div/div[2]/div
    Input Text                 startDate        January 1, 100
    Input Text                 endDate          September 13, 275760
    Click Element              payslip-preview
    Click Element              xpath=//body/div[2]/div/i
    Submit Form
    Location Should Be    ${WELCOME URL}

Company And Date Test
    Click Element              xpath=//body/div/div/div[3]/div/form/div[2]/div
    Click Element              xpath=//body/div/div/div[3]/div/form/div[2]/div/div[2]/div
    Input Text                 startDate        January 1, 100
    Input Text                 endDate          September 13, 275760
    Click Element              payslip-preview
    Click Element              xpath=//body/div[2]/div/i
    Submit Form
    Location Should Be    ${WELCOME URL}

Employee, Company And Date Test
    Click Element              xpath=//body/div/div/div[3]/div/form/div/div
    Click Element              xpath=//body/div/div/div[3]/div/form/div/div/div[2]/div
    Click Element              xpath=//body/div/div/div[3]/div/form/div[2]/div
    Click Element              xpath=//body/div/div/div[3]/div/form/div[2]/div/div[2]/div
    Input Text                 startDate        January 1, 100
    Input Text                 endDate          September 13, 275760
    Click Element              payslip-preview
    Click Element              xpath=//body/div[2]/div/i
    Submit Form
    Location Should Be    ${WELCOME URL}
    
    
*** Keywords ***
Go To Payslip Panel
    Open Browser To Main Menu
    Click Element               payslip-module-button
    Wait Until Page Contains   Payslip
    Location Should Be         ${PAYSLIP URL}
    Click Button                add-payslip-button
    Wait Until Page Contains    Issue Payslip
    Location Should Be          ${ADD PAYSLIP URL}

*** backup tests ***
Check Add Payslip Status   
    [Arguments]     ${Employee}    ${Company}    ${Startdate}    ${Enddate}    ${Deductibles}    ${Amount}    ${Allowance}      ${Cash}
    Open Browser To Main Menu
    Go To Payslip Panel
    Select Employee     ${Employee}
    Select Company      ${Company}
    Input StartDate     ${Startdate}
    Input EndDate      ${Enddate}
    Input Deductibles      ${Deductibles}     ${Amount}
    Input Allowance     ${Allowance}      ${Cash}
    Check Preview
    Wait Until Page Contains   Apples and Berries Payroll System
    Location Should Be    ${WELCOME URL}
    [Teardown]      Close Browser

Select Employee
    [Arguments]     ${Employee}
    Run Keyword If   '${Employee}'!='${EMPTY}'        Click Element   xpath=//form[@id="payslip"]/div/div
    Run Keyword If   '${Employee}'!='${EMPTY}'        Click Element   xpath=//form[@id="payslip"]/div/div/div[2]/div[${Employee}]

Input StartDate
    [Arguments]    ${Startdate}
    Input Text    startDate    ${Startdate}

Input EndDate
    [Arguments]     ${Enddate}
    Input Text    endDate    ${Startdate}    

Input Deductibles
    [Arguments]    ${Deductibles}     ${Amount}
    Input Text    deductibles_name    ${Deductibles}
    Input Text    deductibles         ${Amount}

Select Company
    [Arguments]     ${Company} 
    Run Keyword If   '${Company}'!='${EMPTY}'         Click Element   xpath=//form[@id="payslip"]/div[2]/div
    Run Keyword If   '${Company}'!='${EMPTY}'         Click Element   xpath=//form[@id="payslip"]/div[2]/div/div[2]/div[${Company}]
    
Input Allowance
    [Arguments]     ${Allowance}     ${Cash}
    Input Text    allowance_name     ${Allowance}
    Input Text    allowance          ${Cash}

Check Preview
    Click Element       payslip-preview
    Submit Form
    

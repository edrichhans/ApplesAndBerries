*** Settings ***
Documentation     A test suite with a single test for checking if the module allows submission of empty fields.
...
...               This test has a workflow that is created using keywords in
...               the imported resource file. 
Test Teardown     Close Browser
Resource          menu_resource.robot

*** Test Cases ***
Employee Only Test
    Open Browser To Main Menu
    Click Element              payslip-module-button
    Wait Until Page Contains   Payslip View
    Location Should Be         ${PAYSLIP URL}
    Click Button               add-payslip-button
    Wait Until Page Contains   Add Payslip
    Location Should Be         ${ADD PAYSLIP URL}
    Click Element              xpath=//body/div/div/div[3]/div/form/div/div
    Click Element              xpath=//body/div/div/div[3]/div/form/div/div/div[2]/div
    Click Element              payslip-preview
    Click Element              xpath=//body/div[2]/div/i
    Submit Form
    Location Should Be    ${WELCOME URL}

Company Only Test
    Open Browser To Main Menu
    Click Element              payslip-module-button
    Wait Until Page Contains   Payslip View
    Location Should Be         ${PAYSLIP URL}
    Click Button               xpath=//body/div/div/div[3]/div/div[2]/button
    Wait Until Page Contains   Add Payslip
    Location Should Be         ${ADD PAYSLIP URL}
    Click Element              xpath=//body/div/div/div[3]/div/form/div[2]/div
    Click Element              xpath=//body/div/div/div[3]/div/form/div[2]/div/div[2]/div
    Click Element              payslip-preview
    Click Element              xpath=//body/div[2]/div/i
    Submit Form
    Location Should Be    ${WELCOME URL}

Dates Only Test
    Open Browser To Main Menu
    Click Element              payslip-module-button
    Wait Until Page Contains   Payslip View
    Location Should Be         ${PAYSLIP URL}
    Click Button               xpath=//body/div/div/div[3]/div/div[2]/button
    Wait Until Page Contains   Add Payslip
    Location Should Be         ${ADD PAYSLIP URL}
    Input Text                 startDate        January 1, 100
    Input Text                 endDate          September 13, 275760
    Click Element              payslip-preview
    Click Element              xpath=//body/div[2]/div/i
    Submit Form
    Location Should Be    ${WELCOME URL}

Employee And Company Test
    Open Browser To Main Menu
    Click Element              payslip-module-button
    Wait Until Page Contains   Payslip View
    Location Should Be         ${PAYSLIP URL}
    Click Button               xpath=//body/div/div/div[3]/div/div[2]/button
    Wait Until Page Contains   Add Payslip
    Location Should Be         ${ADD PAYSLIP URL}
    Click Element              xpath=//body/div/div/div[3]/div/form/div/div
    Click Element              xpath=//body/div/div/div[3]/div/form/div/div/div[2]/div
    Click Element              xpath=//body/div/div/div[3]/div/form/div[2]/div
    Click Element              xpath=//body/div/div/div[3]/div/form/div[2]/div/div[2]/div
    Click Element              payslip-preview
    Click Element              xpath=//body/div[2]/div/i
    Submit Form
    Location Should Be         ${WELCOME URL}

Employee And Dates Test
    Open Browser To Main Menu
    Click Element              payslip-module-button
    Wait Until Page Contains   Payslip View
    Location Should Be         ${PAYSLIP URL}
    Click Button               xpath=//body/div/div/div[3]/div/div[2]/button
    Wait Until Page Contains   Add Payslip
    Location Should Be         ${ADD PAYSLIP URL}
    Click Element              xpath=//body/div/div/div[3]/div/form/div/div
    Click Element              xpath=//body/div/div/div[3]/div/form/div/div/div[2]/div
    Input Text                 startDate        January 1, 100
    Input Text                 endDate          September 13, 275760
    Click Element              payslip-preview
    Click Element              xpath=//body/div[2]/div/i
    Submit Form
    Location Should Be    ${WELCOME URL}

Company And Date Test
    Open Browser To Main Menu
    Click Element              payslip-module-button
    Wait Until Page Contains   Payslip View
    Location Should Be         ${PAYSLIP URL}
    Click Button               xpath=//body/div/div/div[3]/div/div[2]/button
    Wait Until Page Contains   Add Payslip
    Location Should Be         ${ADD PAYSLIP URL}
    Click Element              xpath=//body/div/div/div[3]/div/form/div[2]/div
    Click Element              xpath=//body/div/div/div[3]/div/form/div[2]/div/div[2]/div
    Input Text                 startDate        January 1, 100
    Input Text                 endDate          September 13, 275760
    Click Element              payslip-preview
    Click Element              xpath=//body/div[2]/div/i
    Submit Form
    Location Should Be    ${WELCOME URL}

Employee, Company And Date Test
    Open Browser To Main Menu
    Click Element              payslip-module-button
    Wait Until Page Contains   Payslip View
    Location Should Be         ${PAYSLIP URL}
    Click Button               xpath=//body/div/div/div[3]/div/div[2]/button
    Wait Until Page Contains   Add Payslip
    Location Should Be         ${ADD PAYSLIP URL}
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
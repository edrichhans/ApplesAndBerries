*** Settings ***
Documentation     A test suite with a single test for checking allowable values of deductibles and allowance.
...
...               This test has a workflow that is created using keywords in
...               the imported resource file. 
Test Teardown     Close Browser
Resource          menu_resource.robot

*** Test Cases ***
Negative Value
    Open Browser To Main Menu
    Click Element              payslip-module-button
    Wait Until Page Contains   Payslip View
    Location Should Be         ${PAYSLIP URL}
    Click Button               add-payslip-button
    Wait Until Page Contains   Add Payslip
    Location Should Be         ${ADD PAYSLIP URL}
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
    Open Browser To Main Menu
    Click Element              payslip-module-button
    Wait Until Page Contains   Payslip View
    Location Should Be         ${PAYSLIP URL}
    Click Button               add-payslip-button
    Wait Until Page Contains   Add Payslip
    Location Should Be         ${ADD PAYSLIP URL}
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
    Open Browser To Main Menu
    Click Element              payslip-module-button
    Wait Until Page Contains   Payslip View
    Location Should Be         ${PAYSLIP URL}
    Click Button               add-payslip-button
    Wait Until Page Contains   Add Payslip
    Location Should Be         ${ADD PAYSLIP URL}
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
    Open Browser To Main Menu
    Click Element              payslip-module-button
    Wait Until Page Contains   Payslip View
    Location Should Be         ${PAYSLIP URL}
    Click Button               add-payslip-button
    Wait Until Page Contains   Add Payslip
    Location Should Be         ${ADD PAYSLIP URL}
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
    Open Browser To Main Menu
    Click Element              payslip-module-button
    Wait Until Page Contains   Payslip View
    Location Should Be         ${PAYSLIP URL}
    Click Button               add-payslip-button
    Wait Until Page Contains   Add Payslip
    Location Should Be         ${ADD PAYSLIP URL}
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
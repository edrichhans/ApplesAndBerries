*** Settings ***
Documentation     A resource file with reusable keywords and variables.
...
...               The system specific keywords created here form our own
...               domain specific language. They utilize keywords provided
...               by the imported Selenium2Library.
Library           Selenium2Library

*** Variables ***
${SERVER}         localhost:8000
${BROWSER}        Chrome
${DELAY}          0.3
${username}       edrichhans
${password}       password
${LOGIN URL}      http://${SERVER}/login
${WELCOME URL}    http://${SERVER}/
${EMPLOY URL}     http://localhost:8000/employees
${ADD EMPLOY URL}   http://localhost:8000/employees/add
${PAYSLIP URL}    http://localhost:8000/payslip_view
${ADD PAYSLIP URL}  http://localhost:8000/payslip
${AR URL}         http://localhost:8000/AR_view
${ADD AR URL}     http://localhost:8000/AR
${CV URL}         http://localhost:8000/checkvoucher_view
${ADD CV URL}     http://localhost:8000/checkvoucher
${PC URL}         http://localhost:8000/pettycash_view
${ADD PC URL}     http://localhost:8000/pettycash
${CONTROL PANEL URL}        http://localhost:8000/controlpanel
${SSS URL}        http://localhost:8000/SSS
${BIR URL}        http://localhost:8000/BIR
${PHILHEALTH URL}           http://localhost:8000/PH
${ADD USER URL}             http://localhost:8000/addUser
${DEL USER URL}             http://localhost:8000/deleteUser

*** Keywords ***
Open Browser To Main Menu
    Open Browser    ${LOGIN URL}    ${BROWSER}
    Maximize Browser Window
    Set Selenium Speed    ${DELAY}
    Input Username
    Input Password
    Submit Credentials
    Wait Until Page Contains   Main Menu
    Location Should Be    ${WELCOME URL}
    

Input Username
    Input Text    username    ${username}

Input Password
    Input Text    password    ${password}

Submit Credentials
    Click Button    login-button

Go Back Home
	Click Element   xpath=//body/div/div/div/a[2]
	Wait Until Page Contains   Apples and Berries Payroll System
    Location Should Be    ${WELCOME URL}

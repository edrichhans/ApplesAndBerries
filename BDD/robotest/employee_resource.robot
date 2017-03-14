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
${EMPLOY URL}	  http://localhost:8000/employees
${ADD EMPLOY URL}	http://localhost:8000/employees/add

*** Keywords ***
Open Browser To Main Menu
    Open Browser    ${LOGIN URL}    ${BROWSER}
    Maximize Browser Window
    Set Selenium Speed    ${DELAY}
    Input Username
    Input Password
    Submit Credentials
    Wait Until Page Contains   Apples and Berries Payroll System
    Location Should Be    ${WELCOME URL}
    

Input Username
    Input Text    username    ${username}

Input Password
    Input Text    password    ${password}

Submit Credentials
    Click Button    submit

Go Back Home
	Click Element   xpath=//body/div/div[2]/div/a[2]
	Wait Until Page Contains   Apples and Berries Payroll System
    Location Should Be    ${WELCOME URL}

Go To Employee Panel
	Click Button               xpath=//body/div/div[2]/div[2]/div[2]/div/button
	Wait Until Page Contains   EmployeePanel
	Location Should Be         ${EMPLOY URL}
	Click Button	addemp
    Wait Until Page Contains    Add Employee
    Location Should Be 			${ADD EMPLOY URL}
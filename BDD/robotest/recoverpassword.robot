*** Settings ***
Documentation     A test suite with a single test for going to recover password.
...
...               This test has a workflow that is created using keywords in
...               the imported resource file.
Suite Teardown	  Close Browser
Resource          menu_resource.robot

*** Test Cases ***
Recover Forgotten Password
    Open Browser    ${LOGIN URL}    ${BROWSER}
    Set Selenium Speed    ${DELAY}
    Click Element    xpath=//div[@id="login-box"]/div/a
    Location Should Be    localhost:8000/forgot
    Input Text       username      edrichhans
    Click Button     submit
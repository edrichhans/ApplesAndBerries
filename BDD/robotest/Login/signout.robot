*** Settings ***
Documentation     A test suite with a single test for signing out of an account.
...
...               This test has a workflow that is created using keywords in
...               the imported resource file.
Test Teardown     Close Browser
Resource          menu_resource.robot

*** Test Cases ***  
Sign Out Of Page
    Open Browser To Main Menu
    Click Element              xpath=//body/div/div/div/div[2]/div
    Click Element              xpath=//div[@id="fixed-top-menu"]/div[2]/div/div/a
    Location Should Be         ${LOGIN URL}


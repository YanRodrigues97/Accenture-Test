Feature: Challenge 2 - Browser Windows
  As a QA Automation tester
  I want to validate a new browser window on demoqa.com

  Scenario: Open and validate a new browser window
    Given I navigate to the demoqa home page
    When I select the "Alerts, Frame & Windows" section on the home page
    And I open the "Browser Windows" page from the sidebar
    And I click the new window button
    Then the new window should display "This is a sample page"
    And I close the new window

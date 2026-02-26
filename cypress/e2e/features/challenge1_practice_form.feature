Feature: Challenge 1 - Practice Form
  As a QA Automation tester
  I want to fill and submit the Practice Form on demoqa.com

  Scenario: Fill and submit Practice Form with random values
    Given I navigate to the demoqa home page
    When I select the "Forms" section on the home page
    And I open the "Practice Form" page from the sidebar
    And I fill the practice form with random values
    And I upload the fixture txt file
    And I submit the practice form
    Then a submission confirmation popup should be visible
    When I close the confirmation popup

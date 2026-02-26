Feature: Challenge 4 - Progress Bar
  As a QA Automation tester
  I want to interact with the Progress Bar widget on demoqa.com

  Scenario: Stop the progress bar before 25% then let it reach 100% and reset
    Given I navigate to the demoqa home page
    When I select the "Widgets" section on the home page
    And I open the "Progress Bar" page from the sidebar
    And I start the progress bar
    And I stop the progress bar before it reaches 25%
    Then the progress bar value should be at most 25%
    When I start the progress bar
    And I wait for the progress bar to reach 100%
    Then I reset the progress bar
    And the progress bar value should be 0%

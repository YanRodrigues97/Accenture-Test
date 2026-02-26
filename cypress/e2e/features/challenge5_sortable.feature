Feature: Challenge 5 - Sortable
  As a QA Automation tester
  I want to sort list items using drag and drop on demoqa.com

  Scenario: Sort the list items in alphabetical order using drag and drop
    Given I navigate to the demoqa home page
    When I select the "Interactions" section on the home page
    And I open the "Sortable" page from the sidebar
    Then I shuffle the list items
    Then I sort the list items in ascending order
    And the list items should be in ascending order

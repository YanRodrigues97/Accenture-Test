Feature: Challenge 3 - Web Tables
  As a QA Automation tester
  I want to create, edit and delete records in the Web Tables on demoqa.com

  Scenario: Create, edit and delete a Web Table record
    Given I navigate to the demoqa home page
    When I select the "Elements" section on the home page
    And I open the "Web Tables" page from the sidebar
    And I add a new record to the web table
    Then the new record should appear in the web table
    When I edit the newly added record
    Then the updated record should appear in the web table
    When I delete the newly added record
    Then the record should no longer be present in the web table

  # BONUS - Create 12 records dynamically then delete all
  Scenario: Add 12 records dynamically and delete all from the Web Table
    Given I navigate to the web tables page directly
    Then I add 12 records dynamically to the web table
    And I delete all records from the web table

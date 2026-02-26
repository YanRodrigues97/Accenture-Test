Feature: Accenture QA Automation - Frontend Challenges (Part 2)
  As a QA Automation tester
  I want to automate multiple frontend scenarios on demoqa.com
  So that I can verify the UI functionality of various components

  # ═══════════════════════════════════════════════════════════════
  # CHALLENGE 1 – Practice Form
  # ═══════════════════════════════════════════════════════════════
  Scenario: Fill and submit Practice Form with random values
    Given I navigate to the demoqa home page
    When I select the "Forms" section on the home page
    And I open the "Practice Form" page from the sidebar
    And I fill the practice form with random values
    And I upload the fixture txt file
    And I submit the practice form
    Then a submission confirmation popup should be visible
    When I close the confirmation popup

  
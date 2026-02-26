Feature: Accenture QA Automation - API Challenge (Part 1)
  As a QA Automation tester
  I want to automate the complete user and book rental flow
  So that I can verify the API functionality

  @api
  Scenario: Complete User Creation and Book Rental Flow
    Given I create a new user with valid credentials
    When I generate an authentication token for the user
    Then the token should be generated successfully
    And I should be able to verify user authorization
    When I list all available books
    Then I should see a list of books with ISBNs
    When I select two books from the available list
    And I rent the selected books to the user
    Then the books should be successfully added to user account
    When I retrieve the user details
    Then the user details should show the rented books

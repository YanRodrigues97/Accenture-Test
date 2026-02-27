# Cypress Automation - Accenture QA Challenge

Full automation suite using **Cypress + Cucumber (BDD)** covering both API and Frontend E2E testing for the Accenture QA Automation Challenge.

---

## Project Overview

This project covers **two challenge parts** implemented with Behavior-Driven Development (BDD) using Gherkin scenarios:

### Part 1 — API Testing (BookStore)

End-to-end user and book rental flow via the DemoQA API:

1. **Create User** — Register a new user via the Account API
2. **Generate Token** — Obtain a JWT authentication token
3. **Verify Authorization** — Confirm the user is authorized
4. **List Books** — Retrieve available books from the BookStore API
5. **Rent Books** — Add two books to the user's collection
6. **Verify Rental** — Confirm the books appear in the user's profile

### Part 2 — Frontend E2E Testing (DemoQA)

Five UI automation challenges on [demoqa.com](https://demoqa.com):

| # | Challenge | Page | Description |
|---|-----------|------|-------------|
| 1 | **Practice Form** | `/automation-practice-form` | Fill and submit a complete registration form |
| 2 | **Browser Windows** | `/browser-windows` | Open a new tab and assert its content |
| 3 | **Web Tables** | `/webtables` | Full CRUD — create, edit, delete records; dynamically add 12 rows and delete all |
| 4 | **Progress Bar** | `/progress-bar` | Stop bar before 25%, let it reach 100%, then reset to 0% |
| 5 | **Sortable** | `/sortable` | Shuffle list items with drag-and-drop, then sort back to correct order |

---

## Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| **Node.js** | v14+ | Runtime environment |
| **JavaScript (CommonJS)** | — | Test implementation |
| **Cypress** | 13.17.0 | E2E testing framework |
| **@badeball/cypress-cucumber-preprocessor** | 24.0.1 | BDD / Gherkin support |
| **cypress-real-events** | 1.15.0 | Native browser events (CDP) |
| **@4tw/cypress-drag-drop** | 2.3.1 | Drag-and-drop interactions |

---

## Project Structure

```
cypress-api-automation/
├── cypress/
│   ├── e2e/
│   │   └── features/
│   │       ├── bookstore.feature               # Part 1 — API scenarios
│   │       ├── challenge1_practice_form.feature
│   │       ├── challenge2_browser_windows.feature
│   │       ├── challenge3_web_tables.feature
│   │       ├── challenge4_progress_bar.feature
│   │       └── challenge5_sortable.feature
│   └── support/
│       ├── step_definitions/                   # Step implementations
│       │   ├── bookstore.js
│       │   ├── shared.js                       # Shared navigation steps
│       │   ├── challenge1_practice_form.js
│       │   ├── challenge2_browser_windows.js
│       │   ├── challenge3_web_tables.js
│       │   ├── challenge4_progress_bar.js
│       │   └── challenge5_sortable.js
│       ├── apiServices/                        # API Service classes (Page Object)
│       │   ├── UserApiService.js
│       │   └── BookstoreApiService.js
│       ├── helpers/                            # Utility functions
│       │   └── testDataHelper.js
│       └── e2e.js                              # Global Cypress configuration
├── cypress.config.js                           # Cypress & Cucumber configuration
├── package.json
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd cypress-api-automation

# Install dependencies
npm install
```

---

## Running Tests

### Part 1 — API tests only
```bash
npm test
```

### All tests — Cypress headless (CLI)
```bash
npm run test:cypress
```

### Interactive mode — Cypress UI
```bash
npm run cypress:open
```

---

## Test Scenarios

### Part 1 — API: BookStore Flow

```gherkin
@api
Scenario: Complete User Creation and Book Rental Flow
  Given the test data is initialized
  When I create a new user account
  Then the user account should be created successfully
  When I generate an authentication token
  Then the token should be generated successfully
  When I verify user authorization
  Then the user should be authorized
  When I fetch the list of available books
  Then the book list should be returned successfully
  When I select two books for rental
  And I rent the selected books for the user
  Then the books should appear in the user details
```

### Part 2 — Frontend Challenges (examples)

**Challenge 3 — Web Tables**
```gherkin
Scenario: Create, edit and delete a Web Table record
  Given I navigate to the web tables page directly
  When I add a new record to the web table
  Then the new record should appear in the web table
  When I edit the record in the web table
  Then the record should be updated in the web table
  When I delete the record from the web table
  Then the record should no longer be in the web table

Scenario: Add 12 records dynamically and delete all from the Web Table
  Given I navigate to the web tables page directly
  Then I add 12 records dynamically to the web table
  And I delete all records from the web table
```

**Challenge 5 — Sortable**
```gherkin
Scenario: Sort the list items in ascending order using drag and drop
  Given I navigate to the demoqa home page
  When I select the "Interactions" section on the home page
  And I open the "Sortable" page from the sidebar
  Then I shuffle the list items
  Then I sort the list items in ascending order
  And the list items should be in ascending order
```

---

## Architecture & Design Patterns

### Page Object Pattern (API Services)

Each API domain is encapsulated in its own service class:

**UserApiService.js**
- `createUser(userName, password)` — Create a new user account
- `generateToken(userName, password)` — Generate a JWT token
- `isAuthorized(userName, password, token)` — Verify user authorization
- `getUserDetails(userId, token)` — Retrieve user profile and rented books

**BookstoreApiService.js**
- `getAvailableBooks()` — List all books available in the store
- `rentBooks(userId, isbns, token)` — Add books to the user's collection
- `removeBook(userId, isbn, token)` — Return a specific book

### Shared Step Definitions

Common navigation steps (e.g. home page navigation, sidebar clicks) are centralized in `shared.js` to avoid duplication across all challenge files.

### Test Data Management

- Random username/password generated per run to ensure test isolation
- Cross-step data sharing via `cy.window().testData` object
- Helper utilities in `testDataHelper.js` for data generation

### Ad Blocking Strategy

DemoQA pages contain ad overlays that block UI interactions. All ads are intercepted globally in `e2e.js`:

```javascript
beforeEach(() => {
  cy.intercept('GET', '**/googlesyndication**', { statusCode: 204 });
  cy.intercept('GET', '**/doubleclick**',       { statusCode: 204 });
  cy.intercept('GET', '**/adsbygoogle**',        { statusCode: 204 });
  cy.intercept('GET', '**/criteo**',             { statusCode: 204 });
  cy.intercept('GET', '**/amazon-adsystem**',    { statusCode: 204 });
  cy.intercept('GET', '**/adnxs**',              { statusCode: 204 });
});
```

---

## API Endpoints Used (Part 1)

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/Account/v1/User` | POST | Create new user |
| `/Account/v1/GenerateToken` | POST | Generate auth token |
| `/Account/v1/Authorized` | POST | Verify authorization |
| `/Account/v1/User/{userID}` | GET | Get user details |
| `/BookStore/v1/Books` | GET | List available books |
| `/BookStore/v1/Books` | POST | Rent books |

**Base URL**: `https://demoqa.com`

---

## Key Features

- **BDD/Cucumber** — Human-readable Gherkin scenarios for both API and UI tests
- **Page Object Pattern** — Maintainable API service classes
- **Shared Steps** — Reusable navigation steps across all challenges
- **Real Events** — `cypress-real-events` for native browser interactions (CDP), avoiding ad overlay issues
- **Drag and Drop** — `@4tw/cypress-drag-drop` for the Sortable challenge
- **Ad Interception** — Global `cy.intercept()` rules suppress all ad networks
- **Random Test Data** — Unique credentials per execution for full isolation
- **Comprehensive Logging** — Step-by-step console output for API flows

---

## npm Scripts

| Script | Purpose |
|--------|---------|
| `npm test` | Run Part 1 API feature (headless) |
| `npm run test:cypress` | Run all features headless |
| `npm run cypress:open` | Open Cypress interactive UI |

---

## Troubleshooting

### Dependencies not found
```bash
npm install
```

### Cypress binary missing
```bash
npx cypress install
```

### Tests failing due to network issues
- Ensure internet access to [demoqa.com](https://demoqa.com)
- Check the Swagger UI: [https://demoqa.com/swagger/](https://demoqa.com/swagger/)

### Ad overlays blocking elements
All major ad networks are already intercepted in `e2e.js`. If new ads appear, add a new `cy.intercept()` rule targeting the ad domain.

## Resources

- **DemoQA**: [https://demoqa.com/](https://demoqa.com/)
- **API Documentation**: [https://demoqa.com/swagger/](https://demoqa.com/swagger/)
- **Cypress**: [https://docs.cypress.io/](https://docs.cypress.io/)
- **Cucumber**: [https://cucumber.io/docs/](https://cucumber.io/docs/)

## What's Next (Part 2)

The second part will focus on **Frontend UI Automation**:
- Forms filling and submission
- Browser windows/tabs handling
- Web tables (CRUD operations)
- Progress bars
- Drag and drop interactions

## Project Status

**Status**: Part 1 and part 2 (API) (Frontend) - Complete and Tested  
**Version**: 1.0.0  
**Last Updated**: February 26, 2026  
**Author**: Yan Rodrigues 

---

**Ready for GitHub!** All tests passing, code documented, structure clean.


# Cypress API Automation - Accenture QA Challenge

Automated API testing using **Cypress + Cucumber (BDD)** following the Page Object pattern for the Accenture QA Automation Challenge.

## Project Overview

This project automates **Part 1 (API Testing)** using Behavior-Driven Development (BDD) approach with Gherkin scenarios:

1. **Create User** - Register a new user via the Account API
2. **Generate Token** - Obtain an authentication token
3. **Verify Authorization** - Confirm user is authorized
4. **List Books** - Retrieve available books from the BookStore API
5. **Rent Books** - Add two books to user's collection
6. **Verify Rental** - Confirm books appear in user details

## Tech Stack

- **Node.js** - Runtime Environment
- **JavaScript (CommonJS)** - Test Implementation
- **Cypress** v13.17.0 - E2E Testing Framework
- **@badeball/cypress-cucumber-preprocessor** v24.0.1 - BDD/Gherkin Support
- **Page Object Pattern** - API Service Organization

## Project Structure

```
cypress-api-automation/
├── cypress/
│   ├── e2e/
│   │   └── features/
│   │       └── bookstore.feature      # BDD Gherkin scenarios
│   └── support/
│       ├── step_definitions/          # Step implementations
│       │   └── bookstore.js
│       ├── apiServices/               # API Service classes (Page Objects)
│       │   ├── UserApiService.js
│       │   └── BookstoreApiService.js
│       ├── helpers/                   # Utility functions
│       │   └── testDataHelper.js
│       └── e2e.js                     # Cypress support configuration
├── cypress.config.js                  # Cypress & Cucumber configuration
├── package.json                       # Dependencies and scripts
├── .env.example                       # Environment variables template
└── README.md                          # This file
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Navigate to project**
   ```bash
   cd cypress-api-automation
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

## Running Tests

### Run BDD tests (Recommended)
```bash
npm test
```

### Run tests with Cypress UI (Interactive mode)
```bash
npm run cypress:open
```

## Test Execution Sample

When you run `npm test`, you'll see the BDD feature executing with detailed logs:

```
Running:  bookstore.feature

Accenture QA Automation - API Challenge (Part 1)
  √ Complete User Creation and Book Rental Flow (4s)

TEST DATA INITIALIZED
   ├─ Username: user1708952847123
   ├─ Password: Test@Password123
   └─ Base URL: https://demoqa.com

[STEP 1] Creating user: user1708952847123
User created successfully
   ├─ Status: 201
   ├─ User ID: f2c8f2e2-1111-2222-3333-4444444444
   └─ Username: user1708952847123

[STEP 2] Generating authentication token
Token generated successfully
   ├─ Status: 200
   ├─ Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   └─ Expires: 2/27/2026...

[STEP 5] Fetching available books from BookStore API
Books fetched successfully
   ├─ Status: 200
   ├─ Total books: 8
   └─ Sample: Git Pocket Guide

[STEP 7] Selecting two books for rental
Books selected
   ├─ Book 1: Git Pocket Guide (ISBN: 9781449325862)
   └─ Book 2: Designing Evolvable Web APIs with ASP.NET (ISBN: 9781449331818)

[STEP 8] Renting books to user f2c8f2e2...
Books rented successfully
   ├─ Status: 201
   ├─ Rentals: 2
   └─ User ID: f2c8f2e2...

TEST COMPLETED SUCCESSFULLY - All 2 books rented and verified!
```

## Architecture & Design Patterns

### Page Object Pattern (API Services)
Each API endpoint is encapsulated in a service class with dedicated methods:

**UserApiService.js**
- `createUser(userName, password)` - Create new user account
- `generateToken(userName, password)` - Generate authentication token
- `isAuthorized(userName, password, token)` - Verify user is authorized
- `getUserDetails(userId, token)` - Retrieve user profile and rented books

**BookstoreApiService.js**
- `getAvailableBooks()` - List all available books in store
- `rentBooks(userId, isbns, token)` - Add books to user's collection
- `removeBook(userId, isbn, token)` - Return a book

### Test Data Management
- Random username/password generation per test run
- Cross-step data sharing via `cy.window().testData` object  
- Helper utilities in `testDataHelper.js` for data generation

## API Endpoints Used

| Endpoint | Method | Purpose |
|----------|--------|---------|
| /Account/v1/User | POST | Create new user |
| /Account/v1/GenerateToken | POST | Generate auth token |
| /Account/v1/Authorized | POST | Verify authorization |
| /Account/v1/User/{userID} | GET | Get user details |
| /BookStore/v1/Books | GET | List available books |
| /BookStore/v1/Books | POST | Rent books |

**Base URL**: `https://demoqa.com`

## Key Features

* **BDD/Cucumber Approach** - Human-readable test scenarios  
* **Complete Workflow Automation** - All 11 steps implemented  
* **Page Object Pattern** - Maintainable and scalable architecture  
* **Random Test Data** - Unique credentials per execution  
* **Comprehensive Logging** - Step-by-step execution visibility  
* **Error Handling** - Flexible status code validation  
* **API Services** - Reusable service classes  

## Troubleshooting

### Tests not running
```bash
# Ensure Node.js is installed
node --version

# Reinstall dependencies
rm -r node_modules
npm install

# Clear Cypress cache
npx cypress cache clear
```

### API connection issues
- Verify internet connection to demoqa.com
- Check if the API is accessible: [https://demoqa.com/swagger/](https://demoqa.com/swagger/)
- Verify firewall settings allow HTTPS connections

### Token generation fails
- Verify username/password format meets API requirements
- Ensure user was created successfully before token generation
- Check that credentials match between create and token endpoints

## npm Scripts

| Script | Purpose |
|--------|---------|
| `npm test` | Run BDD feature tests |
| `npm run cypress:open` | Open Cypress UI (interactive mode) |

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

**Status**: Part 1 (API) - Complete and Tested  
**Version**: 1.0.0  
**Last Updated**: February 26, 2026  
**Author**: QA Automation Team  
**License**: ISC  

---

**Ready for GitHub!** All tests passing, code documented, structure clean.


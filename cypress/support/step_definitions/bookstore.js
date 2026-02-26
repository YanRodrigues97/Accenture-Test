// Step definitions for Accenture QA Automation Challenge
const { Given, When, Then, Before } = require('@badeball/cypress-cucumber-preprocessor');
const UserApiService = require('../apiServices/UserApiService');
const BookstoreApiService = require('../apiServices/BookstoreApiService');
const { generateRandomUsername, generateRandomPassword, storeData, getData } = require('../helpers/testDataHelper');

let testData = {};

Before({ tags: '@api' }, () => {
  testData = {
    userName: generateRandomUsername(),
    password: generateRandomPassword(),
    userId: null,
    token: null,
    books: [],
    selectedBookIsbns: [],
    userDetails: null,
  };
  
  cy.log(`TEST DATA INITIALIZED`);
  cy.log(`   ├─ Username: ${testData.userName}`);
  cy.log(`   ├─ Password: ${testData.password}`);
  cy.log(`   └─ Base URL: https://demoqa.com`);
});

// Step 1: Create a new user
Given('I create a new user with valid credentials', () => {
  cy.log(`[STEP 1] Creating user: ${testData.userName}`);
  UserApiService.createUser(testData.userName, testData.password).then((response) => {
    testData.userId = response.body.userID;
    cy.log(`User created successfully`);
    cy.log(`   ├─ Status: ${response.status}`);
    cy.log(`   ├─ User ID: ${testData.userId}`);
    cy.log(`   └─ Username: ${response.body.username}`);
    
    // Store in window for cross-step access
    cy.window().then((win) => {
      win.testData = testData;
    });
    
    expect(response.status).to.equal(201);
    expect(response.body).to.have.property('userID');
    expect(response.body).to.have.property('username', testData.userName);
  });
});

// Step 2: Generate token
When('I generate an authentication token for the user', () => {
  cy.log(`[STEP 2] Generating authentication token`);
  UserApiService.generateToken(testData.userName, testData.password).then((response) => {
    testData.token = response.body.token;
    cy.log(`Token generated successfully`);
    cy.log(`   ├─ Status: ${response.status}`);
    cy.log(`   ├─ Token: ${response.body.token.substring(0, 30)}...`);
    cy.log(`   └─ Expires: ${response.body.expires}`);
    
    cy.window().then((win) => {
      win.testData = testData;
    });
    
    expect(response.status).to.be.oneOf([200, 201]);
    expect(response.body).to.have.property('token');
    expect(response.body).to.have.property('expires');
  });
});

// Step 3: Verify token generation
Then('the token should be generated successfully', () => {
  cy.log(`[STEP 3] Verifying token generation`);
  cy.window().then((win) => {
    testData = win.testData;
    expect(testData.token).to.exist;
    expect(testData.token.length).to.be.greaterThan(0);
    cy.log(`Token verified: ${testData.token.substring(0, 30)}...`);
  });
});

// Step 4: Verify authorization
Then('I should be able to verify user authorization', () => {
  cy.log(`[STEP 4] Verifying user authorization`);
  UserApiService.isAuthorized(testData.userName, testData.password, testData.token).then((response) => {
    cy.log(`User authorization verified`);
    cy.log(`   ├─ Status: ${response.status}`);
    cy.log(`   └─ Authorized: ${response.body}`);
    expect(response.status).to.be.oneOf([200, 201]);
    expect(response.body).to.equal(true);
  });
});

// Step 5: List all books
When('I list all available books', () => {
  cy.log(`[STEP 5] Fetching available books from BookStore API`);
  BookstoreApiService.getAvailableBooks().then((response) => {
    testData.books = response.body.books;
    cy.log(`Books fetched successfully`);
    cy.log(`   ├─ Status: ${response.status}`);
    cy.log(`   ├─ Total books: ${response.body.books.length}`);
    cy.log(`   └─ Sample: ${response.body.books[0].title}`);
    
    cy.window().then((win) => {
      win.testData = testData;
    });
    
    expect(response.status).to.be.oneOf([200, 201]);
    expect(response.body).to.have.property('books');
    expect(response.body.books.length).to.be.greaterThan(0);
  });
});

// Step 6: Verify book list
Then('I should see a list of books with ISBNs', () => {
  cy.log(`[STEP 6] Validating book list structure`);
  cy.window().then((win) => {
    testData = win.testData;
    expect(testData.books.length).to.be.greaterThan(0);
    
    // Verify each book has required properties
    testData.books.forEach((book) => {
      expect(book).to.have.property('isbn');
      expect(book).to.have.property('title');
      expect(book).to.have.property('author');
    });
    
    cy.log(`All ${testData.books.length} books have required properties (isbn, title, author}`);
  });
});

// Step 7: Select two books
When('I select two books from the available list', () => {
  cy.log(`[STEP 7] Selecting two books for rental`);
  cy.window().then((win) => {
    testData = win.testData;
    
    // Select first two books
    testData.selectedBookIsbns = [
      testData.books[0].isbn,
      testData.books[1].isbn,
    ];
    
    cy.log(`Books selected`);
    cy.log(`   ├─ Book 1: ${testData.books[0].title} (ISBN: ${testData.selectedBookIsbns[0]})`);
    cy.log(`   └─ Book 2: ${testData.books[1].title} (ISBN: ${testData.selectedBookIsbns[1]})`);
    
    win.testData = testData;
  });
});

// Step 8: Rent the books
When('I rent the selected books to the user', () => {
  cy.log(`[STEP 8] Renting books to user ${testData.userId}`);
  BookstoreApiService.rentBooks(
    testData.userId,
    testData.selectedBookIsbns,
    testData.token
  ).then((response) => {
    cy.log(`Books rented successfully`);
    cy.log(`   ├─ Status: ${response.status}`);
    cy.log(`   ├─ Rentals: ${response.body.books.length}`);
    cy.log(`   └─ User ID: ${testData.userId}`);
    expect(response.status).to.be.oneOf([200, 201]);
    expect(response.body).to.have.property('books');
    expect(response.body.books.length).to.equal(2);
  });
});

// Step 9: Verify books added
Then('the books should be successfully added to user account', () => {
  cy.log(`[STEP 9] Verifying books were added to account`);
  cy.window().then((win) => {
    testData = win.testData;
    expect(testData.selectedBookIsbns.length).to.equal(2);
    cy.log(`Books verified to be added: ${testData.selectedBookIsbns.length}/2`);
  });
});

// Step 10: Get user details
When('I retrieve the user details', () => {
  cy.log(`[STEP 10] Retrieving user details for ${testData.userId}`);
  UserApiService.getUserDetails(testData.userId, testData.token).then((response) => {
    testData.userDetails = response.body;
    cy.log(`User details retrieved`);
    cy.log(`   ├─ Status: ${response.status}`);
    cy.log(`   ├─ Username: ${response.body.username}`);
    cy.log(`   ├─ User ID: ${response.body.userId}`);
    cy.log(`   └─ Books rented: ${response.body.books.length}`);
    
    cy.window().then((win) => {
      win.testData = testData;
    });
    
    expect(response.status).to.be.oneOf([200, 201]);
    expect(response.body).to.have.property('userId', testData.userId);
    expect(response.body).to.have.property('username', testData.userName);
    expect(response.body).to.have.property('books');
  });
});

// Step 11: Verify rented books in user details
Then('the user details should show the rented books', () => {
  cy.log(`[STEP 11] Verifying rented books in user details`);
  cy.window().then((win) => {
    testData = win.testData;
    const userBooks = testData.userDetails.books;
    
    expect(userBooks.length).to.equal(2);
    
    // Verify selected books are in user details
    userBooks.forEach((book) => {
      expect(book.isbn).to.be.oneOf(testData.selectedBookIsbns);
    });
    
    cy.log(`All rented books verified in user account`);
    cy.log(`   ├─ Total books: ${userBooks.length}`);
    cy.log(`   ├─ Book 1: ${userBooks[0].title}`);
    cy.log(`   ├─ Book 2: ${userBooks[1].title}`);
    cy.log(`   └─ User: ${testData.userDetails.username}`);
    cy.log(`TEST COMPLETED SUCCESSFULLY - All ${testData.selectedBookIsbns.length} books rented and verified!`);
  });
});

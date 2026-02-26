// Step definitions for Accenture QA Automation Challenge
import { Given, When, Then, Before } from '@badeball/cypress-cucumber-preprocessor';
import UserApiService from '../apiServices/UserApiService';
import BookstoreApiService from '../apiServices/BookstoreApiService';
import { generateRandomUsername, generateRandomPassword, storeData, getData } from '../helpers/testDataHelper';

let testData = {};

Before(() => {
  testData = {
    userName: generateRandomUsername(),
    password: generateRandomPassword(),
    userId: null,
    token: null,
    books: [],
    selectedBookIsbns: [],
    userDetails: null,
  };
});

// Step 1: Create a new user
Given('I create a new user with valid credentials', () => {
  UserApiService.createUser(testData.userName, testData.password).then((response) => {
    cy.log(`User created: ${response.body.userID}`);
    testData.userId = response.body.userID;
    
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
  UserApiService.generateToken(testData.userName, testData.password).then((response) => {
    cy.log(`Token generated: ${response.body.token.substring(0, 20)}...`);
    testData.token = response.body.token;
    
    cy.window().then((win) => {
      win.testData = testData;
    });
    
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('token');
    expect(response.body).to.have.property('expires');
  });
});

// Step 3: Verify token generation
Then('the token should be generated successfully', () => {
  cy.window().then((win) => {
    testData = win.testData;
    expect(testData.token).to.exist;
    expect(testData.token.length).to.be.greaterThan(0);
  });
});

// Step 4: Verify authorization
And('I should be able to verify user authorization', () => {
  UserApiService.isAuthorized(testData.token).then((response) => {
    cy.log('User authorization verified');
    expect(response.status).to.equal(200);
    expect(response.body).to.equal(true);
  });
});

// Step 5: List all books
When('I list all available books', () => {
  BookstoreApiService.getAvailableBooks().then((response) => {
    cy.log(`Found ${response.body.books.length} available books`);
    testData.books = response.body.books;
    
    cy.window().then((win) => {
      win.testData = testData;
    });
    
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('books');
    expect(response.body.books.length).to.be.greaterThan(0);
  });
});

// Step 6: Verify book list
Then('I should see a list of books with ISBNs', () => {
  cy.window().then((win) => {
    testData = win.testData;
    expect(testData.books.length).to.be.greaterThan(0);
    
    // Verify each book has required properties
    testData.books.forEach((book) => {
      expect(book).to.have.property('isbn');
      expect(book).to.have.property('title');
      expect(book).to.have.property('author');
    });
  });
});

// Step 7: Select two books
When('I select two books from the available list', () => {
  cy.window().then((win) => {
    testData = win.testData;
    
    // Select first two books
    testData.selectedBookIsbns = [
      testData.books[0].isbn,
      testData.books[1].isbn,
    ];
    
    cy.log(`Selected books: ${testData.selectedBookIsbns.join(', ')}`);
    
    win.testData = testData;
  });
});

// Step 8: Rent the books
And('I rent the selected books to the user', () => {
  BookstoreApiService.rentBooks(
    testData.userId,
    testData.selectedBookIsbns,
    testData.token
  ).then((response) => {
    cy.log(`Books rented successfully`);
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('userId', testData.userId);
    expect(response.body.books.length).to.equal(2);
  });
});

// Step 9: Verify books added
Then('the books should be successfully added to user account', () => {
  cy.window().then((win) => {
    testData = win.testData;
    expect(testData.selectedBookIsbns.length).to.equal(2);
  });
});

// Step 10: Get user details
When('I retrieve the user details', () => {
  UserApiService.getUserDetails(testData.userId, testData.token).then((response) => {
    cy.log(`User details retrieved with ${response.body.books.length} rented books`);
    testData.userDetails = response.body;
    
    cy.window().then((win) => {
      win.testData = testData;
    });
    
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('userId', testData.userId);
    expect(response.body).to.have.property('username', testData.userName);
    expect(response.body).to.have.property('books');
  });
});

// Step 11: Verify rented books in user details
Then('the user details should show the rented books', () => {
  cy.window().then((win) => {
    testData = win.testData;
    const userBooks = testData.userDetails.books;
    
    expect(userBooks.length).to.equal(2);
    
    // Verify selected books are in user details
    userBooks.forEach((book) => {
      expect(book.isbn).to.be.oneOf(testData.selectedBookIsbns);
    });
    
    cy.log('✅ All API tests passed successfully!');
  });
});

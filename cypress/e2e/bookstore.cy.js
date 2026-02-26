describe('Accenture QA Automation - API Challenge (Part 1)', () => {
  it('Should complete full user and book rental workflow', () => {
    const userName = `automation_${Date.now()}`;
    const password = `Pass${Date.now()}!`;

    // Step 1: Create User
    cy.request({
      method: 'POST',
      url: '/Account/v1/User',
      body: {
        userName: userName,
        password: password,
      },
    }).then((response) => {
      expect(response.status).to.equal(201);
      expect(response.body).to.have.property('userID');
      const userId = response.body.userID;
      
      cy.wrap(userId).as('userId');
      cy.task('log', `[PASS] Step 1: User created with ID: ${userId}`);
      cy.log(`[PASS] Step 1: User created with ID: ${userId}`);
    });

    // Step 2: Generate Token
    cy.get('@userId').then((userId) => {
      cy.request({
        method: 'POST',
        url: '/Account/v1/GenerateToken',
        body: { userName, password },
      }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('token');
        cy.wrap(response.body.token).as('token');
        cy.task('log', `[PASS] Step 2: Token generated (${response.body.token.substring(0, 20)}...)`);
        cy.log(`[PASS] Step 2: Token generated (${response.body.token.substring(0, 20)}...)`);
      });
    });

    // Step 3: Verify Authorization
    cy.get('@token').then((token) => {
      cy.request({
        method: 'POST',
        url: '/Account/v1/Authorized',
        headers: { Authorization: `Bearer ${token}` },
        body: { userName, password },
      }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.equal(true);
        cy.task('log', `[PASS] Step 3: User authorization verified`);
        cy.log(`[PASS] Step 3: User authorization verified`);
      });
    });

    // Step 4: Get Available Books
    cy.request({
      method: 'GET',
      url: '/BookStore/v1/Books',
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.books.length).to.be.greaterThan(0);
      cy.wrap(response.body.books).as('books');
      
      cy.task('log', `[PASS] Step 4: Found ${response.body.books.length} available books:`);
      cy.log(`[PASS] Step 4: Found ${response.body.books.length} available books:`);
      response.body.books.forEach((book, index) => {
        cy.task('log', `   ${index + 1}. ${book.title} | ISBN: ${book.isbn} | Author: ${book.author} | Pages: ${book.pages}`);
        cy.log(`   ${index + 1}. ${book.title} | ISBN: ${book.isbn} | Author: ${book.author} | Pages: ${book.pages}`);
      });
    });

    // Step 5: Rent Books
    cy.get('@books').then((books) => {
      cy.get('@userId').then((userId) => {
        cy.get('@token').then((token) => {
          const selectedIsbns = [books[0].isbn, books[1].isbn];
          
          cy.request({
            method: 'POST',
            url: '/BookStore/v1/Books',
            headers: { Authorization: `Bearer ${token}` },
            body: {
              userId: userId,
              collectionOfIsbns: selectedIsbns.map(isbn => ({ isbn })),
            },
          }).then((response) => {
            expect(response.status).to.be.oneOf([200, 201]);
            expect(response.body.books.length).to.equal(2);
            cy.wrap(selectedIsbns).as('rentedIsbns');
            cy.task('log', `[PASS] Step 5: Successfully rented 2 books:`);
            cy.log(`[PASS] Step 5: Successfully rented 2 books:`);
            cy.task('log', `   - ${books[0].title} (ISBN: ${books[0].isbn})`);
            cy.log(`   - ${books[0].title} (ISBN: ${books[0].isbn})`);
            cy.task('log', `   - ${books[1].title} (ISBN: ${books[1].isbn})`);
            cy.log(`   - ${books[1].title} (ISBN: ${books[1].isbn})`);
          });
        });
      });
    });

    // Step 6: Verify User Details
    cy.get('@userId').then((userId) => {
      cy.get('@token').then((token) => {
        cy.get('@rentedIsbns').then((rentedIsbns) => {
          cy.request({
            method: 'GET',
            url: `/Account/v1/User/${userId}`,
            headers: { Authorization: `Bearer ${token}` },
          }).then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body.books.length).to.equal(2);
            expect(response.body).to.have.property('username', userName);
            expect(response.body).to.have.property('userId', userId);
            
            cy.task('log', `[PASS] Step 6: User details retrieved successfully`);
            cy.log(`[PASS] Step 6: User details retrieved successfully`);
            cy.task('log', `   Username: ${response.body.username}`);
            cy.log(`   Username: ${response.body.username}`);
            cy.task('log', `   User ID: ${response.body.userId}`);
            cy.log(`   User ID: ${response.body.userId}`);
            cy.task('log', `   Books rented: ${response.body.books.length}`);
            cy.log(`   Books rented: ${response.body.books.length}`);
            cy.task('log', `   Rented books details:`);
            cy.log(`   Rented books details:`);
            
            response.body.books.forEach((book, index) => {
              expect(book.isbn).to.be.oneOf(rentedIsbns);
              cy.task('log', `   ${index + 1}. ${book.title}`);
              cy.log(`   ${index + 1}. ${book.title}`);
              cy.task('log', `      ISBN: ${book.isbn}`);
              cy.log(`      ISBN: ${book.isbn}`);
              cy.task('log', `      Author: ${book.author}`);
              cy.log(`      Author: ${book.author}`);
              cy.task('log', `      Publisher: ${book.publisher}`);
              cy.log(`      Publisher: ${book.publisher}`);
              cy.task('log', `      Pages: ${book.pages}`);
              cy.log(`      Pages: ${book.pages}`);
            });
            
            cy.task('log', `[SUCCESS] All tests PASSED successfully!`);
            cy.log(`[SUCCESS] All tests PASSED successfully!`);
          });
        });
      });
    });
  });
});

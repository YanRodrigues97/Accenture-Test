// BookStore API Service - Page Object Pattern for BookStore operations

class BookstoreApiService {
  /**
   * Get list of available books
   * @returns {Cypress.Chainable<Response>}
   */
  getAvailableBooks() {
    return cy.request({
      method: 'GET',
      url: '/BookStore/v1/Books',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  /**
   * Rent books (add books to user account)
   * @param {string} userId - User ID
   * @param {array} bookIsbns - Array of book ISBNs to rent
   * @param {string} token - Authorization token
   * @returns {Cypress.Chainable<Response>}
   */
  rentBooks(userId, bookIsbns, token) {
    const collectionOfIsbns = bookIsbns.map((isbn) => ({
      isbn: isbn,
    }));

    return cy.request({
      method: 'POST',
      url: '/BookStore/v1/Books',
      body: {
        userId: userId,
        collectionOfIsbns: collectionOfIsbns,
      },
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  }

  /**
   * Remove books from user account
   * @param {string} userId - User ID
   * @param {string} isbn - Book ISBN to remove
   * @param {string} token - Authorization token
   * @returns {Cypress.Chainable<Response>}
   */
  removeBook(userId, isbn, token) {
    return cy.request({
      method: 'DELETE',
      url: `/BookStore/v1/Book`,
      body: {
        userId: userId,
        isbn: isbn,
      },
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  }
}

export default new BookstoreApiService();

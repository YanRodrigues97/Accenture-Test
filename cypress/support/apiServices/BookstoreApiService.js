class BookstoreApiService {
  getAvailableBooks() {
    return cy.request({
      method: 'GET',
      url: '/BookStore/v1/Books',
      headers: {
        'Content-Type': 'application/json',
      },
      failOnStatusCode: false,
    });
  }

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
      failOnStatusCode: false,
    });
  }

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
      failOnStatusCode: false,
    });
  }
}

module.exports = new BookstoreApiService();

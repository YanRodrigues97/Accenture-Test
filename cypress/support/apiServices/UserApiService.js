// User API Service - Page Object Pattern for User operations

class UserApiService {
  /**
   * Create a new user
   * @param {string} userName - Username
   * @param {string} password - Password
   * @returns {Cypress.Chainable<Response>}
   */
  createUser(userName, password) {
    return cy.request({
      method: 'POST',
      url: '/Account/v1/User',
      body: {
        userName: userName,
        password: password,
      },
      headers: {
        'Content-Type': 'application/json',
      },
      failOnStatusCode: false,
    });
  }

  /**
   * Generate authentication token
   * @param {string} userName - Username
   * @param {string} password - Password
   * @returns {Cypress.Chainable<Response>}
   */
  generateToken(userName, password) {
    return cy.request({
      method: 'POST',
      url: '/Account/v1/GenerateToken',
      body: {
        userName: userName,
        password: password,
      },
      headers: {
        'Content-Type': 'application/json',
      },
      failOnStatusCode: false,
    });
  }

  /**
   * Check if user is authorized
   * @param {string} userName - Username
   * @param {string} password - Password
   * @param {string} token - Authorization token
   * @returns {Cypress.Chainable<Response>}
   */
  isAuthorized(userName, password, token) {
    return cy.request({
      method: 'POST',
      url: '/Account/v1/Authorized',
      body: {
        userName: userName,
        password: password,
      },
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      failOnStatusCode: false,
    });
  }

  /**
   * Get user details with rented books
   * @param {string} userId - User ID
   * @param {string} token - Authorization token
   * @returns {Cypress.Chainable<Response>}
   */
  getUserDetails(userId, token) {
    return cy.request({
      method: 'GET',
      url: `/Account/v1/User/${userId}`,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      failOnStatusCode: false,
    });
  }
}

module.exports = new UserApiService();

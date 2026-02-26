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
    });
  }

  /**
   * Check if user is authorized
   * @param {string} token - Authorization token
   * @returns {Cypress.Chainable<Response>}
   */
  isAuthorized(token) {
    return cy.request({
      method: 'POST',
      url: '/Account/v1/Authorized',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
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
    });
  }
}

export default new UserApiService();

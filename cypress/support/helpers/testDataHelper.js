// Utility functions for tests

const generateRandomId = () => {
  return `user_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
};

const generateRandomUsername = () => {
  return `automation${Date.now()}`;
};

const generateRandomPassword = () => {
  return `Pass${Date.now()}!@#`;
};

const getTestData = (key) => {
  const testData = {
    baseUrl: 'https://demoqa.com',
    accountApi: {
      createUser: '/Account/v1/User',
      generateToken: '/Account/v1/GenerateToken',
      authorized: '/Account/v1/Authorized',
      getUserDetails: '/Account/v1/User/',
    },
    bookstoreApi: {
      listBooks: '/BookStore/v1/Books',
      rentBooks: '/BookStore/v1/Books',
    },
  };
  return testData[key] || null;
};

const storeData = (key, value) => {
  cy.window().then((win) => {
    if (!win.testData) {
      win.testData = {};
    }
    win.testData[key] = value;
  });
};

const getData = (key) => {
  return cy.window().then((win) => {
    return win.testData ? win.testData[key] : null;
  });
};

module.exports = {
  generateRandomId,
  generateRandomUsername,
  generateRandomPassword,
  getTestData,
  storeData,
  getData,
};

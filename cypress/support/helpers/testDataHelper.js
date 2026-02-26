// Utility functions for tests


export const generateRandomId = () => {
  return `user_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
};


export const generateRandomUsername = () => {
  return `automation${Date.now()}`;
};

export const generateRandomPassword = () => {
  return `Pass${Date.now()}!@#`;
};

export const getTestData = (key) => {
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

export const storeData = (key, value) => {
  cy.window().then((win) => {
    if (!win.testData) {
      win.testData = {};
    }
    win.testData[key] = value;
  });
};

export const getData = (key) => {
  return cy.window().then((win) => {
    return win.testData ? win.testData[key] : null;
  });
};

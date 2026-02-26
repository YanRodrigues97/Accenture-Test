// Shared utility functions for Frontend Challenges
// Site: https://demoqa.com

const rand     = (len = 6) => Math.random().toString(36).slice(2, 2 + len);
const randNum  = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const randEmail = () => `${rand(6)}_${Date.now()}@testemail.com`;

const dismissAds = () => {
  cy.document().then((doc) => {
    doc.querySelectorAll('iframe').forEach((iframe) => {
      const src = iframe.getAttribute('src') || '';
      const id  = iframe.getAttribute('id')  || '';
      if (
        src.includes('google') ||
        src.includes('doubleclick') ||
        src.includes('criteo') ||
        src.includes('amazon-adsystem') ||
        id.includes('google_ads')
      ) {
        iframe.remove();
      }
    });
    doc.querySelectorAll('[id*="google_ads"]').forEach((el) => el.remove());
  });
};

module.exports = { rand, randNum, randEmail, dismissAds };

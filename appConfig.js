const config = {
  baseUrl: "https://interny-backend-prod.herokuapp.com/",
  packageIds: {
    internPackage: "prod_J1xSySz4UwTM8D",
    summerInternPackage: "prod_J1xS29YWMkT6fU",
    competencyPackage: "prod_J1xSgPmyeK3MIY",
    languagePackage: "prod_J1xRQtVkUSZfWc",
    freemiumPackage: "prod_J1xSu04bC1gXqW"
  },
  STRIPE_PUBLIC_KEY_PROD: "pk_live_51HbnvBEexm5jHOGx7UyfuFfhSOsjTIri3b2BhFyAaqBvQ7IDVaMqW1zRI1F75EVovgm6H8uqUzE3yiDYVRwyHmbo00HcSEQG9Z",
  STRIPE_PUBLIC_KEY_DEV: "pk_test_51HbnvBEexm5jHOGxsnPBjTeexZZrnUKtEubUerAetv5O2Fljp44qfZrkAAhxrfjbZV5eQXXMu7MUFtRlGCOw1yYa00uN8yHFlW",
   //baseUrl: 'http://localhost:5000/',
};

module.exports = config;

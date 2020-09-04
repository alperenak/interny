const config = {
    baseUrl: process.env.NODE_ENV === 'development' ? 'https://interny-backend-prod.herokuapp.com/' : ''
};

module.exports = config;

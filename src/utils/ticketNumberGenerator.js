const crypto = require('crypto');

const generateUniqueTicketNumber = () => {
    return crypto.randomBytes(4).toString('hex');
};

module.exports = generateUniqueTicketNumber;

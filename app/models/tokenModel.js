const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({	
	tokenId: String,
	userId: String
});

const Token = mongoose.model('Token', tokenSchema);

module.exports = {
	Token,
};
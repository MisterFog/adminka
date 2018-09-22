const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	id: Number,
	name: String,
	surname: String,	
	email: String,
	password: String
});

const User = mongoose.model('User', userSchema);

module.exports = {
	User,
};
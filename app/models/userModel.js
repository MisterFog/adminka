const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: String,
	surname: String,
	birthdate: Number,	//new Date().toLocaleString(),
	email: String,
	login: String,
	password: String
});

const User = mongoose.model('User', userSchema);

module.exports = {
	User,
};
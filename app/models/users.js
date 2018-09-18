const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	id: Number,
	name: String,
	surname: String,
	/*birthday: String,//mongoose.Schema.Types.Date,
	email: String,
	login: String,
	password: String*/
});

//используем класс схемы которые предостовляет mogoosdb для описания схемы класса
mongoose.model('User',UserSchema);
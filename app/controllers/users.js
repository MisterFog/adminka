const mongoose = require('mongoose');

//require('../models/users.js');
/*const userSchema = new mongoose.Schema({
	id: Number,
	name: String,
	surname: String,
	birthday: String,//mongoose.Schema.Types.Date,
	email: String,
	login: String,
	password: String
});*/
var userSchema = new mongoose.Schema({	
	id: Number,
	name: String,
	surname: String
});
var Users = mongoose.model('Users', userSchema);

const getAll = (req,res)=>{
	Users.find()
		.exec()
		.then(users => res.json(users))
		.catch(err => res.status(500).json(err))//обработчик ошибок
};

const create = (req,res)=>{
		Users.create(req.body)
		.then(createdUsers => res.json(createdUsers))
		.catch(err => res.status(500).json(err))
		console.log(req.body);		
};

const update = (req,res)=>{
	Users.updateOne({id: req.params.id},req.body)
		.exec()
		.then(users => res.json(users))
		.catch(err => res.status(500).json(err))
		console.log(req.body);
};

const remove = (req,res)=>{
	Users.deleteOne({id:req.params.id})
		.exec()
		.then(()=> res.json({success: true}))
		.catch(err => res.status(500).json(err))
};

//экспортируем все четыре метода
module.exports = {
	getAll,
	create,
	update,
	remove,
}
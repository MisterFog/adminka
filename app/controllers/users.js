const mongoose = require('mongoose');

//эспортируем модель пользователя
const {User} = require('../models/userModel.js');

const getAll = (req,res)=>{
	User.find()
		.exec()
		.then(users => res.json(users))
		.catch(err => res.status(500).json(err))//обработчик ошибок
};

const create = (req,res)=>{
		User.create(req.body)
		.then(createdUsers => res.json(createdUsers))
		.catch(err => res.status(500).json(err))
		console.log(req.body);		
};

const update = (req,res)=>{
	User.updateOne({id: req.params.id},req.body)
		.exec()
		.then(users => res.json(users))
		.catch(err => res.status(500).json(err))
		console.log(req.body);
};

const remove = (req,res)=>{
	User.deleteOne({id:req.params.id})
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
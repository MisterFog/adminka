const mongoose = require('mongoose');

const User = mongoose.model('User');

const getAll = (req,res) =>{
	User.find()
	.exec()//чтобы не превратить результат в promis
	.then(users => req.json(users))//возвращаем из базы пользователя
	.catch(err => res.status(500).json(err));//обработчик ошибок
};

const create = (req,res)=> {
	User.create(req.body)//создание нового пользователя
	.then(crearedUsers => res.json(crearedUsers))//возврат нового пользователя
	.catch(err => res.status(500).json(err));//обработчик ошибок
};

const update = (req,res)=> {
	User.findOneAndUpdate({id: req.params.id},req.body)
	.axac()
	.then(users => req.json(users))
	.catch(err => res.status(500).json(err));//обработчик ошибок
};

const remove = (req,res)=> {
	User.deleteOne({id: req.parems.id})
	.exec()
	.then(() => res.json({success: true}))
	.catch(err => res.status(500).json(err));//обработчик ошибок
};

//экспортируем все четыре метода
module.exports = {
	getAll,
	create,
	update,
	remove,
}
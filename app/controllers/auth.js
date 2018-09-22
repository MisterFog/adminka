const mongoose = require('mongoose');
const bCrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {jwtSecret} = require('../../config/app.js');
const {User} = require('../models/userModel.js');

//Обработчик запроса на вход пользователя
const signIn = (req,res)=>{
	const {email, password} = req.body;
	//находим пользователя в базе по email
	User.findOne({email})
		.exec()
		.then((user) =>{
			//вслучие если искомого пользователя не существует, вызываем ошибку
			if(!user){
				res.status(401).json({message:'Пользователь не найден!'})
			}
		//если пользователь существует в базе
		//сравниваем закэшированные пароли
		const isValid = bCrypt.compareSync(password, user.password);
		//если пароль верный - создаём токен
		if(isValid){
			const token = jwt.sign(user._id.toString(),jwtSecret);
			//возвращаем сгенерированный токен
			res.json({token});
		}
		//если пароль сгенерирован не верно - передаём ошибку
		else{
			res.status(401).json({message:'Пароль не верный!'});
		}
	})
		//обработка остальных ошибок
		.catch(err=>res.status(500).json({message: err.message}))
};

module.exports = {
	signIn,
};

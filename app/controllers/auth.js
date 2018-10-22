const mongoose = require('mongoose');
const bCrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {secret} = require('../../config/app.js').jwt;
const {User} = require('../models/userModel.js');
const {Token} = require('../models/tokenModel.js');
const authHelper = require('../helpers/authHelper.js');

//функция которая обновляет access- & refresh-токены и отправляет их в базу mongoDB
const updateTokens = (userId) =>{	
	const accessToken = authHelper.generateAccessToken(userId);

	const refreshToken = authHelper.generateRefreshToken();

	return authHelper.replaceDbRefreshToken(refreshToken.id, userId)
		.then(() => ({
			accessToken,
			refreshToken: refreshToken.token,
		}));
};


//Обработчик запроса на вход пользователя
const signIn = (req,res)=>{
	const {email, password} = req.body;

	//находим пользователя в базе по email
	User.findOne({email})
		.exec()
		.then((user) =>{			
			//вслучие если искомого пользователя не существует, вызываем ошибку
			if(!user){
				res.status(401).json({message:'(signIn) Пользователь не найден!'})
			}
			//если пользователь существует в базе
			//сравниваем закэшированные пароли
			const isValid = bCrypt.compareSync(password, user.password);
			//console.log('Сравнение паролей: '+isValid);

			//если пароль верный - создаём токен
			if(isValid){
				updateTokens(user._id).then(tokens =>res.json(tokens));
				/*const token = jwt.sign(user._id.toString(),secret);
				res.json({token});*/
			}
			//если пароль сгенерирован не верно - передаём ошибку
			else{
				res.status(401).json({message:'(signIn) Пароль не верный!'});
			}/**/
		})
		//обработка остальных ошибок
		.catch(err=>res.status(500).json({message: err.message}));		
};

const refreshTokens = (req, res) =>{
	//дастаём токен из тела запроса
	const {refreshToken} = req.body;
	//после воледируем токен и проверяем тип
	let payload;
	try{
		payload = jwt.verify(refreshToken,secret);
		if(payload.type !== 'refresh'){
			res.status(400).json({message:'(refreshTokens) Неверный type токена!'});
			return;
		}
	}
	//добавляем обработчики:
	//-если истикло время жизни токена,
	//-токен не верного формата
	catch(e){
		if(e instanceof jwt.TokenExpiredError){
			res.status(400).json({message:'(refreshTokens) Время жизни токена истекло!'});
			return;
		}else if (e instanceof jwt.JsonWebTokenError){
			res.status(400).json({message:'(refreshTokens) Неверный формат токена!'});
			return;
		}
	}

	Token.findOne({tokenId: payload.id})
		.exec()
		.then((token)=>{
			if(token===null){
				throw new Error('(refreshTokens) Неверный токен!');
			}
			return updateTokens(token.userId);
		})
		.then(tokens => res.json(tokens))
		.catch(err => res.status(400).json({message: err.message}));
};/**/

const exp = (req,res)=>{
	var {email} = req.body;// == req.body.email	
	
	User.findOne({email: email})
		.exec()
		.then(users => res.json(users))
		.catch(err => res.status(500).json(err))
		.then(console.log(email))			
};

module.exports = {
	signIn,
	refreshTokens,
	updateTokens,
	exp,
};

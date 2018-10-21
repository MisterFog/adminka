const jwt = require('jsonwebtoken');
const {secret, tokens} = require('../../config/app.js').jwt;
const uuid = require('uuid/v4');
const mongoose = require('mongoose');
const {Token} = require('../models/tokenModel.js');

//метод для генерации access-токена
const generateAccessToken = (userId) =>{
	//создаём объект payload, кторый будем ложить внутрь токена
	const payload = {
		userId,
		type: tokens.access.type,
	};
	const options = {expiresIn: tokens.access.expiresIn};

	//возвращаем функцию sign, каторая возвращает готовый токен
	return jwt.sign(payload, secret, options);
};

//метод для генерации refresh-токена
const generateRefreshToken = () =>{
	const payload = {
		id: uuid(),
		type: tokens.refresh.type,
	};
	const options = {expiresIn: tokens.refresh.expiresIn};

	return{
		id: payload.id,
		token: jwt.sign(payload, secret, options),
	};
};

//метод перезаписи refresh-токена в базе
const replaceDbRefreshToken =(tokenId,UserId) =>
	//каждый refresh-токен пирвязан к пользователю
	//поэтому находим refresh-токен по userId и удаляем,
	//после удаления сразу создаём новый
	Token.findOneAndRemove({userId})
		.exec()
		.then(() => Token.create({tokenId,userId}));

//экспортируем методы
module.exports = {
	generateAccessToken,
	generateRefreshToken,
	replaceDbRefreshToken,
};
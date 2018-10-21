const jwt = require('jsonwebtoken');
const {secret} = require('../../config/app.js').jwt;

module.exports = (req,res,next)=>{
	const authHeader = req.get('Authorization');
	if(!authHeader){
		res.status(401).json({message:'Токен отсутствует!'});
		return;
	}

	const token = authHeader.replace('Bearer ','');
	try{
		const payload = jwt.verify(token,secret);
		if (payload.type !== 'access'){
			res.status(401).json({message:'Не верный токен!'});
			return;
		}
	}catch(e){
		if (e instanceof jwt.TokenExpiredError){
			res.status(401).json({message:'Время жизни токена истекло!'});
			return;
		}
		if(e instanceof jwt.JsonWebTokenError){
			res.status(401).json({message:'Не верный токен!'});
			return;
		}
	}

	//передача эстафеты следующему в цепочки middelware
	//а если нет, то обработчику запросса
	next();
};
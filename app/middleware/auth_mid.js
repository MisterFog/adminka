//фун-я кот-я вызывается перед основным обработчиком роута
//отвечает за доступ авториз-х польз-й к чему либоы
const jwt = require('jsonwebtoken');//для валидации токена
const {secret} = require('../../config/app.js').jwt;//секретный ключь

//экспортируем middleware в виде функции 
module.exports = (req,res,next)=>{//в качестве параметров получаем объекты: запроса,ответа и next-используется для передачи управление следующему middleware или обработчику запроса
	//получаем header  с авторизацией
	const authHeader = req.get('Authorization');
	if(!authHeader){
		res.status(401).json({message:'Токен отсутствует!'});
		//return;
	}

	//дастаём из header токен и валидируем его
	const token = authHeader.replace('Bearer ','');
	/*try{
		const payload = jwt.verify(token,secret);//verify-кидает exeption если токен не валидный
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
	}*/
	try{
		jwt.verify(token,secret);
	}catch(e){
		if(e instanceof jwt.JsonWebTokenError){
			res.status(401).json({message:'Не верный токен!'});
		}
	}

	//передача эстафеты следующему в цепочки middelware
	//а если нет, то обработчику запросса
	next();
};
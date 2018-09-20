//импортируем покет express в наш файл
const express = require('express');
// express-это функция запустим её присвоев ей результат своей собственной переменной
const app = express();

//подключаем bodyParser
require('./config/express.js')(app);
/*const bodyParser = require('body-parser');
app.use(bodyParser.json());*/

//Подключаем файл с routes
require('./config/routes.js')(app);

const mongoose = require('mongoose');
//подключаем модель пользователя
//require('./app/models/users.js');

//импортируем из файла port и urldb
const config = require('./config/app.js');
//const port = 3000;
//const urldb = 'mongodb://localhost:27017/test';

//подключаем базу данных
mongoose.connect(config.urldb)    
	.then(() => app.listen(config.port,()=>console.log('Listening on port: '+config.port)))
	.catch(err => console.error('Error connecting to mongo: '+config.urldb, err))
	//catch-выдаёт ошибку подключение я консоли
//вызываем метод listen, которому передаём номер порта и colbeack(ответ при успешном подключении)
//app.listen(config.port,()=>console.log('Listening on port '+config.port));

//используем класс схемы которые предостовляет mogoosdb для описания схемы класса
/*const Users = mongoose.model('Users',{
	id: Number,
	name: String,
	surname: String,
	birthday: String,//mongoose.Schema.Types.Date,
	email: String,
	login: String,
	password: String
});*/

/*var userSchema = new mongoose.Schema({	
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

app.get('/test.users',getAll);
app.post('/test.users',create);
app.put('/test.users/:id',update);
app.delete('/test.users/:id',remove);*/
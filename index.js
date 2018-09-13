//импортируем покет express в наш файл
const express = require('express');
// express-это функция запустим её присвоев ей результат своей собственной переменной
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const mongoose = require('mongoose');

const port = 3000;
const urldb = 'mongodb://localhost:27017/test';
const appdb = {port,urldb};

//подключаем базу данных
mongoose.connect(urldb);

//используем класс схемы которые предостовляет mogoosdb для описания схемы класса
const Users = mongoose.model('Users',{
	id: Number,
	name: String,
	surname: String,
	/*birthday: String,//mongoose.Schema.Types.Date,
	email: String,
	login: String,
	password: String*/
});

app.get(
	'/test.users',
	(req,res)=>Users.find()
		.exec()
		.then(users => res.json(users)),
	);
app.post(
	'/test.users',
	(req,res)=>{
		Users.create(req.body)
		.then(createdUsers => res.json(createdUsers));
		console.log(req.body);		
	});
app.put(
	'/test.users/:id',
	(req,res)=>{
	Users.updateOne({id: req.params.id},req.body)
		.exec()
		.then(users => res.json(users));
		console.log(req.body);
	});
app.delete(
	'/test.users/:id',
	(req,res)=>Users.deleteOne({id:req.params.id})
		.exec()
		.then(()=> res.json({success: true})),	
	);/**/

app.listen(port,()=>console.log('Listening on port '+port));

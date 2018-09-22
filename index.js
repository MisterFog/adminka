//импортируем покет express в наш файл
const express = require('express');
// express-это функция запустим её присвоев ей результат своей собственной переменной
const app = express();

//подключаем bodyParser
require('./config/express.js')(app);

//Подключаем файл с routes
require('./config/routes.js')(app);

const mongoose = require('mongoose');

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


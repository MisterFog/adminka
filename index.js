//импортируем покет express в наш файл
const express = require('express');
// express-функцию запустим присвоев ей результат своей собственной переменной
const app = express();

//сообщаем Node где лежат ресурсы сайта
app.use(express.static(__dirname + '/public'));

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
	//catch-выдаёт ошибку подключение в консоли
	//вызываем метод listen, которому передаём номер порта и colbeack(ответ при успешном подключении)
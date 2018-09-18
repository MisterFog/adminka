//файл конфигурации сервера
//импортируем покет body-parser в наш файл
const bodyParser = require('body-parser');
//эксплртируем функцию т.к нужен доступ к объекту app
module.exports = (app) => {
	//чтобы использовать parser json в приложении при помощи функци use
	app.use(bodyParser.json());//bodyParser.json()-означает , что мы используем json как формат передачи даных
};
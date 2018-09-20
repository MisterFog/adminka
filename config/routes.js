const users = require('../app/controllers/users.js');

var sms = console.log("Привет от директории с роутами!");

module.exports = (app) => {
	app.get('/test.users',users.getAll);
	app.post('/test.users',users.create);
	app.put('/test.users/:id',users.update);
	app.delete('/test.users/:id',users.remove);
};

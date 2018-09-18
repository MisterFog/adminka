const users = require('../app/controllers/users.js');

module.exports = (app) => {
	app.get('/users',users.getAll);
	app.post('/users',users.create);
	app.put('/users/:id',users.update);
	app.delete('/users/:id',users.remove);
};
const user = require('../app/controllers/users.js');
const auth = require('../app/controllers/auth.js');
const view = require('../app/controllers/view.js');
const authMiddelware = require('../app/middleware/auth_mid.js');

module.exports = (app) => {
	// users	
	app.get('/test.users',authMiddelware,user.getAll);
	app.post('/test.users',authMiddelware,user.create);
	app.put('/test.users/:id',authMiddelware,user.update);
	app.delete('/test.users/:id',authMiddelware,user.remove);

	// auth	
	app.post('/signin',auth.signIn);
	app.post('/refresh-tokens',auth.refreshTokens);
	app.post('/exp',auth.exp);	

	// создаём маршрут для главной страницы - http://localhost:3000/
	app.get('/', function(req, res){
		res.sendfile('start.html');
	});

	//view
	app.get('/registration',view.registration);
	/*app.get('/registration', function(req, res){
		res.sendfile('registration.html');
	});*/
};

const user = require('../app/controllers/users.js');
const auth = require('../app/controllers/auth.js');
const authMiddelware = require('../app/middleware/auth_mid.js');

module.exports = (app) => {
	// users
	app.get('/test.users',authMiddelware,user.getAll);
	app.post('/test.users',authMiddelware,user.create);
	app.put('/test.users/:id',authMiddelware,user.update);
	app.delete('/test.users/:id',authMiddelware,user.remove);

	// auth
	app.post('/signin',auth.signIn);
};

const user = require('../app/controllers/users.js');
const auth = require('../app/controllers/auth.js');
const authMiddelware = require('../app/middleware/auth_mid.js');

module.exports = (app) => {
	// users	
	app.get('/test.users',user.getAll);
	app.post('/test.users',user.create);
	app.put('/test.users/:id',authMiddelware,user.update);
	app.delete('/test.users/:id',authMiddelware,user.remove);

	// auth	
	app.post('/signin',auth.signIn);
	app.post('/refresh-tokens',auth.refreshTokens);
	app.post('/exp',auth.exp);
};

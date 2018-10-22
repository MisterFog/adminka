//Здесь находятся глобальные константы приложения
module.exports = {
	port: 3000,
	urldb: 'mongodb://localhost:27017/test',
	jwt:{
		secret:'not everyone can enter',
		tokens:{
			access:{
				type:'access',
				expiresIn:'1m',//время жизни access-токена
			},
			refresh:{
				type:'refresh',
				expiresIn:'2m',//время жизни refresh-токена
			},
		},
	},
}; 
const mongoose = require('mongoose');

const registration = (req,res)=>{
	res.sendfile('registration.html');
};

module.exports = {
	registration,
};
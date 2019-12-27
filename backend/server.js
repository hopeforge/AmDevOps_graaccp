const http = require('http');
const app = require('./app');
const mongoose = require('mongoose');
require('dotenv').config();

const port = process.env.PORT || '3000';

mongoose
	.connect(
		// `mongodb://${process.env.HOST}:27018/clube_amigo_graacc`,
		`mongodb://localhost:27017/clube_amigo_graacc`,
		{
			useNewUrlParser: true,
			useCreateIndex: true,
			useNewUrlParser: true,
			useUnifiedTopology: true,
			reconnectInterval: 5000,
			reconnectTries: 60
		}
	)
	.then(() => console.log('MongoDB Connected'))
	.catch(err => console.log(err));

const server = http.createServer(app);

server.listen(port, (err) => {
	if (err) {
		if (error.syscall !== 'listen') {
			throw error;
		}

		var bind = typeof port === 'string' ?
			'Pipe ' + port :
			'Port ' + port;

		// handle specific listen errors with friendly messages
		switch (error.code) {
			case 'EACCES':
				console.error(bind + ' requires elevated privileges');
				process.exit(1);
				break;
			case 'EADDRINUSE':
				console.error(bind + ' is already in use');
				process.exit(1);
				break;
			default:
				throw error;
		}
	}
	console.log('Server is running on port ' + port);
})
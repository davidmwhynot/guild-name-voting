console.log('top');
// import
const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const Vote = require('./Vote');

// config
const app = express();
const uri = `mongodb+srv://${
	process.env.GNAMEVOTING_DB_LOGIN
}.mongodb.net/test?retryWrites=true&w=majority`;

app.use(bodyParser.json());

// db connect
mongoose.connect(uri, { useNewUrlParser: true });

const router = express.Router();

console.log('app start');

router.get('/test', (req, res) => {
	console.log('req', req.body);
	res.send('hello');
});

router.get('/redirect', (req, res) => {
	console.log('req', req.body);
	res.set('Location', 'https://google.com');
	res.statusCode(301);
	res.end();
});

app.use('./netlify/functions/server', router);

// export
module.exports.handler = serverless(app);

/*




// request handler
exports.handler = async function(event, context) {
	try {
		// const req = JSON.parse(event.body);
		// console.log('req');
		// console.log(req);

		// console.log('Vote', Vote);
		const votes = await Vote.find({});
		console.log(votes);

		const res = [];
		for (const vote of votes) {
			res.push(vote.vote);
		}

		return {
			statusCode: 200,
			body: JSON.stringify({ votes: res })
		};
	} catch (err) {
		console.error(err);
		return {
			statusCode: 200,
			body: JSON.stringify({ error: err.message })
		};
	}
};
*/

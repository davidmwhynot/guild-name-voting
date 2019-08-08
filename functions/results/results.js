// import
const mongoose = require('mongoose');
const Vote = require('./Vote');

// config
const uri = `mongodb+srv://${
	process.env.GNAMEVOTING_DB_LOGIN
}.mongodb.net/test?retryWrites=true&w=majority`;

// connect
mongoose.connect(uri, { useNewUrlParser: true });

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

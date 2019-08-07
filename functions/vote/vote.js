// import
const mongoose = require('mongoose');
const mailer = require('@sendgrid/mail');
const { get } = require('axios');
const { google } = require('googleapis');
// const { escape, isEmail, normalizeEmail } = require('validator');
// const { inspect } = require('util');

// // generate a url that asks permissions for Blogger and Google Calendar scopes
// const scopes = ['email'];
// // const scopes = ['https://www.googleapis.com/auth/profile'];

// const url = oauth2Client.generateAuthUrl({
// 	// 'online' (default) or 'offline' (gets refresh_token)
// 	access_type: 'offline',

// 	// If you only need one scope you can pass it as a string
// 	scope: scopes
// });

// console.log(url);

// config
const oauth2Client = new google.auth.OAuth2(
	process.env.GNAMEVOTING_GOOGLE_CLIENTID,
	process.env.GNAMEVOTING_GOOGLE_CLIENTSECRET,
	process.env.GNAMEVOTING_GOOGLE_CALLBACKURL
);
const Schema = mongoose.Schema;
const uri = `mongodb+srv://${
	process.env.GNAMEVOTING_DB_LOGIN
}.mongodb.net/test?retryWrites=true&w=majority`;
console.log('uri', uri);
mailer.setApiKey(process.env.GNAMEVOTING_SENDGRID_KEY);

// connect
mongoose.connect(uri, { useNewUrlParser: true });

// message model
const voteSchema = new Schema({
	id: {
		type: String,
		required: true,
		trim: true
	},
	ip: {
		type: String,
		required: true,
		trim: true
	},
	vote: {
		type: [String],
		required: true
	},
	time: { type: Date, default: Date.now }
});
const Vote = mongoose.model('Vote', voteSchema);

// request handler
exports.handler = async function(event, context) {
	console.log(
		'event.headers["x-forwarded-for"]',
		event.headers['x-forwarded-for']
	);
	try {
		const req = JSON.parse(event.body);
		console.log('req');
		console.log(req);

		const { tokens } = await oauth2Client.getToken(req.code);
		console.log('tokens', tokens);
		console.log(oauth2Client);
		oauth2Client.setCredentials(tokens);

		const res = await get(
			'https://www.googleapis.com/oauth2/v2/userinfo?alt=json&oauth_token=' +
				tokens.access_token
		);
		console.log('res.data', res.data);
		const { id } = res.data;

		const query1 = Vote.where({ id });
		const vote1 = await query1.findOne();

		const query2 = Vote.where({ ip: event.headers['x-forwarded-for'] });
		const vote2 = await query2.findOne();

		console.log('vote1', vote1);
		console.log('vote2', vote2);
		if (vote1 !== null || vote2 !== null) {
			return {
				statusCode: 200,
				body: JSON.stringify({ error: 'You may only vote once.' })
			};
		} else {
			const newVote = new Vote({
				id,
				ip: event.headers['x-forwarded-for'],
				vote: req.selected
			});

			const savedVote = await newVote.save();

			console.log('savedVote', savedVote);

			const mail = {
				from: 'noreply@davidwhynot.com',
				to: 'davidmwhynot@gmail.com',
				subject: 'New Vote',
				html: `<h1>New Vote</h1>
<h3><b>newVote:</b></h3>
<p>${newVote}</p>
<br /><br />
<h3><b>savedVote:</b></h3>
<p>${JSON.stringify(savedVote, null, 4)}</p>`
			};

			await mailer.send(mail);

			return { statusCode: 200, body: JSON.stringify({ success: true }) };
		}
	} catch (err) {
		console.error(err);
		return { statusCode: 200, body: JSON.stringify({ error: err.message }) };
	}
};

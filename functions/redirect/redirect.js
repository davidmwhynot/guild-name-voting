exports.handler = async (event, context) => {
	console.log('event.body', event.body);

	// res
	return {
		statusCode: 301,
		headers: {
			Location: 'https://google.com'
		},
		body: ''
	};
};

const whitelist = ['https://feel.co.il'];

if (process.env.NODE_ENV === 'development') {
	whitelist.push('http://localhost:3000');
}

const corsConfig = {
	origin(origin, callback) {
		if (!whitelist.includes(origin))
			return callback(new Error('Not allowed by CORS'));
		return callback(null, true);
	}
};

export { corsConfig };

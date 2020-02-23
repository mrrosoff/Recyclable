const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require('express');

const app = express();
let credentials, httpsServer;
let secure = false;

try {
	const privateKey = fs.readFileSync('/home/Ben/cert/privkey.pem', 'utf8');
	const certificate = fs.readFileSync('/home/Ben/cert/cert.pem', 'utf8');
	const ca = fs.readFileSync('/home/Ben/cert/chain.pem', 'utf8');
	credentials = {
		key: privateKey,
		cert: certificate,
		ca: ca
	};
	secure = true;
}
catch(e) {}



require('./routes')(app);

const httpServer = http.createServer(app);
if (secure) {
	httpsServer = https.createServer(credentials, app);
}

// set up a route to redirect http to https
app.use((req, res, next) => {
	if (!req.secure && secure) {
		console.log('Redirecting insecure request');
		res.redirect('https://' + req.headers.host + req.url);
	}
	next();
});

app.use(express.static('dist'));

httpServer.listen(8080, () => {
	console.log('HTTP Server running on port 8080');
});

if (secure) {
	httpsServer.listen(8443, () =>
	{
		console.log('HTTPS Server running on port 8443');
	});
}
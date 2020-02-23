// Dependencies
const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require('express');

const app = express();

// Certificate
const privateKey = fs.readFileSync('/etc/letsencrypt/live/recyclable.tech/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/recyclable.tech/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/recyclable.tech/chain.pem', 'utf8');

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};

app.use((req, res) => {
	res.send('Hello there !');
});

// Starting both http & https servers
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

// set up a route to redirect http to https
httpServer.get('*', function(req, res) {
	res.redirect('https://' + req.headers.host + req.url);
});

httpServer.listen(8080, () => {
	console.log('HTTP Server running on port 8080');
});

httpsServer.listen(8443, () => {
	console.log('HTTPS Server running on port 8443');
});
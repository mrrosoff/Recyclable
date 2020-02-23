const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require('express');
const bodyParser = require('body-parser');

import classifyProduct from "./recyclableClassification";

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

app.use(bodyParser.urlencoded({ extended: true }));

const httpServer = http.createServer(app);
if (secure) {
	httpsServer = https.createServer(credentials, app);
}

// set up a route to redirect http to https
app.use((req, res, next) => {

	if (!req.secure && secure) {
		console.log('Redirecting insecure request');
		res.redirect('https://' + req.headers.host + req.url);
	} else {
		next();
	}
});

app.use(express.static('dist'));

app.post('/api/getProductType', (req, res) => predict(req.body["dataUri"]).then(r => res.send(classifyProduct(r))).catch(err => console.log(err)));

httpServer.listen(8080, () => console.log('HTTP Server Running on Port 8080'));

if (secure) {
	httpsServer.listen(8443, () => console.log('HTTPS Server Running on Port 8443'));
}


async function predict(filePath) {

	const projectId = 'recycle-269021';
	const location = 'us-central1';
	const modelId = 'Recycle_20200222065319';

	// Imports the Google Cloud AutoML library
	const {PredictionServiceClient} = require(`@google-cloud/automl`).v1;
	const fs = require(`fs`);

	// Instantiates a client
	const client = new PredictionServiceClient();

	// Construct request
	// params is additional domain-specific parameters.
	// score_threshold is used to filter the result
	const request = {
		name: client.modelPath(projectId, location, modelId),
		payload: {
			image: {
				imageBytes: filePath,
			},
		},
	};

	const [response] = await client.predict(request);

	for (const annotationPayload of response.payload) {
		console.log(`Predicted class name: ${annotationPayload.displayName}`);
		console.log(`Predicted class score: ${annotationPayload.classification.score}`);
	}
}

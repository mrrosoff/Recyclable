const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const classifyProduct = require("./recyclableClassification.js");

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

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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

app.post('/api/getProductType', (req, res) => predict(req.body.body["dataUri"]).then(r => res.send(classifyProduct(r))).catch(err => console.log(err)));

httpServer.listen(8080, () => console.log('HTTP Server Running on Port 8080'));

if (secure) { httpsServer.listen(8443, () => console.log('HTTPS Server Running on Port 8443')); }


async function predict(image) {
	const projectId = 'recycle-269021';
	const location = 'us-central1';
	const modelId = 'ICN3765902091923488768';

	// Imports the Google Cloud AutoML library
	const {PredictionServiceClient} = require(`@google-cloud/automl`).v1;

	// Instantiates a client
	const client = new PredictionServiceClient();

	// Construct request
	// params is additional domain-specific parameters.
	// score_threshold is used to filter the result
	let base64Data = image.replace(/^data:image\/jpeg;base64,/, "");
	//console.log(base64Data);
	let data = Buffer.from(base64Data, 'base64');
	//console.log(data.toString());
	const request = {
		name: client.modelPath(projectId, location, modelId),
		payload: {
			image: {
				imageBytes: data.toString('base64')
			}
		}
	};

	const [response] = await client.predict(request);
	// for (const annotationPayload of response.payload) {
	// 	console.log(`Predicted class name: ${annotationPayload.displayName}`);
	// 	console.log(`Predicted class score: ${annotationPayload.classification.score}`);
	// }
	return response.payload;
}

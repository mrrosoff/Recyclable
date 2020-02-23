const express = require('express');
const app = express();
const port = 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// require('./routes')(index);

app.use('/', express.static('./dist', {index: "index.html"}));

app.listen(port, (err) => {
	if(err) { console.log(err) }
	console.log('Listening on port ' + port);
});






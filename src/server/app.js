import express from 'express';

const app = express();

app.use(express.static(`${__dirname}/static`));

app.get('/', (req, res) => {
	res.sendFile('/index.html', {
		root: `${__dirname}/static`,
		headers: {
			'Content-Type': 'text/html'
		}}, err => {
		if( err ) res.status(err.status).end(err.message || '');
	})
});

app.listen(8080);
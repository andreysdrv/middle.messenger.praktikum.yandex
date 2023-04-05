const express = require('express');
const fallback = require('express-history-api-fallback');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.static('dist'));
app.use(fallback('index.html', { root: './dist' }));

app.listen(PORT);

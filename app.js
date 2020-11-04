const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const  sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./db.sqlite');

const PORT = process.env.PORT || 4001;

app.use(bodyParser.json());
app.use(cors());

app.use('/api', require('./index.js'));

app.listen(PORT, () => {
    console.log('Listening on port ' + PORT);
});
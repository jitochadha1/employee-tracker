const express = require('express');
const connection = require('./db/connect');
const PORT = process.env.PORT || 3001;
const app = express();

/*connection.query('SELECT * from department', function (err, results, fields) {
    console.log(results);
});*/

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
    connection.query('SELECT * from department', function (err, results, fields) {
        console.log(err, results, fields);
        res.json(results);
    });
});

app.listen(PORT, () => console.log(`Listening to port ${PORT}`));
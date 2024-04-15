const express = require('express');
const mysql = require('mysql');

const app = express();

app.use(express.json());


const port = 3000;

// Create a MySQL connection pool
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '4unIver$e2',
    database: 'tines',
});

// Connect to the MySQL server
connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL server');
});

// Define a route to handle the POST request containing JSON data
app.post('/data', (req, res) => {
    const { name, description } = req.body;
    const data = { name, description };

    const query = connection.query('INSERT INTO things SET ?', data, (err, result) => {
        if (err) throw err;
        console.log('Data inserted into MySQL table');
        res.send('Data inserted into MySQL table');
    });

    console.log(query.sql);
});


// Start the server
app.listen(port, () => {
    console.log(`Server started on port ${ port }`);
});
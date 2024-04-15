const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'tines_user',
    password: '!tines123Pw',
    database: 'tines',
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL server');
});


app.use(express.json());

app.post('/data', (req, res) => {
    const { name, description } = req.body;
    const data = { name, description };

    const query = connection.query('INSERT INTO things SET ?', data, (err, result) => {
        if (err) throw err;
        console.log('Success');
        res.send('Data inserted into table');
    });
    
    console.log(query.sql);
});


// Start the server
app.listen(port, () => {
    console.log(`Server started on port ${ port }`);
});

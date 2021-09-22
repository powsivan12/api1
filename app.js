const express = require('express');
const mysql = require('mysql');
const myConnection = require('express-myconnection');

const bodyParser = require('body-parser');
const connection = require('express-myconnection');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json);

//mysql
app.use(myConnection(mysql, {
    host: 'db4free.net',
    user: 'powsivan',
    password: 'Bitchnigga12',
    port: 3306,
    database: 'jagcon'
}, 'single'));

/*const connection = mysql.createConnection({
    host: 'db4free.net',
    user: 'powsivan',
    password: 'Bitchnigga12',
    database: 'jagcon'
});*/

//route
app.get('/', (req, res) => {
    res.send('Welcom to my API!')
});


//all customers
app.get('/customers', (req, res) => {
    const sql = 'SELECT * FROM customers';

    connection.query(sql, (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            res.json(results);
        } else {
            res.send('No results');
        }
    });
});

app.get('/customers/:id', (req, res) => {
    const {
        id
    } = req.params
    const sql = `SELECT *FROM cunstomers WHERE id = ${id}`;
    connection.query(sql, (error, result) => {
        if (error) throw error;
        if (result.length > 0) {
            res.json(result);
        } else {
            res.send('No result');
        }
    });

});

app.post('/add', (req, res) => {
    const sql = 'INSERT INTO customer SET ?'

    const customerObj = {
        name: req.body.name,
        city: req.body.city
    }

    connection.query(sql, customerObj, error => {
        if (error) throw error;
        res.send('Customer created!');
    });
});

app.put('/update/:id', (req, res) => {
    const {
        id
    } = req.params;
    const {
        name,
        city
    } = req.body;
    const sql = `UPDATE customers SET name= '${name}', 'city=${city}' WHERE 
id =${id}`;

    connection.query(sql, error => {
        if (error) throw error;
        res.send('Customer update!');
    });
});

app.delete('/delete/id:', (req, res) => {
    const {
        id
    } = req.params;
    const sql = `DELET FROM  customers WHERE id= ${id} `;

    connection.query(sql, error => {
        if (error) throw error;
        res.send('Delete customer');
    });
});

// check connect

/*connection.connect(error => {
    if(error) throw error;
    console.log('Database server running!');
});*/

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
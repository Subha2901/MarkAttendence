// const express = require('express');
// const cors = require('cors');
// const mysql = require('mysql');


// const app = express();
// app.use(express.json())
// app.use(cors())

// const db = mysql.createConnection({
//     host: 'localhost',
//     database: 'userschema',
//     user: 'root',
//     password: 'Subha2901@'
// })


// app.get('/', (req, res) => {
//     res.send('Hii')
// })


// app.post('/login', (req, res) => {
//     console.log(req.body)
//     console.log(req.body.email);
//     console.log(req.body.password);

//     const sql = "SELECT * FROM USER WHERE IDUSER= ? AND PASSWORD = ?";
//     const values = [
//         req.body.email,
//         req.body.password
//     ]

//     db.connect((err) => {
//         if (err) console.log(err);
//         console.log("connected");
//     })

//     db.query(sql, [req.body.email, req.body.password], (err, data) => {
//         if (err) console.log(err)
//         else {
//             console.log('Login Successful')
//             console.log(data);

//             if(data.length > 0)    return res.status(200).json(data)
//             else return res.status(500)
//         }
//     })

// })

// app.post('/logout', (req,res) => {
//     db.end((err) => {console.log(err)})
// })


// app.listen(4000, () => { console.log('Listening...') })



const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
app.use(express.json());
app.use(cors());

// Database configuration
const dbConfig = {
    connectionLimit: 10, // Maximum number of connections in the pool
    host: 'localhost',
    database: 'userschema',
    user: 'root',
    password: 'Subha2901@'
};

// Create connection pool
const pool = mysql.createPool(dbConfig);

app.get('/', (req, res) => {
    res.send('Hello');
});

app.post('/login', (req, res) => {
    console.log(req.body);

    const { email, password } = req.body;

    console.log('Email -> ', email);
    console.log('Password-> ', password);

    const sql = "SELECT IDUSER, NAME FROM USER WHERE IDUSER= ? AND PASSWORD = ?";
    const dateFetch = "SELECT DATE, START_TIME, END_TIME FROM ATTENDENCE_TABLE WHERE USERID = ?";
    const values = [email, password];

    // Get connection from the pool
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting MySQL connection from pool:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        console.log("Connected to MySQL");

        // Execute the query
        connection.query(sql, values, (err, data) => {
            connection.release(); // Release the connection back to the pool

            if (err) {
                console.error('Error querying MySQL:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            console.log('Login Successful');
            console.log(data);

            if (data.length > 0) {
                connection.query(dateFetch, email, (err, dateDetails) => {
                    if (err) {
                        console.error('Error querying MYSQL for fetching the attendence dates:', err);
                        return res.status(500).json({ error: 'Internal server error to fetch the dates' });
                    } else {
                        console.log(dateDetails);
                        return res.status(200).json({ dateDetails: dateDetails, data: data });
                    }
                });
            } else {
                return res.status(500).json({ error: 'Invalid credentials' });
            }
        });
    });
});

app.post('/signup', (req, res) => {
    console.log(req.body);
    console.log(req.body.email);
    console.log(req.body.password);
    console.log(req.body.name);

    const sql = "INSERT INTO USER (IDUSER, PASSWORD, NAME) VALUES (?,?,?)";
    const values = [req.body.email, req.body.password, req.body.name];

    // Get connection from the pool
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting MySQL connection from pool:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        console.log("Connected to MySQL");

        // Execute the query
        connection.query(sql, values, (err, result) => {
            connection.release(); // Release the connection back to the pool

            if (err) {
                console.error('Error querying MySQL:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            console.log('Insertion Successful');
            console.log(result);

            return res.status(200).json({ message: 'User created successfully' });
        });
    });
});


app.post('/attendence', (req, res) => {
    console.log(req.body);
    console.log(req.body.email);
    console.log(req.body.value);
    console.log(req.body.timeRange);

    const { email, value, timeRange } = req.body;

    let inputs = [];

    for (let i = 0; i < req.body.value.length; i++) {
        inputs.push([email, value[i].substr(0, 8) + (parseInt(value[i].substr(8, 2)) + 1), timeRange[i][0], timeRange[i][1]]);
    }
    const sql = "INSERT INTO attendence_TABLE (USERID, DATE, START_TIME, END_TIME) VALUES ?";

    // Get connection from the pool
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting MySQL connection from pool:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        console.log("Connected to MySQL");

        // Execute the query
        connection.query(sql, [inputs], (err, result) => {
            connection.release(); // Release the connection back to the pool

            if (err) {
                console.error('Error querying MySQL:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            console.log('Insertion Successful');
            console.log(result);

            return res.status(200).json({ message: 'Attendence recorded successfully' });
        });
    });
});



app.listen(4000, () => {
    console.log('Listening on port 4000...');
});

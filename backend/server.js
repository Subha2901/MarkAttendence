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
    host: 'localhost',
    database: 'userschema',
    user: 'root',
    password: 'Subha2901@'
};

app.get('/', (req, res) => {
    res.send('Hello');
});

app.post('/login', (req, res) => {
    console.log(req.body);
    console.log(req.body.email);
    console.log(req.body.password);

    const sql = "SELECT IDUSER, NAME FROM USER WHERE IDUSER= ? AND PASSWORD = ?";
    const dateFetch = "select date from attendence_table where userid = ?"
    const values = [req.body.email, req.body.password];

    // Create a new connection
    const db = mysql.createConnection(dbConfig);

    db.connect((err) => {
        if (err) {
            console.error('Error connecting to MySQL:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        console.log("Connected to MySQL");

        // Execute the query
        db.query(sql, values, (err, data) => {
            

            if (err) {
                console.error('Error querying MySQL:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            console.log('Login Successful');
            console.log(data);

            if (data.length > 0) {
                db.query(dateFetch, req.body.email, (err,dateDetails) => {
                    db.end(); // Close the connection after executing the query
                    if(err){
                        console.error('Error querying MYSQL for fetching the atendence dates:', err);
                        return res.status(500).json({error: 'Internal server error to fetch the dates'})
                    }

                    else{
                        return res.status(200).json({dateDetails: dateDetails, data: data})
                    }
                })
                // return res.status(200).json(data);
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

    // Create a new connection
    const db = mysql.createConnection(dbConfig);

    db.connect((err) => {
        if (err) {
            console.error('Error connecting to MySQL:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        console.log("Connected to MySQL");

        // Execute the query
        db.query(sql, values, (err, result) => {
            db.end(); // Close the connection after executing the query

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

    const {email, value, timeRange} = req.body

    // const dates = req.body.value.map(date => [req.body.email, date.substr(0, 10)]);
    let inputs = []

    for (let i = 0; i < req.body.value.length; i++) {
        inputs.push([email, value[i].substr(0,8) + (parseInt(value[i].substr(8,2))+1), timeRange[i][0], timeRange[0][1]])
        
    }
    const sql = "INSERT INTO attendence_TABLE (USERID, DATE, START_TIME, END_TIME) VALUES ?";

    // Create a new connection
    const db = mysql.createConnection(dbConfig);

    db.connect((err) => {
        if (err) {
            console.error('Error connecting to MySQL:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        console.log("Connected to MySQL");

        // Execute the query
        db.query(sql, [inputs], (err, result) => {
            db.end(); // Close the connection after executing the query

            if (err) {
                console.error('Error querying MySQL:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            console.log('Insertion Successful');
            console.log(result);

            return res.status(200).json({ message: 'attendence recorded successfully' });
        });
    });
});


app.listen(4000, () => {
    console.log('Listening on port 4000...');
});

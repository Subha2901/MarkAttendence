const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const nodemailer = require("nodemailer");

const app = express();
app.use(express.json());
app.use(cors());

let OTP;

function generateOTP() {
  // Generate a random 6-digit number
  const otp = Math.floor(100000 + Math.random() * 900000);
  return otp;
}

function sendMail(email){
  OTP = generateOTP();
      const HTMLContent = `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;"><h2 style="color: #333;">OTP to verify Email for MarkYourAttencence</h2><p style="font-size: 16px;">Your OTP (One-Time Password) for verification is:</p><h1 style="font-size: 36px; color: #007bff; margin-bottom: 20px;">${OTP}</h1><p style="font-size: 14px; color: #666;">This OTP is valid for a single use and should not be shared with anyone.</p><p style="font-size: 14px; color: #666;">If you did not request this OTP, please ignore this email.</p></div>`;

      let mailOptions = {
        from: "mahajansubha610@gmail.com",
        to: email,
        subject: `Email Verfication Code -> ${OTP}`,
        html: HTMLContent,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          return '404'
        } else {
          console.log("Email sent: " + info.response);
          return '250'
        }
      });
}

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // use SSL
  auth: {
    user: process.env.SenderEMail,
    pass: process.env.SenderEmailPass
  },
});

// Database configuration
const dbConfig = {
  connectionLimit: 10, // Maximum number of connections in the pool
  host: "localhost",
  database: "userschema",
  user: "root",
  password: "Subha2901@",
};

// Create connection pool
const pool = mysql.createPool(dbConfig);

app.get("/", (req, res) => {
  res.send("Hello");
});

app.post("/login", (req, res) => {
  //   console.log(req.body);

  const { email, password } = req.body;

  console.log("Email -> ", email);
  console.log("Password-> ", password);

  const sql = "SELECT IDUSER, NAME FROM USER WHERE IDUSER= ? AND PASSWORD = ?";
  const dateFetch =
    "SELECT DATE, START_TIME, END_TIME FROM ATTENDENCE_TABLE WHERE USERID = ?";
  const values = [email, password];

  // Get connection from the pool
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error getting MySQL connection from pool:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    console.log("Connected to MySQL");

    // Execute the query
    connection.query(sql, values, (err, data) => {
      connection.release(); // Release the connection back to the pool

      if (err) {
        console.error("Error querying MySQL:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      console.log("Login Successful");
      console.log(data);

      if (data.length > 0) {
        connection.query(dateFetch, email, (err, dateDetails) => {
          if (err) {
            console.error(
              "Error querying MYSQL for fetching the attendence dates:",
              err
            );
            return res
              .status(500)
              .json({ error: "Internal server error to fetch the dates" });
          } else {
            console.log(dateDetails);
            return res
              .status(200)
              .json({ dateDetails: dateDetails, data: data });
          }
        });
      } else {
        return res.status(500).json({ error: "Invalid credentials" });
      }
    });
  });
});

app.post("/signup", (req, res) => {
  //   console.log(req.body);
  //   console.log(req.body.email);
  //   console.log(req.body.password);
  //   console.log(req.body.name);

  const sql = "INSERT INTO USER (IDUSER, PASSWORD, NAME) VALUES (?,?,?)";
  const values = [req.body.email, req.body.password, req.body.name];

  // Get connection from the pool
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error getting MySQL connection from pool:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    console.log("Connected to MySQL");

    // Execute the query
    connection.query(sql, values, (err, result) => {
      connection.release(); // Release the connection back to the pool

      if (err) {
        console.error("Error querying MySQL:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      console.log("Insertion Successful");
      console.log(result);

      return res.status(200).json({ message: "User created successfully" });
    });
  });
});

app.post("/attendence", (req, res) => {
  //   console.log(req.body);
  //   console.log(req.body.email);
  //   console.log(req.body.value);
  //   console.log(req.body.timeRange);

  const { email, value, timeRange } = req.body;

  let inputs = [];

  for (let i = 0; i < req.body.value.length; i++) {
    inputs.push([
      email,
      value[i].substr(0, 8) + (parseInt(value[i].substr(8, 2)) + 1),
      timeRange[i][0],
      timeRange[i][1],
    ]);
  }
  const sql =
    "INSERT INTO attendence_TABLE (USERID, DATE, START_TIME, END_TIME) VALUES ?";

  // Get connection from the pool
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error getting MySQL connection from pool:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    console.log("Connected to MySQL");

    // Execute the query
    connection.query(sql, [inputs], (err, result) => {
      connection.release(); // Release the connection back to the pool

      if (err) {
        console.error("Error querying MySQL:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      console.log("Insertion Successful");
      console.log(result);

      return res
        .status(200)
        .json({ message: "Attendence recorded successfully" });
    });
  });
});

app.post("/edittime", (req, res) => {
  //   console.log(req.body);
  //   console.log(req.body.email);
  //   console.log(req.body.date);
  //   console.log(req.body.timeRange);

  const { email, date, timeRange } = req.body;

  let inputs = [
    timeRange[0],
    timeRange[1],
    email,
    date.substr(0, 8) + (parseInt(date.substr(8, 2)) + 1),
  ];

  const sql =
    "UPDATE ATTENDENCE_TABLE SET START_TIME = ?, END_TIME = ?, MODIFY_TIME = NOW() WHERE USERID = ? AND DATE(date) = ?";

  // Get connection from the pool
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error getting MySQL connection from pool:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    console.log("Connected to MySQL");

    // Execute the query
    connection.query(sql, inputs, (err, result) => {
      connection.release(); // Release the connection back to the pool

      if (err) {
        console.error("Error querying MySQL:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      console.log("Modification Successful");
      console.log(result);

      return res
        .status(200)
        .json({ message: "Attendence recorded successfully" });
    });
  });
});

app.post("/delete", (req, res) => {
  // console.log(req.body);
  // console.log(req.body.email);
  // console.log(req.body.value);

  const { email, date } = req.body;

  let inputs = [email, date.substr(0, 8) + (parseInt(date.substr(8, 2)) + 1)];
  const sql =
    "DELETE FROM ATTENDENCE_TABLE WHERE USERID = ? AND DATE(DATE) = ?";

  // Get connection from the pool
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error getting MySQL connection from pool:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    console.log("Connected to MySQL");

    // Execute the query
    connection.query(sql, inputs, (err, result) => {
      connection.release(); // Release the connection back to the pool

      if (err) {
        console.error("Error querying MySQL:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      console.log("Deletion Successful");
      console.log(result);

      return res
        .status(200)
        .json({ message: "Attendence recorded successfully" });
    });
  });
});

app.post("/emailcheck", (req, res) => {
  // console.log(req.body);
  // console.log(req.body.email);
  // console.log(req.body.value);

  const { email } = req.body;
  const sql = "SELECT COUNT(*) AS count FROM USER WHERE IDUSER = ?";

  // Get connection from the pool
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error getting MySQL connection from pool:", err);
      return res.status(404).json({ error: "Internal Server Error" });
    }

    console.log("Connected to MySQL");

    // Execute the query
    connection.query(sql, email, (err, result) => {
      connection.release(); // Release the connection back to the pool

      if (err) {
        console.error("Error querying MySQL:", err);
        return res.status(404).json({ error: "Internal Server Error" });
      }

      console.log(result[0].count);
      if (result[0].count === 0)
        return res
          .status(500)
          .json({ error: "This email is not registered with us." });

      const mailStatus = sendMail(email)
      if(mailStatus == '404'){
        sendMail(email)
      }

      return res.status(200).json({ error: "OTP send to the verified email address" });
    });
  });
});

app.post('/resendOTP', (req,res) => {
  const {email} = req.body
  OTP = generateOTP();
  const mailStatus = sendMail(email);
  if(mailStatus == '404'){
    sendMail(email)
  }

  return res.status(200)
})

app.post("/otpcheck", (req, res) => {
  const { otp } = req.body;

  console.log(otp, OTP);

  if (otp == OTP) {
    OTP = undefined;
    return res.status(200).json("Otp verified successfully");
  } else return res.status(500).json("Wrong otp is entered");
});

app.listen(4000, () => {
  console.log("Listening on port 4000...");
});

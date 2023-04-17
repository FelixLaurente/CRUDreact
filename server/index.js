const mysql = require("mysql");
const express = require("express");
const app = express();
const cors = require("cors");
// const domainsFromEnv = process.env.CORS_DOMAINS || "";
// const port = process.env.PORT || 3000;
const bcrypt = require('bcrypt');
const saltRounds = 10;
// const myPlaintextPassword = 's0/\/\P4$$w0rD';
// const someOtherPlaintextPassword = 'not_bacon';

const whitelist = ["http://localhost:3000"];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));
//
//
// app.use(cors({
//   origin: "*",
// }));
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "employeesystem",
});

app.get("/", (req, res) => {
  res.render("login.jsx");
});
//CRUD
app.post("/employee/create", (req, res) => {
  const emp = req.body.emp;
  const name = req.body.name;
  const age = req.body.age;
  const country = req.body.country;
  const position = req.body.position;
  const wage = req.body.wage;

  db.query(
    "INSERT INTO employee (emp, name, age, country, position, wage) VALUES (?, ?, ?, ?, ?, ?)",
    [emp, name, age, country, position, wage],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("VALUES INSERTED");
      }
    }
  );
});

app.get("/employee", (req, res) => {
  const q = "SELECT * FROM employee";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.put("/update", (req, res) => {
  const id = req.body.id;
  const emp = req.body.emp;
  const name = req.body.name;
  const age = req.body.age;
  const country = req.body.country;
  const position = req.body.position;
  const wage = req.body.wage;
  db.query(
    "UPDATE employee SET name = ?, emp = ?, age = ?, country = ?, position = ?, wage = ? WHERE id = ?",
    [name, emp, age, country, position, wage, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM employee WHERE id = ? ", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//REGISTERED USERS
app.post("/users/create", (req, res) => {
  const username = req.body.username;
  const fullname = req.body.fullname;
  const password = req.body.password;
  const email = req.body.email;
  const phone = req.body.phone;
  const place = req.body.place;
  const address = req.body.address;
  const gender = req.body.gender;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }
    db.query(
      "INSERT INTO users (username, password, fullname, email, phone, place, address, gender) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?)",
      [username, hash, fullname, email, phone, place, address, gender],
      (err, result) => {
        if (result) {
          // console.log(err);
          res.send(result);
        } else {
          res.send({ message: "ENTER COORECT ASK DETAILS!" });
        }
      }
    );
  });
});

//   db.query(
//     "INSERT INTO users (username, password, fullname, email, phone, place, address, gender) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?)",
//     [username, password, fullname, email, phone,  place, address, gender],
//     (err, result) => {
//       if (result) {

//         // console.log(err);
//         res.send(result)
//       } else {
//         res.send({message: "ENTER COORECT ASK DETAILS!"});
//       }
//     }
//   );
// });
// });
// });

// app.get("/users/create", (req, res) => {
//   const s = "SELECT * FROM users";
//   db.query(s, (err, data) => {
//     if (err) return res.json(err);
//     return res.json(data);
//   });
//   console.log();
// });

//LOGIN

app.post("/users/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "SELECT * FROM users WHERE username = ?",
    username,
    (err, result) => {
      if (err) {
        req.setEncoding({ err: err }); //this is the error ithink
      } else {
        if (result.length > 0) {
          bcrypt.compare(password, result[0].password, (err, response) => {
            if (response) {
              res.send(result);
            } else {
              res.send({ message: "WRONG USERNAME or PASSWORD" });
            }
          });
        } else {
          res.send({ message: "User doesnt exist.!" });
        }
      }
    }
  );
});

app.listen(3001, (req, res) => {
  console.log("Yey, your server is running on port 3001");
});

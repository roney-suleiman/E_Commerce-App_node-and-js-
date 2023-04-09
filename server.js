"use strict";

const express = require("express");
const server = express();

server.use(
  express.static("public", {
    extensions: ["html"],
  })
);
server.use(express.json());

// Save product
server.post("/save_product", (request, response) => {
  let myDB = db.use(dbName);
  myDB
    .insert(request.body)
    .then((res) => response.json(res))
    .catch(console.warn);
});

// Save user data
server.post("/save_userdata", (request, response) => {
  let myDB = db.use(userdb);

  myDB
    .insert(request.body)
    .then((res) => {
      // console.log(res);
      response.json(res)
    })
    .catch(console.warn);
});

// find data in db
server.post("/find-user", (request, response) => {
  let myDB = db.use(userdb);
  // console.log(request.body)
  myDB
    .find({
      selector: {
        email: request.body.email,
      },
    })
    .then((res) => res.docs)
    .then((res) => {
      // console.log(res);
      if (res.length == 0){
        response.json({ success: false });
        // console.log('kein ergebnis');
      } 
        
       else if (res[0].password == request.body.password) {
          response.json({ success: true });
          // console.log('ok');
        }

        else if (res[0].password !== request.body.password) response.json({ success: false });
      
    })
    .catch(console.warn);
});

// check of user data are reapited by signup
server.post("/find-user-signup", (request, response) => {
  let myDB = db.use(userdb);
  // console.log(request.body)
  myDB
    .find({
      selector: {
        email: request.body.email,
      },
    })
    .then((res) => res.docs)
    .then((res) => {
      // console.log(res);
      if (res.length == 0){
        response.json({ success: false });
        // console.log('kein ergebnis');
      } 
      else {
        if (res[0].email == request.body.email) {
          response.json({ success: true });
          // console.log('ok');
        }
      }
    })
    .catch(console.warn);
});


const userdb = "user-data";
const dbName = "products";
const db = require("nano")("http://mimo:mimo@127.0.0.1:5984").db;

const dbInit = () => {
  return db.list().then((res) => {
    if (!res.includes(dbName)) return db.create(dbName);
  });
};

const init = () => {
  dbInit()
    .then(() => server.listen(80, (err) => console.log(err || "Server läuft")))
    .catch(console.warn);
};

init();

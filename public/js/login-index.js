"use strict";



// KONSTANTEN / VARIABLEN
const elements = {};

// FUNKTIONEN
const domMapping = () => {
  elements.email = document.querySelector(".email");
  elements.password = document.querySelector(".password");
  elements.btnLogin = document.querySelector(".btn-login");
};

const appendEventlisteners = () => {
  // elements.btnLogin.addEventListener('click', (e) => {

  // let contents = localStorage.getItem('user-data');
  // # bring data from db and save it in contents

  // if(contents){
  //     contents = JSON.parse(contents);

  // check if user name data is correct
  // contents.forEach(el => {
  //     if(el.email == elements.email.value && el.password == elements.password.value) {
  //         location.replace('/store');

  // save current user data
  // elements.now = {
  //     email: el.email,
  //     password: el.password
  // }
  // elements.curentUser = [];
  // elements.curentUser.push(elements.now)
  // localStorage.setItem('curent-user', JSON.stringify(elements.curentUser));

  //                     throw new Error("this user is alredy rejestred");
  //                 }
  //                 else elements.isWrong = true;
  //             })
  //                 if(elements.isWrong) {
  //                     alert('user name or password Wrong');
  //                 }
  //         }
  //         else {
  //             alert('user name or password Wrong');
  //         }
  //     });

  //   location.replace('/store');

  elements.btnLogin.addEventListener("click", () => {
    fetch("/find-user", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        email: elements.email.value,
        password: elements.password.value,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.success == true) {

          let cUser = [];
          let userData = JSON.stringify({
            email: elements.email.value,
            password: elements.password.value
          })
          cUser.push(userData);
          localStorage.setItem('currentUser', cUser);

          location.replace("/store");
        } 
        else {
            alert('Username or Password is Wrong');
            elements.email.value = '';
            elements.password.value = '';
        }
      })
      .catch(console.warn);
  });
};

const init = () => {
  domMapping();
  appendEventlisteners();
};

// INIT
document.addEventListener("DOMContentLoaded", init);

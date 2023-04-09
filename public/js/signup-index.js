"use strict";


// KONSTANTEN / VARIABLEN
const elements = {};

// FUNKTIONEN
const domMapping = () => {
  elements.userName = document.querySelector(".name");
  elements.email = document.querySelector(".email");
  elements.password = document.querySelector(".password");
  elements.btnSignup = document.querySelector(".btn-signup");
};

const appendEventlisteners = () => {


  elements.btnSignup.addEventListener("click", (e) => {
    


    fetch('/find-user-signup', {
      method: 'post',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({
        email: elements.email.value
      })
    }).then(response => response.json())
    .then((response) => {
      if(response.success == true) { 
        alert('this Email is Allredy regesterd');
        elements.userName.value = '';
        elements.email.value = '';
        elements.password.value = '';
      }
      else {



        fetch("/save_userdata", {
          method: "post",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            name: elements.userName.value,
            email: elements.email.value,
            password: elements.password.value,
          }),
        })
          .then((res) => res.json())
          .then((res) => {
            
          })
          .catch(console.warn);
          
          let cUser = [];
          let userData = JSON.stringify({
            email: elements.email.value,
            password: elements.password.value
          })
          cUser.push(userData);
          localStorage.setItem('currentUser', cUser);

          location.replace("/store");



      }
    }).catch(console.warn)


  });
};

const init = () => {
  domMapping();
  appendEventlisteners();
};

// INIT
document.addEventListener("DOMContentLoaded", init);

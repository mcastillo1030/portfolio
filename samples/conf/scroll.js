"use strict";

var button = document.getElementById("to-top-btn");

window.onscroll = function() { scrollFunction();};

function scrollFunction() {
   if (document.body.scrollTop > 105 || document.documentElement.scrollTop > 105) {
      button.style.display = "block";
   } else {
      button.style.display = "none";
   }
}

function topFunction() {
   document.body.scrollTop = 0;
   document.documentElement.scrollTop = 0;
}
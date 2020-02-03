function hgsubmit(e) {
   e.preventDefault();

   var emailreg = /^\S+@[a-z0-9_.-]+\.[a-z]{2,6}$/i;
   var emptyreg = /\S+/;
   if (emptyreg.test(document.hgmailer.name.value) == false){
      var p = document.getElementById("name-err");
      p.innerHTML = "Name cannot be empty";
      p.style.display = "block";
   } else if (emailreg.test(document.hgmailer.email.value) == false) {
      var p = document.getElementById("email-err");
      p.innerHTML = "Please enter a valid email address";
      p.style.display = "block";
   } else if (emptyreg.test(document.hgmailer.comment.value) == false) {
      var p = document.getElementById("msg-err");
      p.innerHTML = "Message body cannot be empty";
      p.style.display = "block";
   } else {
      document.forms["hgmailer"].submit();
   } // end if-else
}

function checkError(evt) {
   evt.preventDefault();

   var p = "";
   if (this.id == "name") {
      p = document.getElementById("name-err");
   } else if (this.id == "email") {
      p = document.getElementById("email-err");
   } else {
      p = document.getElementById("msg-err");
   } // end if-else

   if (p.style.display == "block") {
      p.style.display = "none";
   }
}

document.getElementById("submit").addEventListener("click", hgsubmit, false);
document.getElementById("name").addEventListener("focus", checkError, false);
document.getElementById("email").addEventListener("focus", checkError, false);
document.getElementById("message").addEventListener("focus", checkError, false);
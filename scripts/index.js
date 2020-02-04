$('html').addClass('hidden');
$(document).ready(function() {
   function validateForm() {
      var emailreg = /^\S+@[a-z0-9_.-]+\.[a-z]{2,6}$/i;
      var emptyreg = /\S+/;
      var p;
      var v = true;

      if (emptyreg.test($('#name').val()) == false){
         p = document.getElementById("name-err");
         p.innerHTML = "Name cannot be empty";
         p.style.display = "block";
         v = false;
      }
      
      if (emailreg.test($('#email').val()) == false) {
         p = document.getElementById("email-err");
         p.innerHTML = "Please enter a valid email address";
         p.style.display = "block";
         v = false;
      }
      
      if (emptyreg.test($('#message').val()) == false) {
         p = document.getElementById("msg-err");
         p.innerHTML = "Message body cannot be empty";
         p.style.display = "block";
         v = false;
      } //end if-else

      return v;
   }

   $('html').removeClass('hidden');

   $('#to-top-btn').on('click',function (e) {
      e.preventDefault();

      var target = this.hash;
      var $target = $(target);

      $('html, body').stop().animate({
         'scrollTop': $target.offset().top
      }, 1200, 'swing', function () {
         window.location.hash = target;
      });
   });

   $('#contact-form').submit(function (e) {
      e.preventDefault();
      
      $('p.error').hide();

      var valid = validateForm();
      if (valid) {
         var name = $('#name').val();
         var email = $('#email').val();
         var msg = $('#message').val();
         var formData = "name=" + name + "&email=" + email +
            "&message=" + msg;
         $.ajax({
            url: 'scripts/contact.php',
            method: 'POST',
            data: formData
          }).done(function() {
            $('#success p').text("Thanks! Your message has been sent, and I'll reply soon.");
            $('#success span').text("close");
            $('#success').addClass('expand');
            $('#contact-form').find('input[type=text], textarea').val('');
          });
      }//end if
   });

   $('#contact-form input[type=text]').focus(function (e) {
      if (this.id == "name") {
         $('p#name-err').hide();
      } else {
         $('p#email-err').hide();
      }
   });

   $('#contact-form textarea').focus(function (e) {
      $('p#msg-err').hide();
      $('#success p').text("");
      $('#success span').text("");
   });

   $('#success span').click(function () {
      $('#success').removeClass('expand');
   });
});
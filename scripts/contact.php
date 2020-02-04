<?php
   /*
    * Simple PHP script to process contact form from website.
    * Author: Marlon Castillo
    * Date: February 3, 2020
    */
   
   $name = $_POST['name'];
   $contact_email = $_POST['email'];
   $msg = $_POST['message'];
   $to_address = "marlon.castillo93@icloud.com";
   $subject = "Contact Request from Developer Website";
   $message_body = "Customer name: ".htmlspecialchars($name)."\n".
      "Email address: ".htmlspecialchars($contact_email)."\n".
      "Message:\n".htmlspecialchars($msg);
   
   mail($to_address, $subject, $message_body);
?>
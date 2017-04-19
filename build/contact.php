<?php
  $to_email = 'piotr.t@fxcp1.com';
  $subject = 'Client details';
  $message = $_POST['message'];

  if ($message) {
    mail($to_email, $subject, $message, "From: example@example.com");
  }
?>

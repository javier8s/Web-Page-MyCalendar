<?php
    session_start();
    $_SESSION["identificado"] == "no identificado";
    header('Location: /index.php');
    session_destroy();
    ?>
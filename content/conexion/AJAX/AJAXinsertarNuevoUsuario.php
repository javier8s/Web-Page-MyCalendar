<?php

    include './../conectar.php';
    header("Content-Type: text/html;charset=utf-8");
    insertUser(htmlspecialchars($_POST['nom']),
        htmlspecialchars($_POST['ape']),htmlspecialchars($_POST['mail']),htmlspecialchars($_POST['pass']),1);
    echo json_encode( "hecho");
    exit;
?>



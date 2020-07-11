<?php
    header("Content-Type: text/html;charset=utf-8");
    session_start();
    $id = $_COOKIE["id"];
    $_SESSION[$id . "nombre"] = $_POST['nom'];
    include './../conectar.php';
    updateUser($_POST['id'],$_POST['nom'],$_POST['ape'],
         $_POST['mail'],$_POST['pass'],1);
    echo json_encode( "hecho");
    exit;
?>



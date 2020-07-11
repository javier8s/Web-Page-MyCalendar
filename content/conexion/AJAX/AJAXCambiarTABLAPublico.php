<?php
    // actualiza la tabla a publica o privada
    header("Content-Type: text/html;charset=utf-8");
    include './../conectar.php';
    $publico= $_POST['publico'];
    $idTabla =$_POST['idTabla'];
    $nameTabla =$_POST['nameTabla'];
    updateTableFieldPublico($idTabla,$publico,$nameTabla);

    echo json_encode("ok");
    exit;

?>
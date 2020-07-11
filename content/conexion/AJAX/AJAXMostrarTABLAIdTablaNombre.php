<?php
    header("Content-Type: text/html;charset=utf-8");
    include './../conectar.php';
    $idUser= $_GET['array'];
    $tablas  =getTablesByUser($idUser);
    echo json_encode($tablas);
    exit;

?>

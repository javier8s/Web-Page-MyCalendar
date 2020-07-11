<?php
    header("Content-Type: text/html;charset=utf-8");
    include './../conectar.php';
    $days = $_POST['days'];
    $hours = $_POST['hours'];
    $idTable = $_POST['idTable'];
    updateDaysAndHours($days,$hours,$idTable);
    echo json_encode( "hecho");
    exit;
?>



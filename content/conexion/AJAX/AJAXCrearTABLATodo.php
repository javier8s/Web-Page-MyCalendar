<?php
    // Añade una tarea a la tabla
    header("Content-Type: text/html;charset=utf-8");
    include './../conectar.php';
    $idTabla =$_POST['idTabla'];

    echo json_encode("ok");
    exit;

?>

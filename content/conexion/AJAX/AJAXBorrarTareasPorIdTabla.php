<?php
// Boton guardar ,  borra los datos de la tabla
    header("Content-Type: text/html;charset=utf-8");
    include './../conectar.php';
    $idTabla =$_POST['idTabla'];

    deleteAllTasks($idTabla);

    echo json_encode("ok");
    exit;

?>

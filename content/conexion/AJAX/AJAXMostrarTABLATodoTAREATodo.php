<?php
    // Obtiene una tabla según un id de usuario y de tabla
    header("Content-Type: text/html;charset=utf-8");
    include './../conectar.php';
    $id= $_GET['id'];
    $tabla=searchTableByIdUserAndIdTabla($id);
    $tarea=searchTareaByIdUserAndIdTabla($id);
    array_push($tabla,$tarea);
    echo json_encode($tabla);
    exit;
?>

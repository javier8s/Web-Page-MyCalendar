<?php
    // Boton guardar , mete los datos de la tabla
    header("Content-Type: text/html;charset=utf-8");
    include './../conectar.php';
    $tasks= $_POST['tasks'];
    $idTabla =$_POST['idTabla'];
    $ids= array();
    foreach($tasks as $k1=>$array) {
            array_push($ids, $array[1]);
    }
    deleteTasks($ids,$idTabla);
    foreach($tasks as $k1=>$array) {
        updateTaskByIdTable($idTabla,$array[1],$array[2],$array[0],$array[3]);
    }
    echo json_encode($ids);
    exit;

?>

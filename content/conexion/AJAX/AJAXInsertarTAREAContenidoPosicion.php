<?php
    // Añade una tarea a la tabla
    header("Content-Type: text/html;charset=utf-8");
    include './../conectar.php';
    $newTasks= $_POST['tasks'];
    $idTabla =$_POST['idTabla'];
    for ($i = 0; $i < sizeof ($newTasks); $i++) {
        addNewTasks($idTabla, htmlspecialchars($newTasks[$i][2]), htmlspecialchars($newTasks[$i][0]),htmlspecialchars($newTasks[$i][3]));
    }
    echo json_encode("ok");
    exit;

?>

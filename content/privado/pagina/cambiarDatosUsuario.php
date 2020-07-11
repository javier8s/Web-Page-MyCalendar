<?php
/*PHP para cambiar los datos del usuario, cuando este los cambia dentro de su cuenta*/
    header("Content-Type: text/html;charset=utf-8");
    $id = $_POST['id'];
    $name = $_POST['nom'];
   $_SESSION[$id . "user"] = $name;
    echo json_encode( 'ok' );
    exit;
?>
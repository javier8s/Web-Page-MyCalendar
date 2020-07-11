<?php
    header("Content-Type: text/html;charset=utf-8");
    include './../conectar.php';
    $mail= $_GET['mail'];
    $correos  =getAllEmails();
    $flag = false;
    foreach( $correos as $key => $value ){
        if($value[0] == $mail){
            $flag = true;
        }
    }

    echo json_encode($flag);
    exit;

?>

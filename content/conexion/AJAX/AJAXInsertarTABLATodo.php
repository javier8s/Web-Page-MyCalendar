<?php

// Inserta una nueva tabla a un usuario
    header("Content-Type: text/html;charset=utf-8");
    include './../conectar.php';
    $l=0;
    $m=0;
    $x=0;
    $j=0;
    $v=0;
    $s=0;
    $d=0;
    $idUser= $_POST['idUser'];
    $name= $_POST['name'];
    $days= $_POST['checkedVals'];
    $horas=$_POST['horas'];
    if($days[0]=="Lunes") $l=1;
    if($days[1]=="Martes") $m=1;
    if($days[2]=="Miercoles") $x=1;
    if($days[3]=="Jueves") $j=1;
    if($days[4]=="Viernes") $v=1;
    if($days[5]=="Sabado") $s=1;
    if($days[6]=="Domingo") $d=1;
    $idTabla = insertTable($idUser,htmlspecialchars($name),htmlspecialchars($horas),$l,$m,$x,$j,$v,$s,$d);
    echo json_encode($idTabla);
    exit;

?>
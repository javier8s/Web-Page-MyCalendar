<?php
    session_start();
    if(isset($_SESSION["identificado"])){
        if($_SESSION["identificado"] == "identificado"){
            header('Location: /privado/principal.php');
        }
    }

    $pageTitle = "Javier`s Scheduler";
    // La pagina esta dividida en tres partes cabecera, principal y footer 
    include("publico/header.php");
    // La parte principal puede cambiar
    if(isset($_GET['page'])){
        if($_GET['page']==2){
            include 'publico/crearUsuario.php';}
        else {
            include 'publico/inicioSesion.php' ;
        }
    }else {
        include 'publico/inicioSesion.php'  ;
    }
    include("publico/footer.php");
 ?>



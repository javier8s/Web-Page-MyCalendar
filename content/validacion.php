<?php
// Lugar donde se ejecutan todas las busquedas a la base de datos.
include 'conexion/conectar.php';

// Preguntadmso por el post
if(isset($_POST['nombre'])){
        if(isset($_POST['password'])) {
            $array = searchUser($_POST['nombre']);
            if (count($array) == 1) {
                // Registramos si se ha producido un error
                volver(4);
            } else if ($array['PASS'] == $_POST['password']) {
                // Una vez confirmados, empezamos la sesion
                session_start();
                $_SESSION["identificado"] = "identificado";
                $id = 'id' . rand();
                $md5 = md5($array['ID_USUARIO'] . $id);
                // Establecemos variables propias de sesion 
                $_SESSION[$id] = $md5;
                $_SESSION[$id . "user"] = $array['ID_USUARIO'];;
                $_SESSION[$id . "nombre"] = $array['NOMBRE'];
                setcookie("id", $id, time() + (30 * 24 * 3600), "/privado/");
                setcookie("md5", $md5, time() + (30 * 24 * 3600), "/privado/");
                session . use_only_cookies;
                header('Location: /privado/principal.php');
            } else
                volver(3);
                // Registramos si se ha producido un error
        } else {
            volver(2);
            // Registramos si se ha producido un error
        }
} else {
    volver(1);
}
// Funcion que permite volver en un estado de error a la página inicial
function volver($i){
    header('Location: /index.php?page=1&error='.$i);
}
?>
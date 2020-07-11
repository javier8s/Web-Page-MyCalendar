<?php
header('Content-Type: text/txt; charset=utf-8');
// Conexion a la BBDD
function conectar(){
    $servername = "localhost";
    $username = "root";
    $password = "";

    try {
        $conn = new PDO("mysql:host=$servername;dbname=WEB", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $conn;
        echo "Connected successfully";
    } catch (PDOException $e) {
        echo "Connection failed: " . $e->getMessage();
    }
}
///     He decidido separar las funcionalidades, en vez de hacer una generica, para que sea más facil añadir y quitar en cada momento  ////
/// Insertar usuario
function insertUser($nom,$ape,$mail,$pass,$tipo){
    try {
        $conn = conectar();
        $stmt = $conn->prepare("INSERT INTO USUARIO (APELLIDOS, EMAIL,NOMBRE,PASS,TIPO)
    VALUES (:ape, :mail, :nom, :pass, :tipo)");
        $stmt->bindParam(':ape', $ape);
        $stmt->bindParam(':mail', $mail);
        $stmt->bindParam(':nom', $nom);
        $stmt->bindParam(':pass', $pass);
        $stmt->bindParam(':tipo', $tipo);
        $stmt->execute();
    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
    $conn = null;
}
// Buscar usuario
function searchUser($mail){
    try {
        $conn = conectar();
        $stmt = $conn->prepare("SELECT * FROM USUARIO WHERE EMAIL = :mail");
        $stmt->bindParam(':mail', $mail);
        $stmt->execute();
        $resultado = $stmt->fetch();
        $conn = null;
        return $resultado;
    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
    $conn = null;
}
// Actualiza los dias y la horas 
function updateDaysAndHours($days,$hours,$idTable){
    try {
        $conn = conectar();
        $stmt = $conn->prepare("UPDATE TABLA SET HORAS = :hours, LUNES = TRUE WHERE ID_TABLA = :idTable  ");
        $stmt->bindParam(':idTable', $idTable);
        $stmt->bindParam(':hours', $hours);
        //$stmt->bindParam(':nameTabla', $nameTabla);
        $stmt->execute();
        $conn = null;
        return $stmt;
    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
    $conn = null;
}
/// Obtener todos los emails
function getAllEmails(){
   try {
        $conn = conectar();
        $stmt = $conn->prepare("SELECT EMAIL FROM USUARIO");
        $stmt->execute();
        $conn = null;
        $out=array();
        foreach ($stmt->fetchAll() as $row){
            array_push($out,
                array($row["EMAIL"])
            );
        }
        return $out;
    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
    $conn = null;
}

// Actualizar usuario (todo menos el id)
function updateUser($id,$nom,$ape,$mail,$pass,$tipo){
    try {
        $conn = conectar();
        $stmt = $conn->prepare("UPDATE USUARIO 
    SET APELLIDOS = :ape, EMAIL = :mail, NOMBRE = :nom, PASS = :pass, TIPO = :tipo WHERE ID_USUARIO = :id");
        $stmt->bindParam(':ape', $ape);
        $stmt->bindParam(':mail', $mail);
        $stmt->bindParam(':id', $id);
        $stmt->bindParam(':nom', $nom);
        $stmt->bindParam(':pass', $pass);
        $stmt->bindParam(':tipo', $tipo);
        $stmt->execute();
    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
    $conn = null;
}


// Borrar usuario
function deleteUser($id){
    try {
        $conn = conectar();
        $stmt = $conn->prepare("DELETE FROM USUARIO WHERE ID_USUARIO = :id");
        $stmt->bindParam(':id', $id);
        $stmt->execute();
    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
    $conn = null;
}

// Buscar tabla por usuario e id de tabla
function searchTableByIdUserAndIdTabla($idTable){
    try {
        $conn = conectar();
        $stmt = $conn->prepare("SELECT * FROM TABLA WHERE ID_TABLA = :idTable");
        $stmt->bindParam(':idTable', $idTable);
        $stmt->execute();
        $out=array();
        foreach ($stmt->fetchAll() as $row){
            array_push($out,
                array("idTabla"=>$row["ID_TABLA"],
                 "id_usuario"=>$row["ID_USUARIO"],
                 "l"=>$row["LUNES"],
                 "m"=>$row["MARTES"],
                 "x"=>$row["MIERCOLES"],
                 "j"=>$row["JUEVES"],
                 "v"=>$row["VIERNES"],
                 "s"=>$row["SABADO"],
                 "d"=>$row["DOMINGO"],
                 "horas"=>$row["HORAS"],
                "publico"=>$row["PUBLICO"],
                "nombreTabla"=>$row["NOMBRE_TABLA"])
                 );
        }
        $conn = null;
        return $out;
    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
    $conn = null;
}
// Buscar las tareas de la tabla
function searchTareaByIdUserAndIdTabla($idTable){
    try {
        $conn = conectar();
        $stmt = $conn->prepare("SELECT * FROM TAREA WHERE ID_TABLA = :idTable");
        $stmt->bindParam(':idTable', $idTable);
        $stmt->execute();
        $out=array();
        foreach ($stmt->fetchAll() as $row){
            array_push($out,
                array("idTarea"=>$row["ID_TAREA"],
                    "id_Tabla"=>$row["ID_TABLA"],
                    "p"=>$row["POSICION"],
                    "c"=>$row["CONTENIDO"],
                    "color"=>$row["COLOR"]
            ));
        }
        $conn = null;
        return $out;
    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
    $conn = null;
}
// Actualizar las tareas por tabla
function updateTaskByIdTable($idTable,$idTask,$p,$c,$color){
    try {
        $conn = conectar();
        $stmt = $conn->prepare("UPDATE TAREA SET POSICION = :p , CONTENIDO = :c , COLOR = :color WHERE ID_TABLA = :idTable AND ID_TAREA = :idTask");
        $stmt->bindParam(':idTable', $idTable);
        $stmt->bindParam(':idTask', $idTask);
        $stmt->bindParam(':p', $p);
        $stmt->bindParam(':c', $c);
        $stmt->bindParam(':color', $color);

        $stmt->execute();
        $conn = null;
        return $stmt;
    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
    $conn = null;
}
// Borrar tarea
function deleteTasks($ids,$idTable){
    try {
        $conn = conectar();
       $query = "DELETE FROM TAREA WHERE ID_TABLA = :idTable AND ID_TAREA NOT IN (";
        for ($i = 0; $i < count($ids)-1; $i++) {
           $query = $query . " :id".$i." , ";
        }
        $num = count($ids)-1;
        $query = $query ." :id".$num." )";
        $stmt = $conn->prepare("$query");
        for ($i = 0; $i < count($ids); $i++) {
            $param = ":id".$i;
            $stmt->bindParam($param, $ids[$i]);
        }
        $stmt->bindParam(':idTable', $idTable);
        $stmt->execute();
        $conn = null;
        return $idTable;
    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
    $conn = null;
}
// Borrar todas las tareas
function deleteAllTasks($idTable){
    try {
        $conn = conectar();
        $query = "DELETE FROM TAREA WHERE ID_TABLA = :idTable ";
        $stmt = $conn->prepare("$query");
        $stmt->bindParam(':idTable', $idTable);
        $stmt->execute();
        $conn = null;
        return $idTable;
    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
    $conn = null;
}
// Borrar todas las tareas
function deleteAllTasksInIdTable($idTable){
    try {
        $conn = conectar();
        $query = "DELETE FROM TAREA WHERE ID_TABLA = :idTable";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':idTable', $idTable);
        $stmt->execute();
        $conn = null;
        return $stmt;
    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
    $conn = null;
}
// Añadir nueva tarea
function addNewTasks($idTable,$p,$c,$color){
    try {
        $conn = conectar();
        $stmt = $conn->prepare("INSERT INTO TAREA (ID_TABLA, POSICION , CONTENIDO ,COLOR)VALUES (:idTable,:p,:c,:color)");
        $stmt->bindParam(':idTable', $idTable);
        $stmt->bindParam(':p', $p);
        $stmt->bindParam(':c', $c);
        $stmt->bindParam(':color', $color);
        $stmt->execute();
        $last_id = $conn->lastInsertId();
        $conn = null;
        return $last_id;
    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
    $conn = null;
}
// Actualizar campo publico
function updateTableFieldPublico($idTable,$publico,$nameTabla){
    try {
        $conn = conectar();
        $stmt = $conn->prepare("UPDATE TABLA SET PUBLICO = :publico, NOMBRE_TABLA = :nameTabla WHERE ID_TABLA = :idTable  ");
        $stmt->bindParam(':idTable', $idTable);
        $stmt->bindParam(':publico', $publico);
        $stmt->bindParam(':nameTabla', $nameTabla);

        $stmt->execute();
        $conn = null;
        return $stmt;
    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
    $conn = null;
}
// Conseguir todas la tablas del usuario
function getTablesByUser($idUser){
    try {
        $conn = conectar();
        $stmt = $conn->prepare("SELECT * FROM TABLA WHERE ID_USUARIO = :idUser");
        $stmt->bindParam(':idUser', $idUser);
        $stmt->execute();
        $out=array();
        foreach ($stmt->fetchAll() as $row){
            array_push($out,
                array(
                    "id_Tabla"=>$row["ID_TABLA"],
                    "nombre"=>$row["NOMBRE_TABLA"]
                ));
        }
        $conn = null;
        return $out;
    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
    $conn = null;
}
// Borrar  tablas y sus tareas
function deleteTable($idTable){
    try {
        $conn = conectar();
        $stmt = $conn->prepare("DELETE FROM TABLA WHERE ID_TABLA = :idTable");
        $stmt->bindParam(':idTable', $idTable);
        $stmt->execute();
        $conn = conectar();
        $stmt = $conn->prepare("DELETE FROM TAREA WHERE ID_TABLA = :idTable");
        $stmt->bindParam(':idTable', $idTable);
        $stmt->execute();
        $conn = null;
        return "ok";
    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
    $conn = null;
}
// Añadir tabla
function insertTable($idUser,$n,$h,$l,$m,$x,$j,$v,$s,$d){
    try {
        $p = 0;
        $conn = conectar();
        $stmt = $conn->prepare("INSERT INTO TABLA ( ID_USUARIO,NOMBRE_TABLA, HORAS, LUNES, MARTES ,MIERCOLES,JUEVES,VIERNES,SABADO,DOMINGO,PUBLICO )VALUES (:idUser,:n,:h,:l,:m,:x,:j,:v,:s,:d,:p)");

        $stmt->bindParam(':idUser' , $idUser);
        $stmt->bindParam(':n' , $n);
        $stmt->bindParam(':h' , $h);
        $stmt->bindParam(':l' , $l);
        $stmt->bindParam(':m' , $m);
        $stmt->bindParam(':x' , $x);
        $stmt->bindParam(':j' , $j);
        $stmt->bindParam(':v' , $v);
        $stmt->bindParam(':s' , $s);
        $stmt->bindParam(':d' , $d);
        $stmt->bindParam(':p' , $p);
        $stmt->execute();
        $last_id = $conn->lastInsertId();
        $conn = null;
        return $last_id;
    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
    $conn = null;
}
// Buscas tablas publicas
function getTablesByPublic(){
    try {
        $p = 0;
        $conn = conectar();
        $stmt = $conn->prepare("SELECT * FROM TABLA WHERE PUBLICO = :p");
        $stmt->bindParam(':p', $p);
        $stmt->execute();

        $out=array();
        foreach ($stmt->fetchAll() as $row){
            array_push($out,
                array(
                    "id_Tabla"=>$row["ID_TABLA"],
                    "nombre"=>$row["NOMBRE_TABLA"]
                ));
        }
        $conn = null;
        return $out;
    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
    $conn = null;
}




?>
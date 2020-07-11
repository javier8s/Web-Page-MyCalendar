<?php
session_start();
if (isset($_COOKIE["id"])) {
    $id = $_COOKIE["id"];
    if (isset($_SESSION[$id])) {
        if (isset($_COOKIE["md5"])) {
            if ($_COOKIE["md5"] == $_SESSION[$id])
                $Session = $_SESSION[$id . "user"];
                $pageTitle = $_SESSION[$id . "nombre"]."`s Scheduler";
        }else
            volver(1);
    }else
        volver(1);
} else
    volver(1);
function volver($i){
    header('Location: /index.php?page=1&error='.$i);
};

if(isset($_GET['page'])){
    if($_GET['page']==1){
        include("./pagina/header.php");

    }
}else
    include("./pagina/header.php");

?>
<?php

if(isset($_GET['page'])){
    if($_GET['page']==1){
        include './pagina/menu.php';
    }
}else
    include './pagina/menu.php'
?>



<?php include './pagina/footer.php'; ?>

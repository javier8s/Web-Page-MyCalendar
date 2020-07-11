<html>
<head>
    <title><?php
        $off = false;
        echo $pageTitle;
        ?>
    </title>
    <link rel="stylesheet" href="./css/cssVentanasEmergentes.css" type="text/css">
    <link rel="stylesheet" href="./css/css.css" type="text/css">
    <link rel="stylesheet" href="/privado/css/cssContenido.css" type="text/css">
    <link rel="stylesheet" href="/privado/css/cssFooter.css" type="text/css">
    <link rel="stylesheet" href="/privado/css/cssHeader.css" type="text/css">
    <link rel="stylesheet" href="./css/cssTabla.css" type="text/css">
    <link rel="stylesheet" href="./css/cjq.css">
    <script type="text/javascript" src="./../jquery/jquery.js"></script>
    <script type="text/javascript" src="./../jquery/j1.js"></script>
    <script type="text/javascript" src="./../jquery/j2.js"></script>
    <script type="text/javascript" src="./js/jsVentanasEmergentes.js"></script>
    <script type="text/javascript" src="./js/jsTabla.js"></script>

</head>
<body>

<div class="header">

    <a href ="" class ="brand">MyTable - <spam id="nameTitle" style="font-family: 'Arial Black'; color: black"> <?php echo $_SESSION[$id . "nombre"]; ?> </spam></a>
    <input class="menu-btn" type="checkbox" id="menu-btn" />
    <label class="menu-icon" for="menu-btn"><span class="navicon"></span></label>
    <ul class="menu">
        <li><button class="head" id="cambiarConfiguracion" onclick="changeCancel()" style=" text-align: center; font-size: large;">Configuración</button></li>
        <li><button class="head" id="create-table" onclick="changeCancel()" style=" text-align: center; font-size: large;">Crear Tabla</button></li>

        <li><button class="head" id="guardar" style=" text-align: center; font-size: large;" disabled>Guardar</button></li>
        <li><button class="head" id="borrar" style=" text-align: center; font-size: large;" disabled>Borrar Tabla</button></li>
        <li><button class="head" id="ayuda" style=" text-align: center; font-size: large;" >Ayuda</button></li>
        <li>
            <a  id="salir" class="head" href="./pagina/logout.php" style=" text-align: center;">Salir</a>
        </li>
    </ul>
</div>

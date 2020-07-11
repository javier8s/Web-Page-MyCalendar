<html>
<head>

    <title><?php
        echo $pageTitle; ?></title>
    <link rel="icon" sizes="76x76"  href="/publico/css/icon.png">
    <link rel="stylesheet" href="/publico/css/cssFooter.css" type="text/css">
    <link rel="stylesheet" href="/publico/css/cssContenido.css" type="text/css">
    <link rel="stylesheet" href="/publico/css/cssHeader.css" type="text/css">
    <link rel="stylesheet" href="/publico/css/tabla.css" type="text/css">
    <script type="text/javascript" src="/jquery/jquery.js"></script>
    <script type="text/javascript" src="/publico/js/js.js"></script>
    <script type="text/javascript" src="/publico/js/jsCheck.js"></script>
    <script type="text/javascript" src="/publico/js/jsTabla.js"></script>
    <script type="text/javascript" src="/jquery/j1.js"></script>
    <script type="text/javascript" src="/jquery/j2.js"></script>

</head>
<body>
<header class="header">
    <a href="index.php" class ="brand">MyTable</a>
    <input class="menu-btn" type="checkbox" id="menu-btn" />
    <label class="menu-icon" for="menu-btn"><span class="navicon"></span></label>
    <ul class="menu">

        <li><a href="index.php?page=2">Registrarse</a></li>
        <li><a href="index.php?page=1#publico">Tablas públicas</a></li>
        <li><a href="index.php?page=1#imagenes">Imágenes</a></li>
        <li><a href="index.php?page=1#caracteristicas">Características</a></li>
        <?php
        if(isset($_GET['page'])){
        if($_GET['page']==2) {
            echo "<li><a id=\"inicio\" href=\"index.php?page=1\">Volver</a></li>";
        }else {
            echo "<li><a id=\"inicio\" href=\"\" onclick=\"topFunction()\">Principal</a></li>";
        }} else {
            echo "<li><a id=\"inicio\" href=\"\" onclick=\"topFunction()\">Principal</a></li>";
        }
        function volver(){
            header('Location: http://localhost/index.php?page=1');
        }
        ?>

    </ul>
</header>

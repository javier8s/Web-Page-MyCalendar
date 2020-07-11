<div class="wrapper">
    <?php
    // Cuando se registre aparecerá un mensaje
            if(isset($_GET['page'])) {
                $p = $_GET['page'];
                if($p == 5){
                    echo "<div id='msgReg'> --Se acaba de registrar, enhorabuena-- </div>";
                }
            }
                ?>
<section id="principal">
    <div id="log">
        <form  id="formLog" action="validacion.php" method="post">
            <div>
                <div class="textLog">E-mail</div>
                <input class="inputLog"  type="text" name="nombre" placeholder="Insertar nombre de usuario">
            </div>
            <div>
                <div class="textLog">Contraseña</div>
                <input class="inputLog" type="password" name="password" placeholder="Insertar contraseña">
            </div>
            <button id="entrar">Entrar</button>
            <?php
            // Por cada error aparecerá una respuesta diferente
            if(isset($_GET['error'])) {
                $error = $_GET['error'];
                echo "<div id='errorLog'>";
                switch ($error) {
                    case 1:
                        echo "Introduzca un usuario.";
                        break;
                    case 2:
                        echo "Introduzca una contraseña.";
                        break;
                    case 3:
                        echo "Compruebe la contraseña.";
                        break;
                    case 4:
                        echo "No se encontro el usuario.";
                        break;
                    default:
                        echo "";
                }
                echo "</div>";
            }
            ?>
        </form>
        <img src="./publico/css/Log.png"  id="logImg">
    </div>
</section>

<div id="caracteristicas">
    <h1>&nbsp;</h1>
    <h2>Esta p&aacute;gina web se ha hecho mediante:</h2>
    <p>Tecnolog&iacute;as estandarizadas como Javascript, html , y css. <br />Se le ha a&ntilde;adido jquery para realizar eventos como ventanas emergentes, detecci&oacute;n de media query, o manejo de div con el raton.&nbsp;</p>
    <p>Aquí expongo algunos ejemplos de JQuery :&nbsp;</p>
    <pre>
    <code contenteditable spellcheck="false">
        /*Esconder elemento :*/
    $("#dialog-confirm").hide();
        /*Añadir función a un elemento :*/
    $("#mostrarTabla").click(function () { /*Código....*/ })
        /*Crear ventanas de dialogo*/
    $( function() {
        var tips = $( ".validateTips" );
        function updateTips( t ) {
            /* Función para añadir errores de usuario*/
        }
        dialog = $( "#dialog-form" ).dialog({
          /*
            Aqui se establecen atributos para que no se muestre el div...,
            y los botones de entrada y salida
            */
        });

        form = dialog.find( "form" ).on( "submit", function( event ) {
            event.preventDefault();
            /*Insertar
            Funciones de despues del submit
            Tiene que devolver un True para poder salir
            */
        });
        /*Boton de entrada a la ventana de dialogo*/
        $( "#create-table" ).button().on( "click", function() {
            dialog.dialog( "open" );
        });

    } );
    </code>
    </pre>
</div>


<section id="imagenes">
    <div id="txtImg">Imágenes de horarios-ejemplo</div>
    <div style="text-align: center" id="ejemplo">
        <img style="overflow: visible;margin: auto" src="/publico/img/img1.png"></p>
    </div>
    <div id="txtImg">Esquema de la BBDD</div>
    <div class="tech-slideshow">
        <div class="mover-1"></div>
    </div>
</section>



<section id="publico">
    <div id="txtElegir">Elegir tabla: </div>
    <div class="select" id="selectTablas"></div>
    <button id="mostrarTabla">Mostrar Tabla</button>
    <div id="contenido"></div>
</section>

</div>
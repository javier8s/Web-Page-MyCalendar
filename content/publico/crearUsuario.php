
<div class="wrapper">
    <div id="registro">
        <div id="titleRegistro">Registrar Usuario</div>
        <div id="opciones">
            <div id="contenidoRegistro">
                <div id="camposReg">
                    <div class="field"><div class="text">E-mail<span style="color: red">*</span></div><input id="mail" class="inputField" type="email" maxlength="24"><div class="error" id="e4"></div></div>
                    <div class="field"><div class="text">Nombre<span style="color: red">*</span></div><input class="inputField" id="nombre" type="text" maxlength="24"><div class="error" id="e1"></div></div>
                    <div class="field"><div class="text">Apellidos<span style="color: red">*</span></div><input class="inputField" id="apellidos" type="text" maxlength="24"><div class="error" id="e3"></div></div>
                    <div class="field"><div class="text">Contraseña<span style="color: red">*</span></div><input id="pass" class="inputField" type="password" maxlength="24"><div  class="error" id="e5"></div></div>
                    <div class="field"><div class="text">Validar contraseña<span style="color: red">*</span></div><input id="pass2" class="inputField" type="password" maxlength="24"><div  class="error" id="e6"></div></div>
                    <div class="field" style ="display:flex;padding: 3px;"><div style="padding: 5px">Edad</div><input type="text" size="3" id="edad" maxlength="3"/>&emsp;&emsp;&emsp;
                        <span id="e7"></span>&nbsp;</div>


                    <div id="gender">Sexo: <input type="radio" name="sexo" value="hombre" id="hom">Hombre <input type="radio" name="sexo" value="mujer" id="muj">Mujer
                        <div id="terms"><div id="textTerms">Acepto los términos<span style="color: red">*</span></div><div><input onclick="activar()" id="checkterms" type="checkbox"/></div></div>
                        <div ><a id="politica" href="https://www.aepd.es/es/politica-de-privacidad-y-aviso-legal">Click aquí para ver la política de privacidad</a></div>
                 </div>



                </div>
            </div>
            <img src="./publico/css/Registro.png"  id="regImg">
        </div>
        <button class="botReg" id="g" disabled>Guardar</button>
        <button class="botReg" id="b">Borrar</button>
        <div id="errorReg" style="color: red;"></div>
        <form  action="index.php" method="get">
            <button class="botReg" id="s">Salir</button>
        </form>
        <script type="text/javascript" src="/publico/js/jsCheck.js"></script>
    </div>
</div>

<div class="wrapper">
    <div id="contenido" ></div>
    <div id="dialog-confirm" title="Advertencia!">
        <p><span class="ui-icon ui-icon-alert" style=" float:left; margin:12px 12px 20px 0;"></span>La tabla sera borrada, ¿estas seguro?</p>
    </div>

    <div id="dialog" title="Ayuda para las tablas">
        <p style="font-weight: bold; text-align: center;">-- Forma de borrar una tarea --</p>
        <p style=" text-align: center;"><img src="/privado/img/img1.png"></p>

        <p>Deberás hacer click y arrastrar con el raton a una zona fuera de la tabla.
        </p>
        <p style="text-align: center;font-weight: bold;">-- Forma de editar una tarea --</p>
          <p style=" text-align: center;">  <img src="/privado/img/img2.png"></p>
        <p>Deberás hacer click en el texto que quieras editar, entonces podrás editarlo, para parar la edición deberás volver a hacer click sobre el texto en edición.</p>
        <p style=" text-align: center;">----</p>
        <p> Podrás encontrar muchas más funcionalidades explorando la página, ten en cuenta que algunos botones solo aparecen al desplazar el ratón sobre la zona de selección.</p>
        <p style=" text-align: center;">  <img src="/privado/img/img3.png"></p>
    </div>



    <div id="dialog-form" title="Crear tabla">
        <p class="validateTips">Todos los campos son necesarios.</p>
        <form>
            <fieldset style="padding: 5%;">
                <label id="fNombre" for="name">Nombre tabla </label>
                <input type="text" name="name" id="name" value="Tabla 2" class="text ui-widget-content ui-corner-all">
                <div id="dias"  style="padding: 5%; background: azure">
                    <div class="dia">
                        Lunes
                        <input type="checkbox" class="checkDia" value="Lunes" checked>
                    </div>
                    <div class="dia">
                        Martes
                        <input type="checkbox" class="checkDia" value="Martes" checked>
                    </div>
                    <div class="dia">
                        Miercoles
                        <input type="checkbox" class="checkDia" value="Miercoles" checked>
                    </div>
                    <div class="dia">
                        Jueves
                        <input type="checkbox" class="checkDia" value="Jueves" checked>
                    </div>
                    <div class="dia">
                        Viernes
                        <input type="checkbox" class="checkDia" value="Viernes" checked>
                    </div>
                    <div class="dia">
                        Sabado
                        <input type="checkbox" class="checkDia" value="Sabado" checked>
                    </div>
                    <div class="dia">
                        Domingo
                        <input type="checkbox" class="checkDia" value="Domingo" checked>
                    </div>


                    <div id = hInicio style="background:gainsboro; padding: 3%;">
                        Hora de inicio :
                        <select id="horasInicio">
                            <?php
                            for($i=0;$i< 24;$i++){
                                if($i<10){
                                    $h = '0'.$i.":00";
                                }
                                else{
                                    $h = $i.":00";
                                }
                                if($i==8){
                                    echo '<option value=\"optFin' . $i . '" selected="selected">' . $h . '</option>';
                                } else {
                                    echo '<option value=\"optFin' . $i . '" >' . $h . '</option>';
                                }
                            }
                            ?>
                        </select></div>
                    <div id = hFin style="background:gainsboro;  padding: 3%;">
                        Hora de fin :
                        <select id="horasFin">
                            <?php
                            for($i=1;$i< 25;$i++){
                                if($i<10){
                                    $h = '0'.$i.":00";
                                } else{
                                    $h = $i.":00";
                                }
                                if($i==16){
                                    echo '<option value=\"optFin' . $i . '" selected="selected">' . $h . '</option>';
                                } else {
                                    echo '<option value=\"optFin' . $i . '" >' . $h . '</option>';
                                }
                            }
                            ?>
                        </select>
                    </div>
            </fieldset>
        </form>
    </div>
    <div id="configuracionVentana" title="Cambiar configuracion">
        <p class="validateTips">Todos los campos son necesarios.</p>
        <form>
            <fieldset id="camposConf">
                <label id="fNombreConf" for="nameConf">Nombre</label>
                <input type="text" name="nameConf" id="nameConf" value="" class="text ui-widget-content ui-corner-all">
                <label id="fapelConf" for="apelConf">Apellidos</label>
                <input type="text" name="apelConf" id="apelConf" value="" class="text ui-widget-content ui-corner-all">
                <label id="fmail" for="mail">E-mail</label>
                <input type="email" name="mail" id="mail" value="" class="text ui-widget-content ui-corner-all">
                <div style="color:red;" id="errorEmail"></div>
                <label id="fPass" for="pass">Contraseña</label>
                <input type="text" name="pass" id="pass" value="" class="text ui-widget-content ui-corner-all">
                <label id="fPassConf" for="PassConf">Confirma la contraseña</label>
                <input type="text" name="PassConf" id="PassConf" value="" class="text ui-widget-content ui-corner-all">

            </fieldset>
        </form>
    </div>

</div>
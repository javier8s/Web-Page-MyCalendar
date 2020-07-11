user = ""
var table =""
var dias = {}
var hs = 0
var ds = 0
var mq = window.matchMedia( "(max-width: 760px)" );
var md = window.matchMedia( "(min-width: 760px)" );
$(document).ready(function() {
    AJAXGetTablas()
    setListenerMedia()
    $("#dialog-confirm").hide();
    $("#mostrarTabla").click(function () {
        mostrarTabla()
    });
    $("#guardar").click(function () {
        $('.txtTarea').map(function () {
            var div = $(this);
            var tb = div.find('input:text');// Obtiene el texto si existe
            if (tb.length) {// Caso el input ya existe
                div.text(tb.val());
            }
        })
        guardarTabla(table)
    });
    $("#borrar").click(function () {
        dialogBorrar()
    });
    $("#ayuda").click(function () {
        $( "#dialog" ).dialog();
    });

    $('body').click(function () {
        $('.txtTarea').click(function () {
            clicked = $(this)
        })
        $('.txtTarea').map(function () {
            if (!clicked.is($(this))) {
                var div = $(this);
                var tb = div.find('input:text');// Obtiene el texto si existe
                if (tb.length) {// Caso el input ya existe
                    div.text(tb.val());
                }
            }
        })
        clicked = $('contenido');
    })
    document.getElementById("dialog").style.display = "none";
 /* (cambiar tareas antiguo)  $("#cambiarTareas").click(function () {
        edit(this)
    });*/
});
var clicked = $('contenido');
// Editar texto de la tarea
function editarText(event) {
    clicked = $(event);
    var div = $(event);
    var tb = div.find('input:text');// Obtiene el texto si existe
    if (tb.length) {// Caso el input ya existe
        div.text(tb.val());
    } else {
        tb = $('<input>').prop({
            'type': 'text',
            'value': div.text()// Cambia el texto a input
        });
        div.empty().append(tb);// Añade el text
        tb.focus();
    }
}
// MENU DE AYUDA
function dialogAyuda() {
    $(".ui-icon.ui-icon-help").visible = true;
    $( "#dialog-help" ).dialog({
        resizable: false,
        height: "auto",
        width: 400,
        modal: true,
        buttons: {
            "Borrar Tabla": function() {
                $( this ).dialog( "close" );
                $(".ui-icon.ui-icon-help").visible = false;
            },
            Cancel: function() {
                $( this ).dialog( "close" );
                $(".ui-icon.ui-icon-help").visible = false;
            }
        }
    });
}
// MENU BORRAR TABLA + BORRAR TABLA
function dialogBorrar() {
    $(".ui-icon.ui-icon-alert").visible = true;
    $( "#dialog-confirm" ).dialog({
        resizable: false,
        height: "auto",
        width: 400,
        modal: true,
        buttons: {
            "Borrar Tabla": function() {
                $( this ).dialog( "close" );
                deleteTable()
                $(".ui-icon.ui-icon-alert").visible = false;
            },
            Cancel: function() {
                $( this ).dialog( "close" );
                $(".ui-icon.ui-icon-alert").visible = false;
            }
        }
    });
}
function deleteTable(){
    AJAXPostBorrarTabla()
    table= ""
    document.location.href = "/privado/principal.php";
}
// Dias Responsive
function setListenerMedia(){
    mq.addListener(function(){
        if (mq.matches) {
            crearDiaResponsive()
        }
    });
    mq.addListener(function(){
        if (md.matches) {
            if(table!=""){
                $(".diasMov").remove()
            }
        }
    })
}
function crearDiaResponsive() {
    if(table!=""){
        for(var i =  1; i < hs; i++) {
            m=0
            for(var j =  1; j < ds+1; j++) {
                row=  "#row" + i
                n=j +m
                m = m +1
                str = row + " .cell:nth-child("+n+")"
                $(str).after('<div class="diasMov">' + dias[j] + '</div>')
            }
        }
    }
}
// CREAR/MODIFICAR/BORRAR TABLA
function setTable() {
    table = ($('#selecTablas').children("option:selected").attr("id"));
    table = table.substring(5,table.length)
    AJAXGetBuscarTabla(table)
}
function mostrarTabla() {
    if(table !=""){
        document.getElementById("contenido").innerHTML =""
        setTable()
    }else
        setTable()

    enableButtons()
}
function crearTabla(tabla,tarea){
    horas = ((tabla.horas).match(/`([^`]*)(?=`)/g)).map(x=> x.replace('`',''))
    posiciones = setPosicionesTareas(tarea)
    str = '<div id="nombreTabla">'+tabla['nombreTabla']+'</div>'
    str = str+ '<div id="tabla1' +'">'
    array= getDays(str)
    str = array[0]
    num = array[1]
    hs = 1+parseInt(horas[1])-parseInt(horas[0])
    str=getTable(str,num,horas,posiciones)
    $("#contenido").append(str);
    str = setOpciones("",num,hs)
    $("#contenido").prepend(str);
    addConfig()
    if(tabla.publico==0){
        document.getElementById("publico").checked = true;
    }
    table = tabla
    if (mq.matches) {
        crearDiaResponsive()
    }
}
function setOpciones(str,num,hs) {
    str = str +'<div id="opcionesTabla">'
    str = str +'<div id="opcionesAdd">'
    str = str+'<select id="addTask">'
    for(var i = 1; i < num+1; i++) {
        for(var j = 1; j < hs; j++) {
            str = str + '<option>'+i+''+j+'</option>'
        }
    }
    str = str+'</select>'
    str = str+'<input id="nameTask" type="text">'
    str = str+'<button id="a" onclick="añadirBloque()">Añadir tarea</button>'
    str = str +'</div>'
    str = str +'<div id="opcionesPublico">'
    str = str+'<div id="textPublico">Público</div> <input type="checkbox" id="publico" >'
    str = str +'</div>'
    return str
}
function setPosicionesTareas(tarea){
    pos = []
    for(var i=0;i<tarea.length;i++){
        pos.push(tarea[i].p)
    }
    return pos
}
//Actualiza la opciones de las tablas
function insertOptionTables(tablas){
    str = '<div id="txtElegir">Elegir tabla: </div> <select  id="selecTablas" >'
    for(var i = 0; i < tablas.length; i++) {
        str = str + '<option id ="idTab'+tablas[i]['id_Tabla']+'">'+tablas[i]['nombre']+'</option>'
    }
    str = str+'</select>'
    $("#selectTablas").append(str);

}
function cambiarColor(selectObject) {
    s =  'style="    background: indianred;"'
    if(selectObject.value == "Rojo") {    selectObject.parentElement.style.background = "indianred";}
    if(selectObject.value == "Azul") {    selectObject.parentElement.style.background = "#5c6dcd";}
    if(selectObject.value == "Verde") {    selectObject.parentElement.style.background = "#5ccd71";}
}
//Crear Tabla: funciones para crear el html de la tabla
function getTask(tarea,pos) {
    task = ""
    for(var i=0;i<tarea.length;i++){
        if(pos == tarea[i].p) {
            colores = tarea[i].color
            s =  'style="    background: indianred; display = "'
            if(colores == "Rojo") {   s =  'style="background: indianred; "'}
            if(colores == "Azul") {   s =  'style="background: #5c6dcd;"'}
            if(colores == "Verde") {  s =  'style="background: #5ccd71;"'}
            task = task + '<div '+s+' class="task" id="'+tarea[i].idTarea+'"> <div onclick="editarText(this,event)" class="txtTarea" contenteditable="true">' + tarea[i].c+'</div>'
            task = task + insertOptionColors(colores)
            task = task + '</div>'
        }
    }
    return task
}
function insertOptionColors(c) {
    str = '<select style = " background: padding-box;border-radius: 100px;"  onchange="cambiarColor(this, event)" class="selColor" id="selecColor" >'
    colors = ["Rojo" , "Azul","Verde"]
    for (var i = 0; i < colors.length; i++) {
        if(colors[i] == c) {
            str = str + '<option selected="selected">'+colors[i]+'</option>'
        }
        else {str = str + '<option>'+colors[i]+'</option>'}
    }
    str = str+'</select>'
    return str
}
function getDays(str){
    num = 0
    str = str +'<div class="row" id="dias">' +
        '<div class="b0"><button onclick="addRow(this,event)" id="addHS">+</button><button onclick="remRow(this,event)" id="remHS">-</button></div>'

    if(tabla.l=="1"){
        num = num + 1
        str = str + '<div class ="cell">Lunes</div>'
        dias[num] =  "Lunes"
    }
    if(tabla.m=="1"){
        num = num + 1
        str = str + '<div class ="cell">Martes</div>'
        dias[num] =  "Martes"
    }
    if(tabla.x=="1"){
        num = num + 1
        str = str + '<div class ="cell">Miercoles</div>'
        dias[num] =  "Miercoles"
    }
    if(tabla.j=="1"){
        num = num + 1
        str = str + '<div class ="cell">Jueves</div>'
        dias[num] =  "Jueves"
    }
    if(tabla.v=="1"){
        num = num + 1
        str = str + '<div class ="cell">Viernes</div>'
        dias[num] =  "Viernes"
    }
    if(tabla.s=="1"){
        num = num + 1
        str = str + '<div class ="cell">Sabado</div>'
        dias[num] =  "Sabado"
    }
    if(tabla.d=="1"){
        num = num + 1
        str = str + '<div class ="cell">Domingo</div>'
        dias[num] =  "Domingo"
    }
    str = str +'</div>'
    ds = num
    return [str,num]
}
function resetIds() {
    x = 1
    y = 1
    for(var i = 2; i < hs+1; i++) {
        n= i -1
        row = "#tabla1 .row:nth-child("+ i+")"
        $(row).attr("id","row"+n)
        hour = row +" .cell:nth-child(1)"
        $(hour).attr("id","hour"+n)

        for(var j = 2; j < ds+1; j++) {
            p = j-1+""+n
            pos = row +" .cell:nth-child("+j+")"
            $(pos).attr("id",p)
        }
    }
}
function getFirstHour(){
    h1 =$("#hour1").text()
    if(h1[1]==":")
        h1 = h1[0]
    else
        h1 = h1.substring(0,2)
    return h1
}
function addRow(event) {
    str =""
    h1 = parseInt(getFirstHour())
    if(isNaN(h1) ){
        h1 = 0
    }
    if(event.id == "addHS"){
        $("#remHS").attr("disabled", false);
        $("#remHI").attr("disabled", false);
        console.log("sup")
        n1 = h1 -1
        n2 = h1
        hs = hs +1
    }
    if(event.id == "addHI"){
        $("#remHI").attr("disabled", false);
        $("#remHS").attr("disabled", false);
        console.log("inf")
        n1 = hs +h1-1
        n2 = hs +h1
        hs = hs +1
    }
    str = str +'<div class="row" id="row0">'
    str = str + '<div class="cell" id="hour" required>' + n1 + ':00-'+n2+':00</div>'
    for(var i = 1; i < 1+num; i++) {
        str = str + '<div class="cell scheduler "  id="0"><button class="botonAñadirTarea" onclick="botonNuevaTarea(this,event)">+</button><button class="botonEliminarTarea" onclick="botonEliminarTarea(this,event)">-</button></div>'
    }
    str = str + '</div>'

    if(event.id == "addHS"){
        $("#tabla1 .row:nth-child(2)").before(str)
    }
    if(event.id == "addHI"){
        $("#tabla1 .row:nth-last-child(2)").after(str)
    }
    resetIds()
    if(n1== 0)
        $("#addHS").attr("disabled", true);
    if(n2==24)
        $("#addHI").attr("disabled", true);
}
function remRow(event) {
    if(event.id == "remHI") {
        hs = hs -1
        $("#tabla1 .row:nth-last-child(2)").remove()
    }
    if(event.id == "remHS") {
        $("#addHS").attr("disabled", false);
        hs = hs -1
        $("#tabla1 .row:nth-child(2)").remove()
    }
    resetIds()
    if(hs == 1){
        $("#remHI").attr("disabled", true);
        $("#remHS").attr("disabled", true);
        $("#addHS").attr("disabled", true);
    }
}
function getTable(str,num,horas,posiciones){
    hs = 1+parseInt(horas[1])-parseInt(horas[0])
    for(var j =  1; j < hs; j++) {
        str = str +'<div class="row" id="row'+j+'">'
        n1 = j+parseInt(horas[0])-1
        n2 = j+parseInt(horas[0])
        str = str + '<div class="cell" id="hour'+j+'"required>' + n1 + ':00-'+n2+':00</div>'
        for(var i = 1; i < 1+num; i++) {
            pos =  i+''+j
            str = str + '<div class="cell scheduler"  id="'+pos+'">'
            if(posiciones.includes(pos)){
                str = str + getTask(tarea,pos)
            }
            str = str + '<button class="botonAñadirTarea" onclick="botonNuevaTarea(this,event)">+</button><button class="botonEliminarTarea" onclick="botonEliminarTarea(this,event)">-</button></div>'
        }
        str = str + '</div>'
    }
    str = str +'<div class="row" id="row'+j+'">'
    str = str + '<div class="b0" id="endTable" >' +
        '<button id="addHI" onclick="addRow(this,event)">+</button>' +
        '<button onclick="remRow(this,event)" id="remHI">-</button>' +
        '</div>'
    for(var i = 1; i < 1+num; i++) {
        str = str + '<div class="vacio" ></div>'
    }
    str = str + '</div>'
    str = str +'</div>'

    str = str +'</div>'
    return str
}
//Añadir una nueva tarea
function botonNuevaTarea(event) {
    task = '<div class="task new"  editing="1" > <div onclick="editarText(this,event)" class="txtTarea" contenteditable="true"> Nueva Tarea </div>' +insertOptionColors("Rojo")+ '</div>'
    $("#"+$(event).parent().attr('id')).prepend(task)
    addConfig()
}
function botonEliminarTarea(event){
    $("#"+$(event).parent().attr('id')).children("div:first").remove()
}
function añadirBloque(task,pos){
    var pos = $('#addTask').children("option:selected").val();
    var name = document.getElementById('nameTask').value
    parent = "#"+pos
    if(name!=""){
        task = '<div class="task new" editing="1" > <div onclick="editarText(this,event)" class="txtTarea" contenteditable="true">' + name +'</div>' +insertOptionColors("Rojo")+ '</div>'
        $(parent).prepend(task)
        addConfig()
    }
}
var tasks
//Guardar en BBDD
function guardarTabla(idTabla){
    tasks= $("#contenido >#tabla1 > div[class^=\"row\"] > .cell >div[class^=\"task\"]").map(function() {
        if(($(this).css("display")!="none")&& (this.className !="task new ui-draggable ui-draggable-handle")) {
            return [[$(this).find('.txttarea').text(), this.id, this.parentElement.id ,$(this).children("#selecColor").children("option:selected").val() ]]
        }
    }).get();
    h1 = getFirstHour()
    h2 = parseInt(h1) +ds +1
    hours = "`"+h1+"`"+h2+"`1"
    days =""
    AJAXPostActualizarTabla(table.idTabla,hours,days)
    var newTasks= $("#contenido >#tabla1 > div[class^=\"row\"] > .cell >div[class^=\"task\"]").map(function() {

        if(($(this).css("display")!="none")&& (this.className =="task new ui-draggable ui-draggable-handle")) {
            return [[$(this).find('.txttarea').text(), this.id, this.parentElement.id,$(this).children("#selecColor").children("option:selected").val()]]
        }
    }).get();
    if($("#publico").is( ":checked" )){
        publico = 0
    }else
        publico = 1
    nameTabla = document.getElementById("nombreTabla").textContent
    AJAXPostClavePublica(table.idTabla,publico,nameTabla)
    if(tasks.length!=0) {
        AJAXPostAddTask('/conexion/AJAX/AJAXCambiarTAREAPosicionContenido.php',table.idTabla,tasks)
    } else {
       AJAXPostAddTask('/conexion/AJAX/AJAXBorrarTareasPorIdTabla.php',table.idTabla,tasks)
    }
    if(newTasks.length!=0) {
        AJAXPostAddTask('/conexion/AJAX/AJAXInsertarTAREAContenidoPosicion.php',table.idTabla,newTasks)
    }
}
// AJAX
function AJAXPostActualizarTabla(idTabla,hours,days){
    $.ajax({
        url: '/conexion/AJAX/AJAXActualizarTabla.php',
        type: 'POST',
        dataType: 'json',
        data: {idTable: idTabla,hours:hours,days:days}
    })
        .done(function (data) {
                console.log(data)
        })
        .fail(function () {
            console.log("Error al buscar la tabla");
        });
}
function AJAXPostAddTask(url,table,tasks) {
    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'json',
        data: {idTabla: table, tasks:tasks}
    })
        .done(function (data) {
            console.log(data)
        })
        .fail(function () {
            console.log("Error al guardar las tareas.");
        });
}
function AJAXGetBuscarTabla(idTabla){
    $.ajax({
        url: '/conexion/AJAX/AJAXMostrarTABLATodoTAREATodo.php',
        type: 'GET',
        dataType: 'json',
        data: {id: idTabla}
    })
        .done(function (data) {
            if(data.length!=0){
                tabla = data[0]
                tarea = []
                for(var i = 0; i<data[1].length;i++){
                    tarea.push(data[1][i])
                }
                crearTabla(tabla,tarea)
            } else {
                console.log("No hay ide")
            }
        })
        .fail(function () {
            console.log("Error al buscar la tabla");
        });
}
function AJAXGetTablas(){
    user = document.getElementById("usuario").textContent
    user = user.toString()
    $.ajax({
        url: '/conexion/AJAX/AJAXMostrarTABLAIdTablaNombre.php',
        type: 'GET',
        dataType: 'json',
        data: {array: user}
    })
        .done(function (data) {
            insertOptionTables(data)
            if(data.length!=0) {
                mostrarTabla()
            }

        })
        .fail(function () {
            console.log("Error al obtener las tablas.")
        });
}
function AJAXPostBorrarTabla(){
    table = ($('#selecTablas').children("option:selected").attr("id"));
    table = table.substring(5,table.length)
    $.ajax({
        url: '/conexion/AJAX/AJAXBorrarTABLATodoTAREATodo.php',
        type: 'POST',
        dataType: 'json',
        data: {idTabla: table}
    })
        .done(function (data) {
            console.log(data)
        })
        .fail(function () {
            console.log("Error al borrar la tabla");
        });
}
function AJAXPostClavePublica(table,publico,nameTabla){
    $.ajax({
        url: '/conexion/AJAX/AJAXCambiarTABLAPublico.php',
        type: 'POST',
        dataType: 'json',
        data: {idTabla: table, publico: publico,nameTabla:nameTabla}
    })
        .done(function (data) {
            console.log(data)
        })
        .fail(function () {
            console.log("Error al cargar la clave publica");
        });
}
//Actualiza el estado de los botones
function enableButtons() {
    document.getElementById("guardar").disabled = false;
    document.getElementById("borrar").disabled = false;
    //document.getElementById("cambiarTareas").disabled = false;
}
function disableButtons() {
    document.getElementById("guardar").disabled = true;
    document.getElementById("borrar").disabled = true;
    //document.getElementById("mostrarTa").disabled = true;
}
//Permite que se puedan manejar los divs
function addConfig() {

    $('#contenido >#tabla1 > div[class^="row"] > div[class^="cell"] >div[class^="task"]').draggable({
        placeholder: 'place',
        zIndex: 1000,
        containment: 'table',
        helper: function (evt) {
            /*Clona el elmentoy esconde y lo esconde*/
            var that = $(this).clone().get(0);
            $(this).hide();
            return that;
        },
        cursorAt: {
            top: 20,
            left: 20
        }
    });
    $('#contenido >#tabla1 > div[class^="row"] > .cell.scheduler').droppable({
        drop: function (evt, ui) {
            var drag = ui.draggable;
            var drop = this;
            $(drag).detach().css({
                /*Remueve el elemento(manteniendo la informacioón):detach
               * situa al elemento:css()
               *  encadena con prependto
               * lo muestra:show*/
                top: 0,
                left: 0
            }).prependTo($(drop)).show();
        }

    });
}
// Cambio del estado los divs para su edicion
/*
function edit(obj) {
    var $this = $(obj);
    if($this.attr('editing') != '1') {
        $this.text('Parar edición').attr('editing', 1);
        $(document).find('#nombreTabla').each(function() {
            var input = $('<input id="editTable"  style="  text-align: center;  border-style: solid; border-radius: 50px;"/>').val($(this).text());
            $(this).replaceWith(input);
        });
        $(document).find('.task').each(function() {

            var input = $('<input colores="'+$(this).children("#selecColor").children("option:selected").val()+'" class="editing" style="  text-align: center;  border-style: solid; border-radius: 50px;" />').val($(this).clone().children().remove().end().text());

            $(this).replaceWith(input);
        });
        disableButtons()
    } else {
        $this.text('Editar Tareas').removeAttr('editing');
        $(document).find('#editTable').each(function() {
            var div = $('<div id="nombreTabla"/>').text($(this).val());
            $(this).replaceWith(div);
        });
        $(document).find('input.editing').each(function() {
            s =  'style="    background: #5ccd71;"'
            colores = $(this).attr("colores")
            if(colores == "Rojo") {   s =  'style="background: indianred;"'}
            if(colores == "Azul") {   s =  'style="background: #5c6dcd;"'}
            if(colores == "Verde") {  s =  'style="background: #5ccd71;"'}
            var div = $('<div class="task new" '+s+'  contenteditable="true">'+$(this).val()+insertOptionColors("Azul")+'</div><div>');
            $(this).replaceWith(div);
        });
        addConfig()
        enableButtons()
    }


}*/

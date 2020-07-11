// Inicialización de variables
var table =""
var dias = {}
var hs = 0
var ds = 0
var mq = window.matchMedia( "(max-width: 760px)" );
var md = window.matchMedia( "(min-width: 760px)" );
// Cuando el documento este listo , se podrán usar los botones
$(document).ready(function() {
    // Carga la tabla
    if (!document.body.contains(document.getElementById("errorReg"))) {
        AJAXGetTablas()
        setListenerMedia()
    }
    $("#mostrarTabla").click(function () {
        mostrarTabla()
    });

});
// Añade dias cuando se estrecha la pantalla (para ello utiliza un listener)
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
// Funciones de crear la tabla
function mostrarTabla() {
    if(table !=""){
        removeTable()
        setTable()
    }else
        setTable()

}
function removeTable(){
    document.getElementById("contenido").innerHTML =""
}
function setTable() {
    table = ($('#selecTablas').children("option:selected").attr("id"));

    table = table.substring(5,table.length)
    AJAXGetBuscarTabla(table)
}
function setPosicionesTareas(tarea){
   pos = []
    for(var i=0;i<tarea.length;i++){
        pos.push(tarea[i].p)
    }
    return pos
}
function crearTabla(tabla,tarea){
    horas = ((tabla.horas).match(/`([^`]*)(?=`)/g)).map(x=> x.replace('`',''))
    posiciones = setPosicionesTareas(tarea)
    str = '<div id="nombreTabla">'+tabla['nombreTabla']+'</div>'
    str = str+ '<div id="tabla1' +'">'
    array= getDays(str)
    str = array[0]
    num = array[1]
    str=getTable(str,num,horas,posiciones)
    $("#contenido").append(str);

    if(tabla.publico==0){
        document.getElementById("publico").checked = true;
    }
    table = tabla
    if (mq.matches) {
        crearDiaResponsive()
    }
}
//Actualiza la opciones de las tablas
function insertOptionTables(tablas){
    str = ' <select  id="selecTablas" >'
    for(var i = 0; i < tablas.length; i++) {
        str = str + '<option id ="idTab'+tablas[i]['id_Tabla']+'">'+tablas[i]['nombre']+'</option>'
    }
    str = str+'</select>'
    $("#selectTablas").append(str);
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
            task = task + '<div  '+s+'  class="task" id="'+tarea[i].idTarea+'">' + tarea[i].c + '</div>'
        }
    }
    return task
}
function getDays(str){
    num = 0
    str = str +'<div class="row" id="dias">' +
        '<div id="b0">00:00-00:00</div>'

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
function getTable(str,num,horas,posiciones){
    hs = 1+parseInt(horas[1])-parseInt(horas[0])
    for(var j =  1; j < hs; j++) {
        str = str +'<div class="row" id="row'+j+'">'
        n1 = j+parseInt(horas[0])-1
        n2 = j+parseInt(horas[0])
        str = str + '<div class="cell" id="hour"required>' + n1 + ':00-'+n2+':00</div>'
        for(var i = 1; i < 1+num; i++) {
            pos =  i+''+j
            str = str + '<div class="cell scheduler" id="'+pos+'">'
            if(posiciones.includes(pos)){
                str = str + getTask(tarea,pos)
            }
            str = str + '</div>'
        }
        str = str + '</div>'
    }
    x = i
    y = j
    str = str +'</div>'

    str = str +'</div>'
    str = str +'</div>'
    return str
}

// AJAX

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
    $.ajax({
        url: '/conexion/AJAX/AJAXMostrarTABLAIdTablaNombreSoloPublicas.php',
        type: 'GET',
        dataType: 'json'
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

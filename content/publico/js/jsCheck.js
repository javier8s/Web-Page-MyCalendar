// Cuando el documento este listo se pueden usar los botones
$(document).ready(function(){
    $("#g").click(function(){

        check()
    });
    $("#b").click(function(){

        borrarTodo()
    });
});
// Función para activar guardar
function activar(){
    document.getElementById('g').disabled=
        !document.getElementById('g').disabled;
}

// Funciones del formulario
function borrarTodo() {
    borrarErrores()
    document.getElementById("nombre").value = "";
    document.getElementById("apellidos").value = "";
    document.getElementById("mail").value = "";
    document.getElementById("pass").value = "";
    document.getElementById("pass2").value = "";
}
function borrarErrores() {
    document.getElementById("e1").innerHTML = "";
    document.getElementById("e3").innerHTML = "";
    document.getElementById("e4").innerHTML = "";
    document.getElementById("e5").innerHTML = "";
    document.getElementById("e6").innerHTML = "";
    document.getElementById("errorReg").innerHTML = "";

}
function check() {
    var nom = document.getElementById("nombre").value;
    var ape = document.getElementById("apellidos").value;
    var mail = document.getElementById("mail").value;
    var pass = document.getElementById("pass").value;
    var pass2 = document.getElementById("pass2").value;
    var edad = document.getElementById("edad").value;
    var errorv=false;
    if (!/[a-z]+$/.test(nom)) {
        errorv = true;
        document.getElementById("e1").innerHTML = "Solo se permiten minusculas, sin espacios u otros caracteres.";
    }
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(mail)) {
        errorv = true;
        document.getElementById("e4").innerHTML = "Tipo de E-mail no válido";
    }
    if(checkEmail(mail) == "true"){
        errorv = true;
        document.getElementById("e4").innerHTML = " E-mail ya registrado";
    }
    if (pass == "") {
        errorv = true;
        document.getElementById("e5").innerHTML = " Campo obligatorio";
    }
    if(!/^110$|^10\d$|^[1-9]\d$|^[1-9]$/.test(edad) && edad!=""){
        errorv=true;
        document.getElementById("e7").innerHTML=" Edad incorrecta";
    }
    if (pass2 != pass) {
        errorv = true;
        document.getElementById("e6").innerHTML = " La contraseña no coincide";
    }
    if (!errorv) {
        borrarErrores()
        enviar(nom,ape,mail,pass)
    }
}

function salir() {
    $.ajax({
        url: 'index.php',
        type: 'get',
        dataType: 'json',
    })
        .done(function (data) {
        })
        .fail(function () {
            console.log("Error al salir");
        });
}

function enviar(nom,ape,mail,pass){
    $.ajax({
        url: "./conexion/AJAX/AJAXinsertarNuevoUsuario.php",
        type: 'POST',
        dataType: 'json',
        data: {nom:nom,ape:ape,mail:mail,pass:pass},
        success: function (result) {
            console.log(result);
            document.location.href = 'http://localhost/index.php?page=5',true;
        }
    }) .fail(function () {
        document.getElementById("errorReg").textContent="El usuario ya esta registrado. "
        $("#errorReg").show()
        console.log("Error al guardar");
    });

}


function checkEmail(mail){
    return $.ajax({
        async:false,
        url: "./conexion/AJAX/AJAXcheckEmail.php",
        type: 'GET',
        dataType: 'json',
        data: {mail:mail}
    }).responseText;
}
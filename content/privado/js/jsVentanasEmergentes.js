checkedVals = []
// Función AJAX para insertar tabla
$( function() {
    var dialog, form,
        name = $( "#name" ),
        allFields = $( [] ).add( name ),
        tips = $( ".validateTips" );

    function updateTips( t ) {
        tips
            .text( t )
            .addClass( "ui-state-highlight" );
        setTimeout(function() {
            tips.removeClass( "ui-state-highlight", 1500 );
        }, 500 );
    }

    function checkLength( o, n, min, max ) {
        if ( o.val().length > max || o.val().length < min ) {
            o.addClass( "ui-state-error" );
            updateTips( "La longitud de la " + n + " debe ser entre " +
                min + " y " + max + "." );
            return false;
        } else {
            return true;
        }
    }
    function checkRegexp( o, regexp, n ) {
        if ( !( regexp.test( o.val() ) ) ) {
            o.addClass( "ui-state-error" );
            updateTips( n );
            return false;
        } else {
            return true;
        }
    }

    function checkHours(horaInicio,horaFin) {
        if(horaInicio.substring(0,2)>=horaFin.substring(0,2)){
            updateTips ("Debes seleccionar una hora de fin superior a la inicial.")
            return false
        } else
            return true
    }
    function checkDays() {
        n = 0
        checkedVals = ""
        checkedVals = $('.checkDia:checkbox').map(function() {
           if (this.checked) {
               return this.value;
           }
           else{
                n++
                return "Unchecked"
            }
        }).get();
        if(n != 7) {
            return true
        } else {
            updateTips ("Debes seleccionar al menos un día.")
            return false
        }

    }

    function addTable() {
        var valid = true;
        horaInicio = $( "#horasInicio option:selected" ).html()
        horaFin = $( "#horasFin option:selected" ).html()

        allFields.removeClass( "ui-state-error" );

        valid = valid && checkLength( name, "tabla", 3, 16 );

        valid = valid && checkRegexp( name, /^[a-z]([0-9a-z_\s])+$/i, "La tabla puede tener letras de la a-z, 0-9, barra bajas o espacios; y debe empezar con una letra." );

        valid = valid && checkHours(horaInicio,horaFin)

        valid = valid && checkDays()

        if ( valid ) {

            insertarTabla(horaInicio,horaFin,name.val())

            dialog.dialog("close");

        }
        return valid;
    }

    dialog = $( "#dialog-form" ).dialog({
        autoOpen: false,
        height: 500,
        width: 500,
        modal: true,
        buttons: {
            "Crear Tabla": addTable,
            Cancel: function() {
                dialog.dialog( "close" );
            }
        },
        close: function() {
            form[ 0 ].reset();
            allFields.removeClass( "ui-state-error" );
        }
    });

    form = dialog.find( "form" ).on( "submit", function( event ) {
        event.preventDefault();
        addTable();
    });

    $( "#create-table" ).button().on( "click", function() {
        dialog.dialog( "open" );
    });

} );
function insertarTabla(horaInicio,horaFin,name) {
    user = document.getElementById("usuario").textContent
    horas = '`'+parseInt(horaInicio.substring(0,2))+'`'+parseInt(horaFin.substring(0,2))+'`1`';
    console.log("nombre","horas : ",horas)
    $.ajax({
           url: '/conexion/AJAX/AJAXInsertarTABLATodo.php',
           type: 'POST',
           dataType: 'json',
           data: {idUser:user,name:name,checkedVals:checkedVals,horas:horas}
       })
           .done(function (data, id) {
               console.log(data,name)
               insertTableInOption(data,name)
           })
           .fail(function () {
               console.log("Error al cargar las asignaturas");
           });

}


function insertTableInOption(idTabla,name) {
    str = '<option id ="idTab'+idTabla+'">'+name+'</option>'
    $("#selecTablas").append(str);
}

function changeCancel(){
    $(".ui-dialog-buttonset>.ui-button.ui-corner-all.ui-widget:last-child").html("Salir");

}





$( function() {
    var dialog, form,
        name = $( "#nameConf" ),
        apel = $( "#apelConf" ),
        pass = $( "#pass" ),
        passC = $( "#PassConf" ),
        mail = $( "#mail" ),
        allFields = $( [] ).add( name ).add( apel ).add( pass ).add( passC ).add( mail ),
        tips = $( ".validateTips" );

    function updateTips( t ) {
        tips
            .text( t )
            .addClass( "ui-state-highlight" );
        setTimeout(function() {
            tips.removeClass( "ui-state-highlight", 1500 );
        }, 500 );
    }

    function checkLength( o, n, min, max ) {
        if ( o.val().length > max || o.val().length < min ) {
            o.addClass( "ui-state-error" );
            updateTips( "La longitud de la " + n + " debe ser entre " +
                min + " y " + max + "." );
            return false;
        } else {
            return true;
        }
    }
    function checkRegexp( o, regexp, n ) {
        if ( !( regexp.test( o.val() ) ) ) {
            o.addClass( "ui-state-error" );
            updateTips( n );
            return false;
        } else {
            return true;
        }
    }

    function passEquals(p1,p2,txt){
        if(p1!=p2) {
            passC.addClass("ui-state-error");
            updateTips(txt)
            return false
        }else return true
    }

    function addUser() {
        var valid = true;
        allFields.removeClass( "ui-state-error" );
       valid = valid && checkLength( name, "nombre", 3, 16 );
        valid = valid && checkRegexp( name, /^[a-z]([0-9a-z_\s])+$/i, "El nombre debe tener letras de la a-z, 0-9, barra bajas o espacios; y debe empezar con una letra." );
        valid = valid && checkLength( apel, "apellido", 3, 16 );
        valid = valid && checkRegexp( apel, /^[a-z]([0-9a-z_\s])+$/i, "La apellido puede tener letras de la a-z, 0-9, barra bajas o espacios; y debe empezar con una letra." );
        valid = valid && checkRegexp( mail, /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/i, "El e-mail debe tener estructura de correo electrónico, ejemplo mymail@mail.com." );
        valid = valid && checkLength( pass, "contraseña", 3, 16 );
        valid = valid && passEquals(pass[0].value,passC[0].value,"Las contraseñas no coinciden.");

        if ( valid ) {
            user = document.getElementById("usuario").textContent
            user = user.toString()
            document.getElementById("nameTitle").textContent = name[0].value
            AJAXactualizardatos(user , name[0].value , apel[0].value , pass[0].value , mail[0].value )
            dialog.dialog("close");
        }
        return valid;
    }
    dialog = $( "#configuracionVentana" ).dialog({
        autoOpen: false,
        height: 500,
        width: 500,
        modal: true,
        buttons: {
            "Guardar": addUser,
            Cancel: function() {
                dialog.dialog( "close" );
            }
        },
        close: function() {
            form[ 0 ].reset();
            allFields.removeClass( "ui-state-error" );
        }
    });
    form = dialog.find( "form" ).on( "submit", function( event ) {
        event.preventDefault();
        addTable();
    });
    $( "#cambiarConfiguracion" ).button().on( "click", function() {
        dialog.dialog( "open" );
    });

} );


function AJAXactualizardatos(id,nom,ape,pass,mail) {
    console.log(id,nom,ape,pass,mail)
    $.ajax({
        url: "./../conexion/AJAX/AJAXActualizarUsuario.php",
        type: 'POST',
        dataType: 'json',
        data: {nom:nom,ape:ape,mail:mail,id:id,pass:pass},
        success: function (result) {
            console.log(result)
        }
    }) .fail(function () {
        console.log("");
    });
}

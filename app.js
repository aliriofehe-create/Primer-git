
// =====================================================
// 1. OBTENER LOS ELEMENTOS DEL HTML
// =====================================================

// Buscamos el formulario por su identificador.
const formulario = document.getElementById("formulario");

// Guardamos una referencia al campo del nombre.
const nombre = document.getElementById("nombre");

// Guardamos una referencia al campo del correo.
const correo = document.getElementById("correo");

// Guardamos una referencia al campo de la edad.
const edad = document.getElementById("edad");

// Guardamos una referencia al campo de la contraseña.
const contrasena = document.getElementById("contrasena");

// Guardamos una referencia al campo de confirmación.
const confirmar = document.getElementById("confirmar");

// Buscamos el lugar donde mostraremos el mensaje general.
const mensajeGeneral = document.getElementById("mensajeGeneral");


// =====================================================
// 2. FUNCIÓN PARA MOSTRAR ERRORES
// =====================================================

// Creamos una función reutilizable para validar campos.
// Recibe el campo, el mensaje de error y el elemento del mensaje.
function mostrarError(campo, mensaje, elementoError) {

    // Escribimos el mensaje dentro del elemento HTML.
    elementoError.textContent = mensaje;

    // Agregamos la clase CSS que dibuja el borde rojo.
    campo.classList.add("invalido");

    // Quitamos la clase verde, si estaba presente.
    campo.classList.remove("valido");
}


// =====================================================
// 3. FUNCIÓN PARA MARCAR UN CAMPO COMO CORRECTO
// =====================================================

// Creamos otra función para indicar que el campo es válido.
function marcarValido(campo, elementoError) {

    // Eliminamos cualquier mensaje de error anterior.
    elementoError.textContent = "";

    // Quitamos el borde rojo del campo.
    campo.classList.remove("invalido");

    // Agregamos el borde verde.
    campo.classList.add("valido");
}


// =====================================================
// 4. VALIDAR CUANDO EL USUARIO ENVÍA EL FORMULARIO
// =====================================================

// Escuchamos el evento submit del formulario.
// Se activa al pulsar el botón o enviar con el teclado.
formulario.addEventListener("submit", function(evento) {

    // Evitamos que el navegador envíe o recargue la página.
    // Primero comprobaremos todos los datos con JavaScript.
    evento.preventDefault();

    // Suponemos que todo es correcto hasta encontrar un error.
    let formularioValido = true;

    // Limpiamos el mensaje general de intentos anteriores.
    mensajeGeneral.textContent = "";

    // Restablecemos el color del mensaje general.
    mensajeGeneral.style.color = "";

    // -------------------------------------------------
    // VALIDACIÓN DEL NOMBRE
    // -------------------------------------------------

    // Obtenemos el nombre sin espacios al principio o al final.
    const valorNombre = nombre.value.trim();

    // Buscamos el elemento donde aparecerá el error del nombre.
    const errorNombre = document.getElementById("errorNombre");

    // Comprobamos si el usuario dejó el nombre vacío.
    if (valorNombre === "") {

        // Mostramos un mensaje porque el campo es obligatorio.
        mostrarError(nombre, "El nombre es obligatorio.", errorNombre);

        // Indicamos que el formulario tiene un error.
        formularioValido = false;

    // Si no está vacío, comprobamos su longitud.
    } else if (valorNombre.length < 3) {

        // Mostramos un mensaje si tiene menos de 3 caracteres.
        mostrarError(
            nombre,
            "El nombre debe tener al menos 3 caracteres.",
            errorNombre
        );

        // Registramos que existe un error.
        formularioValido = false;

    } else {

        // Si supera las comprobaciones, marcamos el nombre como válido.
        marcarValido(nombre, errorNombre);
    }


    // -------------------------------------------------
    // VALIDACIÓN DEL CORREO ELECTRÓNICO
    // -------------------------------------------------

    // Obtenemos el correo y eliminamos espacios externos.
    const valorCorreo = correo.value.trim();

    // Buscamos el espacio para mostrar el error del correo.
    const errorCorreo = document.getElementById("errorCorreo");

    // Expresión regular sencilla para comprobar el formato del correo.
    const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Primero verificamos que el correo no esté vacío.
    if (valorCorreo === "") {

        // Mostramos un mensaje si no se ingresó ningún correo.
        mostrarError(correo, "El correo es obligatorio.", errorCorreo);

        // Marcamos el formulario como incorrecto.
        formularioValido = false;

    // Si tiene contenido, verificamos que su formato sea válido.
    } else if (!formatoCorreo.test(valorCorreo)) {

        // Mostramos el mensaje si el formato no es válido.
        mostrarError(
            correo,
            "Ingresa un correo válido, por ejemplo: ana@ejemplo.com.",
            errorCorreo
        );

        // Indicamos que existe un error.
        formularioValido = false;

    } else {

        // Si el formato es correcto, marcamos el correo como válido.
        marcarValido(correo, errorCorreo);
    }


    // -------------------------------------------------
    // VALIDACIÓN DE LA EDAD
    // -------------------------------------------------

    // Guardamos el contenido del campo de edad.
    const valorEdad = edad.value;

    // Buscamos el elemento que mostrará el error de edad.
    const errorEdad = document.getElementById("errorEdad");

    // Comprobamos si el campo está vacío.
    if (valorEdad === "") {

        // Solicitamos que el usuario ingrese su edad.
        mostrarError(edad, "La edad es obligatoria.", errorEdad);

        // Registramos que existe un error.
        formularioValido = false;

    } else {

        // Convertimos el valor de texto a un número.
        const numeroEdad = Number(valorEdad);

        // Comprobamos que sea un entero entre 16 y 100.
        if (
            !Number.isInteger(numeroEdad) ||
            numeroEdad < 16 ||
            numeroEdad > 100
        ) {

            // Informamos el rango de edad permitido.
            mostrarError(
                edad,
                "Ingresa una edad entera entre 16 y 100 años.",
                errorEdad
            );

            // Marcamos el formulario como incorrecto.
            formularioValido = false;

        } else {

            // Si cumple el rango, la edad es válida.
            marcarValido(edad, errorEdad);
        }
    }


    // -------------------------------------------------
    // VALIDACIÓN DE LA CONTRASEÑA
    // -------------------------------------------------

    // Obtenemos la contraseña ingresada.
    const valorContrasena = contrasena.value;

    // Buscamos el espacio para mostrar el error.
    const errorContrasena =
        document.getElementById("errorContrasena");

    // Comprobamos que tenga al menos 8 caracteres.
    if (valorContrasena.length < 8) {

        // Mostramos un mensaje si es demasiado corta.
        mostrarError(
            contrasena,
            "La contraseña debe tener al menos 8 caracteres.",
            errorContrasena
        );

        // Indicamos que hay un error.
        formularioValido = false;

    } else {

        // Si cumple la longitud, marcamos la contraseña como válida.
        marcarValido(contrasena, errorContrasena);
    }


    // -------------------------------------------------
    // VALIDACIÓN DE LA CONFIRMACIÓN DE CONTRASEÑA
    // -------------------------------------------------

    // Obtenemos el texto del campo de confirmación.
    const valorConfirmar = confirmar.value;

    // Buscamos el espacio para mostrar su mensaje de error.
    const errorConfirmar =
        document.getElementById("errorConfirmar");

    // Comprobamos que el campo no esté vacío.
    if (valorConfirmar === "") {

        // Informamos que debe confirmar la contraseña.
        mostrarError(
            confirmar,
            "Debes confirmar la contraseña.",
            errorConfirmar
        );

        // Registramos que hay un error.
        formularioValido = false;

    // Comparamos ambas contraseñas.
    } else if (valorConfirmar !== valorContrasena) {

        // Informamos que las contraseñas son diferentes.
        mostrarError(
            confirmar,
            "Las contraseñas no coinciden.",
            errorConfirmar
        );

        // Marcamos el formulario como incorrecto.
        formularioValido = false;

    } else {

        // Si coinciden, marcamos la confirmación como válida.
        marcarValido(confirmar, errorConfirmar);
    }


    // =================================================
    // 5. MOSTRAR EL RESULTADO FINAL
    // =================================================

    // Comprobamos si todas las validaciones fueron exitosas.
    if (formularioValido) {

        // Mostramos un mensaje de confirmación.
        mensajeGeneral.textContent =
            "¡Registro validado correctamente!";

        // Pintamos el mensaje de verde.
        mensajeGeneral.style.color = "#188038";

        // En este ejemplo no se guardan ni se envían los datos.
        // Aquí podría conectarse un servidor para procesar el registro.

    } else {

        // Informamos que el usuario debe corregir los campos.
        mensajeGeneral.textContent =
            "Revisa los campos marcados y corrige los errores.";

        // Pintamos el mensaje general de rojo.
        mensajeGeneral.style.color = "#d93025";
    }

});

/* ----------------------------- constantes JSON ---------------------------- */
const pacienteCargadoJS = localStorage.getItem("Pacientes")
const pacienteCargadoArray = JSON.parse(pacienteCargadoJS)

/* ---------------------------- constantes Logeo ---------------------------- */
const logeoDni = document.getElementById("usuarioLogeo")
const logeoContrasenia = document.getElementById("contraseniaLogeo")
const sectionCrarUsuario = document.getElementById("sectionCrarUsuario");


/* ----------------- constantes inputs cambio de contraseña ----------------- */
const inputContraseniaDni = document.getElementById("inputContraseniaDni");
const inputContraseniaContrasenia = document.getElementById("inputContraseniaContrasenia");

/* ------------------------ constantes inputs CREAR USUARIO ------------------------ */

let inputNombre = document.getElementById("usuarioNombre")
let inputApellido = document.getElementById("usuarioApellido")
let inputDni = document.getElementById("usuarioDni")
let inputContrasenia = document.getElementById("usuarioContrasenia")

/* ------------------------- Array listaDePacientes ------------------------- */

let listaDePacientes = []

/* ----- inicializo array de pacientes con elementos en el localStorage ----- */
if (pacienteCargadoJS !== null) {
    listaDePacientes = JSON.parse(pacienteCargadoJS)
}


/* --------------------------------- Objeto --------------------------------- */
class Paciente {
    constructor(nombre, apellido, dni, contrasenia) {
        this.nombre = nombre
        this.apellido = apellido
        this.dni = dni
        this.contrasenia = contrasenia
    }
}


/* --------------------------------- BOTONES -------------------------------- */

/* -------------------- Boton Administrador -------------------- */
const botonAdministrador = document.getElementById("administrador");

botonAdministrador.addEventListener("click", () => {
    console.log("Apreto administrador");
})


/* -------------------- Boton Ingrear -------------------- */
const botonIngreasar = document.getElementById("ingresar");

botonIngreasar.addEventListener("click", () => {
    if (pacienteCargadoJS == null) {
        alert("Usuario no existe o contraseña incorrecta")
        window.location.reload()
    } else if (logeoDni.value == " " && logeoContrasenia == " ") {
        alert("DNI o Contraseña incorrecto")
        window.location.reload()
    } else {
        validarUsuaro()
        window.location.reload()
    }
})


/* --------------------------- boton crear Usuario -------------------------- */

const botonCrearUsuario = document.getElementById("crearUsuario");

botonCrearUsuario.addEventListener("click", () => {
    if (pacienteCargadoJS == null) {
        crearUsuario()
    } else {
        usuarioYaExiste()
    }
    window.location.reload()
})

/* ---------------------- boton crear usuario en logeo ---------------------- */

const crearUsuarioLogeo = document.getElementById("crearUsuarioLogeo")

crearUsuarioLogeo.addEventListener("click", () => {
    sectionCrarUsuario.className = " "
})

/* ---------------------- boton cambair contraseña en logeo ---------------------- */
const olvidoContrasenia = document.getElementById("olvidoContrasenia")

olvidoContrasenia.addEventListener("click", () => {
    restablecerContrasenia.className = " "
})


/* ------------------------ boton Restablecer contraseña ------------------------ */
const cambiarContraseniaUsuario = document.getElementById("cambiarContraseniaUsuario")

cambiarContraseniaUsuario.addEventListener("click", () => {
    if (inputContraseniaDni.value == "" && inputContraseniaContrasenia.value == "") {
        alert("Porfavor complete todos los campos")
    } else {
        restablecer()
    }
})


/* -------------------------------- FUNCIONES ------------------------------- */
function crearUsuario() {
    if (inputNombre.value !== "" && inputApellido.value !== "" && inputDni.value !== "" && inputContrasenia.value !== "") {
        /* ---------------------- Almaceno inputs en un objeto ---------------------- */
        let nuevoPaciente = new Paciente(inputNombre.value, inputApellido.value, inputDni.value, inputContrasenia.value)

        /* ------------ pusheo nuevoPaciente a mi array listaDePacientes ------------ */
        listaDePacientes.push(nuevoPaciente)

        /* ------------ Almaceno objeto en localStorage y lo paso a JSON ------------ */
        localStorage.setItem("Pacientes", JSON.stringify(listaDePacientes))
        alert("Usuario cargado con exito")
        sectionCrarUsuario.className = "displayNone"
        window.location.reload()
    } else {
        alert("Complete todos los campos por favor")
    }
}

function usuarioYaExiste() {
    const dniUsuario = pacienteCargadoArray.some((elemento) => {
        return elemento.dni === inputDni.value
    })
    if (dniUsuario === true) {
        alert("Usuario Existente")
    } else {
        crearUsuario()
    }
}

function validarUsuaro() {
    /* -------------------------- filtro array por dni -------------------------- */
    const dniLogeo = pacienteCargadoArray.filter((elemento) => {
        return elemento.dni === logeoDni.value
    })
    /*agarro ese nuevo array y uso some para que me devuelva true si usuario y contraseña son corrctas */
    const contraseniaLogeo = dniLogeo.some((elemento) => {
        return elemento.contrasenia === logeoContrasenia.value
    })
    if (contraseniaLogeo === true) {
        alert("Acceso Correcto")
    } else {
        alert("DNI o Contraseña incorrecto")
    }
}

function restablecer() {
    //busco usuario por dni y saco su posicion en el array
    let dniUsuario = pacienteCargadoArray.findIndex((elemento) => {
        return elemento.dni === inputContraseniaDni.value
    })

    //en el numero de indice modifico la contraseña por el input contraseña
    listaDePacientes[dniUsuario].contrasenia = inputContraseniaContrasenia.value
    //cargo lista en localStorage
    localStorage.setItem("Pacientes", JSON.stringify(listaDePacientes))
    alert("Se modificó contraseña correctamente")
    restablecerContrasenia.className = "displayNone"
    window.location.reload()
}



//localStorage.clear() 
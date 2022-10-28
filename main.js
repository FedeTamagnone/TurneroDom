/* ----------------------------- constantes JSON ---------------------------- */
const pacienteCargadoJS = localStorage.getItem("Pacientes")
const pacienteCargadoArray = JSON.parse(pacienteCargadoJS)

/* ---------------------------- constantes Logeo ---------------------------- */
const logeoDni = document.getElementById("usuarioLogeo")
const logeoContrasenia = document.getElementById("contraseniaLogeo")
const crearUsuarioLogeo = document.getElementById("crearUsuarioLogeo")
const olvidoContraseña = document.getElementById("olvidoContraseña")
const sectionCrarUsuario = document.getElementById("sectionCrarUsuario");



/* ------------------------ constantes crear usuario ------------------------ */
const botonCrearUsuario = document.getElementById("crearUsuario");
let inputNombre = document.getElementById("usuarioNombre")
let inputApellido = document.getElementById("usuarioApellido")
let inputDni = document.getElementById("usuarioDni")
let inputContrasenia = document.getElementById("usuarioContrasenia")
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


/* botones */

/* -------------------- boton Administrador -------------------- */
const botonAdministrador = document.getElementById("administrador");

botonAdministrador.addEventListener("click", () => {
    console.log("Apreto administrador");
})


/* -------------------- boton Ingrear -------------------- */
const botonIngreasar = document.getElementById("ingresar");

botonIngreasar.addEventListener("click", () => {
    if (pacienteCargadoJS == null) {
        alert("Usuario no existe o contraseña incorrecta")
    } else if (logeoDni.value == " " && logeoContrasenia == " ") {
        alert("DNI o Contraseña incorrecto")
    } else {
        validarUsuaro()
    }
})

botonCrearUsuario.addEventListener("click", () => {
    crearUsuario()
})

crearUsuarioLogeo.addEventListener("click", () => {
    sectionCrarUsuario.className = " "
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
        sectionCrarUsuario.className = "usuario"
    } else {
        alert("Complete todos los campos por favor")
    }
}

function usuarioYaExiste() {
    if (pacienteCargadoJS == null) {
        alert("Complete todos los campos por favor")
    } else {
        const dniUsuario = pacienteCargadoArray.some((elemento) => {
            return elemento.dni === inputDni.value
        })
        if (dniUsuario === true) {
            alert("Usuario Existente")
        }
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
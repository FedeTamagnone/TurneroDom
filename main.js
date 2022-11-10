/* ----------------------------- constantes JSON ---------------------------- */
const pacienteCargadoJS = localStorage.getItem("Pacientes")
const pacienteCargadoArray = JSON.parse(pacienteCargadoJS)

/* ---------------------------- constantes Logeo ---------------------------- */
const logeoDni = document.getElementById("usuarioLogeo")
const logeoContrasenia = document.getElementById("contraseniaLogeo")
const sectionCrarUsuario = document.getElementById("sectionCrarUsuario");
const sectionLogeoUsuario = document.getElementById("sectionLogeoUsuario")


/* ----------------- constantes inputs cambio de contraseña ----------------- */
const inputContraseniaDni = document.getElementById("inputContraseniaDni");
const inputContraseniaContrasenia = document.getElementById("inputContraseniaContrasenia");
const restablecerContrasenia = document.getElementById("restablecerContrasenia")

/* ------------------------ constantes inputs CREAR USUARIO ------------------------ */

let inputNombre = document.getElementById("usuarioNombre")
let inputApellido = document.getElementById("usuarioApellido")
let inputDni = document.getElementById("usuarioDni")
let inputContrasenia = document.getElementById("usuarioContrasenia")

/* ---------------------------- seccion Pacientes --------------------------- */
const sectionPaciente = document.getElementById("sectionPaciente")

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


/* -------------------- Boton Ingresar -------------------- */
const botonIngreasar = document.getElementById("ingresar");

botonIngreasar.addEventListener("click", () => {
    if (pacienteCargadoJS == null || logeoDni.value == " " && logeoContrasenia.value == " ") {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Usuario no existe o contraseña incorrecta',
        })
        logeoDni.value = ""
        logeoContrasenia.value = ""
    } else {
        validarUsuario()
        //window.location.reload()
    }
})


/* --------------------------- boton crear Usuario -------------------------- */

const botonCrearUsuario = document.getElementById("crearUsuario");
const cerrarPestania = document.getElementById("cerrarPestania")

botonCrearUsuario.addEventListener("click", () => {
    if (pacienteCargadoJS == null) {
        crearUsuario()
    } else {
        usuarioYaExiste()
    }
    window.location.reload()
})

cerrarPestania.addEventListener("click", () => {
    sectionCrarUsuario.className = "displayNone"
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
const cerrarPestaniaContra = document.getElementById("cerrarPestaniaContra")

cambiarContraseniaUsuario.addEventListener("click", () => {
    if (inputContraseniaContrasenia.value === "") {
        alert("Porfavor complete todos los campos")
    } else {
        restablecer()
        window.location.reload()
    }
})
cerrarPestaniaContra.addEventListener("click", () => {
    restablecerContrasenia.className = "displayNone"
})

/* -------------------------------- FUNCIONES ------------------------------- */
function crearUsuario() {
    if (inputNombre.value !== "" && inputApellido.value !== "" && inputDni.value !== "" && inputContrasenia.value !== "") {
        /* ---------------------- Almaceno inputs en un objeto ---------------------- */
        let nuevoPaciente = new Paciente(inputNombre.value, inputApellido.value, inputDni.value, inputContrasenia.value, " ", " ")

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

function validarUsuario() {
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
        sectionLogeoUsuario.className = "displayNone"
        imprimirPaciente()
    } else {
        alert("DNI o Contraseña incorrecto")
        window.location.reload()
    }
}

function restablecer() {
    //busco usuario por dni y saco su posicion en el array

    // FindIndex devuelve -1 si no encuentra. Con un if condicionar la variante
    let dniUsuario = pacienteCargadoArray.findIndex((elemento) => {
        return elemento.dni === inputContraseniaDni.value
    })
    if (dniUsuario === -1) {
        alert("Usuario no encontrado")
    } else {
        //en el numero de indice modifico la contraseña por el input contraseña
        listaDePacientes[dniUsuario].contrasenia = inputContraseniaContrasenia.value
        //cargo lista en localStorage
        localStorage.setItem("Pacientes", JSON.stringify(listaDePacientes))
        alert("Se modificó contraseña correctamente")
        window.location.reload()
    }
}
let pacienteLogeado = []
function imprimirPaciente() {
    const dniLogeo = pacienteCargadoArray.filter((elemento) => {
        return elemento.dni === logeoDni.value
    })
    console.log(dniLogeo);
    bienvenido.className = ""
    sectionPaciente.className = ""
    let titulo = document.createElement("h2")
    titulo.innerHTML = `<h2>Bienvenido ${dniLogeo[0].apellido}, ${dniLogeo[0].nombre}</h2> `
    bienvenido.append(titulo)
    pacienteLogeado = dniLogeo
}


/* -------------------------- Perfil de paciente -------------------------- */

/* -------------------------- Reservar Turno -------------------------- */


const reservarTurno = document.getElementById("reservarTurno")
reservarTurno.addEventListener("click", () => {
    opcionesEspecialidades.className = ""
})


const botonReservarTurno = document.getElementById("botonReservarTurno")
botonReservarTurno.addEventListener("click", (event) => {
    event.defaultPrevented
    console.log(`${pacienteLogeado[0].nombre} seleccionó ${valorSelecionado} con el doctor ${doctorSeleccionado}`);
})

/* ------------------------- Opciones Especialidades ------------------------ */

let valorSelecionado = " "

const opcionesEspecialidades = document.getElementById("opcionesEspecialidades")
opcionesEspecialidades.addEventListener("change", (e) => {
    let valor = e.target.value;
    if (valor !== "0") {}
    //asigno valor local a una valiable global
    valorSelecionado = valor
    //Ejecuto FN par filtrar doctores según valor seleccionado
    cargarDoctores(valorSelecionado)
})


let doctorSeleccionado = " "
/* -------------- Traigo .json y filtro según valor selecionado ------------- */
async function cargarDoctores() {
    const response = await fetch('/doctores.json');
    const doctores = await response.json();
    const listaDoctores = doctores.filter((elemento) => {
        return elemento.especialidad === valorSelecionado
    })

    /* --------------- Creo elemento DOM según valor seleccionado --------------- */

    //obtengo contenedor
    const opcionesDoctores = document.getElementById("opcionesDoctores")
    //limpio contenedor cada vez que ejecuto la funcion. 
    opcionesDoctores.innerHTML = ""
    // creo un select
    const select = document.createElement("select")
    // saco select si no hay ninguna especialidad seleccionada
    if (valorSelecionado == 0) {
        select.className = "displayNone"
    }
    for (const doc of listaDoctores) {
        const option = document.createElement("option")
        option.innerHTML = doc.nombre
        option.setAttribute("value", doc.nombre)
        select.append(option)
    }
    //capturo valor de option selecionado
    select.addEventListener("change", () => {
        doctorSeleccionado = select.value
    })
    opcionesDoctores.append(select)
}



//localStorage.clear() 
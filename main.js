/* ----------------------------- constantes JSON pacientes logeados ---------------------------- */
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

/* ------------------------- Array listaDePacientes Logeados ------------------------- */
let listaDePacientes = []

/* ----- inicializo array de pacientes logeados con elementos en el localStorage ----- */
if (pacienteCargadoJS !== null) {
    listaDePacientes = JSON.parse(pacienteCargadoJS)
}


/* --------------------------------- Objeto que guarda pacientes que se logean --------------------------------- */
class Paciente {
    constructor(nombre, apellido, dni, contrasenia) {
        this.nombre = nombre
        this.apellido = apellido
        this.dni = dni
        this.contrasenia = contrasenia
    }
}


/* --------------------------------- BOTONES LOGEO -------------------------------- */

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
    bienvenido.className = ""
    sectionPaciente.className = "cuerpoSection"
    let titulo = document.createElement("h2")
    titulo.innerHTML = `<h2>Bienvenido ${dniLogeo[0].apellido}, ${dniLogeo[0].nombre}</h2> `
    bienvenido.append(titulo)
    pacienteLogeado = dniLogeo
}


/* -------------------------- PERFIL DEL PACIENTE -------------------------- */

/* -------------------------- Seccion Reservar Turno -------------------------- */
const opcionesEspecialidades = document.getElementById("opcionesEspecialidades")


//constante  del DOM pero la necesito local 
const opcionesDoctores = document.getElementById("opcionesDoctores")

//Variables que almacenan los datos obtenidos del select
let valorSelecionado = " "
let doctorSeleccionado = " "
let turnosCargados = []

const reservarTurno = document.getElementById("reservarTurno")
reservarTurno.addEventListener("click", () => {
    opcionesEspecialidades.className = ""
    opcionesEspecialidades.value = "0"
    contenedorHistorial.className = "displayNone"
})


const botonReservarTurno = document.getElementById("botonReservarTurno")
botonReservarTurno.addEventListener("click", (event) => {
    event.defaultPrevented
    alert(`${pacienteLogeado[0].nombre} seleccionó ${valorSelecionado} con el Doctor ${doctorSeleccionado}`);
    let nuevoTurno = {
        nombre: pacienteLogeado[0].nombre,
        apellido: pacienteLogeado[0].apellido,
        especialidad: valorSelecionado,
        doctor: doctorSeleccionado
    }
    turnosCargados.push(nuevoTurno)
    console.log(turnosCargados);
    //Reinicio valores y ejecuto funcion para que me dibuje desde cero
    opcionesEspecialidades.value = "0"
    opcionesDoctores.value = "0"
    cargarDoctores(valorSelecionado)
})




/* ------------------------- Opciones Especialidades ------------------------ */
opcionesEspecialidades.addEventListener("change", (e) => {
    let valor = e.target.value;
    if (valor !== "0") {}
    //asigno valor local a una valiable global
    valorSelecionado = valor
    //Ejecuto FN par filtrar doctores según valor seleccionado
    cargarDoctores(valorSelecionado)
})


/* -------------- Traigo .json y filtro según valor selecionado ------------- */
async function cargarDoctores() {
    const response = await fetch('/doctores.json');
    const doctores = await response.json();
    const listaDoctores = doctores.filter((elemento) => {
        return elemento.especialidad === valorSelecionado
    })

    /* --------------- Creo elemento DOM según valor seleccionado --------------- */
    // obtengo contenedor en cont global "opcionesDoctores"
    //limpio contenedor cada vez que ejecuto la funcion. 
    opcionesDoctores.innerHTML = ""
    // saco select si no hay ninguna especialidad seleccionada
    if (opcionesEspecialidades.value !== "0") {
        opcionesDoctores.className = ""
    } else {
        opcionesDoctores.className = "displayNone"
        botonReservarTurno.className = "displayNone"
    }
    const primerOpcion = document.createElement("option")
    primerOpcion.setAttribute("value", "0")
    primerOpcion.innerText = `Doctor`
    opcionesDoctores.append(primerOpcion)
    //Por cada doctor en JSON creo un option
    for (const doc of listaDoctores) {
        let option = document.createElement("option")
        option.innerText = doc.nombre
        opcionesDoctores.append(option)
    }
    //Segun valor muestra el botón y capturno valor de input
    opcionesDoctores.addEventListener("change", () => {
        if (opcionesDoctores.value !== "0") {
            botonReservarTurno.className = ""
        } else {
            botonReservarTurno.className = "displayNone"
        }
        doctorSeleccionado = opcionesDoctores.value
    })
}

/* ----------------------- Seccion Historial de Turnos ---------------------- */

/* ------------------------ Boton Historial de Turnos ----------------------- */
const historialTurnos = document.getElementById("historialTurnos")
const contenedorHistorial = document.getElementById("contenedorHistorial")


historialTurnos.addEventListener("click", () => {
    //cuando hago click, agrego class para que desaparezca
    opcionesDoctores.className = "displayNone"
    botonReservarTurno.className = "displayNone"
    opcionesEspecialidades.className = "displayNone"
    contenedorHistorial.className = ""
    imprimirTurnos()
})


function imprimirTurnos() {
    contenedorHistorial.innerHTML = ""
    //uso la constante turno (objeto) para imprimir en el html
    for (const turno of turnosCargados) {
        let lista = document.createElement("p")
        const botonModificar = document.createElement("button")
        const botonCancelar = document.createElement("button")
        lista.innerHTML = `<strong> Especialidad: </strong> ${turno.especialidad} <strong> Doctor:</strong> ${turno.doctor} `
        botonModificar.innerHTML = `</strong> Modificar turno </strong> `
        botonCancelar.innerHTML = `</strong> Cancelar turno</strong>`
        lista.append(botonModificar)
        lista.append(botonCancelar)
        contenedorHistorial.append(lista)

        botonModificar.addEventListener("click", () => {
            const turnoModificar = turnosCargados.filter((elemento) => {
                return elemento === turno
            })
            console.log(turnoModificar);
        })
    }
}
//localStorage.clear() 
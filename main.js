/* -------------------------------- FUNCIONES ------------------------------- */
function esconder(el) {
    el.setAttribute("class", "displayNone")
}

function sacarClass(el) {
    el.className = " "
}

function mostrar(el) {
    el.setAttribute("class", "")
}

//LOGEO

function validarBotonIngresar() {
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
    }
}

function crearUsuario() {
    if (inputNombre.value !== "" && inputApellido.value !== "" && inputDni.value !== "" && inputContrasenia.value !== "") {
        /* ---------------------- Almaceno inputs en un objeto ---------------------- */
        let nuevoPaciente = new Paciente(inputNombre.value, inputApellido.value, inputDni.value, inputContrasenia.value)
        /* ------------ pusheo nuevoPaciente a mi array listaDePacientes ------------ */
        listaDePacientes.push(nuevoPaciente)
        /* ------------ Almaceno objeto en localStorage y lo paso a JSON ------------ */
        localStorage.setItem("Pacientes", JSON.stringify(listaDePacientes))
        Swal.fire({
            icon: 'success',
            title: 'Usuario cargado con exito',
        })
        esconder(sectionCrarUsuario)
        setTimeout(window.location.reload.bind(window.location), 1500)
    } else {
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'Porfavor complete todos los campos',
        })
    }
}

function usuarioYaExiste() {
    const dniUsuario = pacienteCargadoArray.some((elemento) => {
        return elemento.dni === inputDni.value
    })
    dniUsuario === true ? Swal.fire('Usuario Existente') : crearUsuario()
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
        Swal.fire({
            icon: 'success',
            title: 'Acceso Correcto',
        })
        esconder(sectionLogeoUsuario)
        setTimeout(() => {
            imprimirPaciente()
        }, 1500)
    } else {
        Swal.fire({
            icon: 'error',
            title: 'ERROR !',
            text: 'DNI o Contraseña incorrecto',
        })
        setTimeout(window.location.reload.bind(window.location), 1500)
    }
}

function restablecer() {
    //busco usuario por dni y saco su posicion en el array
    // FindIndex devuelve -1 si no encuentra. Con un if condicionar la variante
    let dniUsuario = pacienteCargadoArray.findIndex((elemento) => {
        return elemento.dni === inputContraseniaDni.value
    })
    if (dniUsuario === -1) {
        Swal.fire({
            icon: 'question',
            title: 'Usuario no encontrado',
        })
    } else {
        //en el numero de indice modifico la contraseña por el input contraseña
        listaDePacientes[dniUsuario].contrasenia = inputContraseniaContrasenia.value
        //cargo lista en localStorage
        localStorage.setItem("Pacientes", JSON.stringify(listaDePacientes))
        Swal.fire({
            icon: 'success',
            title: 'Se modificó contraseña correctamente',
        })
        setTimeout(window.location.reload.bind(window.location), 1500)
    }
}

//ADMINISTRADOR
function validarAdministrador() {
    if (usuarioLogeo.value === dniAdmi && contraseniaLogeo.value === contraAdmi) {
        Swal.fire({
            icon: 'success',
            title: 'Acceso Correcto',
        })
        esconder(sectionLogeoUsuario)
        mostrar(seccionAdministrador)
        setTimeout(() => {
            imprimirTodo()
        }, 1500)
    } else {
        Swal.fire({
            icon: 'error',
            title: 'ERROR !',
            text: 'DNI o Contraseña incorrecto',
        })
    }
}

function imprimirTodo() {
    const contenedorAdmi = document.getElementById("contenedorAdmi")
    contenedorAdmi.innerHTML = ""
    /* ---------------------------------- TABLA --------------------------------- */
    const tabla = document.createElement("table")
    tabla.className = "table table-striped"
    contenedorAdmi.append(tabla)
    const thead = document.createElement("thead")
    tabla.appendChild(thead)
    const tr = document.createElement("tr")
    thead.append(tr)
    let th = document.createElement("th")
    th.innerHTML = `<th scope="col"> Apellido </th>`
    tr.append(th)
    let th1 = document.createElement("th")
    th1.innerHTML = `<th scope="col"> Nombre </th>`
    tr.append(th1)
    let th2 = document.createElement("th")
    th2.innerHTML = `<th scope="col"> DNI </th>`
    tr.append(th2)
    let th3 = document.createElement("th")
    th3.innerHTML = `<th scope="col"> Especialidad </th>`
    tr.append(th3)
    let th4 = document.createElement("th")
    th4.innerHTML = `<th scope="col"> Doctor </th>`
    tr.append(th4)
    let th5 = document.createElement("th")
    th5.innerHTML = `<th scope="col"> Fecha </th>`
    tr.append(th5)
    const tbody = document.createElement("tbody")
    tabla.append(tbody)
    //Ordeno Turnos A - Z 
    turnosCargados.sort((a, b) => {
        if (a.apellido > b.apellido) {
            return 1
        } else if (a.apellido < b.apellido) {
            return -1
        }
        return 0
    })
    for (const turno of turnosCargados) {
        const fila = document.createElement("tr")
        let espe = document.createElement("td")
        espe.innerHTML = `${turno.apellido}`
        let espe1 = document.createElement("td")
        espe1.innerHTML = `${turno.nombre}`
        let espe2 = document.createElement("td")
        espe2.innerHTML = `${turno.dni}`
        let espe3 = document.createElement("td")
        espe3.innerHTML = `${turno.especialidad}`
        let espe4 = document.createElement("td")
        espe4.innerHTML = `${turno.doctor}`
        let espe5 = document.createElement("td")
        espe5.innerHTML = `${turno.fecha}`
        console.log(turno);
        fila.append(espe)
        fila.append(espe1)
        fila.append(espe2)
        fila.append(espe3)
        fila.append(espe4)
        fila.append(espe5)
        tbody.append(fila)
    }
}

//PACIENTE LOGEADO
function imprimirFecha() {
    for (let i = 1; i <= 31; i++) {
        let dia = document.createElement("option")
        dia.innerText = `${i}`
        dias.append(dia)
    }
    for (let i = 1; i <= 12; i++) {
        let dia = document.createElement("option")
        dia.innerText = `${i}`
        mes.append(dia)
    }
    for (let i = 2022; i <= 2023; i++) {
        let dia = document.createElement("option")
        dia.innerText = `${i}`
        anio.append(dia)
    }
    fechas.append(dias)
    fechas.append(mes)
    fechas.append(anio)
}

function validarFecha() {
    if (mes.value === now.month) {
        if (dias.value >= now.day) {
            return true
        }
    } else if (mes.value >= now.month) {
        return true
    }
}

function imprimirPaciente() {
    const dniLogeo = pacienteCargadoArray.filter((elemento) => {
        return elemento.dni === logeoDni.value
    })
    mostrar(bienvenido)
    sectionPaciente.className = "cuerpoSection"
    let titulo = document.createElement("h2")
    titulo.innerHTML = `<h2>Bienvenido ${dniLogeo[0].apellido}, ${dniLogeo[0].nombre}</h2> `
    bienvenido.append(titulo)
    pacienteLogeado = dniLogeo
}
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
        mostrar(opcionesDoctores)
    } else {
        esconder(opcionesDoctores)
        esconder(botonReservarTurno)
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
        opcionesDoctores.value !== "0" ? botonReservarTurno.className = "" : botonReservarTurno.className = "displayNone"
        doctorSeleccionado = opcionesDoctores.value
    })
}

function imprimirTurnos() {
    const filtrar = turnosCargados.filter((el) => {
        return el.dni === pacienteLogeado[0].dni
    })
    contenedorHistorial.innerHTML = ""
    /* ---------------------------------- TABLA --------------------------------- */
    const tabla = document.createElement("table")
    tabla.className = "table table-striped"
    contenedorHistorial.append(tabla)
    const thead = document.createElement("thead")
    tabla.appendChild(thead)
    const tr = document.createElement("tr")
    thead.append(tr)
    let th = document.createElement("th")
    th.innerHTML = `<th scope="col"> Especialidad </th>`
    tr.append(th)
    let th2 = document.createElement("th")
    th2.innerHTML = `<th scope="col"> Doctor </th>`
    tr.append(th2)
    let th3 = document.createElement("th")
    th3.innerHTML = `<th scope="col"> Fecha </th>`
    tr.append(th3)
    const tbody = document.createElement("tbody")
    tabla.append(tbody)
    for (const turno of filtrar) {
        const fila = document.createElement("tr")
        let espe = document.createElement("td")
        espe.innerHTML = `${turno.especialidad}`
        let espe1 = document.createElement("td")
        espe1.innerHTML = `${turno.doctor}`
        let espe2 = document.createElement("td")
        espe2.innerHTML = `${turno.fecha}`
        const botonModificar = document.createElement("button")
        const botonCancelar = document.createElement("button")
        botonModificar.innerHTML = `</strong> Modificar turno </strong> `
        botonCancelar.innerHTML = `</strong> Cancelar turno</strong>`
        fila.append(espe)
        fila.append(espe1)
        fila.append(espe2)
        fila.append(botonModificar)
        fila.append(botonCancelar)
        tbody.append(fila)
        /* -------------------------- BOTON MODIFICAR TURNO ------------------------- */
        botonModificar.addEventListener("click", () => {
            let posicion = turnosCargados.indexOf(turno)
            turnosCargados.splice(posicion, 1)
            botonReservarTurno.innerText = "Modificar"
            mostrar(opcionesEspecialidades)
            esconder(contenedorHistorial)
        })
        /* -------------------------- BOTON CANCELAR TURNO -------------------------- */
        botonCancelar.addEventListener("click", () => {
            let posicion = turnosCargados.indexOf(turno)
            turnosCargados.splice(posicion, 1)
            localStorage.setItem("Turnos", JSON.stringify(turnosCargados))
            Swal.fire({
                icon: 'error',
                title: 'Turno cancelado'
            })
            imprimirTurnos()
        })
    }
}
/* ------------------- CONSTANTES JSON PACIENTES LOGEADOS ------------------- */
const pacienteCargadoJS = localStorage.getItem("Pacientes")
const pacienteCargadoArray = JSON.parse(pacienteCargadoJS)

/* ---------------------------- CONSTANTES LOGEO ---------------------------- */
const logeoDni = document.getElementById("usuarioLogeo")
const logeoContrasenia = document.getElementById("contraseniaLogeo")
const sectionCrarUsuario = document.getElementById("sectionCrarUsuario");
const sectionLogeoUsuario = document.getElementById("sectionLogeoUsuario")

/* ----------------- CONSTANTES INPUTS CAMBIO DE CONTRASEÑA ----------------- */
const inputContraseniaDni = document.getElementById("inputContraseniaDni");
const inputContraseniaContrasenia = document.getElementById("inputContraseniaContrasenia");
const restablecerContrasenia = document.getElementById("restablecerContrasenia")

/* --------------------- CONSTANTES INPUTS CREAR USUARIO -------------------- */
let inputNombre = document.getElementById("usuarioNombre")
let inputApellido = document.getElementById("usuarioApellido")
let inputDni = document.getElementById("usuarioDni")
let inputContrasenia = document.getElementById("usuarioContrasenia")

/* ----------------------- ARRAY DE PACIENTES LOGEADOS ---------------------- */
let listaDePacientes = []
if (pacienteCargadoJS !== null) {
    listaDePacientes = JSON.parse(pacienteCargadoJS)
}

/* ---------- OBJETO CONSTRUCTOR QUE GUARDA PACIENTES QUE SE LOGEAN --------- */
class Paciente {
    constructor(nombre, apellido, dni, contrasenia) {
        this.nombre = nombre
        this.apellido = apellido
        this.dni = dni
        this.contrasenia = contrasenia
    }
}
/* --------------------------------- BOTONES LOGEO -------------------------------- */
const botonAdministrador = document.getElementById("administrador");
const botonIngreasar = document.getElementById("ingresar");
const botonCrearUsuario = document.getElementById("crearUsuario");
const cerrarPestania = document.getElementById("cerrarPestania")
const cambiarContraseniaUsuario = document.getElementById("cambiarContraseniaUsuario")
const cerrarPestaniaContra = document.getElementById("cerrarPestaniaContra")
const olvidoContrasenia = document.getElementById("olvidoContrasenia")

/* ------------------------------ ADMINISTRADOR ----------------------------- */
const seccionAdministrador = document.getElementById("seccionAdministrador")
const contenedorAdministrador = document.getElementById("contenedorAdministrador")
const nav = document.createElement("nav")
const pregunta = document.createElement("h4")
const si = document.createElement("button")
const no = document.createElement("button")
const body = document.getElementById("body")
const textoCrear = document.getElementById("textoCrear")
const dniAdmi = "123456"
const contraAdmi = "123456"
const crearUsuarioLogeo = document.getElementById("crearUsuarioLogeo")

/* --------------------------- BOTON ADMINISTRADOR -------------------------- */
botonAdministrador.addEventListener("click", () => {
    sacarClass(nav)
    pregunta.innerHTML = "¿Desea ingresar como administrador?"
    nav.appendChild(pregunta)
    si.innerHTML = "SI"
    pregunta.append(si)
    no.innerHTML = "NO"
    pregunta.append(no)
    contenedorAdministrador.append(nav)
})
/* ------------------------- BOTON ADMINISTRADOR NO ------------------------- */
no.addEventListener("click", () => {
    esconder(nav)
    mostrar(crearUsuarioLogeo)
    mostrar(olvidoContrasenia)
    mostrar(body)
})
/* ------------------------- BOTON ADMINISTRADOR SI ------------------------- */
si.addEventListener("click", () => {
    body.setAttribute("class", "fondo")
    ingresar.innerText = "Administrador"
    esconder(crearUsuarioLogeo)
    esconder(olvidoContrasenia)
    Swal.fire('Datos Administrador por consola')
    console.log(`Los datos Administrador son: Dni ${dniAdmi} Contraseña: ${contraAdmi}`);
})
/* ----------------------------- BOTON INGRESAR ----------------------------- */
botonIngreasar.addEventListener("click", (event) => {
    event.target.innerHTML !== "Administrador" ? validarBotonIngresar() : validarAdministrador()
})
/* --------------------------- BOTON CREAR USUARIO -------------------------- */
botonCrearUsuario.addEventListener("click", () => {
    pacienteCargadoJS == null ? crearUsuario() : usuarioYaExiste()
})
/* -------------------------- BOTON CERRAR PESTAÑA USUARIO -------------------------- */
cerrarPestania.addEventListener("click", () => {
    esconder(sectionCrarUsuario)
})
/* ---------------------- BOTON CREAR USUARIO EN LOGEO ---------------------- */
crearUsuarioLogeo.addEventListener("click", () => {
    mostrar(sectionCrarUsuario)
})
/* -------------------- BOTON CAMBIAR CONTRASEÑA EN LOGEO ------------------- */
olvidoContrasenia.addEventListener("click", () => {
    mostrar(restablecerContrasenia)
})
/* ---------------------- BOTON RESTABLECER CONTRASEÑA ---------------------- */
cambiarContraseniaUsuario.addEventListener("click", () => {
    if (inputContraseniaContrasenia.value === "") {
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'Porfavor complete todos los campos',
        })
    } else {
        restablecer()
        setTimeout(window.location.reload.bind(window.location), 1500)
    }
})
/* -------------------------- BOTON CERRAR PESTAÑA CONTRA -------------------------- */
cerrarPestaniaContra.addEventListener("click", () => {
    esconder(restablecerContrasenia)
})
/* ---------------------------- SECCION PACIENTES --------------------------- */
const sectionPaciente = document.getElementById("sectionPaciente")

/* -------------------------- PERFIL DEL PACIENTE -------------------------- */
const turnosCargadoJS = localStorage.getItem("Turnos")
const turnosCargadoArray = JSON.parse(turnosCargadoJS)
let pacienteLogeado = []
let turnosCargados = []
//Variables que almacenan los datos obtenidos del select
let valorSelecionado = " "
let doctorSeleccionado = " "
if (turnosCargadoJS !== null) {
    turnosCargados = JSON.parse(turnosCargadoJS)
}

/* ------------------------- SECCION RESERVAR TURNO ------------------------- */
const opcionesEspecialidades = document.getElementById("opcionesEspecialidades")
const opcionesDoctores = document.getElementById("opcionesDoctores")
const reservarTurno = document.getElementById("reservarTurno")
const botonReservarTurno = document.getElementById("botonReservarTurno")
const contenedorHistorial = document.getElementById("contenedorHistorial")
const historialTurnos = document.getElementById("historialTurnos")
const cambiarContraseniaPaciente = document.getElementById("cambiarContraseniaPaciente")
const sectionModificarContra = document.getElementById("sectionModificarContra")
/* ------------------------------ SECCION FECHA ----------------------------- */
const fechas = document.getElementById("fechas")
const DateTime = luxon.DateTime
const now = DateTime.now()
const dias = document.createElement("select")
const mes = document.createElement("select")
const anio = document.createElement("select")
let fechaTurno = " "

/* ----------------------- BOTON MODIFICAR CONTRASEÑA ----------------------- */
cambiarContraseniaPaciente.addEventListener("click", () => {
    esconder(contenedorHistorial)
    esconder(opcionesEspecialidades)
    sectionModificarContra.append(restablecerContrasenia)
    inputContraseniaDni.value = pacienteLogeado[0].contrasenia
    mostrar(restablecerContrasenia)
})
/* -------------------------- BOTON RESERVAR TURNO -------------------------- */
reservarTurno.addEventListener("click", () => {
    mostrar(opcionesEspecialidades)
    mostrar(fechas)
    opcionesEspecialidades.value = "0"
    esconder(restablecerContrasenia)
    esconder(contenedorHistorial)
})
/* ----------------------------- BOTON RESERVAR ----------------------------- */
botonReservarTurno.addEventListener("click", (event) => {
    event.defaultPrevented
    if (validarFecha(true)) {
        event.target.innerHTML !== "Modificar" ? Swal.fire({
            icon: 'success',
            title: 'Turno reservado con éxito',
        }) : Swal.fire({
            icon: 'success',
            title: 'Se modificó correctamente',
        })
        fechaTurno = `${dias.value}/${mes.value}/${anio.value}`
        let nuevoTurno = {
            nombre: pacienteLogeado[0].nombre,
            apellido: pacienteLogeado[0].apellido,
            dni: pacienteLogeado[0].dni,
            especialidad: valorSelecionado,
            doctor: doctorSeleccionado,
            fecha: fechaTurno
        }
        turnosCargados.push(nuevoTurno)
        localStorage.setItem("Turnos", JSON.stringify(turnosCargados))
        //Reinicio valores y ejecuto funcion para que me dibuje desde cero
        esconder(opcionesEspecialidades)
        esconder(fechas)
        opcionesEspecialidades.value = "0"
        opcionesDoctores.value = "0"
        dias.value = "1"
        mes.value = "1"
        anio.value = "2022"
        botonReservarTurno.innerText = "Reservar"
        cargarDoctores(valorSelecionado)
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Seleccione una fecha válida',
        })
    }
})
/* ------------------------- OPCIONES ESPECIALIDADES ------------------------ */
opcionesEspecialidades.addEventListener("change", (e) => {
    let valor = e.target.value;
    if (valor !== "0") {}
    //asigno valor local a una valiable global
    valorSelecionado = valor
    cargarDoctores(valorSelecionado)
    imprimirFecha()
})
/* ------------------------ BOTON HISTORIAL DE TURNOS ----------------------- */
historialTurnos.addEventListener("click", () => {
    //cuando hago click, agrego class para que desaparezca
    esconder(opcionesDoctores)
    esconder(opcionesEspecialidades)
    esconder(botonReservarTurno)
    esconder(restablecerContrasenia)
    mostrar(contenedorHistorial)
    imprimirTurnos()
})
window.onload = function () {
    listarEstudiantes()
}

let estudiantes = [
    {
        id: 1,
        nombre: 'Henry Solano',
        sexo: 'Masculino',
        ciclo: '3',
        escuela: 'Sistemas'

    },
    {
        id: 2,
        nombre: 'Ana Lopez',
        sexo: 'Femenino',
        ciclo: '1',
        escuela: 'Alimentos'
    },
    {
        id: 3,
        nombre: 'Julia Tarzona',
        sexo: 'Femenino',
        ciclo: '10',
        escuela: 'Ambiental'
    },
    {
        id: 4,
        nombre: 'Raul Orcazon',
        sexo: 'Masculino',
        ciclo: '9',
        escuela: 'Arquitectura'
    },
    {
        id: 5,
        nombre: 'Carlos Guzman',
        sexo: 'Masculino',
        ciclo: '3',
        escuela: 'Civil'
    }
]



function guardarCambios() {

    const id = document.getElementById('txtId')
    const nombre = document.getElementById('txtNombre')
    const radioFeminino = document.getElementById('radioFemenino')
    const radioMasculino = document.getElementById('radioMasculino')
    const ciclo = document.getElementById('cic')
    const escuela = document.getElementById('escu')

    console.log(radioFeminino.checked)

    if ( 
        radioFeminino.checked === false && 
        radioMasculino.checked === false || 
        nombre.value === '' ||
        ciclo.value === '0' ||
        escuela.value === '0'
        ) {
        alert('ingrese el formulario')	

        return;
    }

    const sexo = (radioFeminino.checked) ? 'Femenino' : 'Masculino'

    if ('' === id.value) {
        agregarEstudiante(nombre, sexo, ciclo, escuela)
    } else {
        editarEstudiante(id, nombre, sexo, ciclo, escuela)
    }

    listarEstudiantes()

    id.value = ''
    nombre.value = ''
    radioFeminino.checked = false
    radioMasculino.checked = false
    ciclo.value = '0'
    escuela.value = '0'

}

function editarEstudiante(id, nombre, sexo, ciclo, escuela) {

    const estudianteEditado = {
        id: Number(id.value),
        nombre: nombre.value,
        sexo: sexo,
        ciclo: ciclo.value,
        escuela: escuela.value
    }

    estudiantes = estudiantes.map(
        (estudiante) =>
            (estudiante.id === Number(id.value))
                ? estudiante = estudianteEditado
                : estudiante
    )

    alert('Editado correctamente')

}

function agregarEstudiante(nombre, sexo, ciclo, escuela) {

    const nuevoAlmuno = {
        id: Math.random(),
        nombre: nombre.value,
        sexo: sexo,
        ciclo: ciclo.value,
        escuela: escuela.value
    }

    estudiantes.push(nuevoAlmuno)

    console.log(nuevoAlmuno)

    alert('Agregado correctamente')
}

function empezarAEditar(idEstudiante) {

    const id = document.getElementById('txtId')
    const nombre = document.getElementById('txtNombre')
    const radioFeminino = document.getElementById('radioFemenino')
    const radioMasculino = document.getElementById('radioMasculino')
    const ciclo = document.getElementById('ciclo')
    const escuela = document.getElementById('escuela')

    const estudianteEncontrado = estudiantes.find((estudiante) => estudiante.id === idEstudiante)

    id.value = estudianteEncontrado.id
    nombre.value = estudianteEncontrado.nombre
    if (estudianteEncontrado.sexo === 'Femenino') {
        radioFeminino.checked = true
    } else {
        radioMasculino.checked = true
    }
    ciclo.value = estudianteEncontrado.ciclo
    escuela.value = estudianteEncontrado.escuela

}

function eliminarEstudiante(idPost) {

    estudiantes = estudiantes.filter((post) => post.id !== idPost)

    listarEstudiantes()

}

function listarEstudiantes() {

    const tabla = document.getElementById('tblPost')
    const cuerpoTabla = document.getElementById('bodyPost')

    cuerpoTabla.innerHTML = ''

    estudiantes.map(

        (estudiante, index) => {

            const fila = document.createElement('tr')

            const colItem = document.createElement('td')
            const colNombre = document.createElement('td')
            const colSexo = document.createElement('td')
            const colCiclo = document.createElement('td')
            const colEscuela = document.createElement('td')
            const colAccion = document.createElement('td')

            colItem.innerText = index + 1
            colNombre.innerHTML = estudiante.nombre
            colSexo.innerHTML = estudiante.sexo
            colCiclo.innerHTML = estudiante.ciclo
            colEscuela.innerHTML = estudiante.escuela

            const btnEditar = document.createElement('button')
            const btnEliminar = document.createElement('button')

            const iconoEditar = document.createElement('span')
            const iconoEliminar = document.createElement('span')



            iconoEditar.setAttribute('class', 'iconify')
            iconoEditar.setAttribute('data-icon', 'ci:edit')

            iconoEliminar.setAttribute('class', 'iconify')
            iconoEliminar.setAttribute('data-icon', 'ant-design:delete-filled')


            btnEditar.setAttribute('class', 'btnEditar')
            btnEditar.appendChild(iconoEditar)
            btnEliminar.appendChild(iconoEliminar)

            btnEditar.setAttribute('onclick', `empezarAEditar(${estudiante.id})`)

            btnEliminar.setAttribute('class', 'btn btn-danger')
            btnEliminar.setAttribute('onclick', `eliminarEstudiante(${estudiante.id})`)

            colAccion.appendChild(btnEditar)
            colAccion.appendChild(btnEliminar)

            fila.appendChild(colItem)
            fila.appendChild(colNombre)
            fila.appendChild(colSexo)
            fila.appendChild(colCiclo)
            fila.appendChild(colEscuela)
            fila.appendChild(colAccion)

            cuerpoTabla.appendChild(fila)

        }
    )

    tabla.appendChild(cuerpoTabla)

}
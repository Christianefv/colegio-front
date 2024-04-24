import base from '@/services/servicio-base'

const servicio  = {}

servicio.consultarMaestros = () => {
    return base.get('/maestro')
            .then(r => {
                return r.data
            })
            .catch(err => {
                console.log(err)
            })
}

servicio.guardarMaestro = (maestro) => {
    console.log(maestro)
    return base.post(`/maestro`, maestro)
    .then(r =>{
        return r.data
    })
    .catch(err => {
        console.log(err)
    })
}

servicio.editarMaestro = (id, maestro) => {
    console.log('editar', maestro)
    return base.put(`/maestro/${id}`, maestro)
    .then(r =>{
        return r.data
    })
    .catch(err => {
        console.log(err)
    })
}

servicio.eliminarMaestro = (id) => {
    return base.delete(`/maestro/${id}`)
    .then(r =>{
        return r.data
    })
    .catch(err => {
        console.log(err)
    })
}

servicio.guardarMateriaMaestro = (idMateria, idMaestro) => {
    return base.post(`/materiasmaestro`, {idMateria: idMateria, idMaestro:idMaestro})
    .then(r =>{
        return r.data
    })
    .catch(err => {
        console.log(err)
    })
}

servicio.materiasNoAsignadasMaestro = (idMaestro) => {
    return base.get(`/materiasmaestro/materias-no-asignadas/${idMaestro}`)
    .then(r =>{
        return r.data
    })
    .catch(err => {
        console.log(err)
    })
}

servicio.materiasAsignadasMaestro = (idMaestro) => {
    return base.get(`/materiasmaestro/materias-asignadas/${idMaestro}`)
    .then(r =>{
        return r.data
    })
    .catch(err => {
        console.log(err)
    })
}

servicio.eliminarMateriaMaestro = (idMateria, idMaestro) => {
    return base.delete(`/materiasmaestro/${idMateria}/${idMaestro}`)
    .then(r =>{
        return r.data
    })
    .catch(err => {
        console.log(err)
    })
}
export default servicio
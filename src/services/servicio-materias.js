import base from '@/services/servicio-base'

const servicio  = {}

servicio.consultarMaterias = () => {
    return base.get('/materia')
            .then(r => {
                return r.data
            })
            .catch(err => {
                console.log(err)
            })
}

servicio.guardarMateria = (materia) => {
    return base.post(`/materia`, materia)
    .then(r =>{
        return r.data
    })
    .catch(err => {
        console.log(err)
    })
}

servicio.editarMateria = (id, materia) => {
    return base.put(`/materia/${id}`, materia)
    .then(r =>{
        return r.data
    })
    .catch(err => {
        console.log(err)
    })
}

servicio.eliminarMateria = (id) => {
    return base.delete(`/materia/${id}`)
    .then(r =>{
        return r.data
    })
    .catch(err => {
        console.log(err)
    })
}
export default servicio
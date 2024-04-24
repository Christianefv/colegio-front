import base from '@/services/servicio-base'

const servicio  = {}

servicio.consultarAlumnos = () => {
    return base.get('/alumnos')
            .then(r => {
                return r.data
            })
            .catch(err => {
                console.log(err)
            })
}

servicio.guardarAlumnos = (alumno) => {
    return base.post(`/alumnos`, alumno)
    .then(r =>{
        return r.data
    })
    .catch(err => {
        console.log(err)
    })
}

servicio.editarAlumnos = (id, alumno) => {
    return base.put(`/alumnos/${id}`, alumno)
    .then(r =>{
        return r.data
    })
    .catch(err => {
        console.log(err)
    })
}

servicio.eliminarAlumnos = (id) => {
    return base.delete(`/alumnos/${id}`)
    .then(r =>{
        return r.data
    })
    .catch(err => {
        console.log(err)
    })
}
export default servicio
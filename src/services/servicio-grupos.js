import base from '@/services/servicio-base'

const servicio  = {}

servicio.consultarGrupos = () => {
    return base.get('/grupos')
            .then(r => {
                return r.data
            })
            .catch(err => {
                console.log(err)
            })
}

servicio.guardarGrupos = (grupo) => {
    console.log(grupo)
    return base.post(`/grupos`, grupo)
    .then(r =>{
        return r.data
    })
    .catch(err => {
        console.log(err)
    })
}

servicio.editarGrupos = (id, grupo) => {
    return base.put(`/grupos/${id}`, grupo)
    .then(r =>{
        return r.data
    })
    .catch(err => {
        console.log(err)
    })
}

servicio.eliminarGrupos = (id) => {
    return base.delete(`/grupos/${id}`)
    .then(r =>{
        return r.data
    })
    .catch(err => {
        console.log(err)
    })
}
export default servicio
<template>
    <div class="container">
      <div class="col-12 m-2 d-flex justify-content-end">
        <button class="btn btn-primary" @click="nuevoAlumno">Nuevo Alumno</button>
      </div>
      <form @submit.prevent="guardarEditarAlumno" class="row mt-3">
        <div class="form-group col-12 col-md-6">
          <label for="nombre">Nombre:</label>
          <input type="text" class="form-control" v-model="alumno.nombre" required>
        </div>
        <div class="form-group col-12 col-md-6">
          <label for="apellidoPaterno">Apellido Paterno:</label>
          <input type="text" class="form-control" v-model="alumno.apellidoPaterno" required>
        </div>
        <div class="form-group col-12 col-md-6">
          <label for="apellidoMaterno">Apellido Materno:</label>
          <input type="text" class="form-control" v-model="alumno.apellidoMaterno" required>
        </div>
        <div class="form-group col-12 col-md-6">
          <label for="fechaNacimiento">Fecha de Nacimiento:</label>
          <input type="date" class="form-control" v-model="alumno.fechaNacimiento" required>
        </div>
        <div class="form-group col-12 col-md-6">
            <label for="sexo">Sexo:</label>
            <select class="form-control" id="sexo" v-model="alumno.sexo" required>
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
            </select>
        </div>
        <button type="submit" class="btn mt-2 btn-primary">{{ editar ? 'Editar Alumno' : 'Guardar Alumno' }}</button>
      </form>
      <div v-if="alumnos.length > 0" class="col-12 mt-3">
        <h2>Lista de alumnos</h2>
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="alumno in alumnos" :key="alumno.idAlumno">
                    <td class="m-1 text-left">{{ alumno.nombre }} {{ alumno.apellidoPaterno }} {{ alumno.apellidoMaterno }}</td>
                    <td>
                        <button @click="editarAlumno(alumno)" class="btn btn-sm btn-primary">Editar</button>
                        <button @click="eliminarAlumno(alumno)" class="btn btn-sm btn-danger">Eliminar</button>
                    </td>
                </tr>
            </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  import servicio from '@/services/servicio-alumnos'
  import Swal from "sweetalert2"
  export default {
    data() {
      return {
        alumnos: [],
        alumno: {
          nombre: '',
          apellidoPaterno: '',
          apellidoMaterno: '',
          fechaNacimiento: '',
          sexo: ''
        },
        editar: false,
        editId: null
      }
    },
    mounted() {
      this.consultarAlumnos();
    },
    methods: {
      consultarAlumnos() {
        servicio.consultarAlumnos()
          .then(alumnos => {

            this.alumnos = alumnos.data
          })
          .catch(err => {
            console.error(err)
          })
      },
      nuevoAlumno(){
        this.editar = false
        this.alumno = {
                nombre: '',
                apellidoPaterno: '',
                apellidoMaterno: '',
                fechaNacimiento: '',
                sexo: ''
              }
      },
      async guardarEditarAlumno() {
        let r = await Swal.fire({
                title: "",
                text: "Se guardarán la información capturada, ¿Desea continuar?",
                showCancelButton: true,
                icon: 'question',
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Aceptar",
                cancelButtonText: "Cancelar",
            });

            if( r.value ){
              if (this.editar) {
                servicio.editarAlumnos(this.editId, this.alumno)
                  .then(() => {
                    this.editar = false
                    this.editId = null
                    this.alumno = {
                      nombre: '',
                      apellidoPaterno: '',
                      apellidoMaterno: '',
                      fechaNacimiento: '',
                      sexo: ''
                    }
                    Swal.fire({
                        text: 'Se guardaron correctamente los datos.',
                        icon: "success"
                    });
                    this.consultarAlumnos()
                  })
                  .catch(err => {
                    console.error(err)
                  })
              } else {
                this.alumno = Object.assign({}, this.alumno)
                servicio.guardarAlumnos(this.alumno)
                  .then(() => {
                    this.alumno = {
                      nombre: '',
                      apellidoPaterno: '',
                      apellidoMaterno: '',
                      fechaNacimiento: '',
                      sexo: ''
                    }
                    Swal.fire({
                      text: 'Se guardaron correctamente los datos.',
                      icon: "success"
                  });
                    this.consultarAlumnos()
                  })
                  .catch(err => {
                    console.error(err)
                  })
              }
            }
      },
      editarAlumno(alumno) {
        this.alumno = Object.assign({}, alumno)
        this.editar = true
        this.editId = alumno.idAlumno
        let fechaISO = alumno.fechaNacimiento;
        let fechaCompatible = fechaISO.split('T')[0];
        alumno.fechaNacimiento = fechaCompatible;
        this.alumno =  Object.assign({}, alumno)
      },
      async eliminarAlumno(alumno) {
        let r = await Swal.fire({
                  title: "",
                  text: "Se eliminará el alumno seleccionado, ¿Desea continuar?",
                  showCancelButton: true,
                  icon: 'question',
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Aceptar",
                  cancelButtonText: "Cancelar",
              });
  
              if( r.value ){  
                servicio.eliminarAlumnos(alumno.idAlumno)
                .then(() => {
                    Swal.fire({
                              text: 'Datos eliminados correctamente.',
                              icon: "success"
                          });
                    this.editar = false
                    this.editId = null
                    this.alumno = {
                        nombre: '',
                        apellidoPaterno: '',
                        apellidoMaterno: '',
                        fechaNacimiento: '',
                        sexo: ''
                    }
                    this.consultarAlumnos()
                })
                .catch(err => {
                    console.error(err)
                })
            }
      }
    }
  }
  </script>
  
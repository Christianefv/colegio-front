<template>
    <div class="container">
      <div class="col-12 m-2 d-flex justify-content-end">
        <button class="btn btn-primary" @click="nuevaMateria" v-if="!nuevo">Nueva Materia</button>
      </div>
      <div class="row" v-if="editar || nuevo">
        <div class="form-group col-6">
            <label for="nombre">Nombre de la materia:</label>
            <input type="text" class="form-control" id="nombre" v-model="materia.descripcion">
        </div>
  
        <div class="col-12 m-2 d-flex justify-content-end">
          <button class="btn btn-primary m-2" @click="guardarDatos">{{accion}}</button>
          <button class="btn btn-secondary m-2" @click="inicializarDatos">Cancelar</button>
        </div>
      </div>
  
      <h2>Lista de Materias</h2>
      <table class="table">
          <thead>
              <tr>
                  <th>ID</th>
                  <th>Materia</th>
                  <th>Acciones</th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="materia in materias" :key="materia.idMateria">
                  <td class="m-1">{{ materia.idMateria }}</td>
                  <td class="m-1 text-left">{{ materia.descripcion }}</td>
                  <td>
                      <button class="btn btn-primary m-1" @click="editarMateria(materia)">Editar</button>
                      <button class="btn btn-danger " @click="eliminarMateria(materia.idMateria)">Eliminar</button>
                  </td>
              </tr>
          </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import servicio from '@/services/servicio-materias';
  import Swal from "sweetalert2"
  
  export default {
    data() {
      return {
        materias: [],
        materia:[],
        editar: false,
        nuevo: false,
        accion: ''
      };
    },
    mounted() {
      this.consultarMaterias();
    },
    methods: {
      async guardarDatos(){
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
                this.valdiarDatos()
              }
      },
      inicializarDatos(){
        this.materia = []
        this.editar = false;
        this.nuevo = false
        this.accion = ''
      },
      valdiarDatos(){
        if(this.materia.descripcion.trim() == ''){
          Swal.fire({
                      text: 'Favor de capturar el nombre de la materia',
                      icon: "info"
                  });
        }
        else{
          if( this.editar ){
            this.guardarEditar() 
          } else {
            this.agregarMateria() 
          }
        }
      },
      consultarMaterias() {
        servicio.consultarMaterias()
          .then(response => {
            this.materias = response.data;
          })
          .catch(error => {
            console.error('Error al consultar materias:', error);
          });
      },
      agregarMateria() {
        this.materia = Object.assign({}, this.materia)
        servicio.guardarMateria(this.materia)
          .then(response => {
            if (response.value){
              Swal.fire({
                      text: 'Se guardaron correctamente los datos.',
                      icon: "success"
                  });
              this.inicializarDatos()
              this.consultarMaterias();
            }
          })
          .catch(error => {
            console.error('Error al agregar materia:', error);
          });
      },
      nuevaMateria(){
        this.materia.idMateria = 0;
        this.materia.descripcion = "";
        this.nuevo = true
        this.accion = 'Agregar materia'
      },
      editarMateria(nuevoMateria) {
        this.accion = 'Modificar materia'
        this.editar = true
        this.materia =  Object.assign({}, nuevoMateria)
      },
      guardarEditar(){
        servicio.editarMateria(this.materia.idMateria, this.materia)
            .then(response => {
              if (response.value){
                Swal.fire({
                      text: 'Se guardaron correctamente los datos.',
                      icon: "success"
                  });
                this.inicializarDatos()
                this.consultarMaterias();
              }
            })
            .catch(error => {
              console.error('Error al editar materia:', error);
            });
      },
      async eliminarMateria(id) {
        let r = await Swal.fire({
                  title: "",
                  text: "Se eliminará la materia seleccionada, ¿Desea continuar?",
                  showCancelButton: true,
                  icon: 'question',
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Aceptar",
                  cancelButtonText: "Cancelar",
              });
  
              if( r.value ){       
                servicio.eliminarMateria(id)
                  .then(response => {
                    if (response.value){
                      Swal.fire({
                              text: 'Datos eliminados correctamente.',
                              icon: "success"
                          });
                      this.inicializarDatos()
                      this.consultarMaterias();
                    }
                  })
                  .catch(error => {
                    console.error('Error al eliminar materia:', error);
                  });
            }
      }
    }
  };
  </script>
  
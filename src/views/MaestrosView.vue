<template>
  <div class="container">
    <div class="col-12 m-2 d-flex justify-content-end">
      <button class="btn btn-primary" @click="nuevoMaestro" v-if="!nuevo">Nuevo Maestro</button>
    </div>
    <form @submit.prevent="guardarDatos" class="row" v-if="editar || nuevo">
      <div class="form-group col-12 col-md-6">
          <label for="nombre">Nombre:</label>
          <input type="text" class="form-control" id="nombre" v-model="maestro.nombre" required>
      </div>
      <div class="form-group col-12 col-md-6">
          <label for="apellidoPaterno">Apellido Paterno:</label>
          <input type="text" class="form-control" id="apellidoPaterno" v-model="maestro.apellidoPaterno" required>
      </div>
      <div class="form-group col-12 col-md-6">
          <label for="apellidoMaterno">Apellido Materno:</label>
          <input type="text" class="form-control" id="apellidoMaterno" v-model="maestro.apellidoMaterno">
      </div>
      <div class="form-group col-12 col-md-6">
        <label for="sexo">Sexo:</label>
        <select class="form-control" id="sexo" v-model="maestro.sexo" required>
            <option value="H">Masculino</option>
            <option value="F">Femenino</option>
        </select>
      </div>

      <div class="col-12 m-2 d-flex justify-content-end">
        <button type="submit" class="btn btn-success m-2">{{accion}}</button>
        <!-- <button class="btn btn-primary m-2" @click="guardarDatos">{{accion}}</button> -->
        <button class="btn btn-secondary m-2" @click="inicializarDatos">Cancelar</button>
      </div>
    </form>

    <h2>Lista de Maestros</h2>
    <table class="table">
        <thead>
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Apellido Paterno</th>
                <th>Apellido Materno</th>
                <th>Sexo</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="maestro in maestros" :key="maestro.idMaestro">
                <td class="m-1">{{ maestro.idMaestro }}</td>
                <td>{{ maestro.nombre }}</td>
                <td>{{ maestro.apellidoPaterno }}</td>
                <td>{{ maestro.apellidoMaterno }}</td>
                <td>{{ maestro.sexo }}</td>
                <td>
                    <button class="btn btn-primary m-1" @click="agregarMaestro(maestro)">Editar</button>
                    <button class="btn btn-danger " @click="eliminarMaestro(maestro)">Eliminar</button>
                </td>
            </tr>
        </tbody>
    </table>
  </div>
</template>

<script>
import servicio from '@/services/servicio-maestros';
import Swal from "sweetalert2"

export default {
  data() {
    return {
      maestros: [],
      maestro:[],
      editar: false,
      nuevo: false,
      accion: ''
    };
  },
  mounted() {
    this.consultarMaestros();
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
      this.maestro = []
      this.editar = false;
      this.nuevo = false
      this.accion = ''
    },
    valdiarDatos(){
      if(this.maestro.apellidoPaterno.trim() == '' || this.maestro.sexo.trim() == '' || this.maestro.nombre.trim() == ''){
        Swal.fire({
                    text: 'Favor de capturar todos los datos',
                    icon: "info"
                });
      }
      else{
        if( this.editar ){
          this.guardarEditar() 
        } else {
          this.guardarMaestro() 
        }
      }
    },
    consultarMaestros() {
      servicio.consultarMaestros()
        .then(response => {
          this.maestros = response.data;
        })
        .catch(error => {
          console.error('Error al consultar maestros:', error);
        });
    },
    guardarMaestro() {
      this.maestro = Object.assign({}, this.maestro)
      servicio.guardarMaestro(this.maestro)
        .then(response => {
          if (response.value){
            Swal.fire({
                    text: 'Se guardaron correctamente los datos.',
                    icon: "success"
                });
            this.inicializarDatos()
            this.consultarMaestros();
          }
        })
        .catch(error => {
          console.error('Error al agregar maestro:', error);
        });
    },
    guardarEditar(){
      servicio.editarMaestro(this.maestro.idMaestro, this.maestro)
          .then(response => {
            if (response.value){
              Swal.fire({
                    text: 'Se guardaron correctamente los datos.',
                    icon: "success"
                });
              this.inicializarDatos()
              this.consultarMaestros();
            }
          })
          .catch(error => {
            console.error('Error al editar maestro:', error);
          });
    },
    nuevoMaestro(){
      this.maestro.idMaestro = 0;
      this.maestro.nombre = "";
      this.maestro.apellidoPaterno = "";
      this.maestro.apellidoMaterno = "";
      this.maestro.sexo = "";
      this.nuevo = true
      this.accion = 'Agregar maestro'
    },
    agregarMaestro(nuevoMaestro) {
      this.accion = 'Guardar cambios'
      this.editar = true
      this.maestro =  Object.assign({}, nuevoMaestro)
    },
    async eliminarMaestro(maestro) {
      let r = await Swal.fire({
                title: "",
                text: "Se eliminará el maestro seleccionado, ¿Desea continuar?",
                showCancelButton: true,
                icon: 'question',
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Aceptar",
                cancelButtonText: "Cancelar",
            });

            if( r.value ){  
              servicio.eliminarMaestro(maestro.idMaestro)
              .then(response => {
                if(response.value){
                  Swal.fire({
                            text: 'Datos eliminados correctamente.',
                            icon: "success"
                        });
                  this.consultarMaestros()
                }
              })
              .catch(err => {
                  console.error(err)
              })
          }
      }
    
  }
};
</script>

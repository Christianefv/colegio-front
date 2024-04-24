<template>
    <div class="container">
      <form @submit.prevent="guardarEditarGrupo" class="mt-3">
        <div class="form-group">
          <label for="nombreGrupo">Nombre del Grupo:</label>
          <input type="text" class="form-control" v-model="grupo.nombreGrupo" required>
        </div>
        <button type="submit" class="btn btn-primary mt-2">{{ editing ? 'Editar Grupo' : 'Agregar Grupo' }}</button>
      </form>
      <div v-if="grupos.length > 0" class="mt-3">
        <h2>Lista de Grupos</h2>
        <table class="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre del Grupo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="grupo in grupos" :key="grupo.id">
              <td>{{ grupo.idGrupo }}</td>
              <td>{{ grupo.nombreGrupo }}</td>
              <td>
                <button @click="editarGrupo(grupo)" class="btn btn-sm btn-primary">Editar</button>
                <button @click="eliminarGrupo(grupo.idGrupo)" class="btn btn-sm btn-danger">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  import servicio from '@/services/servicio-grupos'
  import Swal from "sweetalert2"

  export default {
    data() {
      return {
        grupos: [],
        grupo: {
          idGrupo: 0,
          nombreGrupo: ''
        },
        editing: false
      }
    },
    created() {
      this.consultarGrupos()
    },
    methods: {
      consultarGrupos() {
        servicio.consultarGrupos()
          .then(grupos => {
            if(grupos.value){
                this.grupos = grupos.data
            }
          })
          .catch(err => {
            console.error(err)
          })
      },
      async guardarEditarGrupo() {
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
        if(r.value){
          this.grupo = Object.assign({}, this.grupo)
          if (this.editing) {
              
            servicio.editarGrupos(this.grupo.idGrupo, this.grupo)
              .then(() => {
                this.editing = false
                this.grupo = {
                  idGrupo: 0,
                  nombreGrupo: ''
                }
                Swal.fire({
                    text: 'Se guardaron correctamente los datos.',
                    icon: "success"
                });
                this.consultarGrupos()
              })
              .catch(err => {
                console.error(err)
              })
          } else {
            servicio.guardarGrupos(this.grupo)
              .then(() => {
                this.grupo = {
                  idGrupo: 0,
                  nombreGrupo: ''
                }
                Swal.fire({
                    text: 'Se guardaron correctamente los datos.',
                    icon: "success"
                });
                this.consultarGrupos()
              })
              .catch(err => {
                console.error(err)
              })
          }
        }
      },
      editarGrupo(grupo) {
        this.editing = true
        this.grupo = Object.assign({}, grupo)
      },
      async eliminarGrupo(id) {
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
            servicio.eliminarGrupos(id)
            .then(() => {
              Swal.fire({
                  text: 'Datos eliminados correctamente.',
                  icon: "success"
              });
              this.consultarGrupos()
            })
            .catch(err => {
              console.error(err)
            })
        }
      }
    }
  }
  </script>
  
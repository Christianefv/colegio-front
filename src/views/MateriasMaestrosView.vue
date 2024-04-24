<template>
    <div class="container">
      <div class="row">
        <div class="col-12 col-md-6 m-2 d-flex text-left">
            <label class="form-control" for="maestroSelect">Seleccione un maestro:</label>
            <select class="form-control-sm" id="maestroSelect" v-model="maestroSeleccionado" @change="seleccionarMaestro">
                <option value="">Seleccionar Maestro</option>
                <option v-for="maestro in maestros" :value="maestro" :key="maestro.idMaestro">
                    {{ maestro.nombre }} {{ maestro.apellidoPaterno }} {{ maestro.apellidoMaterno }}
                </option>
            </select>
        </div>        
    </div>
      <div class="row">
        <div class="col-12 col-md-6">
          <h2>Materias Asignadas al Maestro</h2>
          <table class="table table-bordered">
              <thead>
                  <tr>
                      <th>Materia</th>
                      <th>Acciones</th>
                  </tr>
              </thead>
              <tbody>
                  <tr v-for="materia in materiasAsignadas" :key="materia.idMateria">
                      <td class="m-1 text-left">{{ materia.descripcion }}</td>
                      <td>
                          <button class="btn btn-danger " @click="eliminarMateriaMaestro(materia.idMateria)">Eliminar</button>
                      </td>
                  </tr>
              </tbody>
          </table>
        </div>
        <div class="col-12 col-md-6">
          <h2>Materias</h2>
          <table class="table table-bordered">
              <thead>
                  <tr>
                      <th>Materia</th>
                      <th>Acciones</th>
                  </tr>
              </thead>
              <tbody>
                  <tr v-for="materia in materiasNoAsignadas" :key="materia.idMateria">
                      <td class="m-1 text-left">{{ materia.descripcion }}</td>
                      <td>
                          <button class="btn btn-primary" @click="agregarMateriaMaestro(materia.idMateria)">Asignar</button>
                      </td>
                  </tr>
              </tbody>
          </table>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import servicio from '@/services/servicio-maestros';
  import Swal from "sweetalert2"
  
  export default {
    data() {
      return {
        maestros: [],
        maestroSeleccionado:[],
        materiasAsignadas: [],
        materiasNoAsignadas: []
      };
    },
    mounted() {
      this.consultarMaestros();
    },
    methods: {
      consultarMateriasNoAsignadas() {
        if(this.maestroSeleccionado==null || this.maestroSeleccionado.idMaestro <= 0){
          Swal.fire({
                      text: 'Favor seleccionar un maestro',
                      icon: "info"
                  });
          return
        }
        servicio.materiasNoAsignadasMaestro(this.maestroSeleccionado.idMaestro)
          .then(response => {
            this.materiasNoAsignadas = response.data;
          })
          .catch(error => {
            console.error('Error al consultar materias:', error);
          });
      },
      seleccionarMaestro() {
        servicio.materiasAsignadasMaestro(this.maestroSeleccionado.idMaestro)
          .then(response => {
            this.materiasAsignadas = response.data;
            this.consultarMateriasNoAsignadas()
          })
          .catch(error => {
            console.error('Error al consultar materias:', error);
          });
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
      async agregarMateriaMaestro(id) {
        let r = await Swal.fire({
                  title: "",
                  text: "Se asignará la materia al maestro, ¿Desea continuar?",
                  showCancelButton: true,
                  icon: 'question',
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Aceptar",
                  cancelButtonText: "Cancelar",
              });

              if( r.value ){       
                servicio.guardarMateriaMaestro(id, this.maestroSeleccionado.idMaestro)
                  .then(response => {
                    if (response.value){
                      Swal.fire({
                              text: 'Materia asignada correctamente.',
                              icon: "success"
                          });
                        this.seleccionarMaestro()
                    }
                  })
                  .catch(error => {
                    console.error('Error al eliminar maestro:', error);
                  });
                }
      },
      async eliminarMateriaMaestro(id) {
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
                servicio.eliminarMateriaMaestro(id, this.maestroSeleccionado.idMaestro)
                  .then(response => {
                    if (response.value){
                      Swal.fire({
                              text: 'Datos eliminados correctamente.',
                              icon: "success"
                          });
                        this.seleccionarMaestro()
                    }
                  })
                  .catch(error => {
                    console.error('Error al eliminar maestro:', error);
                  });
            }
      }
    }
  };
  </script>
  
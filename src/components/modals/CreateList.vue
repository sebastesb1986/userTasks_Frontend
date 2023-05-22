<template>
    <!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Crear lista de tareas</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="mb-3">
          <label class="form-label">Título</label>
          <input type="text" class="form-control" v-model="createtkl.title">
        </div>
        <div class="mb-3">
          <label class="form-label">Descripción</label>
          <textarea type="text" class="form-control" v-model="createtkl.description" rows="3"></textarea>
        </div>
        <div class="mb-3">
          <label class="form-check-label" for="exampleCheck1">Tareas:</label>
          <Multiselect v-model="createtkl.task_id" :options="tasks" mode="tags" :close-on-select="true"
            :searchable="true" :create-option="false" />
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
        <button type="button" class="btn btn-primary" @click="createList">Guardar</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
import Multiselect from '@vueform/multiselect'
import {Modal} from "bootstrap"

export default {
name: 'createlist',

data() {
  return {

    theModal: null,

    // Multiple select
    task_id: null,
    tasks: [],
    

    taskList: [],
    // End multiple select

    createtkl: {
      title: "",
      description: "",
      task_id: [],
    },

  };
},
components: {
  Multiselect,
},
mounted() {
  this.getTask();
  this.theModal = new Modal('#exampleModal');
},
methods: {
 async getTask() {
    
    await axios
      .get(`auth/tk`)
      .then((res) => {
        
        let tks = res.data.tasks;
        let tk = [];

        tks.forEach(element => {
            
          tk.push({ value: element.id, label: element.title });

        });

        this.tasks = tk;

      });
  },
  async createList() {
    await axios.post('auth/createtkl', this.createtkl).then(() => {
        this.theModal.hide();
        this.$emit('succesfully');
    }).catch(error => {
      console.log(error)
    })
  },
},
}
</script>
<style src="@vueform/multiselect/themes/default.css"></style>
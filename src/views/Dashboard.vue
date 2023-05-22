<template>
  <main class="container py-5">
    <div>
      <div class="text-end">
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"><i
            class="bi bi-plus-lg"></i> Nueva lista de tareas</button>
      </div>
    </div>

    <table class="table table-responsive">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Titulo</th>
          <th scope="col">Descripción</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="taskList.length > 0">
          <tr v-for="(taskl, index) in taskList" :key="taskl">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ taskl.title }}</td>
            <td>{{ taskl.description }}</td>
            <td>
              <div class="d-grid gap-2 d-md-flex">
                <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal2"
                  @click="showList(taskl.list_code)"><i class="bi bi-pencil"></i></button>

                <button type="button" class="btn btn-danger" @click="deleteList(taskl.id)"><i
                    class="bi bi-x"></i></button>
              </div>
            </td>
          </tr>
        </template>
        <tr v-else>
          <td colspan="4">
            <div class="bg-body-tertiary p-2 rounded">
              <div class="col-sm-8 py-5 mx-auto">
                <h1 class="display-5 fw-normal">No hay listas de tareas registradas.</h1>
                <p class="fs-5">Para poder registrar una lista de tareas, dirigete al boton superior de la derecha
                  para crearla.
                </p>
                <p class="fs-5"><b>No puedes crear una lista de tareas sino existen tareas disponibles o creadas.</b></p>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>




  </main>

  <!-- Modal -->
  <CreateList @succesfully="getData"></CreateList>
  <UpdateList @succesfully="getData" :data="tklup"></UpdateList>
</template>
  
<script>
// @ is an alias to /src
import axios from 'axios';
import CreateList from "@/components/modals/CreateList.vue"
import UpdateList from "@/components/modals/UpdateList.vue"

export default {
  name: 'dashboard',

  data() {
    return {

      name: "",
      code: "",
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

      tklup: {
        list_code: "",
        title: "",
        description: "",
        task_id: [],
      }

    };
  },
  components: {

    CreateList,
    UpdateList

  },
  mounted() {
    // Mostrar las listas de tareas del usuario.
    this.getData();

    // Confirmamos si tenemos tareas registradas.
    this.getInit();
  },
  methods: {
  getData() {
      axios
        .get(`auth/tkl`)
        .then((res) => {

          let tkl = res.data.tasklists;
          this.taskList = tkl;

        });
    },
    getInit() {

      axios
        .get(`auth/tk`)
        .then((res) => {

          let tks = res.data.tasks;


          if (tks.length == 0) {

            this.$router.replace({
              name: 'tasks'
            })

          }

        });
    },
    showList(code) {

      axios.get(`auth/showtkl/${code}`).then(response => {

        const arrList = response.data;
        const { list_code, title, description } = arrList.tasklist
        this.tklup.task_id = arrList.tklPivot;

        this.tklup.list_code = list_code
        this.tklup.title = title
        this.tklup.description = description

        console.log(arrList.tasklist);

      }).catch(error => {
        console.log(error)
      })
    },
    deleteList(id) {
      if (confirm("¿Estas seguro de eliminar esta lista ?")) {
        axios.delete(`auth/deletetkl/${id}`).then(() => {
          this.getData()
        }).catch(error => {
          console.log(error)
        })
      }
    }
  },
}
</script>
  
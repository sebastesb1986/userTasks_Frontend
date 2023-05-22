<template>
    <main class="container py-5">
        <div class="text-end">
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModalTC"><i
                    class="bi bi-plus-lg"></i> Crear tarea</button>
        </div>
        <template v-if="tasks.length > 0">
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Titulo</th>
                        <th scope="col">Descripción</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>

                    <tr v-for="(task, index) in tasks" :key="task">
                        <th scope="row">{{ index + 1 }}</th>
                        <td>{{ task.title }}</td>
                        <td>{{ task.description }}</td>
                        <td>
                            <div class="d-grid gap-2 d-md-flex">
                                <button type="button" class="btn btn-warning" data-bs-toggle="modal"
                                    data-bs-target="#exampleModalTU" @click="showTask(task.id)"><i
                                        class="bi bi-pencil"></i></button>

                                <button type="button" class="btn btn-danger" @click="deleteList(task.id)"><i
                                        class="bi bi-x"></i></button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </template>
        <template v-else>
            <div class="bg-body-tertiary p-2 rounded">
                <div class="col-sm-8 py-5 mx-auto">
                    <h1 class="display-5 fw-normal">No hay tareas registradas.</h1>
                    <p class="fs-5">Para poder registrar una tarea, dirigete al boton superior de la derecha
                        para crearla.
                    </p>
                    <p class="fs-5"><b>No puedes crear una lista de tareas sino existen tareas disponibles o creadas.</b></p>
                </div>
            </div>
        </template>
    </main>
    <!-- Modal -->
    <CreateTask @succesfully="getData"></CreateTask>
    <UpdateTask @succesfully="getData" :data="task"></UpdateTask>
</template>
    
<script>
// @ is an alias to /src
import axios from 'axios';
import CreateTask from "@/components/modals/CreateTask.vue"
import UpdateTask from "@/components/modals/UpdateTask.vue"

export default {
    name: 'dashboard',

    data() {
        return {

            tasks: [],

            task: {
                id: "",
                title: "",
                description: "",
            }

        };
    },
    components: {

        CreateTask,
        UpdateTask

    },
    mounted() {
        this.getData();
    },
    methods: {
        getData() {
            axios
                .get(`auth/tk`)
                .then((res) => {

                    let tkl = res.data.tasks;
                    this.tasks = tkl;

                });
        },
        showTask(id) {

            axios.get(`auth/showtk/${id}`).then(response => {

                const arrTask = response.data;
                const { id, title, description } = arrTask.task

                this.task.id = id
                this.task.title = title
                this.task.description = description

                console.log(arrTask.task)

            }).catch(error => {
                console.log(error)
            })
        },
        deleteList(id) {
            if (confirm("¿Estas seguro de eliminar esta tarea ?")) {
                axios.delete(`auth/deletetk/${id}`).then(() => {
                    this.getData()
                }).catch(error => {
                    console.log(error)
                })
            }
        }
    },
}
</script>
    
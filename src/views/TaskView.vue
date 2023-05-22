<template>
    <main class="container py-5">
        <div class="text-end">
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModalTC"><i
                    class="bi bi-plus-lg"></i> Crear tarea</button>
        </div>
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
                <template v-if="tasks.data.length > 0">
                    <tr v-for="(task, index) in tasks.data" :key="task">
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
                </template>
                <tr v-else>
                    <td colspan="4">
                        <div class="bg-body-tertiary p-2 rounded">
                            <div class="col-sm-8 py-5 mx-auto">
                                <h1 class="display-5 fw-normal">No hay listas de tareas registradas.</h1>
                                <p class="fs-5">Para poder registrar una tarea, dirigete al boton superior de la
                                    derecha
                                    para crearla.
                                </p>
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>

        <Bootstrap5Pagination :data="tasks" @pagination-change-page="getData" />

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
import { Bootstrap5Pagination } from 'laravel-vue-pagination';

export default {
    name: 'dashboard',

    data() {
        return {

            tasks: { data: [] },

            task: {
                id: "",
                title: "",
                description: "",
            }

        };
    },
    components: {

        CreateTask,
        UpdateTask,
        Bootstrap5Pagination

    },
    mounted() {
        this.getData();
    },
    methods: {
        getData(page = 1) {
            axios
                .get(`auth/allTask?page=${page}`)
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

            }).catch(error => {
                console.log(error)
            })
        },
        deleteList(id) {

            this.$swal.fire({
                title: '¿Seguro?',
                text: "¿Quieres eliminar esta tarea?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si',
                cancelButtonText: 'Cancelar',
            }).then((result) => {
                if (result.isConfirmed) {

                    axios.delete(`auth/deletetk/${id}`).then(() => {
                        this.getData()
                        this.$swal.fire(
                            'Eliminada!',
                            'Tarea eliminada exitosamente!.',
                            'success'
                        )
                    }).catch(error => {
                        console.log(error)
                    })


                }
            })
        }
    },
}
</script>
    
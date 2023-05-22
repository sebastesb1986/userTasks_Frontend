<template>
    <!-- Modal UPDATE-->
    <div class="modal fade" id="exampleModalTU" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Actualizar tarea </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <label class="form-label">titulo</label>
                        <input type="text" class="form-control" v-model="task.title">
                        <span v-if="validation.errors.title" class="error-message">{{ validation.errors.title[0] }}</span>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Descripción</label>
                        <input type="text" class="form-control" v-model="task.description">
                        <span v-if="validation.errors.description" class="error-message">{{ validation.errors.description[0] }}</span>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    <button type="button" class="btn btn-warning" @click="updateTask(task.id)">Editar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
import { Modal } from "bootstrap"

export default {
    name: 'updatelist',
    props: { data: Object },

    data() {
        return {

            validation: {
                errors: {}
            },

            task: {
                id: "",
                title: "",
                description: "",
            }

        };
    },
    components: {
        //
    },
    watch: {
        data: {
            handler(newValue) {

                this.tasks(newValue);

            },
            deep: true
        }
    },
    mounted() {

        this.theModal = new Modal('#exampleModalTU');

    },
    methods: {

        tasks(data) {

            Object.entries(data).forEach(([key, value]) => {

                this.task[key] = value;

            })

        },
        async updateTask(id) {
            await axios.put(`auth/updatetk/${id}`, this.task).then(() => {

                this.theModal.hide();
                this.$emit('succesfully');

            }).catch(e => {
                const arr = e.response;

                if (arr.status == 422) {

                    this.validation.errors = arr.data.errors;

                }
            })
        },

    },
}
</script>

<template>
    <!-- Modal -->
    <div class="modal fade" id="exampleModalTC" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Crear Tarea</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <label class="form-label">Título</label>
                        <input type="text" class="form-control" v-model="task.title">
                        <span v-if="validation.errors.title" class="error-message">{{ validation.errors.title[0] }}</span>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Descripción</label>
                        <textarea type="text" class="form-control" v-model="task.description" rows="3"></textarea>
                        <span v-if="validation.errors.description" class="error-message">{{ validation.errors.description[0] }}</span>

                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    <button type="button" class="btn btn-primary" @click="createTask">Guardar</button>
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
    name: 'createlist',

    data() {
        return {

            validation: {
                errors: {}
            },

            task: {
                title: "",
                description: "",
            },

        };
    },
    components: {
        //
    },
    mounted() {

        this.theModal = new Modal('#exampleModalTC');

    },
    methods: {

        async createTask() {
            await axios.post('auth/createtk', this.task).then(() => {
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

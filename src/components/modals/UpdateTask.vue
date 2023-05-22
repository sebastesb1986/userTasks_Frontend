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
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Descripción</label>
                        <textarea type="text" class="form-control" rows="3" v-model="task.description"></textarea>
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
            await axios.put(`auth/updatetk/${id}`, this.task).then((response) => {

                const toast = response.data;

                this.theModal.hide();         
                this.$emit('succesfully');

                this.$toast.success(toast.success);

                // Close all opened toast after 3000ms
                setTimeout(this.$toast.clear, 4000)

            }).catch(e => {
                const arr = e.response;
                const toast = arr.data.errors;

                if (arr.status == 422) {
                    
                    this.validation.errors = toast;
                
                    (toast.title != null) ? this.$toast.error(toast.title[0]) : '';
                    (toast.description != null) ? this.$toast.error(toast.description[0]) : '';

                    // Close all opened toast after 3000ms
                    setTimeout(this.$toast.clear, 4000)

                }
            })
        },

    },
}
</script>

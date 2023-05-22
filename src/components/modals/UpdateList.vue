<template>
    <!-- Modal UPDATE-->
    <div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Actualizar lista de tareas </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <label class="form-label">titulo</label>
                        <input type="text" class="form-control" v-model="tklUp.title">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Descripción</label>
                        <textarea type="text" class="form-control" rows="3" v-model="tklUp.description"></textarea>
                    </div>
                    <div class="mb-3">
                        <label class="form-check-label" for="exampleCheck1">Tareas:</label>
                        <Multiselect v-model="tklUp.task_id" :options="tasks" mode="tags" :close-on-select="true"
                            :searchable="true" :create-option="false" />
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    <button type="button" class="btn btn-warning" @click="updateList(tklUp.list_code)">Editar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
import Multiselect from '@vueform/multiselect'
import { Modal } from "bootstrap"

export default {
    name: 'updatelist',
    props: { data: Object },

    data() {
        return {

            // Multiple select
            task_id: null,
            tasks: [],
            // End multiple select

            tklUp: {
                list_code: "",
                title: "",
                description: "",
                task_id: [],
            }

        };
    },
    components: {
        Multiselect,

    },
    watch: {
        data: {
            handler(newValue) {

                this.taskList(newValue);

            },
            deep: true
        }
    },
    mounted() {

        this.theModal = new Modal('#exampleModal2');
        this.getTask();

    },
    methods: {

        taskList(data) {

            Object.entries(data).forEach(([key, value]) => {

                this.tklUp[key] = value;

            })

        },
        getTask() {
            axios
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
        async updateList(code) {
            await axios.put(`auth/updatetkl/${code}`, this.tklUp).then(() => {

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

<template>
    <!-- Modal UPDATE-->
    <div class="modal fade" id="exampleModalU" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Actualizar usuario</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <label class="form-label">Nombre(s)</label>
                        <input type="text" class="form-control" v-model="userData.name">
                        <span v-if="validation.errors.name" class="error-message">{{ validation.errors.name[0] }}</span>

                    </div>
                    <div class="mb-3">
                        <label class="form-label">Apellido(s)</label>
                        <input type="text" class="form-control" v-model="userData.lastname">
                        <span v-if="validation.errors.lastname" class="error-message">{{ validation.errors.lastname[0] }}</span>

                    </div>
                    <div class="mb-3">
                        <label class="form-label">identificación</label>
                        <input type="text" class="form-control" v-model="userData.identification">
                        <span v-if="validation.errors.identification" class="error-message">{{ validation.errors.identification[0] }}</span>

                    </div>
                    <div class="mb-3">
                        <label class="form-label">Correo electrónico</label>
                        <input type="text" class="form-control" v-model="userData.email">
                        <span v-if="validation.errors.email" class="error-message">{{ validation.errors.email[0] }}</span>

                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    <button type="button" class="btn btn-warning" @click="updateUser(userData.id)">Editar</button>
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
    name: 'userdata',
    props: { data: Object },

    data() {
        return {

            validation: {
                errors: {}
            },

            userData: {
                id: "",
                name: "",
                lastname: "",
                identification: "",
                // password: "",
            }

        };
    },
    components: {
        //
    },
    watch: {
        data: {
            handler(newValue) {

                this.userInfo(newValue);

            },
            deep: true
        }
    },
    mounted() {

        this.theModal = new Modal('#exampleModalU');
        
    },
    methods: {

        userInfo(data) {

            Object.entries(data).forEach(([key, value]) => {

                this.userData[key] = value;

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
        async updateUser(id) {
          
            await axios.put(`auth/updateus/${id}`, this.userData).then(() => {

                this.theModal.hide();
                // this.$emit('succesfully');
                
                this.$parent.$refs.username.innerText = this.userData.name;
                // this.$router.go();

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
<style src="@vueform/multiselect/themes/default.css"></style>

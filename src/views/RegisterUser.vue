<template>
    <main class="form-signin w-100 m-auto py-5 text-center">
        <form @submit.prevent="submit">

            <h1 class="h3 mb-3 fw-normal">Registrar usuario</h1>

            <div class="form-floating">
                <input type="text" class="form-control" id="floatingInput" placeholder="Nombres" v-model="form.name">
                <label for="floatingInput">Nombres</label>
            </div>

            <div class="form-floating">
                <input type="text" class="form-control" id="floatingInput" placeholder="Apellidos" v-model="form.lastname">
                <label for="floatingInput">Apellidos</label>
            </div>

            <div class="form-floating">
                <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com"
                    v-model="form.email">
                <label for="floatingInput">Email address</label>
            </div>

            <div class="form-floating">
                <input type="text" class="form-control" id="floatingInput" placeholder="Identificación"
                    v-model="form.identification">
                <label for="floatingInput">Identificación</label>
            </div>

            <div class="form-floating">
                <input type="password" class="form-control" id="floatingPassword" placeholder="Contraseña"
                    v-model="form.password">
                <label for="floatingPassword">Password</label>
            </div>

            <div class="form-floating">
                <input type="password" class="form-control" id="floatingPassword" placeholder="Confirmar contraseña"
                    v-model="form.password_confirmation">
                <label for="floatingPassword">Confirmar contraseña</label>
            </div>

            <button class="w-100 btn btn-lg btn-primary" type="submit">Registrar</button><br><br>
            <p>¿Ya tienes una cuenta? <router-link :to="{ name: 'signin' }">Iniciar sesión</router-link></p>

            <p class="mt-5 mb-3 text-body-secondary">&copy; 2017–2023</p>
        </form>
    </main>
</template>

<style>
body {
    height: 100%;
}

body {
    align-items: center;
    padding-top: 40px;
    padding-bottom: 40px;
    background-color: #f5f5f5;
}

.form-signin {
    max-width: 330px;
    padding: 15px;
}

.form-signin .form-floating:focus-within {
    z-index: 2;
}

.form-signin input[type="email"] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
}
</style>
  
<script>
// @ is an alias to /src
import axios from 'axios';

export default {
    name: 'registeruser',
    components: {
        //
    },

    data() {

        return {

            form: {
                name: '',
                lastname: '',
                email: '',
                identification: '',
                password: '',
                password_confirmation: ''
            }

        }

    },

    methods: {

        async submit() {

            await axios.post('auth/register', this.form).then((response) => {

                const toast = response.data

                this.$toast.success(toast.message);

                this.$router.replace({
                    name: 'signin'
                })

            }).catch(e => {

                const arr = e.response;
                const toast = arr.data.errors;

                if (arr.status == 422) {

                    (toast.name != null) ? this.$toast.error(toast.name[0]) : '';
                    (toast.lastname != null) ? this.$toast.error(toast.lastname[0]) : '';
                    (toast.identification != null) ? this.$toast.error(toast.identification[0]) : '';
                    (toast.email != null) ? this.$toast.error(toast.email[0]) : '';
                    (toast.password != null) ? this.$toast.error(toast.password[0]) : '';

                    // Close all opened toast after 3000ms
                    setTimeout(this.$toast.clear, 4000)

                }

            })



        }

    }
}
</script>
  
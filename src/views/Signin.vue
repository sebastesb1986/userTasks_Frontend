<template>
  <main class="form-signin w-100 m-auto text-center py-5">
   
    <form @submit.prevent="submit">

      <h1 class="h3 mb-3 fw-normal">Iniciar Sesión</h1>

      <div class="form-floating">
        <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" v-model="form.email">
        <label for="floatingInput">Email address</label>
      </div>
      <div class="form-floating">
        <input type="password" class="form-control" id="floatingPassword" placeholder="Password" v-model="form.password">
        <label for="floatingPassword">Password</label>
      </div>

      <button class="w-100 btn btn-lg btn-primary" type="submit">Ingresar</button>
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
import { mapActions } from 'vuex';

export default {
  name: 'signin',
  components: {
    //
  },

  data() {

    return {

      validation: {
        noUser: "",
        errors: {}
      },


      form: {
        email: '',
        password: ''
      }

    }

  },
  methods: {

    ...mapActions({

      signIn: 'auth/signIn'

    }),
    submit() {

      this.signIn(this.form)
        .then((response) => {

          console.log(response)
          // Una vez iniciada la sesión, se redirecciona a la vista dashboard
          this.$router.replace({
            name: 'dashboard'
          })

        })
        .catch((e) => {

          const arr = e.response;
          const toast = arr.data.errors;

          if (arr.status == 401) {

            this.validation.noUser = toast;
            this.$toast.error(arr.data.error);
        

          }
          else if (arr.status == 422) {
            this.validation.errors = toast

            this.$toast.error(toast.email);
            this.$toast.error(toast.password);

            // Close all opened toast after 3000ms
            setTimeout(this.$toast.clear, 4000)

          }

        })


    }

  }
}
</script>
  
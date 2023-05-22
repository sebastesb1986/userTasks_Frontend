<template>
  <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">PRUEBA V1.0</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse"
        aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarCollapse">

        <ul class="navbar-nav me-auto mb-2 mb-md-0">
          <template v-if="authenticated">
            <li class="nav-item">
              <router-link :to="{ name: 'dashboard' }" class="nav-link" :class="$route.name == 'dashboard' ? 'active' : '' ">Mi lista de tareas</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{ name: 'tasks' }" class="nav-link" :class="$route.name == 'tasks' ? 'active' : '' ">Tareas</router-link>
            </li>
            <li class="nav-item dropdown">
              <a  ref="username" class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">{{ user.name
              }}</a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#" @click="getUser(user.id)" data-bs-toggle="modal"
                    data-bs-target="#exampleModalU">Editar</a></li>
                <li><a class="dropdown-item" href="#" @click.prevent="signOut">Cerrar sesión</a></li>
              </ul>
            </li>
          </template>
          <template v-else>
            <li class="nav-item">
              <router-link :to="{ name: 'home' }" class="nav-link" :class="$route.name == 'home' ? 'active' : '' ">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{ name: 'registeruser' }" class="nav-link" :class="$route.name == 'registeruser' ? 'active' : '' ">Registrarse</router-link>
            </li>
            <li>
              <router-link :to="{ name: 'signin' }" class="nav-link" :class="$route.name == 'signin' ? 'active' : '' ">Iniciar sesión</router-link>
            </li>
          </template>
        </ul>


      </div>
    </div>
  </nav>

  <!-- Modal -->
  <UserData :data="dataUser"></UserData>
</template>

<style>
body {
  padding-bottom: 20px;
}

.navbar {
  margin-bottom: 20px;
}
.bd-placeholder-img {
        font-size: 1.125rem;
        text-anchor: middle;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
      }

      @media (min-width: 768px) {
        .bd-placeholder-img-lg {
          font-size: 3.5rem;
        }
      }

      .b-example-divider {
        width: 100%;
        height: 3rem;
        background-color: rgba(0, 0, 0, .1);
        border: solid rgba(0, 0, 0, .15);
        border-width: 1px 0;
        box-shadow: inset 0 .5em 1.5em rgba(0, 0, 0, .1), inset 0 .125em .5em rgba(0, 0, 0, .15);
      }

      .b-example-vr {
        flex-shrink: 0;
        width: 1.5rem;
        height: 100vh;
      }

      .bi {
        vertical-align: -.125em;
        fill: currentColor;
      }

      .nav-scroller {
        position: relative;
        z-index: 2;
        height: 2.75rem;
        overflow-y: hidden;
      }

      .nav-scroller .nav {
        display: flex;
        flex-wrap: nowrap;
        padding-bottom: 1rem;
        margin-top: -1px;
        overflow-x: auto;
        text-align: center;
        white-space: nowrap;
        -webkit-overflow-scrolling: touch;
      }

      .btn-bd-primary {
        --bd-violet-bg: #712cf9;
        --bd-violet-rgb: 112.520718, 44.062154, 249.437846;

        --bs-btn-font-weight: 600;
        --bs-btn-color: var(--bs-white);
        --bs-btn-bg: var(--bd-violet-bg);
        --bs-btn-border-color: var(--bd-violet-bg);
        --bs-btn-hover-color: var(--bs-white);
        --bs-btn-hover-bg: #6528e0;
        --bs-btn-hover-border-color: #6528e0;
        --bs-btn-focus-shadow-rgb: var(--bd-violet-rgb);
        --bs-btn-active-color: var(--bs-btn-hover-color);
        --bs-btn-active-bg: #5a23c8;
        --bs-btn-active-border-color: #5a23c8;
      }
      .bd-mode-toggle {
        z-index: 1500;
      }
</style>

<script>

import { mapGetters, mapActions } from 'vuex';
import axios from 'axios';
import UserData from "@/components/modals/UserData.vue"

export default {

  data() {

    return {

      dataUser: {
        id: "",
        name: "",
        lastname: "",
        identification: "",
        email: "",
        // password: "",
      },


    }

  },
  components: {

    UserData

  },

  computed: {

    ...mapGetters({

      authenticated: 'auth/authenticated',
      user: 'auth/user'


    })
  },

  methods: {

    ...mapActions({
      signOutAction: 'auth/signOut'
    }),

    getUser(user) {
      axios
        .get(`auth/showus/${user}`)
        .then((res) => {

          let arrUser = res.data;

          const { id, name, lastname, identification, email } = arrUser.user

          this.dataUser.id = id
          this.dataUser.name = name
          this.dataUser.lastname = lastname
          this.dataUser.identification = identification
          this.dataUser.email = email

        });
    },

    signOut() {
      this.signOutAction().then(() => {

        this.$toast.success("Has finalizado tu sesión");

        this.$router.replace({
          name: 'signin'
        })

      })
    }

  }
}

</script>
 
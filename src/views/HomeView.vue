<template>
  <main class="container py-5">
    <div class="bg-light p-5 rounded mt-3 text-center">
      <h1>Bienvenido a PRUEBA V1.0</h1>
      <p class="lead">Aqui podras registrar tus tareas y con ellas organizarlas en una lista de tareas
        para una mejor distribución de tus actividades. </p>
      <router-link :to="{ name: 'registeruser' }" class="btn btn-lg btn-primary">Registrate</router-link>

    </div>
  </main>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'HomeView',
  components: {
    //
  }
}
</script>

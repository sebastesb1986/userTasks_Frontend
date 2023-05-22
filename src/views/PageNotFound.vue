<template>
    <main class="container py-5">
      <div class="bg-light p-5 rounded mt-3 text-center">
        <h1>404</h1>
        <p class="lead">Página NO encontrada </p>
        <router-link :to="{ name: 'dashboard' }" class="btn btn-lg btn-link">Regresar</router-link>
  
      </div>
    </main>
  </template>
  
  <script>
  // @ is an alias to /src
  
  export default {
    name: 'pagenotfound',
    components: {
      //
    }
  }
  </script>
  
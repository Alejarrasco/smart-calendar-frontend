<template>
  <div id="app">
    <!-- Banner Section -->
    <section class="banner">
      <img src="/src/assets/banner-image.png" alt="Smart Calendar" />
    </section>

    <!-- Introduction Section -->
    <div class="flex-container">
      <!-- Introduction Section -->
      <section class="introduction">
        <h1>Bienvenido a Smart Calendar</h1>
        <p>
          Gestiona tus espacios y reservas con facilidad y evita conflictos de
          horario.
        </p>
      </section>

      <!-- Features Section -->
      <section class="features">
        <h2>Características Principales</h2>
        <ul>
          <li>Reserva de espacios en tiempo real</li>
          <li>Alertas para evitar doble reserva</li>
          <li>Seguimiento de espacios y horarios</li>
        </ul>
      </section>

      <!-- How It Works Section -->
      <section class="how-it-works">
        <h2>Cómo Funciona</h2>
        <p>
          Sigue estos pasos para comenzar a administrar tus reservas de manera
          efectiva.
        </p>
        <!-- Steps could be added here -->
      </section>
    </div>
  </div>
</template>

<script lang="ts">
/* import TestAuth from "../components/TestAuth.vue";
 */
export default {
  name: "home-view",
  components: {
    /*     TestAuth,
     */
  },
};
</script>

<style scoped>
.banner {
  width: 100%;
  display: block;
}

.banner img {
  width: 100%;
  height: auto;
}

.introduction,
.features,
.how-it-works {
  text-align: center;
  padding: 20px;
}

h1,
h2 {
  color: #333;
}

p {
  color: #555;
}

.features ul {
  list-style-type: none;
  padding: 0;
}

.features li {
  padding: 5px 0;
}

/* Adapt the color palette based on your banner image */
:root {
  --primary-color: #4a4a4a; /* Dark grey */
  --accent-color: #dcdcdc; /* Light grey */
}

body {
  font-family: "Arial", sans-serif;
  background-color: var(--accent-color);
  color: var(--primary-color);
}
.flex-container {
  display: flex;
  justify-content: space-around;
  align-items: stretch; /* Esta propiedad asegura que los elementos hijos se estiren para ocupar todo el alto del contenedor */
  margin: 10px 0; /* Margen vertical para el contenedor */
}

.flex-container > section {
  flex: 1; /* Esto hace que cada sección crezca igualmente para ocupar el espacio */
  margin: 10px; /* Añade un poco de espacio entre las secciones */
  padding: 20px; /* Añade padding dentro de las secciones */
  background-color: white; /* o cualquier otro color de fondo que prefieras */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); /* Opcional: añade sombra a las secciones para un efecto elevado */
  display: flex; /* Hace este elemento un contenedor flex también */
  flex-direction: column; /* Orienta los hijos de la tarjeta verticalmente */
  justify-content: space-between; /* Distribuye el espacio interior uniformemente */
}

/* ... Other styles ... */
</style>

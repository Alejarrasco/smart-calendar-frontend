<template>
  <div class="container">
    <form @submit.prevent="createSpace" class="form">
      <h2 class="form-title">Nuevo espacio</h2>

      <div class="form-group">
        <label for="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          v-model="space.nombre"
          class="form-control"
        />
      </div>

      <div class="form-group">
        <label for="descripcion">Descripción:</label>
        <input
          type="text"
          id="descripcion"
          v-model="space.descripcion"
          class="form-control"
        />
      </div>

      <div class="form-group">
        <label for="tipo">Tipo:</label>
        <input
          type="text"
          id="tipo"
          v-model="space.tipo"
          class="form-control"
        />
      </div>

      <div class="form-group">
        <label for="capacidad">Capacidad:</label>
        <input
          type="number"
          id="capacidad"
          v-model="space.capacidad"
          class="form-control"
        />
      </div>

      <div class="form-group form-group-date">
        <label for="fecha-de">Fecha - De:</label>
        <input
          type="date"
          id="fecha-de"
          v-model="space.fechaDe"
          class="form-control"
        />
        <label for="fecha-a">A:</label>
        <input
          type="date"
          id="fecha-a"
          v-model="space.fechaA"
          class="form-control"
        />
      </div>

      <div class="form-actions">
        <button type="button" @click="cancel" class="btn-cancel">
          Cancelar
        </button>
        <button type="submit" class="btn-create">Crear</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "SpaceCreationForm",
  setup() {
    const space = ref({
      nombre: "",
      descripcion: "",
      tipo: "",
      capacidad: 0,
      fechaDe: "",
      fechaA: "",
    });

    function createSpace() {
      // Lógica para crear el espacio
      console.log("Espacio creado:", space.value);
    }

    function cancel() {
      // Lógica para cancelar la creación del espacio
      console.log("Creación cancelada");
    }

    return {
      space,
      createSpace,
      cancel,
    };
  },
});
</script>

<style scoped>
.container {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.form {
  display: flex;
  flex-direction: column;
}
.form-title {
  text-align: center;
  margin-bottom: 20px;
}
.form-group {
  margin-bottom: 15px;
}
.form-group label {
  display: block;
  margin-bottom: 5px;
}
.form-group input.form-control,
.form-group select.form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.input-group {
  display: flex;
  align-items: center;
}
.input-group .form-control {
  flex-grow: 1;
  margin-right: 5px;
}
.btn-add {
  padding: 10px;
  border: none;
  border-radius: 50%; /* Makes the button round */
  background-color: #007bff;
  color: white;
  cursor: pointer;
}
.form-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}
.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 20px; /* Rounded borders for buttons */
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.btn-cancel {
  background-color: #f44336;
  color: white;
}
.btn-create {
  background-color: #4caf50;
  color: white;
}
.btn:hover {
  filter: brightness(90%);
}
</style>

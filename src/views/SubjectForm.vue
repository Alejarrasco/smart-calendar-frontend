<template>
  <div class="container">
    <form @submit.prevent="createSubject" class="form">
      <h2 class="form-title">Nueva asignatura</h2>

      <div class="form-group">
        <label for="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          v-model="subject.nombre"
          class="form-control"
        />
      </div>

      <div class="form-group">
        <label for="descripcion">Descripción:</label>
        <input
          type="text"
          id="descripcion"
          v-model="subject.descripcion"
          class="form-control"
        />
      </div>

      <div class="form-group">
        <label for="codigo">Código:</label>
        <input
          type="text"
          id="codigo"
          v-model="subject.codigo"
          class="form-control"
        />
      </div>

      <div class="form-group">
        <label for="facultad">Facultad:</label>
        <select id="facultad" v-model="subject.facultad" class="form-control">
          <option>Ingeniería</option>
          <option>Medicina</option>
          <option>Ciencias Puras</option>
        </select>
      </div>

      <div class="form-group">
        <label for="requerimientos">Requerimientos:</label>
        <div class="input-group">
          <input
            type="text"
            id="requerimientos"
            v-model="requirement"
            class="form-control"
          />
          <button @click="addRequirement" class="btn-add">+</button>
        </div>
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

interface Subject {
  nombre: string;
  descripcion: string;
  codigo: string;
  facultad: string;
  requerimientos: string[];
}

export default defineComponent({
  name: "SubjectCreationForm",
  setup() {
    const subject = ref<Subject>({
      nombre: "",
      descripcion: "",
      codigo: "",
      facultad: "",
      requerimientos: [],
    });
    const requirement = ref("");

    function createSubject() {
      // Lógica para crear la asignatura
      console.log("Asignatura creada:", subject.value);
    }

    function addRequirement() {
      if (requirement.value) {
        subject.value.requerimientos.push(requirement.value);
        requirement.value = ""; // reset the input after adding
      }
    }

    function cancel() {
      // Lógica para cancelar la creación de la asignatura
      console.log("Creación cancelada");
    }

    return {
      subject,
      requirement,
      createSubject,
      addRequirement,
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

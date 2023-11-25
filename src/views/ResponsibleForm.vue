<template>
  <div class="container">
    <form @submit.prevent="assignTeacherAssistant" class="form">
      <h2 class="form-title">Asignación de Docentes/Ayudantes</h2>

      <div class="form-group">
        <label for="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          v-model="teacherAssistant.nombre"
          class="form-control"
        />
      </div>

      <div class="form-group">
        <label for="apellido">Apellido:</label>
        <input
          type="text"
          id="apellido"
          v-model="teacherAssistant.apellido"
          class="form-control"
        />
      </div>

      <div class="form-group">
        <label for="email">Email:</label>
        <input
          type="email"
          id="email"
          v-model="teacherAssistant.email"
          class="form-control"
        />
      </div>

      <div class="form-group">
        <label for="tipo">Tipo:</label>
        <input
          type="text"
          id="tipo"
          v-model="teacherAssistant.tipo"
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

interface TeacherAssistant {
  nombre: string;
  apellido: string;
  email: string;
  tipo: string;
}

export default defineComponent({
  name: "TeacherAssistantAssignmentForm",
  setup() {
    const teacherAssistant = ref<TeacherAssistant>({
      nombre: "",
      apellido: "",
      email: "",
      tipo: "",
    });

    function assignTeacherAssistant() {
      // Lógica para asignar el docente/ayudante
      console.log("Docente/Ayudante asignado:", teacherAssistant.value);
    }

    function cancel() {
      // Lógica para cancelar la asignación
      console.log("Asignación cancelada");
    }

    return {
      teacherAssistant,
      assignTeacherAssistant,
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

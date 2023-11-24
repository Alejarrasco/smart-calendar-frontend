<template>
  <div class="admin-container">
    <section class="subjects-container">
      <h1>Asignaturas</h1>
      <table class="subjects-table">
        <thead>
          <tr>
            <th>Asignaturas</th>
            <th>Descripción</th>
            <th>Código</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="subject in subjects" :key="subject.id">
            <td>{{ subject.name }}</td>
            <td>{{ subject.description }}</td>
            <td>{{ subject.code }}</td>
            <td>
              <!-- Opciones como editar o eliminar -->
              <button @click="editSubject(subject)">Editar</button>
              <button @click="deleteSubject(subject)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

interface Subject {
  id: number;
  name: string;
  description: string;
  code: string;
}

export default defineComponent({
  name: "SubjectsAdministration",
  setup() {
    const subjects = ref<Subject[]>([
      // Aquí iría la lista inicial de materias
    ]);

    function editSubject(subject: Subject) {
      // Lógica para editar la materia
      console.log("Editando materia:", subject);
    }

    function deleteSubject(subject: Subject) {
      // Lógica para eliminar la materia
      console.log("Eliminando materia:", subject);
    }

    return {
      subjects,
      editSubject,
      deleteSubject,
    };
  },
});
</script>

<style scoped>
.subjects-table {
  /* Estilos de la tabla de materias */
  width: 100%;
  border-collapse: collapse;
}
.subjects-table th,
.subjects-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}
.subjects-table th {
  background-color: #f2f2f2;
}
.subjects-table tr:nth-child(even) {
  background-color: #f9f9f9;
}
.subjects-table tr:hover {
  background-color: #eaeaea;
}
.subjects-table button {
  /* Estilos de los botones dentro de la tabla */
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 5px;
}
.subjects-table button:hover {
  background-color: #dddddd;
}
</style>

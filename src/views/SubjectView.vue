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
            <th>Responsable</th>
            <th>Facultad</th>
            <!-- <th>Opciones</th> -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="(subject, index) in subjects" :key="index">
            <td>{{ subject.subjectName }}</td>
            <td>{{ subject.subjectDescription }}</td>
            <td>{{ subject.subjectCode }}</td>
            <td>
              {{ subject.responsiblesFullNames.join(", ") }}
            </td>
            <td>{{ subject.facultyName }}</td>
            <!-- <td>
               Opciones como editar o eliminar 
              <button @click="editSubject(subject)">Editar</button>
              <button @click="deleteSubject(subject)">Eliminar</button>
            </td> -->
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { fetchSubjects } from "../services/SubjectService";
import { fetchPersonById } from "../services/PersonService";

interface Subject {
  facultyName: string;
  subjectName: string;
  subjectDescription: string;
  subjectCode: string;
  responsiblesIds: number[];
  responsiblesFullNames: string[];
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
  mounted() {
    // Lógica para obtener las materias
    fetchSubjects(null).then((subjects) => {
      this.subjects = subjects;
      for (let subject of this.subjects) {
        let responsiblesIds = subject.responsiblesIds;
        let responsiblesNames: string[] = [];
        for (let id of responsiblesIds) {
          fetchPersonById(id).then((person) => {
            responsiblesNames.push(person.firstName + " " + person.lastName);
          });
        }
        subject.responsiblesFullNames = responsiblesNames;
      };
      console.log("Materias:", this.subjects);
    });

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
}</style>

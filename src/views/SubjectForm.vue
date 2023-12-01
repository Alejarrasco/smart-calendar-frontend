<template>
  <div class="container">
    <form @submit.prevent="createSubject" class="form">
      <h2 class="form-title">Nueva asignatura</h2>

      <div class="form-group">
        <label for="nombre">Nombre:</label>
        <input type="text" id="nombre" v-model="subject.nombre" class="form-control" />
      </div>

      <div class="form-group">
        <label for="descripcion">Descripción:</label>
        <input type="text" id="descripcion" v-model="subject.descripcion" class="form-control" />
      </div>

      <div class="form-group">
        <label for="codigo">Código:</label>
        <input type="text" id="codigo" v-model="subject.codigo" class="form-control" />
      </div>

      <div class="form-group">
        <label for="facultad">Facultad:</label>
        <select id="facultad" v-model="subject.facultad" class="form-control">
          <option value="" disabled>Seleccione una facultad</option>
          <option v-for="(facultad, index) in facultades" :key="index" :value="facultad.name">
            {{ facultad.name }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="responsable">Responsable:</label>
        <select id="responsable" v-model="subject.responsables" class="form-control">
          <option value=0 disabled>Seleccione un responsable</option>
          <option v-for="(responsable, index) in responsables" :key="index" :value="responsable.person_id">
            {{ responsable.first_name }} {{ responsable.last_name }}
          </option>
        </select>
      </div>

      <h2>Requerimientos</h2>

      <div class="form-group">
        <label for="periodosPorClase">Periodos por clase:</label>
        <input type="number" id="periodosPorClase" v-model="subject.periodosPorClase" class="form-control" min="1" />
      </div>

      <div class="form-group">
        <label for="clasesPorSemana">Clases por semana:</label>
        <input type="number" id="clasesPorSemana" v-model="subject.clasesPorSemana" class="form-control" min="1" />
      </div>

      <div class="form-group">
        <label for="tipoEspacio">Tipo de espacio:</label>
        <select id="tipoEspacio" v-model="subject.tipoEspacio" class="form-control">
          <option value="" disabled>Seleccione un tipo de espacio</option>
          <option v-for="tipoEspacio in tiposEspacio" :key="tipoEspacio" :value="tipoEspacio">
            {{ tipoEspacio }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="capacidad">Capacidad:</label>
        <input type="number" id="capacidad" v-model="subject.capacidad" class="form-control" min="1" />
      </div>

      <div class="form-group">
        <label for="semestre">Semestre:</label>
        <select id="semestre" v-model="subject.semestre" class="form-control">
          <option value="FIRST">Primero</option>
          <option value="SECOND">Segundo</option>
          <option value="THIRD">Tercero</option>
          <option value="FOURTH">Cuarto</option>
          <option value="FIFTH">Quinto</option>
          <option value="SIXTH">Sexto</option>
          <option value="SEVENTH">Séptimo</option>
          <option value="EIGHTH">Octavo</option>
          <option value="NINTH">Noveno</option>
          <option value="TENTH">Décimo</option>
        </select>
      </div>

      <div class="form-group">
        <label for="preferencias">Preferencias:</label>
        <!-- Text área para las preferencias del docente -->
        <textarea id="preferencias" v-model="subject.preferencias" class="form-control"></textarea>
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
import { fetchFaculties, postSubject } from "../services/SubjectService";
import { fetchPersons } from "../services/PersonService";
import { fetchSpaceTypes } from "../services/SpaceService";

interface Subject {
  nombre: string;
  descripcion: string;
  codigo: string;
  facultad: string;
  responsables: number;
  periodosPorClase: number;
  clasesPorSemana: number;
  tipoEspacio: string;
  capacidad: number;
  semestre: string;
  preferencias: string;
}

type Facultad = {
  id: number;
  name: string;
}

type Responsable = {
  person_id: number;
  first_name: string;
  last_name: string;
}

export default defineComponent({
  name: "SubjectCreationForm",
  setup() {
    const subject = ref<Subject>({
      nombre: "",
      descripcion: "",
      codigo: "",
      facultad: "",
      responsables: 0,
      periodosPorClase: 0,
      clasesPorSemana: 0,
      tipoEspacio: "",
      capacidad: 0,
      semestre: "",
      preferencias: "",
    });
    const facultades = ref<Facultad[]>([]);
    const responsables = ref<Responsable[]>([]);
    const tiposEspacio = ref<string[]>([]);
    const requirement = ref("");

    fetchFaculties().then((facultadesResponse) => {
      console.log("Facultades:", facultadesResponse);
      for (let i = 0; i < facultadesResponse.length; i++) {
        facultades.value.push({
          id: facultadesResponse[i].facultyId,
          name: facultadesResponse[i].facultyName,
        });
      }
    });

    fetchPersons().then((responsablesResponse) => {
      for (let i = 0; i < responsablesResponse.length; i++) {
        responsables.value.push({
          person_id: responsablesResponse[i].personId,
          first_name: responsablesResponse[i].firstName,
          last_name: responsablesResponse[i].lastName,
        });
      }
    });

    fetchSpaceTypes().then((tiposEspacioResponse) => {
      tiposEspacio.value = tiposEspacioResponse;
    });

    const createSubject = async () => {
      // Lógica para crear la asignatura
      const subjectRequest = {
        subjectName: subject.value.nombre,
        subjectCode: subject.value.codigo,
        facultyName: subject.value.facultad,
        subjectDescription: subject.value.descripcion,
        responsiblesIds: [subject.value.responsables],
        requirements: [
          {
            subjectCode: subject.value.codigo,
            periodsPerClass: subject.value.periodosPorClase,
            classesPerWeek: subject.value.clasesPorSemana,
            spaceType: subject.value.tipoEspacio,
            capacity: subject.value.capacidad,
            semester: subject.value.semestre,
            preferences: subject.value.preferencias,
          },
        ],
      };

      console.log("Asignatura a crear:", subjectRequest);

      const subjectResponse = await postSubject(subjectRequest);

      console.log("Asignatura creada:", subjectResponse);

      if (subjectResponse && subjectResponse.data) {
        //Show success message and redirect to subjects list
        alert("Asignatura creada exitosamente");
        //this.$router.push("/subjects");
      } else {
        //Show error message
      }
    }

    function addRequirement() {
      if (requirement.value) {
        //subject.value.requerimientos.push(requirement.value);
        requirement.value = ""; // reset the input after adding
      }
    }

    function cancel() {
      // Lógica para cancelar la creación de la asignatura
      console.log("Creación cancelada");
    }

    return {
      facultades,
      responsables,
      tiposEspacio,
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
  border-radius: 50%;
  /* Makes the button round */
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
  border-radius: 20px;
  /* Rounded borders for buttons */
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

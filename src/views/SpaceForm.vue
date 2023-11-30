<template>
  <div class="laboratory-form-container">
    <div class="form-group">
      <label for="laboratory-name">Nombre:</label>
      <input
        type="text"
        id="laboratory-name"
        v-model="laboratoryName"
        class="form-input laboratory-name-input"
      />
    </div>

    <div class="form-group">
      <label for="laboratory-description">Descripción:</label>
      <input
        type="text"
        id="laboratory-description"
        v-model="laboratoryDescription"
        class="form-input laboratory-desc-input"
      />
    </div>

    <div class="form-group">
      <label for="belongs-to">Pertenece a:</label>
      <select id="belongs-to" class="form-dropdown" v-model="selectedType">
        <option value="belongs-to" selected disabled>Pertenece a</option>
        <option v-for="(spaceType, index) in spaceTypes" :key="index">
          {{ spaceType }}
        </option>
      </select>
    </div>

    <div class="form-group">
      <label for="capacity">Capacidad:</label>
      <input
        type="number"
        min="1"
        id="capacity"
        v-model="capacity"
        class="form-input capacity-input"
      />
    </div>

    <div class="form-group date-range-group">
      <label for="available-dates">Fechas Disponibles</label>
      <div class="date-range">
        <input
          type="date"
          id="start-date"
          class="form-input date-input"
          placeholder="Desde"
          v-model="availableDates.start"
        />
        <input
          type="date"
          id="end-date"
          class="form-input date-input"
          placeholder="Hasta"
          v-model="availableDates.end"
        />
      </div>
    </div>

    <div class="form-group time-slots-group">
      <label for="available-times">Horas Disponibles</label>
      <div class="time-slots">
        <div
          v-for="(timeSlot, index) in timeSlots"
          :key="index"
          class="time-slot"
        >
          <input
            type="time"
            v-model="timeSlot.start"
            class="form-input time-input"
          />
          <span>A</span>
          <input
            type="time"
            v-model="timeSlot.end"
            class="form-input time-input"
          />
        </div>
      </div>
      <button type="button" @click="addTimeSlot" class="btn add-time-btn">
        Añadir Horario
      </button>
    </div>

    <div class="form-actions">
      <button type="button" class="btn open-space-btn" @click="openNewSpace">Abrir Espacio</button>
      <button type="button" class="btn close-space-btn">
        Clausurar Espacio
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { createSpace } from "../services/SpaceService";

interface TimeSlot {
  start: string;
  end: string;
}

export default defineComponent({
  name: "LaboratoryForm",
  setup() {
    const laboratoryName = ref("");
    const laboratoryDescription = ref("");
    const spaceTypes = ref(["Auditorio","Aula","Laboratorio"]);
    const selectedType = ref("");
    const capacity = ref(1);
    const availableDates = ref({ start: "", end: "" });
    const timeSlots = ref<TimeSlot[]>([{ start: "", end: "" }]);

    function addTimeSlot() {
      timeSlots.value.push({ start: "", end: "" });
    }

    async function openNewSpace() {
      /* console.log({
        laboratoryName: laboratoryName.value,
        laboratoryDescription: laboratoryDescription.value,
        selectedType: selectedType.value,
        capacity: capacity.value,
        availableDates: availableDates.value,
        timeSlots: timeSlots.value,
      }); */

      let startTimes = [];
      let endTimes = [];
      for (let i = 0; i < timeSlots.value.length; i++) {
        startTimes.push(timeSlots.value[i].start);
        endTimes.push(timeSlots.value[i].end);
      }

      const newSpace = {
        spaceName: laboratoryName.value,
        spaceDescription: laboratoryDescription.value,
        spaceType: selectedType.value,
        capacity: capacity.value,
        periodTimes: startTimes,
        openDate: availableDates.value.start,
        closeDate: availableDates.value.end,
      };

      const response = await createSpace(newSpace);
      console.log(response);
      if (response.code== "SPAC-0002") {
        alert("Espacio creado exitosamente");
      } else {
        alert("Error al crear el espacio");
      }

    }

    return {
      laboratoryName,
      laboratoryDescription,
      spaceTypes,
      selectedType,
      capacity,
      availableDates,
      timeSlots,
      addTimeSlot,
      openNewSpace,
    };
  },
});
</script>

<style scoped>
.laboratory-name-input {
  font-size: 1em; /* Tamaño de fuente estándar */
  font-weight: normal; /* Peso de fuente normal, no negrita */
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px; /* Ajusta el relleno para reducir el espacio si es necesario */
  margin-bottom: 10px; /* Espacio debajo del campo de texto */
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1); /* Sombra suave alrededor del campo */
  width: 100%; /* Ancho completo para alinearse con otros elementos */
  box-sizing: border-box; /* Asegura que el padding y border no aumenten el ancho total */
}

.form-group {
  margin-bottom: 20px;
}

.laboratory-name-input {
  font-size: 1.5em;
  font-weight: bold;
  border: none;
  border-bottom: 1px solid #ccc;
  margin-bottom: 20px;
  width: 100%;
}

.laboratory-name-input:focus {
  outline: 2px solid #007bff; /* Estilo del contorno al enfocar */
  box-shadow: 0 0 8px rgba(0, 0, 255, 0.2); /* Sombra más destacada al enfocar */
}

.laboratory-desc-input {
  font-size: 1em;
  font-weight: normal;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px;
  margin-bottom: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  width: 100%;
  box-sizing: border-box;
}

.capacity-input {
  width: 100%;
}

.form-dropdown,
.form-input,
.date-input,
.time-input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
}

.date-range-group,
.time-slots-group {
  display: flex;
  flex-direction: column;
}

.date-range {
  display: flex;
  justify-content: start;
  gap: 10px;
}

.time-slots {
  margin-bottom: 10px;
}

.time-slot {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.button-container {
  display: flex;
  justify-content: flex-start;
}

.btn {
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
  color: white;
  font-weight: bold;
}

.add-time-btn {
  background-color: #007bff;
  text-align: center;
}

.add-time-btn:hover {
  background-color: #0056b3;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.open-space-btn {
  background-color: #28a745;
}

.close-space-btn {
  background-color: #dc3545;
}

.open-space-btn:hover {
  background-color: #218838;
}

.close-space-btn:hover {
  background-color: #c82333;
}

.form-group label {
  display: block;
  margin-bottom: 0.5em; /* Ajusta esto para controlar el espacio debajo de la etiqueta */
}

.form-dropdown {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  /* Añadir si se desea un poco de espacio a la izquierda de la etiqueta */
  margin-left: 0.5em;
}
</style>

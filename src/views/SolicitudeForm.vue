<template>
  <div class="reservation-form-container">
    <div class="form-group">
      <label for="laboratory">Laboratorio:</label>
      <input type="text" id="laboratory" class="form-input" v-model="reservation.laboratory" readonly />
    </div>

    <div class="form-group">
      <label for="responsible">Responsable:</label>
      <select id="responsible" class="form-dropdown" v-model="reservation.responsible" :on-change="handleUpdateSubjects">
        <option v-for="(responsible, index) in responsibles" :key="index" value="responsible.responsibleId">
          {{ responsible.firstName }} {{ responsible.lastName }}
        </option>
      </select>
      

    </div>

    <div class="form-group">
      <label for="role">Cargo:</label>
      <select id="role" class="form-dropdown" v-model="reservation.role">
        <option>Docente</option>
        <option>Investigador</option>
        <!-- Añadir más roles si es necesario -->
      </select>
    </div>

    <div class="form-group">
      <label for="subject">Asignatura:</label>
      <select id="subject" class="form-dropdown" v-model="reservation.subject">
        <option v-for="(subject, index) in subjects" :key="index" value="subject.subjectCode">
          {{ subject.subjectName }}
        </option>
        <!-- Añadir más asignaturas si es necesario -->
      </select>
    </div>

    <div class="form-group">
      <label for="space">Espacio:</label>
      <select id="space" class="form-dropdown" v-model="reservation.space">
        <option v-for="(space, index) in spaces" :key="index" value="space.spaceId">
          {{ space.spaceName }}
        </option>
        <!-- Añadir más espacios si es necesario -->
      </select>
    </div>

    <div class="form-group">
      <label>Horario</label>
      <input type="checkbox" id="recurring" v-model="reservation.isRecurring" />
      <label for="recurring">Recurrente</label>

      <!-- Horarios recurrentes -->
      <!-- TODO  convert this input into list of periods-->
      <div v-if="reservation.isRecurring" class="schedule recurring-schedule">
        <div v-for="day in daysOfWeek" :key="day" class="day-schedule">
          <input type="checkbox" :id="day" v-model="schedule[day].checked" />
          <label :for="day">{{ day }}</label>
          <input type="time" :disabled="!schedule[day].checked" v-model="schedule[day].start" />
          <input type="time" :disabled="!schedule[day].checked" v-model="schedule[day].end" />
        </div>
      </div>

      <!-- Horario no recurrente -->
      <!-- TODO convert this input into list of periods -->
      <div v-else class="schedule non-recurring-schedule">
        <input type="date" v-model="nonRecurringSchedule.date" />
        <div class="time-slot">
          <input type="time" v-model="nonRecurringSchedule.start" />
          <input type="time" v-model="nonRecurringSchedule.end" />
        </div>
        <button type="button" @click="addNonRecurringTimeSlot">
          Añadir Horario
        </button>
      </div>
    </div>

    <div class="form-actions">
      <button type="button" @click="cancelReservation">Cancelar</button>
      <button type="button" @click="saveReservation">Guardar</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { fetchSolicitudes, createSolicitude } from "@/services/SolicitudeService";
import { fetchSpaces } from "../services/SpaceService";
import { fetchSubjects } from "../services/SubjectService";
import { fetchPersons } from "../services/PersonService";

type Space = {
  spaceId: number;
  spaceName: string;
  spaceDescription: string;
  spaceStatus: string;
  spaceType: string;
  capacity: number;
}

type Subject = {
  subjectId: number;
  subjectCode: string;
  subjectDescription: string;
  subjectName: string;
}

type Period = {
  periodId: number;
  weekday: string;
  startTime: string;
  endTime: string;
}

type Person = {
  personId: number;
  firstName: string;
  lastName: string;
  email: string
  username: string;
}

interface TimeSlot {
  checked: boolean;
  start: string;
  end: string;
}

interface DaySchedule {
  [key: string]: TimeSlot;
}

interface NonRecurringSchedule {
  date: string;
  start: string;
  end: string;
}

interface Reservation {
  laboratory: string;
  responsible: number;
  role: string;
  subject: string;
  space: number;
  isRecurring: boolean;
}

export default defineComponent({
  name: "ReservationForm",
  setup() {
    const daysOfWeek = ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab"];
    const spaces = reactive<Space[]>([]);
    const subjects = reactive<Subject[]>([]);
    const responsibles = reactive<Person[]>([]);
    const reservation = reactive<Reservation>({
      laboratory: "Laboratorio 7 > Química Industrial",
      responsible: 0,
      role: "",
      subject: "",
      space: 0,
      isRecurring: false,
    });
    const schedule = reactive<DaySchedule>(
      daysOfWeek.reduce((acc, day) => {
        acc[day] = { checked: false, start: "", end: "" };
        return acc;
      }, {} as DaySchedule)
    );
    const nonRecurringSchedule = reactive<NonRecurringSchedule>({
      date: "",
      start: "",
      end: "",
    });

    async function getSpaces() {
      //TODO implement logic to fetch spaces
      try {
        const response = await fetchSpaces();
        const spacelist = response.data
        spacelist.AUDITORIUM.forEach((space: Space) => {
          spaces.push(space);
        });
        spacelist.LABORATORY.forEach((space: Space) => {
          spaces.push(space);
        });
        spacelist.CLASSROOM.forEach((space: Space) => {
          spaces.push(space);
        });
      } catch (error) {
        console.log(error);
      }
    }

    async function getResponsibles() {
      //TODO implement logic to fetch responsibles
      try {
        const responsibleslist = await fetchPersons();
        responsibleslist.forEach((responsible: Person) => {
          responsibles.push(responsible);
        });
        console.log(responsibles);
      } catch (error) {
        console.log(error);
      }
    }

    async function getSubjects(responsible: number | null) {
      //TODO implement logic to fetch subjects
      try {
        const subjectlist = await fetchSubjects(responsible);
        subjectlist.forEach((subject: Subject) => {
          subjects.push(subject);
        });
        console.log(subjects);
      } catch (error) {
        console.log(error);
      }
    }

    function updateSubjects(responsible: number) {
      getSubjects(responsible).catch((error) => console.log(error));
    }

    function addNonRecurringTimeSlot() {
      // Implement logic to handle adding non-recurring time slots
    }

    function cancelReservation() {
      // Implement logic to handle reservation cancellation
    }

    function saveReservation() {
      // TODO Implement logic to handle saving the reservation
    }

    getResponsibles();
    getSpaces();
    getSubjects(null);

    return {
      spaces,
      subjects,
      responsibles,
      reservation,
      daysOfWeek,
      schedule,
      getSubjects,
      updateSubjects,
      nonRecurringSchedule,
      addNonRecurringTimeSlot,
      cancelReservation,
      saveReservation,
    };
  },
  methods: {
    updateSubjects(responsible: number) {
      this.getSubjects(responsible).catch((error: any) => console.log(error));
    },
    handleUpdateSubjects: function (event: Event) {
      this.updateSubjects(this.reservation.responsible);
    }
  }
});
</script>

<style scoped>
.reservation-form-container {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 20px;
}

.form-input,
.form-dropdown {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.schedule {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.day-schedule {
  display: flex;
  align-items: center;
  gap: 5px;
}

.time-slot {
  display: flex;
  gap: 5px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

button {
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
}

button:hover {
  background-color: #0056b3;
}

button[type="button"] {
  background-color: #dc3545;
}

button[type="button"]:hover {
  background-color: #c82333;
}
</style>

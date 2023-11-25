<template>
  <div class="reservation-form-container">
    <div class="form-group">
      <label for="laboratory">Laboratorio:</label>
      <input
        type="text"
        id="laboratory"
        class="form-input"
        v-model="reservation.laboratory"
        readonly
      />
    </div>

    <div class="form-group">
      <label for="responsible">Responsable:</label>
      <input
        type="text"
        id="responsible"
        class="form-input"
        v-model="reservation.responsible"
      />
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
        <option>Química Industrial</option>
        <option>Química Orgánica I</option>
        <option>Química Orgánica II</option>
        <!-- Añadir más asignaturas si es necesario -->
      </select>
    </div>

    <div class="form-group">
      <label for="space">Espacio:</label>
      <select id="space" class="form-dropdown" v-model="reservation.space">
        <option>Laboratorio 7</option>
        <!-- Añadir más espacios si es necesario -->
      </select>
    </div>

    <div class="form-group">
      <label>Horario</label>
      <input type="checkbox" id="recurring" v-model="reservation.isRecurring" />
      <label for="recurring">Recurrente</label>

      <!-- Horarios recurrentes -->
      <div v-if="reservation.isRecurring" class="schedule recurring-schedule">
        <div v-for="day in daysOfWeek" :key="day" class="day-schedule">
          <input type="checkbox" :id="day" v-model="schedule[day].checked" />
          <label :for="day">{{ day }}</label>
          <input
            type="time"
            :disabled="!schedule[day].checked"
            v-model="schedule[day].start"
          />
          <input
            type="time"
            :disabled="!schedule[day].checked"
            v-model="schedule[day].end"
          />
        </div>
      </div>

      <!-- Horario no recurrente -->
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
  responsible: string;
  role: string;
  subject: string;
  space: string;
  isRecurring: boolean;
}

export default defineComponent({
  name: "ReservationForm",
  setup() {
    const daysOfWeek = ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab"];
    const reservation = reactive<Reservation>({
      laboratory: "Laboratorio 7 > Química Industrial",
      responsible: "",
      role: "",
      subject: "",
      space: "",
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

    function addNonRecurringTimeSlot() {
      // Implement logic to handle adding non-recurring time slots
    }

    function cancelReservation() {
      // Implement logic to handle reservation cancellation
    }

    function saveReservation() {
      // Implement logic to handle saving the reservation
    }

    return {
      reservation,
      daysOfWeek,
      schedule,
      nonRecurringSchedule,
      addNonRecurringTimeSlot,
      cancelReservation,
      saveReservation,
    };
  },
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

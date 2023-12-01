<template>
  <div class="reservation-form-container">
    <!-- Combinación de laboratorio y espacio en un solo campo -->
    <div class="form-group">
      <label for="space">Espacio/Laboratorio:</label>
      <select id="space" class="form-dropdown" v-model="reservation.space">
        <option value=0 disabled>Seleccione un espacio</option>
        <option v-for="space in spaces" :value="space">{{ space.name }}</option>
      </select>
    </div>

    <div class="form-group">
      <label for="subject">Asignatura:</label>
      <select id="subject" class="form-dropdown" v-model="reservation.subject">
        <option value="" disabled>Seleccione una asignatura</option>
        <option v-for="subject in allSubjects" :value="subject.code">
          {{ subject.name }}
        </option>
      </select>
    </div>

    <div class="form-group">
      <label for="responsible">Responsable:</label>
      <select id="responsible" class="form-dropdown" v-model="reservation.responsible">
        <option value=0 disabled>Seleccione un responsable</option>
        <option v-for="responsible in subjectResponsibles" :value="responsible">
          {{ responsible.name }}
        </option>
      </select>
    </div>

    <div class="form-group">
      <label for="role">Cargo:</label>
      <select id="role" class="form-dropdown" v-model="reservation.role">
        <option v-for="role in roles" :value="role">{{ role }}</option>
      </select>
    </div>

    <!-- Checkbox para determinar si el horario es recurrente -->
    <div class="form-group">
      <label for="recurring">Horario Recurrente:  </label>
      <input type="checkbox" id="recurring" v-model="reservation.isRecurring" disabled/>
    </div>

    <!-- Configuración de horarios recurrentes -->
    <!-- <div v-if="reservation.isRecurring" class="recurring-schedule">
      <div v-for="day in weekSchedule" :key="day.day" class="day-schedule">
        <input type="checkbox" v-model="day.checked" :id="day.day" />
        <label :for="day.day">{{ day.day }}</label>

         Horarios para el día seleccionado
        <div v-if="day.checked" class="time-slots">
          <div v-for="timeSlot in day.timeSlots" :key="timeSlot.label" class="time-slot">
            <input type="checkbox" v-model="timeSlot.checked" :id="timeSlot.label" />
            <label :for="timeSlot.label">{{ timeSlot.label }}</label>
          </div>
        </div>
      </div>
    </div> -->
    <!-- <div v-else class="schedule non-recurring-schedule">
      <input type="date" v-model="nonRecurringSchedule.date" />
      <div class="time-slot">
        <input type="time" v-model="nonRecurringSchedule.start" />
        <input type="time" v-model="nonRecurringSchedule.end" />
      </div>
      <button type="button" @click="addNonRecurringTimeSlot">
        Añadir Horario
      </button>
    </div> -->

    <!-- Period checktable -->
    <div>
    <table>
      <tbody>
        <tr>
          <td>Lunes:</td>
          <td v-for="period in timetable.MON" :key="period.periodId">
            <input type="checkbox" :id="getCheckboxId('MON', period.periodId)" v-model="selectedPeriods" :value="period.periodId">
            <label :for="getCheckboxId('MON', period.periodId)">{{ period.startTime }} </label>
          </td>
        </tr>
        <tr>
          <td>Martes:</td>
          <td v-for="period in timetable.TUE" :key="period.periodId">
            <input type="checkbox" :id="getCheckboxId('TUE', period.periodId)" v-model="selectedPeriods" :value="period.periodId">
            <label :for="getCheckboxId('TUE', period.periodId)">{{ period.startTime }} </label>
          </td>
        </tr>
        <tr>
          <td>Miércoles:</td>
          <td v-for="period in timetable.WED" :key="period.periodId">
            <input type="checkbox" :id="getCheckboxId('WED', period.periodId)" v-model="selectedPeriods" :value="period.periodId">
            <label :for="getCheckboxId('WED', period.periodId)">{{ period.startTime }} </label>
          </td>
        </tr>
        <tr>
          <td>Jueves:</td>
          <td v-for="period in timetable.THU" :key="period.periodId">
            <input type="checkbox" :id="getCheckboxId('THU', period.periodId)" v-model="selectedPeriods" :value="period.periodId">
            <label :for="getCheckboxId('THU', period.periodId)">{{ period.startTime }} </label>
          </td>
        </tr>
        <tr>
          <td>Viernes:</td>
          <td v-for="period in timetable.FRI" :key="period.periodId">
            <input type="checkbox" :id="getCheckboxId('FRI', period.periodId)" v-model="selectedPeriods" :value="period.periodId">
            <label :for="getCheckboxId('FRI', period.periodId)">{{ period.startTime }} </label>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

    <!-- Botones de acción del formulario -->
    <div class="form-actions">
      <button type="button" @click="cancelReservation">Cancelar</button>
      <button type="button" @click="saveReservation">Guardar</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, watch } from "vue";
import { fetchSpaces } from "../services/SpaceService";
import { fetchSubjects } from "../services/SubjectService";
import { fetchPersonById } from "../services/PersonService";
import { fetchPeriodsInSpace } from "../services/PeriodService";
import { createSolicitude } from "../services/SolicitudeService";

interface TimeSlot {
  label: string;
  checked: boolean;
}

interface DaySchedule {
  day: string;
  checked: boolean;
  timeSlots: TimeSlot[];
}

interface NonRecurringSchedule {
  date: string;
  start: string;
  end: string;
}

interface Reservation {
  space: number;
  responsible: number;
  role: string;
  subject: string;
  isRecurring: boolean;
  startDate: string;
  endDate: string;
  periods: number[];
}


type Subject = {
  id: number;
  name: string;
  code: string;
  responsibleIds: number[];
};

type Space = {
  id: number;
  name: string;
  type: string;
};

type Responsible = {
  id: number;
  name: string;
};

type period = {
  startTime: string;
  endTime: string;
  weekday: string;
  periodId: number;
};

export default defineComponent({
  name: "ReservationForm",
  setup() {
    const reservation = reactive<Reservation>({
      subject: "",
      space: 0,
      responsible: 0,
      role: "",
      startDate: "2023-06-01",
      endDate: "2023-12-10",
      isRecurring: true,
      periods: [],
    });
    const nonRecurringSchedule = reactive<NonRecurringSchedule>({
      date: "",
      start: "",
      end: "",
    });
    const allSubjects = reactive<Subject[]>([]);
    const subjectResponsibles = reactive<Responsible[]>([]);
    //const filteredSubjects = reactive<string[]>([]);
    const spaces = reactive<Space[]>([]);
    const roles = ["Docente", "Investigador"]; // Ejemplo de roles
    const selectedPeriods = reactive<number[]>([]);
    const timetable = reactive<Record<string, period[]>> ({
      MON: [],
      TUE: [],
      WED: [],
      THU: [],
      FRI: [],
      SAT: [],
      SUN: [],
    });
        

    // Cargar los espacios
    fetchSpaces().then((fetchedSpaces) => {
      for (let space of fetchedSpaces.data.AUDITORIUM) {
        spaces.push({
          id: space.spaceId,
          name: space.spaceName,
          type: space.spaceType,
        });
      }
      for (let space of fetchedSpaces.data.LABORATORY) {
        spaces.push({
          id: space.spaceId,
          name: space.spaceName,
          type: space.spaceType,
        });
      }
      for (let space of fetchedSpaces.data.CLASSROOM) {
        spaces.push({
          id: space.spaceId,
          name: space.spaceName,
          type: space.spaceType,
        });
      }
    });

    // Cargar las asignaturas
    const fetchAllSubjects = async () => {
      const subjects = await fetchSubjects(null);
      for (let subject of subjects) {
        allSubjects.push({
          id: subject.subjectId,
          name: subject.subjectName,
          code: subject.subjectCode,
          responsibleIds: subject.responsiblesIds,
        });
      }
    };

    // Cargar los responsables
    const updateResponsibles = async () => {
      subjectResponsibles.splice(0, subjectResponsibles.length);
      for (let subject of allSubjects) {
        //console.log(subject.code);
        //console.log(reservation.subject);
        if (subject.code == reservation.subject) {
          for (let id of subject.responsibleIds) {
            fetchPersonById(id).then((person) => {
              subjectResponsibles.push({
                id: person.personId,
                name: person.firstName + " " + person.lastName,
              });
            });
          }
        }
      }
    };

    // Observar cambios en las asignaturas para filtrar los responsables
    watch(() => reservation.subject, (newSubject) => {
      updateResponsibles();
    });

    // Obtener los timeslots de espacio seleccionado
    const fetchSpacePeriods = async () => {
      console.log(reservation.space.id);
      const periods = await fetchPeriodsInSpace(reservation.space.id);
      const weekdays = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
      //clear all periods
      for (let weekday of weekdays) {
        timetable[weekday].splice(0, timetable[weekday].length);
      }
      for (let weekday of weekdays) {
        for (let period of periods[weekday]) {
          timetable[weekday].push({
            startTime: period.startTime,
            endTime: period.endTime,
            weekday: weekday,
            periodId: period.periodId,
          });
        }
      }

      console.log(timetable);
    };

    // Observar cambios en el espacio para actualizar los timeslots
    watch(() => reservation.space, (newSpace) => {
      fetchSpacePeriods();
    });

    // Guardar el periodId cuando se seleccione un checkbox
    watch(() => selectedPeriods, (newPeriods) => {
      reservation.periods.splice(0, reservation.periods.length);
      for (let period of newPeriods) {
        reservation.periods.push(period);
      }
      console.log(reservation.periods);
    });

    // Obtener el id del checkbox
    const getCheckboxId = (day: string, periodId: any) => {
      return `${day}-${periodId}`;
    };

    // Guardar todos los values the los checkboxes seleccionados manualmente
    const getcheckbox = () => {
      const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
      selectedPeriods.splice(0, selectedPeriods.length);
      checkboxes.forEach((checkbox) => {
        selectedPeriods.push(parseInt(checkbox.value));
      });

      //remove the first element
      selectedPeriods.shift();

      console.log(selectedPeriods);
    };
      

    fetchAllSubjects();


    function addNonRecurringTimeSlot() {
      // Implementar lógica para añadir horarios no recurrentes
    }

    function cancelReservation() {
      // Implementar lógica para cancelar la reserva
    }

    function saveReservation() {
      console.log(reservation);

      getcheckbox();
      // Implementar lógica para guardar la reserva
      const reservationData = {
        subjectCode: reservation.subject,
        personId: reservation.responsible.id,
        recurrent: true,
        startDate: "2023-06-01",
        endDate: "2023-12-24", //FIXME: Cambiar a la fecha actual
        periods: selectedPeriods,
        spaceId: reservation.space.id
      };
      console.log(reservationData);

      createSolicitude(reservationData).then((response) => {
        console.log(response);
        if (response.data) {
          alert("Solicitud creada exitosamente");
        } else {
          alert("Error al crear la solicitud");
        }
      });

    }

    return {
      reservation,
      //weekSchedule,
      allSubjects,
      subjectResponsibles,
      updateResponsibles,
      spaces,
      nonRecurringSchedule,
      roles,
      addNonRecurringTimeSlot,
      cancelReservation,
      saveReservation,
      selectedPeriods,
      timetable,
      getCheckboxId,
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

.period-row {
  display: flex;
  justify-content: space-between;
}

.period-cell {
  margin-right: 10px;
}
</style>


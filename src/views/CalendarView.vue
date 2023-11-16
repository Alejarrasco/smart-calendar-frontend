<template>
  <div class="calendar-container">
    <div class="calendar-header">
      <h1>Administrador</h1>
      <!-- Elementos adicionales de la cabecera pueden ser añadidos aquí -->
    </div>
    <div class="calendar-body">
      <div class="calendar-sidebar">
        <!-- Aquí empieza el acordeón -->
        <div
          v-for="(item, index) in accordionItems"
          :key="item.title"
          class="accordion-item"
        >
          <div class="accordion-title" @click="toggleAccordionItem(index)">
            {{ item.title }}
          </div>
          <ul v-show="item.show" class="accordion-content">
            <li v-for="subItem in item.subItems" :key="subItem">
              {{ subItem }}
            </li>
          </ul>
        </div>
      </div>
      <div class="calendar-schedule">
        <!-- Tabla del calendario aquí -->
        <table>
          <thead>
            <tr>
              <th v-for="day in days" :key="day">{{ day }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="timeSlot in timeSlots" :key="timeSlot">
              <td v-for="day in days" :key="day">
                <div class="session-card" v-if="getSession(day, timeSlot)">
                  <h3>{{ getSession(day, timeSlot).subject }}</h3>
                  <p>
                    {{ getSession(day, timeSlot).start_time }} -
                    {{ getSession(day, timeSlot).end_time }}
                  </p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { fetchSpaces } from "../services/CalendarService";

type Session = {
  subject: string;
  responsible: string;
  start_time: string;
  end_time: string;
};

type DailySchedule = {
  [timeSlot: string]: Session | undefined;
};

type WeeklySchedule = {
  [day: string]: DailySchedule;
};

type AccordionItem = {
  title: string;
  subItems: string[];
  show: boolean;
};

interface Space {
  spaceId: number;
  spaceName: string;
  spaceDescription: string;
  spaceStatus: string;
  spaceType: string;
  capacity: number;
}

export default defineComponent({
  name: "CalendarView",
  setup() {
    const days = ref(["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"]);
    const timeSlots = ref([
      "08:00",
      "08:30",
      "09:00",
      "09:30",
      "10:00",
      "10:30",
      "11:00",
      "11:30",
      "12:00",
    ]);

    const schedule = ref<WeeklySchedule>({
      Lunes: {
        "08:00": {
          subject: "Math",
          responsible: "John Doe",
          start_time: "08:00",
          end_time: "08:30",
        },
      },
      Martes: {},
      Miércoles: {},
      Jueves: {},
      Viernes: {},
    });

    const accordionItems = ref<AccordionItem[]>([]);

    const toggleAccordionItem = (index: number) => {
      accordionItems.value[index].show = !accordionItems.value[index].show;
      accordionItems.value.forEach((item, idx) => {
        if (idx !== index) item.show = false;
      });
    };

    const getSession = (day: string, timeSlot: string): Session => {
      const daySchedule = schedule.value[day];
      if (daySchedule && daySchedule[timeSlot]) {
        return daySchedule[timeSlot]!;
      }
      return { subject: "", responsible: "", start_time: "", end_time: "" };
    };

    const loadSpaces = async () => {
      const response = await fetchSpaces();
      if (response && response.data) {
        accordionItems.value = Object.keys(response.data).map((key) => {
          return {
            title: key,
            subItems: response.data[key].map((space: Space) => space.spaceName),
            show: false,
          };
        });
      }
    };

    // Llamada inicial al cargar el componente
    loadSpaces();

    return {
      days,
      timeSlots,
      schedule,
      accordionItems,
      toggleAccordionItem,
      getSession,
    };
  },
});
</script>

<style scoped>
.calendar-container {
  display: flex;
  flex-direction: column;
}

.calendar-header {
  background-color: #f0f0f0;
  padding: 10px;
  text-align: center;
}

.calendar-body {
  display: flex;
}

.calendar-sidebar {
  flex: 1;
  background-color: #e9ecef;
  padding: 10px;
}

.accordion-item {
  margin-bottom: 10px;
}

.accordion-title {
  background-color: #007bff;
  color: white;
  padding: 10px;
  cursor: pointer;
}

.accordion-title:hover {
  background-color: #0056b3;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

ul li {
  background-color: #e9ecef;
  padding: 5px 10px;
  border-top: 1px solid white;
}

ul li:last-child {
  border-bottom: 1px solid white;
}

.calendar-schedule {
  flex: 3;
  padding: 10px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ddd;
  text-align: center;
  padding: 8px;
}

th {
  background-color: #007bff;
  color: white;
}

.session-card {
  border: 1px solid #ddd;
  padding: 8px;
  margin-bottom: 4px;
  border-radius: 4px;
  background-color: #f9f9f9;
}

.session-card h3 {
  margin-top: 0;
  color: #333;
}

.session-card p {
  margin: 4px 0;
  font-size: 0.9em;
}
</style>
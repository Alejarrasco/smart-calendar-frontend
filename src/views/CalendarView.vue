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
            <li
              v-for="(subItem, subIndex) in item.subItems"
              :key="subItem"
              @click="printSpaceId(item.subItemIds[subIndex])"
            >
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
                <div v-if="getSession(day, timeSlot)" class="session-card">
                  <h3>{{ getSession(day, timeSlot)?.subject }}</h3>
                  <p>
                    {{ getSession(day, timeSlot)?.start_time }} -
                    {{ getSession(day, timeSlot)?.end_time }}
                  </p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <div>
    <!-- Botón para mostrar el toast -->
    <button @click="showToast">Mostrar Toast</button>

    <!-- Toast de Bootstrap -->
    <div id="myToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-autohide="false">
      <div class="toast-header">
        <strong class="mr-auto">Mensaje</strong>
        <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Cerrar" @click="hideToast">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="toast-body">
        {{ conflictMessage }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Toast } from 'bootstrap';
import { defineComponent, onMounted, ref } from "vue";
import { fetchSpaces } from "../services/SpaceService";
import { fetchPlanifications } from "../services/CalendarService";

type Session = {
  subject: string;
  responsible: string;
  start_time: string;
  end_time: string;
  solicitude_status?: string;
  solicitude_id?: number;
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
  subItemIds: number[];
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
    const conflictMessage = ref("No hay conflictos");
    const days = ref(["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"]);
    const timeSlots = ref([
        "08:00:00",
        "08:30:00",
        "09:00:00",
        "09:30:00",
        "10:00:00",
        "10:30:00",
        "11:00:00",
        "11:30:00",
        "12:00:00",
      ]);

    const schedule = ref<WeeklySchedule>({
      Lunes: {},
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

    const printSpaceId = (spaceId: number) => {
      loadCalendarPlanifications(spaceId);
    };

    const getSession = (day: string, timeSlot: string): Session | null => {
      const daySchedule = schedule.value[day];
      return daySchedule ? daySchedule[timeSlot] || null : null;
    };

    const loadSpaces = async () => {
      const response = await fetchSpaces();
      if (response && response.data) {
        accordionItems.value = Object.keys(response.data).map((key) => {
          const spaces: string[] = [];
          const spaceIds: number[] = [];

          response.data[key].forEach((space: Space) => {
            // Tipo 'Space' aplicado aquí
            spaces.push(space.spaceName);
            spaceIds.push(space.spaceId);
          });

          return {
            title: key,
            subItems: spaces,
            subItemIds: spaceIds,
            show: false,
          };
        });
      } 
    };

    loadSpaces();

    const clearCalendar = () => {
      for (var i = 0; i < days.value.length; i++) {
        for (var j = 0; j < timeSlots.value.length; j++) {
          schedule.value[days.value[i]][timeSlots.value[j]] = {
            subject: "vacio",
            responsible: "-",
            start_time: "-",
            end_time: "-",
            solicitude_status: "-",
            solicitude_id: -1,
          };
        }
      }
    };

    const loadCalendarPlanifications = async (spaceId: number) => {
      clearCalendar();
      const daysonweek = ["MON", "TUE", "WED", "THU", "FRI"];
      const daysonweekspanish = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
      const times = [
        "08:00:00",
        "08:30:00",
        "09:00:00",
        "09:30:00",
        "10:00:00",
        "10:30:00",
        "11:00:00",
        "11:30:00",
        "12:00:00",
      ]
      const response = await fetchPlanifications(spaceId);
      if (response && response.data) {
        const planifications = response.data;
        console.log(planifications);
        //console.log(planifications[daysonweek[0]]["08:00:00"]);
        for (var i = 0; i < daysonweek.length; i++) {
          for (const timeSlot in times) {
            try {
              const session = planifications[daysonweek[i]][times[timeSlot]];
              //console.log(daysonweek[i]);
              //console.log(times[timeSlot]);
              //console.log(planifications[daysonweek[i]][times[timeSlot]]);
              schedule.value[daysonweekspanish[i]][times[timeSlot]] = {
                subject: session.subjectName,
                responsible: session.lastName,
                start_time: session.startTime,
                end_time: session.endTime,
                solicitude_status: session.solicitude_status,
                solicitude_id: session.solicitude_id,
              };
            } catch (error) {
              schedule.value[daysonweekspanish[i]][timeSlot] = {
                subject: "vacio",
                responsible: "-",
                start_time: "-",
                end_time: "-",
              };
            }
          }
        }
        if (response.errormessage) {
          conflictMessage.value = response.errormessage;
        }
        /* schedule.value = {
          Lunes: {
            "08:00": {
              subject: planifications.MON["08:00:00"].subjectName,
              responsible: planifications.MON["08:00:00"].lastName,
              start_time: planifications.MON["08:00:00"].startTime,
              end_time: planifications.MON["08:00:00"].endTime,
            },
            "08:30": {
              subject: planifications.MON["08:30:00"].subjectName,
              responsible: planifications.MON["08:30:00"].lastName,
              start_time: planifications.MON["08:30:00"].startTime,
              end_time: planifications.MON["08:30:00"].endTime,
            },
            "09:00": {
              subject: planifications.MON["09:00:00"].subjectName,
              responsible: planifications.MON["09:00:00"].lastName,
              start_time: planifications.MON["09:00:00"].startTime,
              end_time: planifications.MON["09:00:00"].endTime,
            },
            "09:30": {
              subject: planifications.MON["09:30:00"].subjectName,
              responsible: planifications.MON["09:30:00"].lastName,
              start_time: planifications.MON["09:30:00"].startTime,
              end_time: planifications.MON["09:30:00"].endTime,
            },
            "10:00": {
              subject: planifications.MON["10:00:00"].subjectName,
              responsible: planifications.MON["10:00:00"].lastName,
              start_time: planifications.MON["10:00:00"].startTime,
              end_time: planifications.MON["10:00:00"].endTime,
            },
            "10:30": {
              subject: planifications.MON["10:30:00"].subjectName,
              responsible: planifications.MON["10:30:00"].lastName,
              start_time: planifications.MON["10:30:00"].startTime,
              end_time: planifications.MON["10:30:00"].endTime,
            },
            "11:00": {
              subject: planifications.MON["11:00:00"].subjectName,
              responsible: planifications.MON["11:00:00"].lastName,
              start_time: planifications.MON["11:00:00"].startTime,
              end_time: planifications.MON["11:00:00"].endTime,
            },
            "11:30": {
              subject: planifications.MON["11:30:00"].subjectName,
              responsible: planifications.MON["11:30:00"].lastName,
              start_time: planifications.MON["11:30:00"].startTime,
              end_time: planifications.MON["11:30:00"].endTime,
            },
            "12:00": {
              subject: planifications.MON["12:00:00"].subjectName,
              responsible: planifications.MON["12:00:00"].lastName,
              start_time: planifications.MON["12:00:00"].startTime,
              end_time: planifications.MON["12:00:00"].endTime,
            },
          },
          Martes: {},
          Miércoles: {},
          Jueves: {
            "08:00": {
              subject: planifications.THU["08:00:00"].subjectName,
              responsible: planifications.THU["08:00:00"].lastName,
              start_time: planifications.THU["08:00:00"].startTime,
              end_time: planifications.THU["08:00:00"].endTime,
            },
            "08:30": {
              subject: planifications.THU["08:30:00"].subjectName,
              responsible: planifications.THU["08:30:00"].lastName,
              start_time: planifications.THU["08:30:00"].startTime,
              end_time: planifications.THU["08:30:00"].endTime,
            },
            "09:00": {
              subject: planifications.THU["09:00:00"].subjectName,
              responsible: planifications.THU["09:00:00"].lastName,
              start_time: planifications.THU["09:00:00"].startTime,
              end_time: planifications.THU["09:00:00"].endTime,
            },
            "09:30": {
              subject: planifications.THU["09:30:00"].subjectName,
              responsible: planifications.THU["09:30:00"].lastName,
              start_time: planifications.THU["09:30:00"].startTime,
              end_time: planifications.THU["09:30:00"].endTime,
            },
            "10:00": {
              subject: planifications.THU["10:00:00"].subjectName,
              responsible: planifications.THU["10:00:00"].lastName,
              start_time: planifications.THU["10:00:00"].startTime,
              end_time: planifications.THU["10:00:00"].endTime,
            },
            "10:30": {
              subject: planifications.THU["10:30:00"].subjectName,
              responsible: planifications.THU["10:30:00"].lastName,
              start_time: planifications.THU["10:30:00"].startTime,
              end_time: planifications.THU["10:30:00"].endTime,
            },
            "11:00": {
              subject: planifications.THU["11:00:00"].subjectName,
              responsible: planifications.THU["11:00:00"].lastName,
              start_time: planifications.THU["11:00:00"].startTime,
              end_time: planifications.THU["11:00:00"].endTime,
            },
            "11:30": {
              subject: planifications.THU["11:30:00"].subjectName,
              responsible: planifications.THU["11:30:00"].lastName,
              start_time: planifications.THU["11:30:00"].startTime,
              end_time: planifications.THU["11:30:00"].endTime,
            },
            "12:00": {
              subject: planifications.THU["12:00:00"].subjectName,
              responsible: planifications.THU["12:00:00"].lastName,
              start_time: planifications.THU["12:00:00"].startTime,
              end_time: planifications.THU["12:00:00"].endTime,
            },
          },
          Viernes: {},
        }; */
      }
    };

    function showToast(): void {
      // Muestra el toast
      const myToast = document.getElementById('myToast');
      if (myToast) {
        // @ts-ignore: Bootstrap Toast no tiene un tipo oficial para TypeScript
        const toast = new Toast(myToast);
        toast.show();
      }
    }

    function hideToast(): void {
      // Oculta el toast
      const myToast = document.getElementById('myToast');
      if (myToast) {
        // @ts-ignore: Bootstrap Toast no tiene un tipo oficial para TypeScript
        const toast = new Toast(myToast);
        toast.hide();
      }
    }

    return {
      days,
      timeSlots,
      schedule,
      accordionItems,
      toggleAccordionItem,
      getSession,
      printSpaceId,
      loadSpaces,
      conflictMessage,
      showToast,
      hideToast,
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

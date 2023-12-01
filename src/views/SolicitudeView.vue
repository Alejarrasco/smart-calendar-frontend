<template>
    <div>
        <table class="table">
            <thead>
                <tr>
                    <th>Solicitude ID</th>
                    <th>Solicitude Date</th>
                    <th>Solicitude Status</th>
                    <th>Subject Name</th>
                    <th>Responsible Name</th>
                    <th>Options</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="solicitude in solicitudes" :key="solicitude.solicitude_id">
                    <td>{{ solicitude.solicitude_id }}</td>
                    <td>{{ solicitude.solicitude_date }}</td>
                    <td>{{ solicitude.solicitude_status }}</td>
                    <td>{{ solicitude.subject_name }}</td>
                    <td>{{ solicitude.responsible_name }}</td>
                    <td>
                        <button class="btn btn-success" @click="approveThisSolicitude(solicitude.solicitude_id)">
                            APPROVE
                        </button>
                    </td>
                    <td>
                        <button class="btn btn-danger" @click="rejectThisSolicitude(solicitude.solicitude_id)">
                            REJECT
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts">
import { onMounted, ref } from 'vue';
import { fetchSolicitudes, approveSolicitude, rejectSolicitude } from '../services/SolicitudeService';

type Solicitude = {
    solicitude_id: number;
    solicitude_date: string;
    solicitude_status: string;
    subject_name: string;
    responsible_name: string;
};

export default {
    name: 'SolicitudeView',
    setup() {
        const solicitudes = ref<Solicitude[]>([]);

        onMounted(async () => {
            const solicitudeData = await fetchSolicitudes();
            console.log(solicitudeData);
            if (solicitudeData && solicitudeData.data) {
                solicitudeData.data.forEach((solicitude: any) => {
                    solicitudes.value.push({
                        solicitude_id: solicitude.solicitudeId,
                        solicitude_date: solicitude.registerDate,
                        solicitude_status: solicitude.solicitudeStatus,
                        subject_name: solicitude.subject.subjectName,
                        responsible_name: solicitude.person.firstName + ' ' + solicitude.person.lastName
                    });
                });
            }
        });

        const approveThisSolicitude = async (solicitudeId: number) => {
            try {
                const request = await approveSolicitude(solicitudeId);
                if (request && request.data) {
                    //move the solicitude to the end of the list
                    const solicitude = solicitudes.value.find((solicitude) => solicitude.solicitude_id === solicitudeId);
                    solicitudes.value = solicitudes.value.filter((solicitude) => solicitude.solicitude_id !== solicitudeId);
                    solicitudes.value.push(solicitude!);
                } else if (request && request.errormessage) {
                    alert(request.errormessage);//TODO change this to a toast
                }
            } catch (error) {
                console.log(error);
            }
        };

        const rejectThisSolicitude = async (solicitudeId: number) => {
            await rejectSolicitude(solicitudeId);
            //slice the solicitude from the array
            solicitudes.value = solicitudes.value.filter((solicitude) => solicitude.solicitude_id !== solicitudeId);
        };

        return {
            solicitudes,
            approveThisSolicitude,
            rejectThisSolicitude,
        };
    }
};
</script>

<style scoped>
/* Add your custom styles here */
</style>

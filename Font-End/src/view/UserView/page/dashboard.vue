<script setup>
import { useIotStore } from '@/stores/iot';
import { onMounted, ref } from 'vue';
import { useToastStore } from '@/stores/toast';
import { useReportsStore } from '@/stores/system/reports';
import { useUsersStore } from '@/stores/system/users';

const ToastStore = useToastStore()
const IotStore = useIotStore()
const UserStore = useUsersStore()
const Reports = useReportsStore()

const pageUser = ref(1)
const pageReport = ref(1)

const CreateReport = ref(false)
const photo = ref([])
const title = ref('')
const message = ref('')
const formReport = ref()

const Submit = async () => {
    const { valid } = await formReport.value.validate()

    if (valid) {
        const form = new FormData()
        form.append('title', title.value)
        form.append('message', message.value)
        form.append('photo', photo.value)
        form.append('minHum', IotStore.stats.min_hum)
        form.append('maxHum', IotStore.stats.max_hum)
        form.append('minTemp', IotStore.stats.min_temp)
        form.append('maxTemp', IotStore.stats.max_temp)

        try {

            const response = await Reports.Created(form)

            ToastStore.PlusToast(response.message, 'bg-green')
            title.value = ''
            message.value = ''
            photo.value = []

            CreateReport.value = false
            Reports.Load()
        } catch (error) {
            console.log(error)
            if (error.response?.data?.validator) {
                error.response.data?.validator.map((e) => ToastStore.PlusToast(e.msg, 'bg-red'))
            } else {
                ToastStore.PlusToast(error.response.data.message, 'bg-red')
            }
        }
    } else {
        ToastStore.PlusToast('กรุณากรอกข้อมูลให้ครบ', 'bg-red')
    }
}

const ViewReport = ref(false)
const ViewMoreReport = (data) => {
    Reports.selectReport = data
    ViewReport.value = true
}

const formEbitReport = ref()
const editPhoto = ref([])
const EditReport = ref(false)
const EditReportModal = () => {
    ViewReport.value = false
    EditReport.value = true
    editPhoto.value = []
}

const SubmitEdit = async () => {
    const { valid } = await formEbitReport.value.validate()

    if (valid) {
        const form = new FormData()
        if (editPhoto.value.length != 0) {
            form.append('photo', editPhoto.value)
        } else {
            form.append('oldphoto', Reports.selectReport.photo)
        }
        form.append('id_report', Reports.selectReport.id_report)
        form.append('title', Reports.selectReport.title)
        form.append('message', Reports.selectReport.message)
        try {

            const response = await Reports.Edit(form)

            ToastStore.PlusToast(response.message, 'bg-green')
            editPhoto.value = []
            EditReport.value = false

            await Reports.Load()
        } catch (error) {
            console.log(error)
            if (error.response?.data?.validator) {
                error.response.data?.validator.map((e) => ToastStore.PlusToast(e.msg, 'bg-red'))
            } else {
                ToastStore.PlusToast(error.response.data.message, 'bg-red')
            }
        }
    } else {
        ToastStore.PlusToast('กรุณากรอกข้อมูลให้ครบ', 'bg-red')
    }
}

const DeteleReport = async (id) => {
    try {
        const response = await Reports.Delete(id)
        ToastStore.PlusToast(response.message, 'bg-green')
        EditReport.value = false

        await Reports.Load()
    } catch (error) {
        console.log(error)
        if (error.response?.data?.validator) {
            error.response.data?.validator.map((e) => ToastStore.PlusToast(e.msg, 'bg-red'))
        } else {
            ToastStore.PlusToast(error.response.data.message, 'bg-red')
        }
    }
}


onMounted(() => {
    UserStore.Load()
    Reports.Load()
    IotStore.Loading()
    setInterval(() => {
        IotStore.Loading()
    }, 5000)
})
</script>
<template>
    <div class="">
        <v-row>
            <v-col cols="3">
                <div class="box-col" style="align-items: center;">
                    <i class="mdi mdi-thermometer bg-teal-accent-2 text-white "
                        style="font-size: 65px; padding: 10px 25px; border-radius: 20px;"></i>
                    <div class="mt-2" style="font-size: 20px; font-weight: 600;">{{ IotStore.latest.temperature }}</div>
                    <div class="">อุณหภูมิ</div>
                    <v-divider style="width: 75%; border-width: 1px;" class="my-2"></v-divider>
                    <p v-if="IotStore.Connent" class="text-green text-subtitle-2">เชื่อมต่อสำเร็จ</p>
                    <p v-else class="text-red text-subtitle-2">กำลังเชื่อมต่อ</p>
                    <div
                        style="position: absolute; left: 15px; top: 15px; display: flex; flex-direction: column; align-items: center; font-size: 14px; font-weight: 600; color: chocolate;">
                        <span>ต่ำสุด</span>
                        <span>{{ IotStore.stats.min_temp }}</span>
                    </div>
                    <div
                        style="position: absolute; right: 15px; top: 15px; display: flex; flex-direction: column; align-items: center; font-size: 14px; font-weight: 600; color: mediumturquoise;">
                        <span>สูงสุด</span>
                        <span>{{ IotStore.stats.max_temp }}</span>
                    </div>
                </div>
            </v-col>
            <v-col cols="3">
                <div class="box-col" style="align-items: center;">
                    <i class="mdi mdi-water bg-teal-accent-2 text-white "
                        style="font-size: 65px; padding: 10px 25px; border-radius: 20px;"></i>
                    <div class="mt-2" style="font-size: 20px; font-weight: 600;">{{ IotStore.latest.humidity }}</div>
                    <div class="">ความชื้น</div>
                    <v-divider style="width: 75%; border-width: 1px;" class="my-2"></v-divider>
                    <p v-if="IotStore.Connent" class="text-green text-subtitle-2">เชื่อมต่อสำเร็จ</p>
                    <p v-else class="text-red text-subtitle-2">กำลังเชื่อมต่อ</p>
                    <div
                        style="position: absolute; left: 15px; top: 15px; display: flex; flex-direction: column; align-items: center; font-size: 14px; font-weight: 600; color: chocolate;">
                        <span>ต่ำสุด</span>
                        <span>{{ IotStore.stats.min_hum }}</span>
                    </div>
                    <div
                        style="position: absolute; right: 15px; top: 15px; display: flex; flex-direction: column; align-items: center; font-size: 14px; font-weight: 600; color: mediumturquoise;">
                        <span>สูงสุด</span>
                        <span>{{ IotStore.stats.max_hum }}</span>
                    </div>
                </div>
            </v-col>
        </v-row>
    </div>
</template>

<style scoped>
.Box-Card {
    background-color: white;
    border-radius: 20px;
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 320px;
    box-shadow: 0px 2px 4px #0000004f;
}



.box-col {
    position: relative;
    background-color: white;
    border-radius: 20px;
    padding: 40px;
    box-shadow: 0px 2px 4px #0000004f;
    display: flex;
    flex-direction: column;
    height: 100%;
}
</style>
<script setup>
import { useIotStore } from '@/stores/iot';
import { onMounted, ref, shallowRef } from 'vue';
import { useToastStore } from '@/stores/toast';
import { useReportsStore } from '@/stores/system/reports';
import { useUsersStore } from '@/stores/system/users';
import { getImageUrl } from '@/utils/imageUrl';

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

const search = shallowRef()

onMounted(() => {
    UserStore.Load()
    Reports.Load()
    // IotStore.Loading()
    // setInterval(() => {
    //     IotStore.Loading()
    // }, 5000)
})
</script>
<template>
    <div class="">
        <v-row>
            <v-col cols="12">
                <div class="box-col" style="padding: 30px;">
                    <div class="d-flex" style="justify-content: space-between; align-items: center;">
                        <div class="d-flex flex-column">
                            <span style="font-size: 20px; font-weight: 600;">รายงานทั้งหมด</span>
                            <p style="font-size: 14px;" class="text-grey">ทั้งหมด {{ UserStore.users.length }}
                                รายการ</p>
                        </div>
                        <div class="d-flex ga-3" style="">
                            <v-text-field v-model="search" variant="solo" label="ค้นหา" clearable width="200px" hide-details="">

                            </v-text-field>

                            <button class="btn-add" @click="CreateReport = true">
                                เพิ่มรายงาน
                            </button>
                        </div>
                    </div>
                    <div class="w-100 mt-5">
                        <v-data-iterator :items="Reports.reports" :page="pageReport" :items-per-page="8" :search="search">
                            <template v-slot:default="{ items }">
                                <v-row>
                                    <template v-for="report in items" :key="report.raw.id_report">
                                        <v-col cols="3">
                                            <v-card class="Box-Card" style="padding: 0px; ;">
                                                <v-img :src="getImageUrl(report.raw.photo)" cover height="200px"
                                                    width="100%"></v-img>
                                                <div class="pa-3 w-100 h-100"
                                                    style="display: flex; flex-direction: column; ">
                                                    <p class="text-grey" style="font-size: 14px;">{{ report.raw.Date_At
                                                        }}</p>
                                                    <div class="" style="font-size: 25px; font-weight: 600;">{{
                                                        report.raw.title }}</div>
                                                    <p class="text-grey"
                                                        style="display: -webkit-box; -webkit-line-clamp: 2; overflow: hidden; -webkit-box-orient: vertical;">
                                                        {{ report.raw.message }}
                                                    </p>
                                                    <button class="btn-more2  mt-4" style="bottom: 0;"
                                                        @click="ViewMoreReport(report.raw)">ดูเพิ่มเติม</button>
                                                </div>
                                            </v-card>
                                        </v-col>

                                    </template>
                                </v-row>
                            </template>
                            <template v-slot:footer="{pageCount}">
                                <v-pagination v-model="pageReport" :length="pageCount"></v-pagination>
                            </template>
                        </v-data-iterator>
                    </div>
                </div>
            </v-col>
        </v-row>

        <v-dialog v-model="CreateReport" width="auto">
            <div class="Box-Card">
                <h1 class="" style="color: cornflowerblue;">สร้างรายงาน</h1>
                <v-form ref="formReport" class="d-flex flex-column w-100 ga-1 mt-4">
                    <v-file-input label="รูปภาพ" :rules="[v => !!v || 'กรุณาใส่รูปภาพ']" accept="image/*"
                        prepend-icon="" v-model="photo"></v-file-input>
                    <v-text-field label="หัวข้อ" :rules="[v => !!v || 'กรุณากรอกหัวข้อ']"
                        v-model="title"></v-text-field>
                    <v-text-field label="ข้อความ" :rules="[v => !!v || 'กรุณากรอกข้อความ']"
                        v-model="message"></v-text-field>
                    <v-row>
                        <v-col cols="6" class="d-flex flex-column">
                            <p class="mb-1">ความชื้น</p>
                            <v-text-field label="ต่ำสุด" v-model="IotStore.stats.min_hum"></v-text-field>
                            <v-text-field label="สูงสุด" v-model="IotStore.stats.max_hum"></v-text-field>
                        </v-col>
                        <v-col cols="6" class="d-flex flex-column">
                            <p class="mb-1">อุณหภูมิ</p>
                            <v-text-field label="ต่ำสุด" v-model="IotStore.stats.min_temp"></v-text-field>
                            <v-text-field label="สูงสุด" v-model="IotStore.stats.max_temp"></v-text-field>
                        </v-col>
                    </v-row>

                    <v-btn style="background-color: cornflowerblue;" class="text-white"
                        @click="Submit">สร้างรายงาน</v-btn>
                    <v-btn style="background-color: red;" class="text-white" @click="CreateReport = false">ปิด</v-btn>
                </v-form>
            </div>
        </v-dialog>

        <v-dialog v-model="ViewReport" width="auto">
            <div class="Box-Card" style="width: 500px; padding: 20px;">
                <v-img :src="getImageUrl(Reports.selectReport.photo)" style="border-radius: 10px;" cover
                    height="300px" width="100%"></v-img>
                <div class="pa-3 w-100 h-100" style="display: flex; flex-direction: column; ">
                    <p class="text-grey" style="font-size: 14px;">{{ Reports.selectReport.Date_At }}</p>
                    <div class="" style="font-size: 25px; font-weight: 600;">{{ Reports.selectReport.title }}</div>
                    <p class="text-grey"
                        style="display: -webkit-box; -webkit-line-clamp: 2; overflow: hidden; -webkit-box-orient: vertical;">
                        {{ Reports.selectReport.message }}
                    </p>
                    <div class="d-flex w-100 ga-3 mt-3">
                        <button class="btn-add  mt-4" style="bottom: 0; flex: 1;"
                            @click="EditReportModal">แก้ไข</button>
                        <button class="btn-error  mt-4" style="bottom: 0; flex: 1;"
                            @click="ViewReport = false">ปิด</button>
                    </div>
                </div>
            </div>
        </v-dialog>

        <v-dialog v-model="EditReport" width="auto">
            <div class="Box-Card">
                <h1 class="" style="color: cornflowerblue;">แก้ไขรายงาน</h1>
                <v-form ref="formEbitReport" class="d-flex flex-column w-100 ga-1 mt-4">
                    <v-file-input label="รูปภาพ" accept="image/*" prepend-icon="" v-model="editPhoto"></v-file-input>
                    <v-text-field label="หัวข้อ" :rules="[v => !!v || 'กรุณากรอกหัวข้อ']"
                        v-model="Reports.selectReport.title"></v-text-field>
                    <v-text-field label="ข้อความ" :rules="[v => !!v || 'กรุณากรอกข้อความ']"
                        v-model="Reports.selectReport.message"></v-text-field>
                    <v-btn style="background-color: cornflowerblue;" class="text-white"
                        @click="SubmitEdit">แก้ไขรายงาน</v-btn>
                    <v-btn style="background-color: red;" class="text-white" @click="DeteleReport(Reports.selectReport.id_report)">ลบ</v-btn>
                    <v-btn style="background-color: chocolate;" class="text-white"
                        @click="EditReport = false">ปิด</v-btn>

                </v-form>
            </div>
        </v-dialog>
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
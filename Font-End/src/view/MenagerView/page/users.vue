<script setup>
import { useIotStore } from '@/stores/iot';
import { onMounted, ref, shallowRef } from 'vue';
import { useToastStore } from '@/stores/toast';
import { useReportsStore } from '@/stores/system/reports';
import { useUsersStore } from '@/stores/system/users';
import { useIndexStore } from '@/stores';

const IndexStore = useIndexStore()
const ToastStore = useToastStore()
const UserStore = useUsersStore()
const Reports = useReportsStore()

const pageUser = ref(1)

const CreateUser = ref(false)
const form = ref()
const username = ref('')
const email = ref('')
const password = ref('')
const role = ref()

const Submit = async () => {
    const { valid } = await form.value.validate()

    if (valid) {
        try {
            if (role.value == "แอดมิด") {
                role.value = 'admin'
            } else if (role.value == "ผู้จัดการ") {
                role.value = 'menager'
            } else if (role.value == "ผู้ใช้") {
                role.value = 'user'
            }
            const data = {
                username: username.value,
                email: email.value,
                password: password.value,
                role: role.value
            }
            const response = await UserStore.Create(data)
            ToastStore.PlusToast(response.message, 'bg-green')
            UserStore.Load()

            CreateUser.value = false
            username.value = ''
            email.value = ''
            password.value = ''
        } catch (error) {
            console.log(error)
            if (error.response.data?.validator) {
                error.response.data?.validator.map((e) => ToastStore.PlusToast(e.msg, 'bg-red'))
            } else {
                ToastStore.PlusToast(error.response.data.message, 'bg-red')
            }
        }
    } else {
        ToastStore.PlusToast('กรุณากรอกข้อมูลให้ครบ', 'bg-red')
    }
}

const formEdit = ref()
const EditUser = ref(false)
const EditModal = (data) => {
    UserStore.selectUser = data
    EditUser.value = true
}
const SubmitEdit = async () => {
    const { valid } = await formEdit.value.validate()

    if (valid) {
        try {
            if (UserStore.selectUser.role == "แอดมิด") {
                UserStore.selectUser.role = 'admin'
            } else if (UserStore.selectUser.role == "ผู้จัดการ") {
                UserStore.selectUser.role = 'menager'
            } else if (UserStore.selectUser.role == "ผู้ใช้") {
                UserStore.selectUser.role = 'user'
            }
            const data = {
                username: UserStore.selectUser.username,
                email: UserStore.selectUser.email,
                password: UserStore.selectUser.password,
                role: UserStore.selectUser.role
            }
            const response = await UserStore.Edit(data, UserStore.selectUser.id_user)
            ToastStore.PlusToast(response.message, 'bg-green')
            UserStore.Load()

            EditUser.value = false
        } catch (error) {
            console.log(error)
            if (error.response.data?.validator) {
                error.response.data?.validator.map((e) => ToastStore.PlusToast(e.msg, 'bg-red'))
            } else {
                ToastStore.PlusToast(error.response.data.message, 'bg-red')
            }
        }
    } else {
        ToastStore.PlusToast('กรุณากรอกข้อมูลให้ครบ', 'bg-red')
    }
}

const Delete = async (id) => {
    try {
        const response = await UserStore.Delete(id)
        ToastStore.PlusToast(response.message, 'bg-green')
        EditUser.value = false

        UserStore.Load()

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
                <div class="box-col" style="padding: 30px; padding-bottom: 10px;">
                    <div class="d-flex" style="justify-content: space-between; align-items: center;">
                        <div class="d-flex flex-column">
                            <span style="font-size: 20px; font-weight: 600;">ผู้ใช้ทั้งหมด</span>
                            <p style="font-size: 14px;" class="text-grey">ทั้งหมด {{ UserStore.users.length }} คน
                            </p>
                        </div>
                        <div class="d-flex ga-3" style="">
                            <v-text-field v-model="search" variant="solo" label="ค้นหา" clearable width="200px"
                                hide-details="">

                            </v-text-field>

  
                        </div>
                    </div>

                    <div class="w-100 pa-2 pb-0 mt-1">
                        <v-data-iterator :items="UserStore.users" :page="pageUser" :items-per-page="6" :search="search">

                            <template v-slot:default="{ items }">
                                <v-table>
                                    <thead>
                                        <tr>
                                            <th>ชื่อผู้ใช้</th>
                                            <th>ตำแหน่ง</th>
                                            <th>สร้างเมือ</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <template v-for="user in items" :key="user.raw.id_user">
                                            <tr>
                                                <td>
                                                    <div class="d-flex flex-column">
                                                        <span style="font-size: 18px; font-weight: 600;">{{
                                                            user.raw.username
                                                        }}</span>
                                                        <p style="font-size: 14px;" class="text-grey">{{ user.raw.email
                                                        }}
                                                        </p>
                                                    </div>
                                                </td>
                                                <td>
                                                    {{ user.raw.role }}
                                                </td>
                                                <td>
                                                    <p class="text-grey">
                                                        {{ user.raw.Date_At }}
                                                    </p>
                                                </td>
                                               
                                            </tr>

                                        </template>
                                    </tbody>
                                </v-table>
                            </template>
                            <template v-slot:footer="{ pageCount }">
                                <v-pagination v-model="pageUser" :length="pageCount" class="mt-2"></v-pagination>
                            </template>
                        </v-data-iterator>
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
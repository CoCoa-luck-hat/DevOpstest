<script setup>
import { useRoute } from 'vuetify/lib/composables/router';
import { useIndexStore } from '@/stores';
import {MenagerRouter} from '@/router/ViewRouter/MenagerRouter';
import { useToastStore } from '@/stores/toast';
import { ref } from 'vue';

const ToastStore = useToastStore()
const IndexStore = useIndexStore()
const route = useRoute()

const form = ref()
const EditPorfile = ref(false)
const Submit = async () => {
    const { valid } = await form.value.validate()

    if (valid) {
        try {
            const data = {
                username: IndexStore.user.username,
                email: IndexStore.user.email,
                password: IndexStore.user.password
            }
            const response = await IndexStore.EditProfile(data)
            ToastStore.PlusToast(response.message, 'bg-green')
            EditPorfile.value = false
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
</script>
<template>
    <div class="Div-main">
        <aside class="aside">
            <h1 class="text-h5" style="font-weight: 600; text-align: center;">DashBoard Menager</h1>
            <v-divider class="w-75 mx-auto my-1"></v-divider>
            <div class="d-flex flex-column ga-2 mt-4">
                <router-link v-for="routerItem in MenagerRouter" :to="{ name: routerItem.name }" class="btn-aside"
                    :style="routerItem.name === route.name ? 'background-color: rgb(235, 235, 235)' : ''"
                    style="text-decoration: none;">
                    <i class="mdi  text-h5 px-3 py-2"
                        :class="routerItem.meta.iconMdi, routerItem.name === route.name ? 'bg-teal-accent-3 text-white' : 'bg-white text-teal-accent-3'"
                        style="border-radius: 10px; transition: all 0.3s;"></i>
                    <span class="text-black" style="font-size: 20px; font-weight: 600;">
                        {{ routerItem.meta.reqName }}</span>
                </router-link>
            </div>
        </aside>
        <div class="container">
            <nav class="navbar">
                <div class="d-flex flex-column">
                    <div class="d-flex ga-1" style="font-size: 14px;">
                        <span class="text-grey">Page</span>
                        <span style="color: dimgrey; font-weight: 600;">/ {{ route.meta.reqName }}</span>
                    </div>
                    <div class="" style="font-size: 20px; font-weight: 600;">{{ route.meta.reqName }}</div>
                </div>
                <div class="d-flex ga-2">
                    <button class="btn-more" style="padding: 3px 9px; border-radius: 50%; font-size: 24px;"
                        @click="EditPorfile = true">
                        <i class="mdi mdi-cog"></i>
                    </button>
                    <button class="btn-error" style="padding: 3px 9px; border-radius: 50%; font-size: 24px;"
                        @click="IndexStore.Logout()">
                        <i class="mdi mdi-exit-to-app"></i>
                    </button>
                </div>
            </nav>
            <div class="" style="padding: 20px;">
                <slot></slot>
            </div>
        </div>
        <v-dialog v-model="EditPorfile" width="auto">
            <div class="Box-Card">
                <h1 class="text-teal-accent-3">แก้ไขบัญชี</h1>
                <v-form ref="form" class="d-flex flex-column w-100 ga-1 mt-4">
                    <v-text-field label="ชื่อผู้ใช้" :rules="[v => !!v || 'กรุณากรอกชื่อผู้ใช้']"
                        v-model="IndexStore.user.username"></v-text-field>
                    <v-text-field label="อีเมล" :rules="[v => !!v || 'กรุณากรอกอีเมล']" v-model="IndexStore.user.email"></v-text-field>
                    <v-text-field label="รหัสผ่าน" :rules="[v => !!v || 'กรุณากรอกรหัสผ่าน']"
                        v-model="IndexStore.user.password"></v-text-field>
                    <v-btn color="teal-accent-3" class="text-white" @click="Submit">แก้ไขบัญชี</v-btn>
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

.btn-error {
    transition: all 0.5s;
    color: red;
    background-color: rgba(255, 0, 0, 0.151);
}

.btn-error:hover {
    color: white;
    background-color: red;
}

.navbar {
    width: 100%;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.container {
    display: flex;
    flex-direction: column;
    flex: 1;

}

.btn-aside {
    transition: all 0.3s;
    padding: 5px 10px;
    border-radius: 10px;
    box-sizing: content-box;
    display: flex;
    gap: 5px;
    align-items: center;
}

.btn-aside:hover {
    background-color: rgb(218, 217, 217) !important;
    gap: 10px;

}

.Div-main {
    display: flex;
    min-height: 100vh;
}

.aside {
    padding: 20px;
    width: 300px;
    display: flex;
    flex-direction: column;
}
</style>
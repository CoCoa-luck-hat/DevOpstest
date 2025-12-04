<script setup>
import { ref } from 'vue';
import { useToastStore } from '@/stores/toast';
import { useIndexStore } from '@/stores';
import router from '@/router';

const IndexStore = useIndexStore()
const ToastStore = useToastStore()

const form = ref()
const username = ref('')
const email = ref('')
const password = ref('')

const Submit = async () => {
    const { valid } = await form.value.validate()

    if (valid) {
        try {
            const data = {
                username: username.value,
                email: email.value,
                password: password.value
            }
            const response = await IndexStore.Register(data)
            ToastStore.PlusToast(response.message, 'bg-green')

            router.push({ name: 'login' })

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
    <div class="Box-Card">
        <h1 class="text-teal-accent-3">สมัครสมาชิก</h1>
        <v-form ref="form" class="d-flex flex-column w-100 ga-1 mt-4">
            <v-text-field label="ชื่อผู้ใช้" :rules="[v => !!v || 'กรุณากรอกชื่อผู้ใช้']"
                v-model="username"></v-text-field>
            <v-text-field label="อีเมล" :rules="[v => !!v || 'กรุณากรอกอีเมล']" v-model="email"></v-text-field>
            <v-text-field label="รหัสผ่าน" :rules="[v => !!v || 'กรุณากรอกรหัสผ่าน']" v-model="password"></v-text-field>

            <v-btn color="teal-accent-3" class="text-white" @click="Submit">สมัครสมาชิก</v-btn>
        </v-form>
        <div class="d-flex ga-1 mt-2" style="font-size: 12px;">
            <div class="text-grey">มีบัญชีอยู่แล้วใช่ไหม?</div>
            <router-link :to="{ name: 'login' }" style="color: red;">เข้าสู่ระบบ</router-link>
        </div>
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
    max-width: 320px;
    width: 100%;
}
</style>
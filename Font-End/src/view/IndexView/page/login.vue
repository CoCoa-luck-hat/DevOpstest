<script setup>
import { ref } from 'vue';
import { useToastStore } from '@/stores/toast';
import { useIndexStore } from '@/stores';
import router from '@/router';

const IndexStore = useIndexStore()
const ToastStore = useToastStore()

const form = ref()
const email = ref('')
const password = ref('')

const Submit = async () => {
    const { valid } = await form.value.validate()

    if (valid) {
        try {
            const data = {
                email: email.value,
                password: password.value
            }
            const response = await IndexStore.Login(data)

            ToastStore.PlusToast(response.message, 'bg-green')

            if (IndexStore.user.role === 'admin') {
                router.push({ name: 'admin-dashboard' })
            }else if(IndexStore.user.role === 'menager') {
                router.push({ name: 'menager-dashboard' })
            }else{
                router.push({ name: 'user-dashboard' })

            }

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
</script>
<template>
    <div class="Box-Card">
        <h1 class="text-teal-accent-3">เข้าสู่ระบบ</h1>
        <v-form ref="form" class="d-flex flex-column w-100 ga-1 mt-4">
            <v-text-field label="อีเมล" :rules="[v => !!v || 'กรุณากรอกอีเมล']" v-model="email"></v-text-field>
            <v-text-field label="รหัสผ่าน" :rules="[v => !!v || 'กรุณากรอกรหัสผ่าน']" v-model="password"></v-text-field>

            <v-btn color="teal-accent-3" class="text-white" @click="Submit">เข้าสู่ระบบ</v-btn>
        </v-form>
        <div class="d-flex ga-1 mt-2" style="font-size: 12px;">
            <div class="text-grey">ยังไม่มีบัญชีใช่ไหม?</div>
            <router-link :to="{ name: 'register' }" style="color: red;">สมัครสมาชิก</router-link>
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
        box-shadow: 0px 2px 4px #0000004f;
}
</style>
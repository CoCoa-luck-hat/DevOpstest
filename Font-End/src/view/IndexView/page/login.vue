<script setup>
import { ref } from 'vue';
import { useToastStore } from '@/stores/toast';

const ToastStore = useToastStore()

const form = ref()
const email = ref('')
const password = ref('')

const Submit = async()=>{
    const { valid} = await form.value.validate()

    if(valid){

    }else{
            ToastStore.PlusToast('กรุณากรอกข้อมูลให้ครบ','bg-red')
    }
}
</script>
<template>
    <div class="Box-Card">
        <h1 class="text-teal-accent-3">เข้าสู่ระบบ</h1>
        <v-form ref="form" class="d-flex flex-column w-100 ga-1 mt-4">
            <v-text-field label="อีเมล" :rules="[v=>!!v || 'กรุณากรอกอีเมล']" v-model="email"></v-text-field>
            <v-text-field label="รหัสผ่าน" :rules="[v=>!!v || 'กรุณากรอกรหัสผ่าน']" v-model="password"></v-text-field>

            <v-btn color="teal-accent-3" class="text-white" @click="Submit">เข้าสู่ระบบ</v-btn>
        </v-form>
    </div>
</template>

<style scoped>
    .Box-Card{
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
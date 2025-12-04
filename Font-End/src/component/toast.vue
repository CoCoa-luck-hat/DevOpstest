<script setup>
import { useToastStore } from '@/stores/toast';

const ToastStore = useToastStore()
</script>

<template>
    <transition-group name="toast" tag="div" class="toast">
        <div v-for="toast in ToastStore.toasts" :key="toast.id" :class="toast.type" class="alert">
            {{ toast.message }}
        </div>
    </transition-group>
</template>

<style scoped>
    .toast{
        position: fixed;
        bottom: 5px;
        right: 5px;
        display: flex;
        flex-direction: column-reverse;
        gap: 5px;
    }
    .alert{
        color: white;
        border-radius: 10px;
        padding: 15px 20px;
    }

    .toast-enter-active,.toast-leave-active{
        transition: all 0.5s ease;
    }
    .toast-enter-from{
        transform: translateY(50px);
        opacity: 0;
    }
    .toast-enter-to{
        transform: translateY(0px);
        opacity: 1;
    }
    .toast-leave-to{
        transform: scale(0);
        opacity: 0;
    }
</style>

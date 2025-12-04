<script setup>
import Layout from './component/layout.vue';
import { useRoute } from 'vuetify/lib/composables/router';

const route = useRoute()


</script>
<template>
    <Layout>
        <router-view v-slot="{Component}">
            <transition name="page" mode="out-in">
                <component :is="Component" :key="route.name"></component>
            </transition>
        </router-view>
    </Layout>
</template>

<style scoped>
    .page-enter-active,.page-leave-active{
        transition: all 0.3s ease;
    }
    .page-enter-from{
        transform: scale(0.5);
        opacity: 0;
    }
    .page-enter-to{
        transform: scale(1);
        opacity: 1;
    }
    .page-leave-to{
        transform: scale(0.5);
        opacity: 0;
    }
</style>
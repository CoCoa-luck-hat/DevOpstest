<script setup>
import Layout from './component/layout.vue';
import { useRoute } from 'vuetify/lib/composables/router';

const route = useRoute()


</script>
<template>
    <Layout>
        <router-view v-slot="{ Component }">
            <transition name="page" mode="out-in">
                <component :is="Component" :key="route.name"></component>
            </transition>
        </router-view>
    </Layout>
</template>


<style>
.btn-error {
    transition: all 0.5s;
    color: red;
    border-radius: 10px;
    padding: 10px 25px;
    background-color: rgba(255, 0, 0, 0.151);
}

.btn-error:hover {
    color: white;
    background-color: red;
}

.btn-add {
    color: coral;
    background-color: rgba(255, 127, 80, 0.164);
    border-radius: 10px;
    padding: 10px 25px;
    transition: all 0.3s;
}

.btn-add:hover {
    color: white;
    background-color: rgba(255, 153, 116, 0.699);
}

.btn-more2 {
    color: #13e6b4;
    background-color: #64ffdb6b;
    border-radius: 10px;
    padding: 10px 25px;
    transition: all 0.3s;
}

.btn-more2:hover {
    color: white;
    background-color: #13e6b4;
}

.btn-more {
    color: blue;
    background-color: rgba(0, 0, 255, 0.199);
    border-radius: 10px;
    padding: 10px 25px;
    transition: all 0.3s;
}

.btn-more:hover {
    color: white;
    background-color: rgba(0, 0, 255, 0.63);
}
</style>

<style scoped>
.page-enter-active,
.page-leave-active {
    transition: all 0.3s ease;
}

.page-enter-from {
    opacity: 0;
}

.page-enter-to {
    opacity: 1;
}

.page-leave-to {
    opacity: 0;
}
</style>
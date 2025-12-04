<script setup>
import { useRoute } from 'vuetify/lib/composables/router';
import { useIndexStore } from '@/stores';
import { AdminRouter } from '@/router/ViewRouter/AdminRouter';

const IndexStore = useIndexStore()
const route = useRoute()
</script>
<template>
    <div class="Div-main">
        <aside class="aside">
            <h1 class="text-h5" style="font-weight: 600;">DashBoard Admin</h1>
            <v-divider class="w-75 mx-auto my-1"></v-divider>
            <div class="d-flex flex-column ga-2 mt-4">
                <router-link v-for="routerItem in AdminRouter" :to="{ name: routerItem.name }" class="btn-aside"
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
                <div class="d-flex">
                    <button class="btn-error" style="padding: 3px 8px; border-radius: 50%; font-size: 24px;"
                        @click="IndexStore.Logout()">
                        <i class="mdi mdi-exit-to-app"></i>
                    </button>
                </div>
            </nav>
            <div class="" style="padding: 20px;">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<style scoped>
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
}

.Div-main {
    display: flex;
    min-height: 100vh;
}

.aside {
    padding: 20px;
    display: flex;
    flex-direction: column;
}
</style>
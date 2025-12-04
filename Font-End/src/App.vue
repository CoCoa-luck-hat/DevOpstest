<script setup>
import toast from './component/toast.vue';
import { useRoute } from 'vuetify/lib/composables/router';

const route = useRoute()
</script>

<template>
  <toast></toast>
  <router-view v-slot="{ Component }">
    <transition name="page" mode="out-in">
      <component :is="Component" :key="route.component"></component>
    </transition>
  </router-view>
</template>

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

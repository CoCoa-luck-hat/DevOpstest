<script setup>
</script>
<template>
    <div class="Div-main">
        <slot></slot>
    </div>
</template>

<style scoped>
    .Div-main{
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        justify-content: center;
        align-items: center;
    }
</style>
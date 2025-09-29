<template>
    <h1>Recruiter Sign UP</h1>
    <ColorPicker v-model="color" />
</template>

<script setup lang="ts">
import {ref} from 'vue'
import ColorPicker from 'primevue/colorpicker';
const color = ref('')

</script>
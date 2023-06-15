<template>
    <div style="text-align: center; background-color:gainsboro;">
        <!-- {{ props.info }} -->
        <h1 class="mt-5">User Component</h1>
        <p>Name: {{ props.info.name }}</p>
        <p>Age: {{ props.info.age }}</p>
        <img :src="props.info.image" class="mb-3 img-fluid">
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    info: Object
})

</script>
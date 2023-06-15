<template>
    <div class="card mt-4" style="padding: 20px;">
        ArrayIndex: {{ props.num }} <br>
        Item ID: {{ props.num+1 }} <br> <br>
        Item Name
        <input class="mt-2 form-control" type="text" placeholder="Enter name" v-model="props.info.name">
    </div>
</template>
<script setup>
import { defineProps } from 'vue'

const props = defineProps({
    info: Object,
    num: Number
})


</script> 
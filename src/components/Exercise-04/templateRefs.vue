<template>
    <div style="text-align: center; background-color:gainsboro;">
        <h1 class="mt-5">User Component</h1>
        <p>Name: {{ pic.name }}</p>
        <p>Age: {{ pic.age }}</p>
        <img :src="pic.image"
            class="mb-3 img-fluid">
    </div>
</template>

<script setup>
import { ref, reactive, defineExpose } from 'vue'

const receive = (picture) => {
    pic.name = picture.name
    pic.age = picture.age
    pic.image = picture.image
}

const pic = reactive({
    name: '',
    age: '',
    image: ''
})

defineExpose({ receive })
</script>
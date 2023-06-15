<template>
    <div>
        <h2 class="mt-2" style="text-align:center;">Photos (Components, Props)</h2>
    </div>

    <div class="row">
        <div class="col-1"></div>
        <div class="col-10 mt-4">
            <label for="firstname" class="form-label mt-3">Name</label>
            <input type="text" class="form-control" id="name" v-model="picture.name">
            <label for="firstname" class="form-label mt-2">Age</label>
            <input type="text" class="form-control" id="age" v-model="picture.age">
            <label for="firstname" class="form-label mt-2">Image Url</label>
            <input type="text" class="form-control" id="image" v-model="picture.image">
            
            <photo :info="picture"/>

        </div>
        <div class="col-1"></div>
    </div>
</template>

<script setup>
import photo from '@/components/Exercise-03/photo.vue';
import { ref, reactive } from 'vue'

// const picture = {
//     name: ref(''),
//     age: ref(''),
//     image: ref('')
// }

const picture = reactive({
    name: '',
    age: '',
    image: ''
})


</script>
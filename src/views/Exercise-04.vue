<template>
    <div>
        <h2 class="mt-2" style="text-align:center;">Photos (Components, Template refs)</h2>
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

            <button type="button" class="btn btn-primary mt-3" @click="send()">Submit</button>

            <templateRefs ref="photoRef" />
        </div>
        <div class="col-1"></div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import templateRefs from '@/components/Exercise-04/templateRefs.vue'

const photoRef = ref(null)

const send = () => {
    photoRef.value.receive(picture)
}

const picture = reactive({
    name: '',
    age: '',
    image: ''
})

</script>
<template>
    <div>
        <h2 style="text-align:center;">Animals (v-if / v-else-if / v-else)</h2>
    </div>

    <div class="container text-center">
        <div class="row">
            <div class="col-3">
                <button type="button" class="btn btn-outline-primary" @click="dogs()">Dogs</button>
            </div>
            <div class="col-3">
                <button type="button" class="btn btn-outline-success" @click="cats()">Cats</button>
            </div>
            <div class="col-3">
                <button type="button" class="btn btn-outline-secondary" @click="birds()">Birds</button>
            </div>
            <div class="col-3">
                <button type="button" class="btn btn-outline-danger" @click="rabbits()">Rabbits</button>
            </div>
        </div>
    </div>

<div class="mt-3" v-if="text !== null">
    <div class="card" style="width: 18rem; margin: auto">
        <img :src="image">
        <div class="card-body text-center">
            <h5 class="card-title">{{ text }}</h5>
        </div>
    </div>
</div>
</template>


<script setup>
import { ref } from 'vue'

let image = ref('')
let text = ref(null)

    const dogs = () => {
        image.value = 'https://images.unsplash.com/photo-1444212477490-ca407925329e?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NHx8ZG9nc3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        text.value = 'Dogs'
    }
    const cats = () => {
        image.value = 'https://images.unsplash.com/photo-1532386236358-a33d8a9434e3?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NHx8Y2F0c3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        text.value = 'Cats'
    }
    const birds = () => {
        image.value = 'https://images.unsplash.com/photo-1480044965905-02098d419e96?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NHx8YmlyZHN8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        text.value = 'Birds'
    }
    const rabbits = () => {
        image.value = 'https://images.unsplash.com/photo-1583301286816-f4f05e1e8b25?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NHx8cmFiYml0c3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        text.value = 'Rabbits'
    }

</script>
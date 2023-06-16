<template>
    <div>
        <h1>Project Page</h1>
        <p>name: {{ name }}</p>
        <input type="text" v-model="name" />
    </div>

    
    <div v-for="user in users">
        Name: {{ user.name }} <br>
        Age: {{ user.age }} <br>
        Gender: {{ user.gender }} <br> <br>
    </div>

    <div>
        <button class="btn btn-primary" @click="count++" > + </button>
        <button class="btn btn-outline-secondary" @click="count--" > - </button>
        
        <br>
        {{ count }}
    </div>

</template>

<script setup>
import { ref, reactive } from 'vue'

let name = ref('')

const users = ref([
    {name: 'User01', age: 10, gender: 'male'},
    {name: 'User02', age: 12, gender: 'female'},
    {name: 'User03', age: 23, gender: 'male'},
    {name: 'User04', age: 31, gender: 'female'},
])

let count = ref(0)





</script>

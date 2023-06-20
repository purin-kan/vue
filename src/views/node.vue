<template>
    <div>

        {{ text }}

    </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios';

const text = ref('pur')

// axios.get('http://localhost:3000')
//     .then((response) => {
//         console.log(response);
//         text.value = response.data
//     })

// axios.get('http://localhost:3000/get-param/' + 123)
//     .then((response) => {
//         console.log(response);
//         text.value = response.data
//     })

// axios.get('http://localhost:3000/get-query', { params: { ab: 456 } })
//     .then((response) => {
//         console.log(response);
//         text.value = response.data
//     })

// axios.post('http://localhost:3000/post-example', { cd: 789 })
//     .then((response) => {
//         console.log(response);
//         text.value = response.data
//     })

// axios.put('http://localhost:3000/put-example', { cd: 1111 })
//    .then((response) => {
//         console.log(response);
//         text.value = response.data
//     })

axios.get('http://localhost:3000/mysql')
    .then((response) => {
        console.log(response);
        text.value = response.data
    })




</script>
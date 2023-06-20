<template>
    <div>

        <input type="text" class="form-control mt-3" v-model="name" placeholder="name">
        <input type="text" class="form-control mt-3 mb-3" v-model="price" placeholder="price">
        <button class="btn btn-primary mb-3" @click="post()">post</button> <br />

        <input type="text" class="form-control mt-3" v-model="id" placeholder="id condition">
        <button class="btn btn-primary mb-3 mt-3" @click="update()">update</button> <br />
        
        <input type="text" class="form-control mt-3" v-model="table" placeholder="table">
        <button class="btn btn-primary mb-3 mt-3" @click="select()">select</button> <br />

        {{ text }}

    </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios';

const text = ref('default text')

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

// axios.get('http://localhost:3000/mysql')
//     .then((response) => {
//         // console.log(response.data);
//         text.value = response.data
//     })


//receiving data from input fields
const name = ref()
const price = ref()
//insert into databases
const post = async () => {
    let { res } = await axios.post('http://localhost:3000/post-example', { name: name.value, price: price.value })
    console.log(res, 'insert into');
    text.value = res
}


//update value
const id = ref()
const update = async () => {
    const { res } = await axios.put('http://localhost:3000/update', { name: name.value, price: price.value, id: id.value })
    console.log(res);
    text.value = res
}

//select values
const table = ref()
const select = async () => {
    const  res  = await axios.get('http://localhost:3000/select', {params:{ table: table.value}})
    console.log(res);
    text.value = res.data

}

</script>
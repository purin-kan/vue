<template>
    <div class="container-fluid">
        <div>
            <h2 class='mt-3'>Image Generation</h2>
            <input type="text" v-model="prompt" class="form-control mt-3" placeholder="Enter image description" />
            <button type="submit" @click="createImg()" class="btn btn-primary mt-3 mb-3">Submit</button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const prompt = ref('')

const handleChange = (e) => {
    prompt.value = e.target.value;
}

const setImage = (url) => {
    console.log(url);
}

const createImg = async () => {
    const response = await axios.post("http://localhost:8080/create", { prompt: prompt.value })
    setImage(response.data)
}

</script>
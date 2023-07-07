<template>
    <div>
        <h2>Image Generation with Neural.love</h2>
        <input type="text" class="form-control" placeholder="prompt" v-model="prompt">
        <input type="text" class="form-control mt-2" placeholder="amount (default is 1)" v-model="amount">
        <button class="btn btn-primary mt-3" @click="generateArt()">Generate Image!</button> <br>
        <h6 class="mt-3" v-if="checkingArtStatus">
            waiting. . . elapsed time: {{ elapsed / 1000 }} seconds
        </h6>
        <div v-for="image in results">
            <img class="img-fluid mt-3" :src=image.full>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue'

const prompt = ref('')
const amount = ref()
const checkingArtStatus = ref(false)
const generateArt = async () => {

    if (!amount.value) {
        console.log(Number(amount.value));
        amount.value = 1
    }
    console.log(Number(amount.value));

    try {
        const headers = {
            Authorization: `Bearer ${import.meta.env.VITE_NEURAL_LOVE_KEY}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        const data = {
            prompt: prompt.value,
            style: 'painting',
            layout: 'square',
            amount: Number(amount.value),
            isHd: false,
            isPublic: true
        };

        const response = await axios.post('https://api.neural.love/v1/ai-art/generate', data, { headers });

        checkingArtStatus.value = true

        checkArtStatus(response.data.orderId)
        timer()

    } catch (error) {
        console.error(error);
        // Handle the error
    }
};

let elapsed = ref(0)
let timerRunning = false
const timer = () => {
    elapsed = ref(0)
    const elapsedInterval = 1000; // Update interval in milliseconds

    const updateElapsedTime = () => {
        elapsed.value += elapsedInterval;
    };

    // Start updating elapsed time
    if (!timerRunning) {
        setInterval(updateElapsedTime, elapsedInterval);
        timerRunning = true
    }
}



const checkArtStatus = async (orderId) => {

    const headers = {
        Authorization: `Bearer ${import.meta.env.VITE_NEURAL_LOVE_KEY}`,
        'Accept': 'application/json'
    };

    let isReady = false;
    let interval = 0; // Initial interval (in milliseconds)

    while (!isReady) {
        try {
            const response = await axios.get(`https://api.neural.love/v1/ai-art/orders/${orderId}`, { headers });
            isReady = response.data.status.isReady;
            if (isReady) break;


            await new Promise((resolve) => setTimeout(resolve, interval));
            interval += 15 * 1000;

            // console.log('waiting for:', interval / 1000);

        } catch (error) {
            console.error(error);
            break;
        }
    }
    retriveArt(orderId)
};

const results = ref([])
const retriveArt = async (orderId) => {
    try {
        const headers = {
            Authorization: `Bearer ${import.meta.env.VITE_NEURAL_LOVE_KEY}`,
            'Accept': 'application/json'
        }
        const response = await axios.get(`https://api.neural.love/v1/ai-art/orders/${orderId}`, { headers })
        checkingArtStatus.value = false
        results.value = response.data.output
    } catch (error) {
        console.log(error);
    }
}



</script>
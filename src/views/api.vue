<template>
    <div style="text-align: center;">
        <h2>Movie API (axios)</h2>
    </div>
    <RouterLink class="text-decoration-none" :to="`/moviedetail/${movie.id}`" v-for="movie in movies">
        <div class="card mb-3" style="padding: 3%;">
            <div class="row">
                <div class="col-2">
                    <img class="img-fluid rounded" :src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path">
                </div>
                <div class="col-10">
                    <h2>{{ movie.title }}</h2>
                    <p>{{ movie.overview }}</p> <br>
                    <p>วันที่เข้าฉาย {{ movie.release_date }}</p>
                </div>
            </div>
        </div>
    </RouterLink>
    <div class="d-grid gap-2 mt-5">
        <button type="button" class="btn btn-success" @click="fetch()">Load more</button>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios';

onMounted(() => {
    fetch()
})

const movieData = ref(null)
const movies = ref([])

let page = 1
const fetch = () => {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=7c13e8a9302bd189c9017bb61e799251&page=${page}`
    const response = axios.get(url).then((response) => {
        movieData.value = response.data
        movies.value = movies.value.concat(response.data.results)
    })
    page++
}
        
</script>
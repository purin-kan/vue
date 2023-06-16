<template>
    <div>
        <!-- api page -->
        <div v-if="webpage === 1">
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
        </div>
        <!-- api with search page -->
        <div v-if="webpage === 2">
            <div>
                <input type="text" class="form-control mt-3" placeholder="Search movie name..." v-model="searchTerm">
                <button class="btn btn-primary mt-3" @click="searchMovie()">Search movies</button>
            </div>
            <div class="row">
                <div class="col-3 mb-3" v-for="movie in movies">
                    <RouterLink class="text-decoration-none" :to="`/moviedetail/${movie.id}`">
                        <div class="card mt-3" style="width: 18rem;">
                            <img :src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path"
                                class="card-img-top img-fluid">
                            <div class="card-body">
                                <p class="card-text">
                                <h2 style="text-align: center;">{{ movie.title }}</h2>
                                <p>{{ movie.overview }}</p>
                                <p style="text-align: center;">วันที่ฉาย: {{ movie.release_date }}</p>
                                </p>
                            </div>
                        </div>
                    </RouterLink>
                </div>
            </div>
        </div>
        <div class="d-grid gap-2 mt-5">
            <button type="button" class="btn btn-success" @click="fetch()">Load more</button>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, defineProps } from 'vue'
import axios from 'axios';
onMounted(() => {
    fetch()
})
const movieData = ref(null)
const movies = ref([])
let page = 1
const fetch = () => {
    if (!SearchPressed) {
        const url = `https://api.themoviedb.org/3/movie/popular?api_key=7c13e8a9302bd189c9017bb61e799251&page=${page}`
        axios.get(url)
            .then((response) => {
                movieData.value = response.data
                movies.value = movies.value.concat(response.data.results)
            })
        page++
    } else(search())
}
// Async/Await Example
/*
const fetch = async () => {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=7c13e8a9302bd189c9017bb61e799251&page=${page}`
    const response = await axios.get(url)
    console.log('check response', response)
    const firstMovieId = response.data.results[0].id
    const urlFirstMovie = `https://api.themoviedb.org/3/movie/${firstMovieId}?api_key=7c13e8a9302bd189c9017bb61e799251`
    const response02 = await axios.get(urlFirstMovie)
    console.log('check response02', response02)
}
*/
const webpage = ref(props.page)
const props = defineProps({
    page: Number
})
const search = () => {
    const url = `https://api.themoviedb.org/3/search/movie?query=${searchTerm.value}&api_key=7c13e8a9302bd189c9017bb61e799251&page=${page}`
    axios.get(url)
        .then((response) => {
            movieData.value = response.data
            movies.value = movies.value.concat(response.data.results)
        })
    page++
    SearchPressed = true
}
let SearchPressed = false
const searchTerm = ref()
const searchMovie = () => {
    if (!!searchTerm.value) {
        movies.value = []
        page = 1
        search()
    }
}
</script>
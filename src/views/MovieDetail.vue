<template>
    <div style="text-align: center;">
        <h2 class="mt-4">Movie Detail ID: {{ id }}</h2>
    </div>
    <div class="row">
        <div class="col-3">
            <img class="img-fluid rounded mt-4" :src="'https://image.tmdb.org/t/p/w500' + movies.poster_path">
        </div>
        <div class="col-9">
            <h1 class="mt-3">{{ movies.title }}</h1>
            <span v-for="(genre, index) in movies.genres">{{ genre.name }} <space v-if="index < movies.genres.length - 1"> , </space> </span> <br> <br>
            <h3>Overview</h3>
            <p>{{ movies.overview }}</p>
            <a :href="movies.homepage" target="_blank">
                <button class="btn btn-primary mt-2">Go to home page</button>
            </a>
        </div>
    </div>

    <div class="row">
        <div><h1 style="text-align: center;" class="mt-3">Movie Videos</h1></div>

        <div class="col-4 mt-3" v-for="(video, index) in movieVideos">
            <MovieVideos :id="video.key"/>
        </div>
    </div>
</template>


<script setup>
import { useRoute } from 'vue-router';
import { ref, onBeforeMount } from 'vue'
import axios from 'axios';
import MovieVideos from '../components/Exercise-06/MovieVideos.vue';
const route = useRoute();

const id = route.params.id

onBeforeMount(() => {
    fetch()
    fetchVideos()
})

const movies = ref(null)

const fetch = async () => {
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=7c13e8a9302bd189c9017bb61e799251`
    const response = await axios.get(url).then((response) => {
        movies.value = response.data
    })
}

const movieVideos = ref(null)

const fetchVideos = () => {
    const url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=7c13e8a9302bd189c9017bb61e799251`
    const response = axios.get(url).then((response) => {
        movieVideos.value = response.data.results
    })
}

</script>
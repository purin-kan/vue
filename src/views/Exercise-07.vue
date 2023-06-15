<template>
    <div style="text-align: center;">
        <h2 class="mt-4">Movie API + Search (axios)</h2>
    </div>
    
    <div>
        <FetchMovies :page="2"/>
    </div>
</template>


<script setup>
import FetchMovies from '@/components/FetchMovies.vue'
</script>
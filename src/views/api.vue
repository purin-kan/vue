<template>
    <div style="text-align: center;">
        <h2>Movie API (axios)</h2>
    </div>

    <FetchMovies :page="1"/>

</template>

<script setup>
    import FetchMovies from '@/components/FetchMovies.vue'
</script>

<template>
    <div>
        <h2 class="mt-2" style="text-align:center;">Products (components & array data)</h2>
    </div>

    <div class="row">
        <div class="col-3" v-for="(n, index) in arr">
            <cardarray :info="n" :num="index"/>
        </div>
        
    </div>

    <div style="text-align: center;">
        <button class="btn btn-primary mb-4 mt-5" @click="clicked()">Add Item</button>
    </div>

    {{ arr }}

</template>
<script setup>
import { reactive } from 'vue'
import cardarray from '@/components/Exercise-05/cardarray.vue'

const arr = reactive([{name:''}, {name:''}, {name:''}]) 

const clicked = () => {arr.push({name:''})}


</script>
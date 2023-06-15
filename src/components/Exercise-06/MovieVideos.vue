<template>
    <div style="text-align: center;"  class="player">
        <VueYtframe :video-id="id" :player-vars="{ autoplay: 0, listType: 'user_uploads' }"/>
    </div>
</template>

<style scoped>
  .player {
    height: 220px;
    width: 100%;
  }

  @media (max-width: 767.98px) {
    .player {
      height: 80px;
      width: 100%;
    }
  }
</style>


<script setup>
import { ref, defineProps } from 'vue'

const id = ref(props.id)

const props = defineProps({
    id: String
})

</script>
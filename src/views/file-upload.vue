<template>
    <div>
        <div class="mb-3">
            <label for="formFile" class="form-label">Upload file to server</label>
            <input class="form-control" type="file" id="formFile" ref="fileInput">
            <button @click="uploadFile()" class="btn btn-primary mt-2">Upload</button>
        </div>
        <div>
            //show files here
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import axios from 'axios'

const fileInput = ref(null)

const uploadFile = async () => {
    const file = fileInput.value.files[0]

    console.table(file)

    if (file) {
        try {
            const formData = new FormData()
            formData.append('file', file)

            console.log(formData);

            const response = await axios.post('http://localhost:3002/upload', formData);
            console.log(response.data, 'file uploaded')
        } catch (error) {
            console.error('Error uploading:', error)
        }
    }
}

</script>
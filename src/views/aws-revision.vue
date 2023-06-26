<template>
    <div>
        <input type="file" @change="onFileChanged($event)" accept="image/*" capture />
    </div>
</template>


<script lang="ts">
import { defineComponent, ref } from "vue";
import axios from 'axios'

export default defineComponent({

    name: "FileUpload",

    setup() {
        const file = ref<File | null>();
        const form = ref<HTMLFormElement>();

        function onFileChanged($event: Event) {
            const target = $event.target as HTMLInputElement;
            if (target && target.files) {
                file.value = target.files[0];
                saveImage()
            }
        }

        async function saveImage() {
            if (file.value) {
                try {
                    const formData = new FormData()
                    formData.append('file', file.value)

                    console.log(formData);

                    const response = await axios.post('http://localhost:3002/upload', formData);
                    console.log(response.data, 'file uploaded')
                } catch (error) {
                    console.error(error);
                    form.value?.reset();
                    file.value = null;
                } finally {
                    console.log('finally')
                }
            }
        };

        return {
            saveImage,
            onFileChanged,
        }
    }
});

</script>

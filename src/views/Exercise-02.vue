<template>
    <div>
        <h2 style="text-align:center;">Regsiter Form (v-model)</h2>
    </div>

    <div class="row justify-content-center">
        <div class="col-6 mt-3">
            <div class="card" style="padding: 25px;">

                <div class="mb-3">
                    <label for="firstname" class="form-label">ชื่อ</label>
                    <input ref="firstnameInput" type="text" class="form-control" id="firstname" v-model="firstname">
                </div>
                <div class="mb-3">
                    <label for="phonenum" class="form-label">เบอร์โทร</label>
                    <input type="text" class="form-control" id="phonenum" v-model="phonenum">
                </div>
                <div class="mb-3">
                    <label for="address" class="form-label">ที่อยู่</label>
                    <div class="form-floating">
                        <textarea type="text" class="form-control" id="address" style="height: 100px" v-model="address"></textarea>
                    </div>
                </div>
                <label class="form-label">เพศ</label>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="sex" id="m-gender" value="ชาย" v-model="gender">
                    <label class="form-check-label" for="m-gender">ชาย</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="sex" id="f-gender" value="หญิง" v-model="gender">
                    <label class="form-check-label" for="f-gender">หญิง</label>
                </div>
                <div>
                    <label for="education" class="form-label mt-3">ระดับการศึกษา</label>
                    <select class="form-select" v-model="education">
                        <option selected value="">เลือกระดับการศึกษา</option>
                        <option value="ประถมศึกษา">ประถมศึกษา</option>
                        <option value="มัธยมศึกษา">มัธยมศึกษา</option>
                        <option value="ปริญญาตรี">ปริญญาตรี</option>
                        <option value="ปริญญาโท">ปริญญาโท</option>
                        <option value="ปริญญาเอก">ปริญญาเอก</option>
                    </select>
                </div>
                <div class="mb-3 form-check mt-3">
                    <input type="checkbox" class="form-check-input" id="check" v-model="agree">
                    <label class="form-check-label" for="check">ต้องการรับข้อมูลข่าวสารเพิ่มเติมในอนาคต(ไม่บังคับ)</label>
                </div>
                <div class="d-grid gap-2">
                    <button type="submit" class="btn btn-primary" @click="submit()">Submit</button>
                </div>

            </div>
        </div>
        <div class="col-6 mt-3">
            <div v-if="isComplete">
                <div class="card p-4">
                    <div>
                        ชื่อ: {{ firstname }} <br>
                        เบอร์โทร: {{ phonenum }} <br>
                        ที่อยู่: {{ address }} <br>
                        เพศ: {{ gender }} <br>
                        ระดับการศึกษา: {{ education }} <br>
                        ต้องการรับข้อมูลข่าวสารเพิ่มเติมในอนาคต: {{ (!agree) ? 'ไม่' : 'ใช่' }}

                        <span v-if="!agree">ไม่</span><span v-else>ใช่</span> <br>

                        <div class="d-grid gap-2 mt-4">
                            <button type="button" class="btn btn-outline-danger" @click="clear()">Clear Data</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const isComplete = ref(false)
const firstname = ref('')
const phonenum = ref('')
const address = ref('')
const gender = ref('')
const education = ref('')
const agree = ref(false)

const firstnameInput = ref(null)

const submit = () => {
    if (formValidation()) {
        isComplete.value = true
    }
    else {
        alert('Please fill the form completely.')
        console.log('Please fill the form completely.')
    }
}

const formValidation = () => {
    if (!firstname.value) {
        firstnameInput.value.focus()
        return false
    }
    if (!phonenum.value) {
        return false
    }
    if (!address.value) {
        return false
    }
    if (!gender.value) {
        return false
    }
    if (!education.value) {
        return false
    }

    return true
}

const clear = () => {
    isComplete.value = false
    firstname.value = ''
    phonenum.value = ''
    address.value = ''
    gender.value = ''
    education.value = ''
    agree.value = null
}


</script>
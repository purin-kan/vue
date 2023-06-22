<template>
    <div>
        <h2 style="text-align: center;">MongoDB</h2>
    </div>
    <div>
        <div v-for="i in items">
            <input type="text" class="form-control mt-3 mb-3" placeholder="key:value" v-model="i.key"
                v-if="removing == false && finding == false && editing == false">
            <!-- <input type="text" class="form-control mt-3" placeholder="description" v-model="description">
                <input type="text" class="form-control mt-3 mb-3" placeholder="product category" v-model="category"> -->
        </div>

        <input type="text" class="form-control mt-3 mb-3"
            placeholder="condition key: value  **if blank, remove first document" v-model="deleteCondition"
            v-if="removing == true">
        <input type="text" class="form-control mt-3 mb-3" placeholder="condition key: value " v-model="findCondition"
            v-if="finding == true">

        <button type="button" class="btn btn-primary me-3" v-if="editing == false && removing == false && finding == false"
            @click="add()"> + </button>
        <button type="button" class="btn btn-primary me-3" v-if="editing == false && removing == false && finding == false"
            @click="minus()"> - </button>

        <button type="button" class="btn btn-info me-3" v-if="editing == false && removing == false && finding == false"
            @click="insert()">Add</button>
        <button type="button" class="btn btn-info me-3" v-if="editing == false && removing == false && finding == false"
            @click="find()">Find</button>
        <button type="button" class="btn btn-danger me-3" @click="remove()"
            v-if="editing == false && finding == false">Remove</button>

        <button type="button" class="btn btn-success me-3" v-if="editing == true" @click="sendEdit()">Save</button>
        <button type="button" class="btn btn-success me-3" v-if="finding == true" @click="doneFind()">Done</button>
    </div>
    <div>
        <!-- {{ data }} -->
        <div class="row">
            <div class="col-4" v-for="(i, index) in data">
                <div class="card mt-3" style="padding: 4%;" v-if="func(i)">
                    <div v-for="j in count(i)" v-if="editing == true && i.is_edit">
                        <input type="text" class="form-control mb-2" v-if="j < count(i)" :value="arrayObject[j][1]"
                            @input="saveEdit($event, arrayObject[j][0], i, index)">
                    </div>
                    <span>{{ i }}</span>

                    <button type="button" class="btn btn-outline-secondary me-3 mt-2" @click="edit(index)">Edit</button>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
import { ref, reactive } from 'vue'
import axios from 'axios'

const editing = ref(false)
const removing = ref(false)
const finding = ref(false)


const items = reactive([{ key: '' }])
const add = () => {
    items.push({ key: '' })
}
const minus = () => {
    items.pop()
}

const data = ref()
const fetch = async () => {
    let response = await axios.get('http://localhost:3001/fetchshop')
    data.value = response.data
}

fetch()

const insert = async () => {

    let insert = {}
    for (let index = 0; index < items.length; index++) {
        // console.log(items[index]); 
        let key = items[index].key.split(':')[0]
        let value = items[index].key.split(':')[1]
        insert[`${key}`] = value

    }
    console.log(insert);

    let { res } = await axios.post('http://localhost:3001/insertshop', { insert })
    console.log(res, 'insert into');

    fetch()
}

const findCondition = ref('');
let intervalId = null;
let doneFinding = true;
const find = async () => {
    finding.value = true;
    doneFinding = false;
    let findparam = {}
    clearInterval(intervalId); // Clear any existing interval before starting a new one
    intervalId = setInterval(async () => {
        if (doneFinding) {
            clearInterval(intervalId);
            return;
        }
        findparam = {}
        findparam[findCondition.value.split(':')[0]] = findCondition.value.split(':')[1]
        console.log('Finding...', findparam);
        const response = await axios.get('http://localhost:3001/findshop', { params: findparam })
        data.value = response.data;
        console.log(data.value);
    }, 2000);
};

const doneFind = () => {
    finding.value = false;
    doneFinding = true;
    clearInterval(intervalId); // Clear the interval when doneFinding is true

    fetch()
};

//functions for editing
const func = (i) => {
    // console.log(i);
    if (Object.keys(i).length > 1) return true
    else return false
}

let arrayObject = []
let editValue = reactive([])
const count = (i) => {
    arrayObject = Object.entries(i);


    return Object.keys(i).length - 1
}

const edit = (i) => {
    editing.value = true
    // console.log(data.value)
    data.value[i].is_edit = true
}

const saveEdit = (e, key, i, index) => {
    if (!!editValue) {
        editValue = data.value
    }
    if (editValue) {
        // editValue[index]
        console.log(editValue[index]);
        Object.keys(editValue[index]).forEach(k => {
            if (k == key) {
                editValue[index][k] = e.target.value
            }   
        }
        )
    }
    console.log(editValue);
}

const sendEdit = async () => {
    for (let index = 0; index < editValue.length; index++) {
        delete editValue[index].is_edit 
    }
    const res = await axios.put('http://localhost:3001/updateshop', { editValue })
    console.log('updated successfully');
    
    editing.value = false
    fetch()
    console.log(data.value);
}



let removeFirstPressed = true
let deleteCondition = ''
const remove = async () => {
    let del = {}
    if (removeFirstPressed) {
        removeFirstPressed = false
        removing.value = true
    } else {
        if (!!deleteCondition) {
            del = {}
            del[deleteCondition.split(':')[0]] = deleteCondition.split(':')[1]
        }
        console.log(del);
        const res = await axios.delete('http://localhost:3001/deleteshop', { params: del })
        console.log('deleted successfully');
        del = {}
        removeFirstPressed = true
        removing.value = false
        deleteCondition = ''
    }
    fetch()
}

</script>
<template>
  <h1>Authentication</h1>
  <button class="btn btn-info" @click="login()">sign-in</button> <br>
  <button class="btn btn-info mt-3" @click="logout()">sign-out</button> <br>
  <button class="btn btn-success mt-3" @click="add_item()">add item (firestore)</button> <br>
  <button class="btn btn-success mt-3" @click="read_item()">read data (firestore)</button> <br>
  <button class="btn btn-danger mt-3" @click="delete_item()">delete item (firestore)</button> <br>
  <button class="btn btn-danger mt-3" @click="delete_field()">delete field (firestore)</button> <br>
  <button class="btn btn-info mt-3" @click="list_items()">list items (storage)</button> <br>
  <button class="btn btn-primary mt-3" @click="getCloudMessaging()"> request permission (cloud message)</button> <br>
  <div class="mb-3 mt-3">
    <label for="formFile" class="form-label">Upload file to firebase storage</label>
    <input class="form-control" type="file" id="formFile" ref="file" @change="handleFileInputChange">
    <button @click="uploadFile()" class="btn btn-primary mt-2">Upload</button>
  </div>
  <div>
    items:
    <li v-for="item in items" :key="item.name">
      {{ item.name }} <button class="btn btn-outline-danger" @click="del(item.name)">delete</button>
    </li>
  </div>
  <div v-if="showNotification">
    <p class="mt-5">Notification:</p>
    <div class="card" style="padding: 3%;">
      <h3>{{ notificationOptions.title }}</h3>
      {{ notificationOptions.body }} <br>
      <img class="mt-4 img-fuild" :src="notificationOptions.image">
    </div>
  </div>
</template>

<script setup>
import { ref as vueRef, onMounted } from 'vue'
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

onMounted(() => {
  //use to initilize
})
  


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBx7AJ08X-WM3Vg8psArxR6Lpu1H8d6C6Y",
  authDomain: "beneat-intern.firebaseapp.com",
  projectId: "beneat-intern",
  storageBucket: "beneat-intern.appspot.com",
  messagingSenderId: "41116895687",
  appId: "1:41116895687:web:e0852bbf9f7b0c3b7f31e2",
  measurementId: "G-MM04HJGRN6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

////////////////////////////////////////////////////////////////
const provider = new GoogleAuthProvider();

import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
// import { useRouter } from "vue-router";
// const router = useRouter();

const auth = getAuth(app);
const login = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      console.log('sign in token: ', + token);
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      console.log('sign in user: ', + user);
      // ...
      console.log(result)
      console.log('logged in')
      // router.push('/about') //go to other page after sucessfull login
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      console.log(errorCode);
      const errorMessage = error.message;
      console.log(errorMessage);
      // The email of the user's account used.
      const email = error.customData.email;
      console.log(email);
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(credential);
      // ...
    });
}

const logout = () => {
  const auth = getAuth();
  signOut(auth).then(() => {
    console.log('logged out')
    // Sign-out successful.
  }).catch((error) => {
    console.log(error)
    // An error happened.
  });
}

////////////////////////////////////////////////////////////////

import { getFirestore } from "firebase/firestore";
import { doc, setDoc, getDoc, deleteDoc, deleteField, updateDoc } from "firebase/firestore";


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const add_item = async () => {
  console.log('adding item')
  // Add a new document in collection "cities"
  await setDoc(doc(db, "cities", "LA"), {
    name: "Los Angeles",
    state: "CA",
    country: "USA"
  });
}

//read from "database", "collection"
const docRef = doc(db, "cities", "LA");
const read_item = async () => {
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
}

const delete_item = async () => {
  console.log('deleting item')
  await deleteDoc(doc(db, "cities", "LA"));
}


const cityRef = doc(db, 'cities', 'LA');

const delete_field = async () => {
  // Remove the 'capital' field from the document
  await updateDoc(cityRef, {
    //field to be deleted
    country: deleteField()
  });
}

////////////////////////////////////////////////////////////////
import { getStorage, ref as firebaseRef, uploadBytes, getDownloadURL, listAll, deleteObject } from "firebase/storage";

const file = vueRef()

function handleFileInputChange(event) {
  // file.value = event.target.files[0];
  // console.log(file.value)
}

const uploadFile = async () => {
  const selectedfile = file.value.files[0];
  if (!selectedfile) {
    console.error("No file selected.");
    return;
  }

  const storage = getStorage();
  const storageRef = firebaseRef(storage, "uploads/" + selectedfile.name);

  try {
    //upload file
    const snapshot = await uploadBytes(storageRef, selectedfile);
    console.log("File uploaded successfully.", snapshot);

    // Get the download URL
    const downloadURL = await getDownloadURL(snapshot.ref);
    console.log("Download URL:", downloadURL);
    // window.open(downloadURL)
    // automatically open the download URL in a new tab when upload is successful

    list_items()
  } catch (error) {
    console.error("Error uploading file:", error);
    // Handle the upload error
  }
}


const items = vueRef([])
const list_items = () => {
  items.value = []
  //list
  const storage = getStorage();
  const listRef = firebaseRef(storage, 'uploads');

  // Find all the prefixes and items.
  listAll(listRef)
    .then((res) => {
      res.prefixes.forEach((folderRef) => {
        listAll(folderRef)
        // console.log('folerRef (not pushed to array): ', folderRef)
      });
      res.items.forEach((itemRef) => {
        // console.log('itemRef: ', itemRef)
        items.value.push(itemRef)
      });
    }).catch((error) => {
      console.log(error)
    });
}

const del = (deleteitem) => {
  console.log(deleteitem);
  // Create a reference to the file to delete
  const storage = getStorage();
  const desertRef = firebaseRef(storage, 'uploads/' + deleteitem);

  // Delete the file
  deleteObject(desertRef).then(() => {
    // File deleted successfully
  }).catch((error) => {
    console.log(error)
  });
  list_items()
}

///////////////////////////////////////////////////////////

import { getMessaging, onMessage, getToken } from "firebase/messaging";
import 'firebase/messaging';

let messaging = null
let notificationOptions = vueRef({})
let showNotification = vueRef(false)

const getCloudMessaging = () => {
  messaging = getMessaging(app)
  requestPermission()

  onMessage(messaging, (payload) => {
    console.log('[firebase-foreground] Received foreground message ', payload)

    //this receives data from the notification received
    //does not receive data from the source of the notification
    notificationOptions.value = vueRef({})

    if ('title' in payload.notification) {
      notificationOptions.value['title'] = payload.notification.title
    }
    if ('body' in payload.notification) {
      notificationOptions.value['body'] = payload.notification.body
    }
    if ('icon' in payload.notification) {
      notificationOptions.value['icon'] = payload.notification.icon
    }
    if ('image' in payload.notification) {
      notificationOptions.value['image'] = payload.notification.image
    }
    console.log('notificationOptions', notificationOptions)
    showNotification.value = true

  })
}


const requestPermission = () => {
  console.log('Requesting permission...');
  Notification.requestPermission()
    .then((permission) => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');
        getUserToken(); // Call getToken() after permission is granted
      } else {
        console.log('Notification permission denied.');
      }
    })
    .catch((error) => {
      console.error('Error requesting permission:', error);
    });
};

const getUserToken = () => {
  getToken(messaging, { vapidKey: 'BMb48g5MkfL0R5iiS9hUBZDS6LG5_baxXsAb_zIMoO4HMfofgI9kUuuaNbTwhnXU5smIvdonSjezJR4lgTL6f7U' })
    .then((currentToken) => {
      if (currentToken) {
        console.log('Got token:', currentToken);
        // Send the token to your server and handle it as needed
      } else {
        console.log('No registration token available.');
      }
    })
    .catch((error) => {
      console.error('Error getting token:', error);
    });
};



</script>
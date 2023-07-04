self.importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js')
self.importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js')
/*
Initialize the Firebase app in the service worker by passing in the messagingSenderId.
*/
self.firebase.initializeApp({
  apiKey: "AIzaSyBx7AJ08X-WM3Vg8psArxR6Lpu1H8d6C6Y",
  authDomain: "beneat-intern.firebaseapp.com",
  projectId: "beneat-intern",
  storageBucket: "beneat-intern.appspot.com",
  messagingSenderId: "41116895687",
  appId: "1:41116895687:web:e0852bbf9f7b0c3b7f31e2",
  measurementId: "G-MM04HJGRN6"
})

//click handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close()

  console.log('notificationclick', event.notification?.data)

  const pathname = event.notification?.data?.FCM_MSG?.notification?.data?.link
  if (!pathname) return
  const url = new URL(pathname, self.location.origin).href

  event.waitUntil(
    self.clients
      .matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientsArr) => {
        const hadWindowToFocus = clientsArr.some((windowClient) =>
          windowClient.url === url ? (windowClient.focus(), true) : false
        )

        if (!hadWindowToFocus) {
          self.clients
            .openWindow(url)
            .then((windowClient) =>
              windowClient ? windowClient.focus() : null
            )
        }
      })
  )
})

// Retrieve an instance of Firebase Messaging so that it can handle background messages.
const messaging = self.firebase.messaging()
messaging.onBackgroundMessage(function (payload) {
  console.log('Message onBackgroundMessage received.', payload)
  const title = payload.notification.title
  const options = {
    body: payload.notification.body,
  }
})

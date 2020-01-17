import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import * as firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyDcEqFaxz969Ve5inMbfRI7qodcZPD6hVo',
  authDomain: 'form-79a24.firebaseapp.com',
  databaseURL: 'https://form-79a24.firebaseio.com',
  projectId: 'form-79a24',
  storageBucket: 'form-79a24.appspot.com',
  messagingSenderId: '201666686554',
  appId: '1:201666686554:web:2f1a246b66c4e9104ab263',
  measurementId: 'G-PHD843ZHNF'
}

firebase.initializeApp(firebaseConfig)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

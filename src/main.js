import Vue from 'vue'
import App from './App.vue'

import { firestorePlugin } from 'vuefire'          
import firebase from 'firebase'     
import 'firebase/firestore'
import VueDateFns from "vue-date-fns";

require('@/sass/style.scss');

Vue.use(VueDateFns);
Vue.use(firestorePlugin)
firebase.initializeApp({              
  apiKey: "AIzaSyBImKW9SL19yUaGHfadKcvSISs0z6BxI8k",
  authDomain: "memoemo-1c4f3.firebaseapp.com",
  projectId: "memoemo-1c4f3",
  storageBucket: "memoemo-1c4f3.appspot.com",
  messagingSenderId: "1058511344589",
  appId: "1:1058511344589:web:615a8ebe630af7942dea84"
})
export const db = firebase.firestore()
export const auth = firebase.auth()

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

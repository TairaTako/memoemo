<template>
  <div class="container">
    <div v-if="currentUser">
      <div class="user">
        <div class="user__image">
          <img :src="currentUser.photoURL">
        </div>
        <p class="user__name">{{ currentUser.displayName }}</p>
        <button v-on:click="signOut" class="button button--red button--small">サインアウト</button>
      </div>
    </div>

    <div v-else class="user">
      <button v-on:click="signIn" class="button button--small">サインイン</button>
    </div>
  </div>
</template>

<script>
import firebase from "firebase"
import { auth } from "@/main"
import { db } from '@/main'

export default {
  data() {
    return {
      currentUser: "",
    }
  },
  methods: {
    signIn() {
      const provider = new firebase.auth.GoogleAuthProvider()
      auth.signInWithRedirect(provider).then((result) => {
        db.collection('users').doc(result.user.uid).set({
          displayName: result.user.displayName,
          photoURL: result.user.photoURL
        })
      })
    },
    signOut() {
      auth.signOut()
    },
  },
  created() {
    auth.onAuthStateChanged((user) => {
      this.currentUser = user
    })
  },
}
</script>
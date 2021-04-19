<template>
  <div class="container">
    <div v-if="currentUser">
      <div class="user">
        <p class="user__name">{{ currentUser.displayName }}</p>
        <button @click="signOut" class="button button--red">サインアウト</button>
      </div>
    </div>

    <div v-else class="user">
      <button @click="signIn" class="button">サインイン</button>
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
      auth.signInWithPopup(provider).then((result) => {
        db.collection('users').doc(result.user.uid).set({
          displayName: result.user.displayName
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

<style lang="scss">
.user {
  display: flex;
  align-items: center;
  justify-content: flex-end;

  &__name {
    margin-right: 16px;
  }
}
</style>
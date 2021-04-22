<template>
  <div>
    <div class="chat">
      <div class="chat__header">
        <h3 class="chat__content">{{ post.content }}</h3>
        <div v-if="currentUser">
          <button class="button button--red button--remove" v-on:click="remove(post.id)" v-if="post.uid == currentUser.uid">×</button>
        </div>
      </div>
      <ul class="chat__body">
        <li class="chat__text" v-on:click="incrementA(post.id, currentUser.uid)">
          <span>{{ post.textA }}</span>
          <span class="chat__point">{{ post.pointA }}</span>
        </li>
        <li class="chat__text" v-on:click="incrementB(post.id, currentUser.uid)">
          <span>{{ post.textB }}</span>
          <span class="chat__point">{{ post.pointB }}</span>
        </li>
      </ul>
      <Chart :post="post" />
      <div class="chat__footer">
        <div class="chat__userInfo">
          <div class="user__image chat__image">
            <img :src="user.photoURL">
          </div>
          <span class="chat__name">{{ user.displayName }}</span>
        </div>
        <span class="chat__time chat__time--day">{{ post.day }}</span>
        <span class="chat__time">{{ post.time }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase"
import { db } from '@/main'
import Chart from '@/components/Chart'

export default {
  props: ['post','currentUser'],
  components: {
    Chart
  },
  methods: {
    remove: function(id) {
      db.collection('posts').doc(id).delete()
    },
    incrementA: function(id, uid) {
      if (this.boolean == false) {
        const increment = firebase.firestore.FieldValue.increment(1)
        const add = firebase.firestore.FieldValue.arrayUnion(uid)
        db.collection('posts').doc(id).update({
          pointA: increment,
          incrementedUser: add
        })
      }
    },
    incrementB: function(id, uid) {
      if (this.boolean == false) {
        const increment = firebase.firestore.FieldValue.increment(1)
        const add = firebase.firestore.FieldValue.arrayUnion(uid)
        db.collection('posts').doc(id).update({
          pointB: increment,
          incrementedUser: add
        })
      }
    }
  },
  computed: {
    boolean: function() {
      return this.$props.post.incrementedUser.includes(this.$props.currentUser.uid)
    }
  },
  data() {
    return {
      day: "",
      time: "",
      user: {},
    }
  },
  firestore() {
    return {
      user: db.collection('users').doc(this.$props.post.uid)
    }
  }
}
</script>
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
        <li class="chat__text" v-if="currentUser" v-on:click="incrementA(post.id, currentUser.uid, currentUser.photoURL)" :class="{'is-active': isActiveA, 'is-cursor': isActiveA || isActiveB}">
          <span class="chat__select">{{ post.textA }}</span>
          <!-- <span class="chat__point">{{ post.pointA }}</span> -->
        </li>
        <li class="chat__text is-disabled is-cursor" v-if="!currentUser">
          <span class="chat__select">{{ post.textA }}</span>
          <!-- <span class="chat__point">{{ post.pointA }}</span> -->
        </li>
        <li class="chat__text" v-if="currentUser" v-on:click="incrementB(post.id, currentUser.uid)" :class="{'is-active' : isActiveB, 'is-cursor': isActiveA || isActiveB}">
          <span class="chat__select">{{ post.textB }}</span>
          <!-- <span class="chat__point">{{ post.pointB }}</span> -->
        </li>
        <li class="chat__text is-disabled is-cursor" v-if="!currentUser">
          <span class="chat__select">{{ post.textB }}</span>
        </li>
        <!-- <div v-for="url in post.incrementedUserAPhoto" :key="url">
          <img :src="url" alt="">
        </div> -->
      </ul>
      <div v-if="loading">
        <div class="pc">
          <Chart :post="post" />
        </div>
        <div class="sp">
          <ChartSmall :post="post" :styles="{height: '250px', position: 'relative'}" />
        </div>
      </div>
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
import ChartSmall from '@/components/ChartSmall'

export default {
  props: ['post','currentUser'],
  components: {
    Chart,
    ChartSmall
  },
  methods: {
    remove: function(id) {
      db.collection('posts').doc(id).delete()
    },
    incrementA: function(id, uid, photoURL) {
      if (this.boolean == false) {
        const increment = firebase.firestore.FieldValue.increment(1)
        const add = firebase.firestore.FieldValue.arrayUnion(uid)
        const addPhoto = firebase.firestore.FieldValue.arrayUnion(photoURL)
        db.collection('posts').doc(id).update({
          pointA: increment,
          incrementedUser: add,
          incrementedUserA: add,
          incrementedUserAPhoto: addPhoto
        })
      }
    },
    incrementB: function(id, uid) {
      if (this.boolean == false) {
        const increment = firebase.firestore.FieldValue.increment(1)
        const add = firebase.firestore.FieldValue.arrayUnion(uid)
        db.collection('posts').doc(id).update({
          pointB: increment,
          incrementedUser: add,
          incrementedUserB: add
        })
      }
    },
    getImage: function(params) {
      return params
    }
  },
  watch: {
    post: function(){
      this.loading = false
      this.$nextTick(() => (this.loading = true))
    }
  },
  computed: {
    boolean: function() {
      return this.$props.post.incrementedUser.includes(this.$props.currentUser.uid)
    },
    isActiveA: function() {
      return this.$props.post.incrementedUserA.includes(this.$props.currentUser.uid)
    },
    isActiveB: function() {
      return this.$props.post.incrementedUserB.includes(this.$props.currentUser.uid)
    },
    smallStyle () {
      return {
        height: '100px',
        position: 'relative'
      }
    }
  },
  data() {
    return {
      day: "",
      time: "",
      user: {},
      loading: true
    }
  },
  firestore() {
    return {
      user: db.collection('users').doc(this.$props.post.uid),
    }
  }
}
</script>
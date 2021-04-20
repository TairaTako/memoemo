<template>
  <div>
    <div class="chat">
      <div class="chat__header">
        <h3 class="chat__content">{{ post.content }}</h3>
        <div v-if="currentUser">
          <button class="button button--red button--remove" v-on:click="remove(post.id)" v-if="post.uid == currentUser.uid">×</button>
        </div>
      </div>
      <ol class="chat__body" type="A">
        <li class="chat__text" v-on:click="incrementA(post.id, currentUser.uid)">
          <span>{{ post.textA }}</span>
          <span class="chat__point">{{ post.pointA }}</span>
        </li>
        <li class="chat__text" v-on:click="incrementB(post.id, currentUser.uid)">
          <span>{{ post.textB }}</span>
          <span class="chat__point">{{ post.pointB }}</span>
        </li>
      </ol>
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

export default {
  props: ['post','currentUser'],
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

<style lang="scss">
.chat {
  width: 100%;
  display: flex;
  flex-direction: column;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__time {
    display: inline-block;
    margin-right: 16px;
  }

  &__content {
    font-size: 24px;
    font-weight: bold;
  }

  &__body {
    margin: 16px 0;
    margin-left: 8px;
  }

  &__text {
    font-size: 24px;
    list-style-type: upper-alpha;
    list-style-position: inside;

    &:not(:last-child) {
      margin-bottom: 8px;
    }
  }

  &__point {
    margin-left: 8px;
    color: #668ad8;
  }

  &__footer {
    display: flex;
    align-items: center;
  }

  &__userInfo {
    display: flex;
    align-items: center;
    margin-right: auto;
  }

  &__image {
    margin-right: 8px;
  }
}
</style>
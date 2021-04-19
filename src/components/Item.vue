<template>
  <div>
    <span class="chat__time chat__time--day">{{ post.day }}</span>
    <span class="chat__time">{{ post.time }}</span>
    <span class="chat__content">{{ post.content }}</span>
    <span class="chat__name">{{ user.displayName }}</span>
    <button class="button button--remove" v-on:click="remove(post.id)">×</button>
  </div>
</template>

<script>
import { db } from '@/main'
export default {
  props: ['post'],
  methods: {
    remove: function(id) {
      db.collection('posts').doc(id).delete()
    }
  },
  data() {
    return {
      day: "",
      time: "",
      user: "",
      currentUser: ""
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
  &__time {
    display: inline-block;
    margin-right: 16px;
  }

  &__content {
    margin-left: 24px;
  }

  &__name {
    margin-left: auto;
    margin-right: 16px;
  }
}

.form {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 45px;
  margin-bottom: 16px;

  &__input {
    margin-right: 16px;
    border-radius: 3px;
    border: 2px solid black;
    height: 24px;
    font-size: 17px;
  }
}
</style>
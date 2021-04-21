<template>
  <div>
    <div class="intro">
      <h1 class="intro__title font--orelega">WhichPedia</h1>
      <p class="intro__text">さあ、どっち派か決めましょう</p>
    </div>
    <div class="form container">
      <div class="form__group">
        <input class="form__input" type="text" v-model="message" :disabled="this.currentUser == null">
        <div class="form__inner">
          <label for="" class="form__label">A</label>
          <input class="form__input form__input--half" type="text" v-model="textA" :disabled="this.currentUser == null">
          <label for="" class="form__label">B</label>
          <input class="form__input form__input--half" type="text" v-model="textB" :disabled="this.currentUser == null">
        </div>
      </div>
      <button class="button" v-on:click="submit" :disabled="this.currentUser == null">送信</button>
    </div>
    <transition-group name="list" tag="ul" class="chatList container">
      <Item v-for="post in posts" :key="post.id" :post="post" :currentUser="currentUser" class="chatList__item"/>
    </transition-group>
  </div>
</template>

<script>
import Item from '@/components/Item'
import { auth } from '@/main'
import { db } from '@/main'

export default {
  name: 'Top',
  components: {
    Item
  },
  data() {
    return {
      posts: [],
      message: "",
      textA: "",
      textB: "",
      currentUser: {}
    }
  },
  created() {
    auth.onAuthStateChanged((user) => {
      this.currentUser = user
    })
  },
  methods: {
    submit: function() {
      const date = new Date()
      if (this.message == "") {
        alert("入力してください")
      }
      else {
        db.collection('posts').add({
          uid: this.currentUser.uid,
          content: this.message,
          textA: this.textA,
          textB: this.textB,
          pointA: 0,
          pointB: 0,
          day: this.day = date.getMonth() + "/" + date.getDate(),
          time: this.time = date.getHours().toString().padStart(2, "0") + ":" + date.getMinutes().toString().padStart(2, "0") + ":" + date.getSeconds().toString().padStart(2, "0"),
          created: this.day + this.time,
          incrementedUser: []
        })
        this.message = ""
        this.textA = ""
        this.textB = ""
      }
    },
  },
  firestore() {
    return {
      posts: db.collection('posts').orderBy("created", "desc")
    }
  }
}
</script>

<style lang="scss" scoped>
.list-leave-active,
.list-enter-active {
  transition: opacity .5s, transform .5s ease;
}

.list-leave-to,
.list-enter {
  opacity: 0;
  transform: translateX(50px);
}

.list-leave,
.list-enter-to {
  opacity: 1;
}

.intro {
  margin: 32px 0;

  &__title {
    font-size: 38px;
    line-height: 1.2;
    color: black;
  }
}

.chatList {
  &__item {
    display: flex;
    align-items: center;
    min-height: 60px;
    list-style: none;
    text-align: left;
    padding: 16px;
    border: 2px solid gray;
    border-radius: 5px;
    box-shadow: 0 6px 6px -6px #777;
    box-sizing: border-box;

    &:not(:last-child) {
      margin-bottom: 16px;
    }
  }
}
</style>

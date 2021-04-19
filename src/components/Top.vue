<template>
  <div>
    <div class="form">
      <input class="form__input" type="text" v-model="message">
      <button class="button" v-on:click="submit">送信</button>
    </div>
    <transition-group name="list" tag="ul" class="chatList">
      <Item v-for="post in posts" :key="post.id" :post="post" class="chatList__item"/>
    </transition-group>
  </div>
</template>

<script>
import Item from '@/components/Item'
import { db } from '@/main'
export default {
  name: 'Top',
  components: {
    Item
  },
  data() {
    return {
      posts: [],
      message: ""
    }
  },
  methods: {
    submit: function() {
      const date = new Date()
      if (this.message == "") {
        alert("入力してください")
      }
      else{
        db.collection('posts').add({
          uid: this.uid = '0001',
          content: this.message,
          day: this.day = date.getMonth() + "/" + date.getDate(),
          time: this.time = date.getHours().toString().padStart(2, "0") + ":" + date.getMinutes().toString().padStart(2, "0") + ":" + date.getSeconds().toString().padStart(2, "0"),
          created: this.day + this.time
        })
        this.message = ""
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

.chatList {
  width: 80%;
  max-width: 800px;
  margin: 0 auto;
  padding: 0;

  &__item {
    display: flex;
    align-items: center;
    min-height: 60px;
    list-style: none;
    text-align: left;
    padding: 16px 8px;
    border: 2px solid gray;
    border-radius: 5px;
    box-shadow: 0 6px 6px -6px #777;
    box-sizing: border-box;

    &:not(:last-child) {
      margin-bottom: 16px;
    }
  }
}

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

<template>
  <div id="app">
    <Header/>
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <Top/>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Top from './components/Top.vue'

export default {
  name: 'App',
  components: {
    Top,
    Header
  }
}
</script>

<style>
#app {
  font-family:"Yu Gothic Medium", "游ゴシック Medium", YuGothic, "游ゴシック体", "ヒラギノ角ゴ Pro W3", "メイリオ", sans-serif;
  text-align: center;
  margin-top: 60px;
}
</style>

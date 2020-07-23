<template>
  <div id="app">
    <Navigation />
    <div class="wrapper">
      <div class="main">
        <transition name="page" mode="out-in">
          <router-view class="view"></router-view>
        </transition>
        <img class="main-img" :src="bg" />
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from "./components/Navigation.vue";

export default {
  name: "App",
  components: {
    Navigation
  },
  data() {
    return {
      bg: require("@/assets/bg.png")
    };
  }
};
</script>

<style lang="scss">
@import "@/sass/partials/main.scss";
@import "@/sass/partials/card.scss";
</style>  
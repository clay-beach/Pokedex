<template>
  <div class="card empty">
    <img class="card-img" :src="imgUrl" />
    <router-link class="nav-link card-plus" :to="`/`">+</router-link>
  </div>
</template>

<script>
export default {
  name: "PartyUnselected",
  data() {
    return {
      imgUrl: require("@/assets/ball.png")
    };
  }
};
</script>

<style scoped lang="scss">
@import "@/sass/partials/partyUnselected.scss";
</style>
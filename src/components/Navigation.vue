<template>
  <nav class="nav" :class="{active: toggle}">
    <div class="nav-left">
      <img class="nav-logo" :src="logo" alt="Logo" />
    </div>
    <div class="nav-right">
      <ul class="nav-list">
        <router-link
          class="nav-link"
          v-on:click.native="toggleOff"
          v-for="routes in links"
          v-bind:key="routes.id"
          :to="`${routes.page}`"
        >{{routes.text}}</router-link>
      </ul>
      <div class="nav-profile">
        <img class="nav-profile-img" :src="profile" alt="profile Image" />
      </div>
    </div>
    <div class="nav-toggle" v-on:click="toggleNav" :class="{active: toggle}">
      <span></span>
      <span></span>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navigation",
  data() {
    return {
      toggle: false,
      logo: require("@/assets/logo.png"),
      profile: require("@/assets/profile.png"),
      links: [
        {
          id: 0,
          text: "Pokedex",
          page: "/"
        },
        {
          id: 1,
          text: "Party",
          page: "/party"
        }
      ]
    };
  },
  methods: {
    // toggle mobile nav
    toggleNav() {
      if (this.toggle) {
        this.toggle = false;
        document.body.classList.remove("nav-open");
      } else {
        this.toggle = true;
        document.body.classList.add("nav-open");
      }
    },
    // toggle off mobile nav
    toggleOff() {
      this.toggle = false;
      document.body.classList.remove("nav-open");
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/sass/partials/nav.scss";
</style>

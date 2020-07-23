<template>
  <div class="main-row">
    <div class="main-col main-col__l">
      <h2>
        Choose
        <br />your team
      </h2>
      <h3>
        Scroll
        <br />for more
        <span></span>
      </h3>
    </div>
    <div id="pokemonContainer" class="main-col main-col__m">
      <div v-if="error">
        <p>We're sorry, we're not able to retrieve this information at the moment, please try back later</p>
      </div>
      <Pokemon v-else v-for="item in dataSet" :key="item.id" :pokemonID="item.id" />
    </div>
    <div class="main-col main-col__r">
      <Selection />
    </div>
    <div class="main-count" :class="{loading: loading}">
      <p>{{count}}/151</p>
    </div>
  </div>
</template>

<script>
import Selection from "@/components/Selection.vue";
import Pokemon from "@/components/Pokemon.vue";

export default {
  name: "Pokedex",
  data() {
    return {
      loading: false,
      error: false,
      dataSet: [],
      count: Object.keys(this.$store.state.pokemon).length || 0
    };
  },
  components: {
    Selection,
    Pokemon
  },
  methods: {
    // update pokemon list on scroll
    scroll() {
      window.onscroll = () => {
        let bottomOfWindow =
          document.documentElement.scrollTop + window.innerHeight >=
          document.documentElement.offsetHeight - 1; // add 1px offset

        if (bottomOfWindow && !this.loading) {
          this.loading = true;

          // already have all pokemon no need to call anything
          if (this.$store.state.lastRequested === this.$store.state.limit) {
            this.loading = false;
            return;
          }

          // get next set of pokemon if we arnt near our limit
          if (this.$store.state.lastRequested + 12 < this.$store.state.limit) {
            return this.getNext(this.$store.state.nextUrl).then(
              () => (this.loading = false)
            );
          }

          // calculate our new limit for final request
          let limit = this.$store.state.limit - this.$store.state.lastRequested;
          return this.getNext(
            `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${this.$store.state.lastRequested}`
          ).then(() => (this.loading = false));
        }
      };
    },
    // call store to make api call
    getNext(nextUrl) {
      return this.$store
        .dispatch("getNext", nextUrl)
        .then(dataSet => {
          this.updateCount();
          this.dataSet = this.dataSet.concat(dataSet);
        })
        .catch(error => {
          console.log(error);
          this.error = true;
        });
    },
    // update our pokemon counter
    updateCount() {
      this.count = Object.keys(this.$store.state.pokemon).length;
    }
  },
  mounted() {
    this.scroll();

    // if initial load then get first set of pokemon
    if (Object.keys(this.$store.state.pokemon).length === 0) {
      return this.getNext(
        `https://pokeapi.co/api/v2/pokemon?limit=12&offset=0`
      ).then(() => (this.loading = false));
    } else {
      // if we already called the initial endpoint there is no point doing it again, pull cached info
      this.dataSet = Object.values(this.$store.state.pokemon);
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/sass/partials/pokedex.scss";
</style>

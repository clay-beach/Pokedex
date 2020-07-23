<template>
  <div class="main-row">
    <div class="main-col main-col__l">
      <h2>
        Ash's
        <br />party
      </h2>
    </div>
    <div id="selectionContainer" class="main-col main-col__m">
      <component
        v-for="(item, index) in computedSlots"
        :key="index"
        :is="item.component"
        :assignedSlot="item.prop"
      />
    </div>
    <div class="main-col main-col__r">
      <p class="main-count">{{computedCount}}/6</p>
      <div class="nav-link btn">
        <router-link :to="`/`">
          <span>Dex</span>
          <span>&rarr;</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import PartySelected from "@/components/PartySelected.vue";
import PartyUnselected from "@/components/PartyUnselected.vue";

export default {
  name: "Party",
  components: {
    PartySelected,
    PartyUnselected
  },
  data() {
    return {
      selection: this.$store.state.selection,
      items: Object.keys(this.$store.state.selection)
    };
  },
  computed: {
    // check which slots have been populated in store and pass to template
    computedSlots() {
      return this.items.map(slot => {
        if (this.$store.state.selection[slot] === null) {
          return {
            component: PartyUnselected,
            prop: null
          };
        }
        return {
          component: PartySelected,
          prop: slot
        };
      });
    },
    // get the count of populated slots and pass to template
    computedCount() {
      return this.items.filter(slot => {
        return this.$store.state.selection[slot] !== null;
      }).length;
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/sass/partials/party.scss";
</style>

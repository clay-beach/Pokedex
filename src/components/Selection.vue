<template>
  <div class="selection">
    <SelectionItem v-for="(item, index) in items" :key="index" :assignedSlot="item" />
    <div class="nav-link btn">
      <router-link :to="`/party`">
        <span>Party</span>
        <span>&rarr;</span>
      </router-link>
    </div>
  </div>
</template>

<script>
import SelectionItem from "@/components/SelectionItem.vue";

export default {
  name: "Selection",
  components: {
    SelectionItem
  },
  data() {
    return {
      items: Object.keys(this.$store.state.selection)
    };
  }
};
</script>

<style lang="scss">
@import "@/sass/partials/selection.scss";
</style>
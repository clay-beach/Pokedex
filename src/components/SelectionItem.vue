<template>
  <div class="selection-item">
    <img v-if="assignedPokemon === null" class="empty" :src="ball" alt />
    <img v-else :src="this.$store.state.selection[this.assignedSlot].sprites.front_default" alt />
  </div>
</template>

<script>
export default {
  name: "SelectionItem",
  props: {
    assignedSlot: String
  },
  data() {
    return {
      ball: require("@/assets/ball.png"),
      assignedPokemon: this.$store.state.selection[this.assignedSlot]
    };
  },
  created() {
    // if store raises assignSlot event then check if we need to update
    this.$store.subscribe((mutation, state) => {
      if (
        mutation.type === "assignSlot" &&
        this.assignedPokemon !== state.selection[this.assignedSlot]
      ) {
        // update state if is not up to date
        this.assignedPokemon = state.selection[this.assignedSlot];
      }
    });
  }
};
</script>
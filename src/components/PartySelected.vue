<template>
  <div class="card selected">
    <img class="card-img" :src="imgUrl" />
    <p class="card-num">
      <span>{{ number }}</span>
    </p>
    <input v-on:keyup="updateNickname" class="card-nickname" :value="name" />
    <div class="card-types">
      <span
        v-for="(item, index) in types"
        :key="index"
        :class="`bg-${item.type.name}`"
      >{{item.type.name}}</span>
    </div>
    <a v-on:click="clearPokemon" class="card-clear">&#x2716;</a>
  </div>
</template>

<script>
export default {
  name: "PartySelected",
  props: {
    assignedSlot: String
  },
  data() {
    return {
      imgUrl: this.$store.state.selection[this.assignedSlot].sprites
        .front_default,
      name:
        this.$store.state.selection[this.assignedSlot].nickname ||
        this.$store.state.selection[this.assignedSlot].name,
      number: this.getNumber(this.$store.state.selection[this.assignedSlot].id),
      types: this.$store.state.selection[this.assignedSlot].types.reverse()
    };
  },
  methods: {
    // inform store to empty out the current slot
    clearPokemon() {
      this.$store.dispatch("emptySlot", this.assignedSlot);
    },
    // helper method to create proper pokemon numbering string
    getNumber(num) {
      let numString = num.toString();

      switch (numString.length) {
        case 1:
          return "#00" + numString;
        case 2:
          return "#0" + numString;
        default:
          return "#" + numString;
      }
    },
    // add a nickname to the selected pokemon and add to store
    updateNickname(e) {
      this.$store.dispatch("assignNickname", {
        slot: this.assignedSlot,
        value: e.target.value
      });
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/sass/partials/partySelected.scss";
</style>
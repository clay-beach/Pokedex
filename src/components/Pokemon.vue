<template>
  <div v-on:click="assignPokemon" class="card" :class="{ selected: assigned }">
    <img class="card-img" :src="imgUrl" />
    <p class="card-num">
      <span>{{ number }}</span>
    </p>
    <h3 class="card-name">{{ name }}</h3>
    <div class="card-types">
      <span
        v-for="(item, index) in types"
        :key="index"
        :class="`bg-${item.type.name}`"
      >{{item.type.name}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Pokemon",
  props: {
    pokemonID: Number
  },
  data() {
    return {
      assigned: false,
      assignedSlot: null,
      imgUrl: this.$store.state.pokemon[this.pokemonID].sprites.front_default,
      name: this.$store.state.pokemon[this.pokemonID].name,
      number: this.getNumber(this.pokemonID),
      types: this.$store.state.pokemon[this.pokemonID].types.reverse()
    };
  },
  methods: {
    // tell store to update the pokemon in the slot
    assignPokemon() {
      // if already assigned then remove
      if (this.assigned) {
        this.$store.dispatch("emptySlot", this.assignedSlot);
        this.assigned = false;
        this.assignedSlot = null;
      } else {
        // assign the slot
        this.$store.dispatch("assignSlot", this.pokemonID).then(res => {
          // if slots full then throw error alert
          if (!res.assigned) {
            this.$swal.fire({
              icon: "error",
              title: "PARTY FULL!!",
              text: "Remove a pokemon to select more."
            });
          } else {
            // assigned new slot successfully
            this.assigned = true;
            this.assignedSlot = res.slot;
          }
        });
      }
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
    }
  },
  mounted() {
    // check if selected on load
    Object.keys(this.$store.state.selection).forEach(slot => {
      if (
        this.$store.state.selection[slot] &&
        this.$store.state.selection[slot].id === this.pokemonID
      ) {
        this.assigned = true;
        this.assignedSlot = slot;
      }
    });
  }
};
</script>

<style scoped lang="scss">
@import "@/sass/partials/card.scss";
</style>
import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist';
import axios from "axios";

Vue.use(Vuex);

// initilise vuexPersist - store only the selected pokemon in local 
const vuexPersist = new VuexPersist({
    key: 'pokedex',
    storage: window.localStorage,
    reducer: (state) => ({ selection: state.selection })
});

export default new Vuex.Store({
    plugins: [vuexPersist.plugin],
    state: {
        limit: 151,
        lastRequested: 0,
        pokemon: {},
        nextUrl: null,
        selection: {
            slot1: null,
            slot2: null,
            slot3: null,
            slot4: null,
            slot5: null,
            slot6: null
        }
    },
    mutations: {
        addPokemon(state, n) {
            state.pokemon[n.id] = n;
        },
        incrementLast(state) {
            state.lastRequested += 1;
        },
        updateNext(state, n) {
            state.nextUrl = n;
        },
        assignSlot(state, n) {
            state.selection[n.slot] = n.value;
        },
        updateName(state, n) {
            state.selection[n.slot].nickname = n.value;
        }
    },
    actions: {
        addPokemon(context, n) {
            context.commit('addPokemon', n);
        },
        incrementLast(context) {
            context.commit('incrementLast');
        },
        updateNext(context, n) {
            context.commit('updateNext', n);
        },
        getNext(context, n) {
            return axios.get(n).then(res => {
                context.commit('updateNext', res.data.next);
                return Promise.all(
                    res.data.results.map(pokemon => {
                        return axios.get(pokemon.url).then(result => {
                            context.commit("addPokemon", result.data);
                            context.commit("incrementLast");
                            return result.data;
                        });
                    })
                );
            });
        },
        assignSlot(context, n) {
            return new Promise((resolve) => {
                let keys = Object.keys(context.state.selection);
                let assigned = false;
                let slot = null;

                for (let i = 0; i < keys.length; i++) {
                    let item = context.state.selection[keys[i]];
                    if (item === null) {
                        context.commit('assignSlot', {
                            slot: keys[i],
                            value: context.state.pokemon[n]
                        });
                        assigned = true;
                        slot = keys[i];
                        break;
                    }
                }

                resolve({
                    assigned: assigned,
                    slot: slot
                });
            });
        },
        emptySlot(context, n) {
            context.commit('assignSlot', {
                slot: n,
                value: null
            });
        },
        assignNickname(context, n) {
            context.commit('updateName', n);
        }
    }
});


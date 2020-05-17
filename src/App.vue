<template>
  <div id="app">
    <Nav />
    <div class="container">
      <div v-if="!hasData">
        <b-alert show variant="danger">Please load in CSV data.</b-alert>

        <DataEntry />
      </div>

      <b-alert
        variant="success"
        dismissible
        fade
        :show="hasData && showDismissibleAlert"
        @dismissed="showDismissibleAlert = false"
        >You now have data available. Select from the navbar.</b-alert
      >
      <div class="mb-5"></div>
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
export const store = new Vuex.Store();

import DataEntry from "./components/DataEntry.vue";
import Nav from "./components/Nav.vue";

export default {
  name: "App",
  data() {
    return { showDismissibleAlert: true };
  },
  components: {
    DataEntry,
    Nav,
  },
  computed: {
    hasData() {
      return this.$store.getters.hasData;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
}
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>

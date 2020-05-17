<template>
  <div>
    <h2>Sprint estimates:</h2>
    <div class="row">
      <div class="col-3">
        <b-button @click="getEstimates" variant="outline-primary" class="m-2"
          >Get Estimates</b-button
        >
      </div>
      <div class="col-3">
        Days: <span>{{ noOfDays }}</span>
      </div>
      <div class="col-3">
        Story points: <span>{{ noOfStorypoints }}</span>
      </div>
      <div class="col-3"></div>
    </div>

    <b-table striped hover :items="estimates"></b-table>
  </div>
</template>

<script>
// import { sum } from "lodash-es";

export default {
  data() {
    return {};
  },
  methods: {
    getEstimates() {
      this.$store.dispatch("getEstimates", this.csv);
    },
  },
  computed: {
    estimates() {
      return this.$store.getters.estimates;
    },
    noOfDays() {
      return this.$store.getters.estimates.reduce((acc, cur) => {
        return acc + cur.dayEstimate;
      }, 0);
    },
    noOfStorypoints() {
      return this.$store.getters.estimates.reduce((acc, cur) => {
        return acc + parseFloat(cur.storyPoints)
          ? parseFloat(cur.storyPoints)
          : 0;
        // ? parseInt(cur.storyPoints\)
        // : cur.dayEstimate * 5;
      }, 0);
    },
  },
};
</script>

<style scoped></style>

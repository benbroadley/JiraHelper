<template>
  <div>
    <h2>Sprint estimates:</h2>
    <div class="row">
      <div class="col-1">Version:</div>
      <div class="col-2">
        <b-form-select
          v-model="selectedVersion"
          :options="versionOptions"
        ></b-form-select>
      </div>
      <div class="col-1">Overhead (%)</div>
      <div class="col-1">
        <b-form-input
          type="number"
          v-model="overhead"
          placeholder="30"
        ></b-form-input>
      </div>
      <div class="col-1">Developers</div>
      <div class="col-1">
        <b-form-input
          type="number"
          v-model="noOfDevelopers"
          placeholder="4"
        ></b-form-input>
      </div>
      <div class="col-2"></div>
      <div class="col-2">
        <b-button @click="getEstimates" variant="outline-primary" class="m-2"
          >Get Estimates</b-button
        >
      </div>
    </div>
    Functional day estimate: <span>{{ Math.round(noOfDays) }}</span> <br />
    No. of sprints estimate:
    <span>{{ Math.round(noOfSprints) + 1 }}</span>

    <!-- <b-table striped hover :items="estimates"></b-table> -->
  </div>
</template>

<script>
import { uniq, map, filter, isUndefined } from "lodash-es";

export default {
  data() {
    return { selectedVersion: "", overhead: 30, noOfDevelopers: 4 };
  },
  methods: {
    getEstimates() {
      const payload = {
        version: this.selectedVersion,
        overhead: this.overhead,
      };
      this.$store.dispatch("getEstimates", payload);
    },
  },
  computed: {
    estimates() {
      return this.$store.getters.estimates;
    },
    noOfDays() {
      return (
        this.$store.getters.estimates.reduce((acc, cur) => {
          return acc + cur.dayEstimate;
        }, 0) *
        (1 + this.overhead / 100)
      );
    },
    noOfSprints() {
      return this.noOfDays / (this.noOfDevelopers * 9);
    },
    versionOptions() {
      return filter(uniq(map(this.$store.getters.tickets, "version")), (v) => {
        return v !== "" && !isUndefined(v);
      });
    },
  },
  created() {
    this.selectedVersion = this.versionOptions[0];
  },
};
</script>

<style scoped></style>

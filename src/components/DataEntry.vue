<template>
  <div>
    <h2>Data entry:</h2>
    <b-alert v-if="dataErr" show variant="danger">{{ dataErr }}</b-alert>

    <b-form-textarea
      id="csvTextarea"
      v-model="csv"
      placeholder="Place Jira CSV input here."
      rows="3"
      max-rows="6"
    ></b-form-textarea>
    <b-button @click="submitData" variant="outline-primary" class="m-2"
      >Submit</b-button
    >
  </div>
</template>
<script>
export default {
  data() {
    return {
      isHidden: false,
      csv: "",
    };
  },
  methods: {
    submitData() {
      this.$store.dispatch("transformData", this.csv);
    },
  },
  computed: {
    dataObj() {
      return this.$store.getters.tickets;
    },
    dataErr() {
      return this.$store.getters.dataErr;
    },
  },
};
</script>
<style></style>

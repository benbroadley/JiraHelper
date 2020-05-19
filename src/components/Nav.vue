<template>
  <div>
    <div>
      <b-navbar toggleable="sm" type="light" variant="light" class="mb-5">
        <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>

        <b-navbar-brand to="/">Jira Helper</b-navbar-brand>

        <b-collapse id="nav-text-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item :disabled="!hasData" to="/dataEntry"
              >Data Entry</b-nav-item
            >
            <b-nav-item :disabled="!hasData" to="/estimateAccuracy"
              >Estimate Accuracy</b-nav-item
            >
            <b-nav-item :disabled="!hasData" to="/releaseNote"
              >Release Note</b-nav-item
            >
            <b-nav-item :disabled="!hasData" to="/sprintEstimate"
              >Sprint Estimate</b-nav-item
            >
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
  </div>
</template>

<script>
// import BuyMeACoffee from "./BuyMeACoffee.vue";

export default {
  data() {
    return {};
  },
  components: {
    // BuyMeACoffee,
  },
  computed: {
    hasData() {
      return this.$store.getters.hasData;
    },
  },
};
</script>

<style scoped></style>

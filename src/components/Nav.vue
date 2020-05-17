<template>
  <div>
    <div>
      <b-navbar toggleable="sm" type="light" variant="light" class="mb-5">
        <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>

        <b-navbar-brand>Jira Helper</b-navbar-brand>

        <b-collapse id="nav-text-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item :disabled="!hasData" to="/dataEntry"
              >DataEntry</b-nav-item
            >
            <b-nav-item :disabled="!hasData" to="/estimateAccuracy"
              >EstimateAccuracy</b-nav-item
            >
            <b-nav-item :disabled="!hasData" to="/releaseNote"
              >ReleaseNote</b-nav-item
            >
            <b-nav-item :disabled="!hasData" to="/sprintEstimate"
              >SprintEstimate</b-nav-item
            >
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    hasData() {
      return this.$store.getters.hasData;
    },
  },
};
</script>

<style scoped></style>

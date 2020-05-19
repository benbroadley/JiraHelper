<template>
  <div>
    <h2>Jira Helper</h2>
    <div v-if="!hasData">
      <b-alert show variant="danger">Please load in the CSV data.</b-alert>

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
    <p>
      Use this handy tool for helping with day-to-day tasks that use Jira data.
    </p>
    <b-card-group>
      <b-card title="Data Entry" sub-title="Enter your Jira CSV data.">
        <b-card-text
          >Copy your Jira data into a CSV format and paste it into the provided
          area to begin working with it.</b-card-text
        >
      </b-card>
      <b-card
        title="Estimate Accuracy"
        sub-title="Take a look at the past accuracy of estimates."
      >
        <b-card-text
          >Track the estimate accuracy? Why not take time to review these as a
          whole and ensure your next estimates are better.</b-card-text
        >
      </b-card>
      <b-card
        title="Release Note"
        sub-title="Create the release note from a previous sprint."
      >
        <b-card-text
          >Simply generate the release not ready to be puplished or sent out.
          Nothing fancy, just the facts of what is being released.</b-card-text
        >
      </b-card>
      <b-card
        title="Sprint Estimate"
        sub-title="Estimate how many sprints remain for a version."
      >
        <b-card-text
          >Based on T-Shirt sizes, this will help to estimate how many sprints
          may be needed. This is a very, <em>very</em> rough
          estimate.</b-card-text
        >
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
import DataEntry from "./DataEntry.vue";

export default {
  data() {
    return { showDismissibleAlert: true };
  },
  components: {
    DataEntry,
  },
  computed: {
    hasData() {
      return this.$store.getters.hasData;
    },
  },
};
</script>

<style scoped></style>

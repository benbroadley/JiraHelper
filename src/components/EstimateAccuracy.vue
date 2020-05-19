<template>
  <div>
    <h2>Estimate Accuracy</h2>

    <b-table striped hover :fields="fields" :items="tickets">
      <template v-slot:cell(key)="data">
        <a :href="`${jiraPrefix}${data.value}`" target="_blank"
          ><b>{{ data.value }}</b></a
        >
      </template>
    </b-table>
  </div>
</template>

<script>
import { map, filter } from "lodash-es";

export default {
  data() {
    return {
      jiraPrefix: "https://owlabs.atlassian.net/browse/",
      fields: [
        {
          key: "key",
          sortable: true,
        },
        {
          key: "summary",
          sortable: true,
        },
        {
          key: "storyPoints",
          sortable: true,
        },
        {
          key: "accuracy",
          sortable: true,
        },
        {
          key: "version",
          sortable: true,
        },
      ],
    };
  },
  computed: {
    tickets() {
      return map(
        filter(this.$store.getters.tickets, (ticket) => {
          return ticket.status === "Done";
        }),
        (t) => {
          return {
            key: t.key,
            summary: t.summary,
            storyPoints: t.storyPoints,
            accuracy: t.estimateAccuracy,
            version: t.version,
          };
        }
      );
    },
  },
};
</script>

<style scoped></style>

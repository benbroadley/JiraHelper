<template>
  <div>
    <h2>Estimate Accuracy</h2>

    <b-table striped hover :items="tickets"></b-table>
  </div>
</template>

<script>
import { map, filter } from "lodash-es";

export default {
  data() {
    return {};
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

<template>
  <div>
    <h2>Release note:</h2>
    <transition name="fade">
      <b-alert :show="copied" variant="info">Release note has been copied to the clipboard.</b-alert>
    </transition>

    <div class="row mb-3">
      <div class="col-1">Sprint:</div>
      <div class="col-3">
        <b-form-select
          v-model="selectedSprint"
          :options="sprintOptions"
        ></b-form-select>
      </div>
      <div class="col-2"></div>
      <div class="col-3"></div>
      <div class="col-3">
        <b-button variant="primary"
          v-clipboard:copy="releaseNotes"
          v-clipboard:success="onCopy">Copy to clipboard</b-button>
      </div>
    </div>

    <p v-if="selectedSprint">The release note for sprint "{{ selectedSprint }}" is as follows:</p>
    <p><ul>
      <li v-for="note in releaseNotes" :key="note">
        {{ note }}
      </li>
    </ul></p>
  </div>
</template>

<script>
import { map, filter, uniq, isUndefined } from "lodash-es";

export default {
  data() {
    return { selectedSprint: null, copied: false, };
  },
  methods: {
    onCopy () {
      this.copied = true;
      setTimeout(() => {
        this.copied = false;
      }, 3000)
    }
  },
  mounted () {
    this.selectedSprint = this.sprintOptions[this.sprintOptions.length - 1];
  },
  computed: {
    releaseNotes() {
      return map(
        filter(this.$store.getters.tickets, (ticket) => {
          return (
            ticket.sprint === this.selectedSprint && ticket.releaseNote !== ""
          );
        }),
        "releaseNote"
      );
    },
    sprintOptions() {
      return uniq(
        map(
          filter(this.$store.getters.tickets, (t) => {
            return t.sprint !== "" && !isUndefined(t.sprint) && t.sprint.substring(0, 6) === 'PROWEB';
          }),
          "sprint"
        )
      ).sort();
    },
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.6s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}</style>

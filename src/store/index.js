import Vue from "vue";
import Vuex from "vuex";
import _ from "lodash";

Vue.use(Vuex);

const config = {
  expectedHeaders:
    "Issue Type,Issue key,Issue id,Summary,Reporter,Priority,Status,Created,Updated,Custom field (Release Note),Sprint,Sprint,Custom field (Estimate Accuracy),Custom field (Story Points),Custom field (T-Shirt Size),Fix versions",
  sanitisedHeaders: [
    "type",
    "key",
    "id",
    "summary",
    "reporter",
    "priority",
    "status",
    "created",
    "updated",
    "releaseNote",
    "sprint",
    "sprint1",
    "estimateAccuracy",
    "storyPoints",
    "tShirtSize",
    "version",
  ],
};

const getDayEstimate = (t) => {
  const tShirtToDays = {
    XS: 1,
    S: 3,
    M: 5,
    L: 10,
    XL: 20,
  };

  const storyPointsToDays = 5;

  if (t.tShirtSize && tShirtToDays[t.tShirtSize]) {
    return tShirtToDays[t.tShirtSize];
  }

  if (t.storyPoints) {
    return t.storyPoints / storyPointsToDays;
  }

  return 0;
};

export const store = new Vuex.Store({
  state: {
    hasData: false,
    ticketArray: [],
    estimateArray: [],
    dataErr: false,
  },
  mutations: {
    updateTicketArray(state, payload) {
      state.ticketArray = payload;
    },
    updateEstimates(state, payload) {
      state.estimateArray = payload;
    },
    updateHasData(state, payload) {
      state.hasData = payload;
    },
    updateDataErr(state, payload) {
      state.dataErr = payload;
    },
  },
  actions: {
    transformData({ commit }, payload) {
      // payload = payload.replace(/"([^"]*)"/g, function(m, g) {
      //   return g.replace(/\b([\r\n]+)\b|[\r\n]+/g, function(n, h) {
      //     return h ? " " : "";
      //   });
      // });
      const ticketsArray = payload.split("\n");
      // Get the headers and check that they're what we're expecting.
      let headers = ticketsArray.shift();
      if (headers !== config.expectedHeaders) {
        commit(
          "updateDataErr",
          "Unfortunately, the headers you've provided do not match."
        );
        return;
      }
      headers = headers.split(",");

      // Get the tickets into an array of objects, keyed by the sanitised headers. Ensuring to split on commas and ignoring
      // commas within double quotes.
      let tickets = _.map(ticketsArray, (v) => {
        return _.zipObject(
          config.sanitisedHeaders,
          v.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)
        );
      });

      tickets = _.filter(tickets, (t) => {
        return t.type !== "Epic";
      });

      commit("updateTicketArray", tickets);
      commit("updateHasData", tickets.length >= 1);
      commit("updateDataErr", false);
    },
    getEstimates({ commit, state }, payload) {
      console.log("payload", payload);
      const estimates = _.map(state.ticketArray, (t) => {
        return {
          key: t.key,
          summary: t.summary,
          storyPoints: t.storyPoints,
          accuracy: t.estimateAccuracy,
          version: t.version,
          tShirtSize: t.tShirtSize,
          dayEstimate: getDayEstimate(t),
        };
      });
      commit("updateEstimates", estimates);
    },
  },
  getters: {
    tickets(state) {
      return state.ticketArray;
    },
    estimates(state) {
      return state.estimateArray;
    },
    hasData(state) {
      return state.hasData;
    },
    dataErr(state) {
      return state.dataErr;
    },
  },
});

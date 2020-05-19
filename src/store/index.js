import Vue from "vue";
import Vuex from "vuex";
import _ from "lodash";
import config from "../config";

Vue.use(Vuex);

const getDayEstimate = (t) => {
  const tShirtToDays = {
    XS: 1,
    S: 3,
    M: 5,
    L: 10,
    XL: 20,
  };

  if (t.tShirtSize && tShirtToDays[t.tShirtSize]) {
    return tShirtToDays[t.tShirtSize];
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
      const ticketsArray = payload.split(process.env.VUE_APP_DELIMETER || "\n");
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
      let tickets = state.ticketArray;

      if (payload.version) {
        tickets = _.filter(tickets, (t) => {
          return t.version === payload.version;
        });
      }

      const estimates = _.map(tickets, (t) => {
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

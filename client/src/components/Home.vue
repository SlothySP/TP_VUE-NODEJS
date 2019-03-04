<template>
  <div>
    <EventList v-if="events.length" @deleteEvent="deleteEvent" :events="events"></EventList>
    <p v-else>Vous n'avez aucun évenements.</p>
  </div>
</template>

<script>
import axios from "axios";
import EventList from "./EventList.vue";
export default {
  data() {
    return {
      events: []
    };
  },
  methods: {
    deleteEvent(id) {
      const params = new URLSearchParams();
      params.append("id", id);
      axios
        .post("https://projet-js-sf-am.herokuapp.com/delete-event", params, {
          withCredentials: true
        })
        .then(res => {
          this.loadEvents();
        })
        .catch(err => console.log(err));
    },
    loadEvents() {
      axios
        .get("https://projet-js-sf-am.herokuapp.com/events")
        .then(res => {
          this.events = res.data;
        })
        .catch(err => console.log(err));
    }
  },
  created() {
    this.loadEvents();
  },
  components: {
    EventList
  }
};
</script>

<style>
</style>

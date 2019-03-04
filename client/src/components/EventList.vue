<template>
  <div>
    <h3>Évenements à venir :</h3>
    <ul class="list-group mt-5">
      <Event @deleteEvent="deleteEvent" v-for="event in events" :key="event.id" :event="event"></Event>
    </ul>
  </div>
</template>

<script>
import Event from "./Event";
export default {
  props: ["events"],
  methods: {
    deleteEvent(id) {
      this.$emit("deleteEvent", id);
    }
  },
  components: {
    Event
  }
};
</script>

<style>
</style>

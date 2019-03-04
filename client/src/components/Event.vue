<template>
  <li class="list-group-item">
    {{ event.id }} - {{ event.nom}} (
    <router-link :to="'/event/' + event.id">voir plus</router-link>)
    <button @click="deleteEvent" class="btn btn-danger btn-lg">Supprimer</button>
  </li>
</template>

<script>
export default {
  props: ["event"],
  methods: {
    deleteEvent() {
      this.$emit("deleteEvent", this.event.id);
    }
  }
};
</script>

<style scoped>
.list-group-item {
  font-size: 16px;
}

.btn {
  float: right;
}
</style>

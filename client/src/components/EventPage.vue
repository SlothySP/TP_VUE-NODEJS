<template>
  <div>
    <div v-if="event">
      <h2>{{ event.id }} - {{event.nom}}</h2>
      <p>Début : {{ afficheDate(event.dateDebut) }}</p>
      <p>Fin : {{ afficheDate(event.dateFin) }}</p>
    </div>
    <div v-else>Cargement :</div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      event: null
    };
  },
  methods: {
    afficheDate(tmp) {
      const date = new Date(+tmp);
      return date.toLocaleString();
    }
  },
  created() {
    axios
      .get(
        "https://projet-js-sf-am.herokuapp.com/event/" + this.$route.params.id
      )
      .then(res => {
        this.event = res.data;
      })
      .catch(err => console.log(err));
  }
};
</script>

<style>
</style>

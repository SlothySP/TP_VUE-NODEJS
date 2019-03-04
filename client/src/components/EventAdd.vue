<template>
  <div>
    <form @submit.prevent="eventAdd()">
      <div class="form-group">
        <label for="exampleInputEmail1">Nom</label>
        <input type="text" class="form-control" id="exampleInputEmail1" v-model="nom" required>
      </div>
      <div class="form-group">
        <Datepicker name="debut" v-model="dateDebut"/>
      </div>
      <div class="form-group">
        <Datepicker name="fin" v-model="dateFin"/>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import Datepicker from "vuejs-datepicker";
export default {
  data() {
    return {
      nom: "",
      dateDebut: new Date(),
      dateFin: new Date()
    };
  },
  methods: {
    eventAdd() {
      const params = new URLSearchParams();
      params.append("nom", this.nom);
      params.append("dateDebut", this.dateDebut.valueOf());
      params.append("dateFin", this.dateFin.valueOf());
      axios
        .post("https://projet-js-sf-am.herokuapp.com/event", params, {
          withCredentials: true
        })
        .then(res => {
          console.log(res);
          this.$router.push("/");
        })
        .catch(err => console.log(err));
    }
  },
  components: {
    Datepicker
  }
};
</script>

<style>
</style>

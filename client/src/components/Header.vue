<template>
  <nav class="navbar navbar-expand-lg navbar-dark">
    <router-link class="navbar-brand" exact to="/">Projet js</router-link>
    <router-link v-if="token" class="navbar-link" to="/event/add">Ajouter un event</router-link>
    <a
      v-if="token"
      style="margin-left: 15px;"
      class="navbar-link"
      @click.prevent="logout()"
    >Déconnexion</a>
  </nav>
</template>

<script>
export default {
  props: ["token"],
  methods: {
    logout() {
      this.$emit("logout");
    }
  }
};
</script>


<style scoped>
a {
  cursor: pointer;
}

.navbar {
  border-bottom: 1px solid #ddd;
  margin-bottom: 70px;
}

.navbar-brand {
  font-size: 24px;
  color: #000 !important;
}

.navbar-brand:hover {
  color: #444;
}
</style>

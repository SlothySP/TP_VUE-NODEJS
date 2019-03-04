<template>
  <div class="page">
    <button @click="inscriptionForm = false" class="btn btn-primary btn-lg">Connexion</button>
    <button @click="inscriptionForm = true" class="btn btn-primary btn-lg">Inscription</button>
    <div class="connexion mt-5" v-if="!inscriptionForm">
      <Conn @connexion="connexion"></Conn>
    </div>
    <div class="inscription mt-5" v-else>
      <Ins @inscription="inscription"></Ins>
    </div>
  </div>
</template>

<script>
import Ins from "./InsForm";
import Conn from "./ConnForm";
export default {
  data() {
    return {
      inscriptionForm: false
    };
  },
  methods: {
    inscription(user) {
      this.$emit("inscription", user);
    },
    connexion(user) {
      this.$emit("connexion", user);
    }
  },
  components: {
    Ins,
    Conn
  }
};
</script>

<style scoped>
.page {
  font-size: 17px;
}
</style>

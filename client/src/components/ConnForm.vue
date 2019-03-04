<template>
  <form @submit.prevent="connexion()">
    <h3>Connexion</h3>
    <div class="form-group">
      <label for="exampleInputEmail1">Email address</label>
      <input
        type="email"
        v-model="email"
        class="form-control"
        id="exampleInputEmail1"
        aria-describedby="emailHelp"
        placeholder="Enter email"
      >
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1">Password</label>
      <input
        type="password"
        v-model="password"
        class="form-control"
        id="exampleInputPassword1"
        placeholder="Password"
      >
    </div>
    <button type="submit" class="btn btn-primary">Me connecter</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    connexion() {
      const user = {
        email: this.email,
        password: this.password
      };
      this.$emit("connexion", user);
    }
  }
};
</script>

<style>
</style>

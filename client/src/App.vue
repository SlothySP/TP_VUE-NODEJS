<template>
  <div>
    <Header @logout="logout" :token="token"></Header>
    <div class="container">
      <router-view v-if="token"/>
      <ConnexionPage @connexion="connexion" @inscription="inscription" v-else/>
    </div>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import ConnexionPage from "./components/ConnexionPage.vue";
import axios from "axios";
export default {
  data() {
    return {
      apiURL: "https://projet-js-sf-am.herokuapp.com",
      token: null,
      user: null
    };
  },
  methods: {
    connexion(user) {
      const params = new URLSearchParams();
      params.append("email", user.email);
      params.append("mdp", user.password);
      axios
        .post(this.apiURL + "/login", params, { withCredentials: true })
        .then(res => {
          this.token = res.data.jwt;
          this.user = res.data.user.email;
          localStorage.setItem("token", res.data.jwt);
          localStorage.setItem("user", res.data.user.email);
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + this.token;
        })
        .catch(err => console.log(err));
    },
    inscription(user) {
      const params = new URLSearchParams();
      params.append("email", user.email);
      params.append("mdp", user.password);
      axios
        .post(this.apiURL + "/inscription", params, { withCredentials: true })
        .then(res => {
          this.connexion(user);
        })
        .catch(err => console.log(err));
    },
    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      delete axios.defaults.headers.common["Authorization"];
    }
  },
  created() {
    this.token = localStorage.getItem("token") || null;
    this.user = localStorage.getItem("user") || null;

    if (this.token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + this.token;
    }
  },
  components: {
    Header,
    ConnexionPage
  }
};
</script>

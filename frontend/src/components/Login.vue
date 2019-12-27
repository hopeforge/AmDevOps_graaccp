<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="card card-signin my-5">
          <div class="card-body">
            <img src="../assets/img/clubeamigo.svg" class="logo">
            <form class="form-signin">
              <div class="form-label-group">
                <label for="inputEmail">E-mail</label>
                <input
                  type="email"
                  id="inputEmail"
                  class="form-control"
                  placeholder="E-mail"
                  required
                  autofocus
                  v-model="email"
                />
              </div>

              <div class="form-label-group">
                <label for="inputPassword">Senha</label>
                <input
                  type="password"
                  id="inputPassword"
                  class="form-control"
                  placeholder="Senha"
                  required
                  v-model="senha"
                />
              </div>
              <hr class="my-4" />
              <div class="form-label-group">
                <button
                  class="btn btn-lg btn-primary btn-block text-uppercase"
                  type="button"
                  @click="login"
                >
                  Entrar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require("axios");

export default {
  data() {
    return {
      email: "",
      senha: "",
    };
  },
  methods: {
    login() {
      axios
        .post(`${process.env.VUE_APP_API_URL}/api/login/admin`, {
          email: this.email,
          password: this.senha,
        })
        .then(response => {
          if (response.data.auth) return this.$router.push("/home");
          alert("Usuário ou senha incorretas");
        })
        .catch(error => {
          if (error.response.status == 403)
            return alert("Usuário ou senha incorretas");
          alert("Erro ao realizar o login");
        });
    },
  },
};
</script>
<style >
  .logo {
    height: auto;
    width: 100%;
  }
  .card {
    border: 1px solid rgba(0, 0, 0, 0.095) !important;
  }
</style>

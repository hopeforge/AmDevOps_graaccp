<template>
  <div>
    <!-- <navBar></navBar> -->
    <div class="container-fluid">
      <br />
      <div style="height: 50px">&nbsp;</div>

      <div class="row">
        <div class="col-md-11">
          <form>
            <div class="form-group">
              <label for="exampleInputEmail1">Título do email</label>
              <input
                v-model="titulo"
                type="text"
                class="form-control"
                placeholder="Informe o nome do cupom"
              />
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">Texto do email</label>
              <input
                v-model="textBody"
                type="text"
                class="form-control"
                placeholder="Informe o nome do cupom"
              />
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">Html do email</label>
              <textarea
                v-model="htmlBody"
                class="form-control"
                placeholder="Informe o nome do cupom"
              />
            </div>
            <div class="form-group form-check text-center">
              <button type="button" class="btn btn-primary" @click="saveData()">
                Enviar
              </button>
              <span>&nbsp;</span>
              <button type="button" class="btn btn-danger" @click="resetData()">
                Reset
              </button>
            </div>
          </form>
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
      titulo: "",
      textBody: "",
      htmlBody: "",
    };
  },
  created() {},
  methods: {
    saveData() {
      if (!this.titulo || !this.textBody) return;
      axios
        .post(
          `${process.env.VUE_APP_API_URL}/mail/send`,
          {
            titulo: this.titulo,
            textBody: this.textBody,
            htmlBody: this.htmlBody
          },
          {
            auth: {
              username: "USERNAME",
              password: "PASSWORD",
            },
          }
        )
        .then(response => {
          console.log(response);
          alert(response.data.data);
          this.resetData();
        })
        .catch(error => {
          console.log(error);
        });
    },
    resetData() {
      this.titulo = "";
      this.textBody = "";
      this.htmlBody = "";
    },
  },
};
</script>

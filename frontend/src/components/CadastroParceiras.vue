<template>
  <div>
    <!-- <navBar></navBar> -->
    <div class="container-fluid">
      <br />
      <div class="row">
        <div class="col-md-11">
          <form>
            <div class="form-group">
              <label for="exampleInputEmail1">Nome do(a) Parceiro(a)</label>
              <input
                v-model="parceiroName"
                type="text"
                class="form-control"
                placeholder="Digite o nome do(a) Parceiro(a)"
              />
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Endereço</label>
              <input
                v-model="parceiroEndereco"
                type="text"
                class="form-control"
                placeholder="Digite o Endereço do(a) Parceiro(a)"
              />
            </div>
            <div class="form-group form-check text-center">
              <button type="button" class="btn btn-primary" @click="saveData()">
                Salvar
              </button>
              <span>&nbsp;</span>
              <button type="button" class="btn btn-danger" @click="resetData()">
                Limpar
              </button>
            </div>
          </form>
        </div>
      </div>
      <div style="height: 50px">&nbsp;</div>
      <div class="row">
        <div class="col-md-11">
          <div class="table-responsive">
            <table class="table table-sm">
              <thead>
                <tr>
                  <!-- <th scope="col">#</th> -->
                  <th scope="col">Nome</th>
                  <th scope="col">Endereço</th>
                  <th scope="col">Ação</th>
                </tr>
              </thead>
              <tbody v-for="(par, i) in parcerialist" :key="i">
                <tr>
                  <!-- <th scope="row">{{ i }}</th> -->
                  <td>{{ par.nome }}</td>
                  <td>{{ par.endereco }}</td>
                  <td>
                    <!-- <button
                      type="button"
                      class="btn btn-outline-primary"
                      @click="edit(i)"
                    >
                      Edit
                    </button> -->
                    <span>&nbsp;</span>
                    <button
                      type="button"
                      class="btn btn-outline-danger"
                      @click="apagar(par._id)"
                    >
                      Apagar
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
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
      parceiroName: "",
      parceiroEndereco: "",
      parcerialist: [],
      editing: false,
      id: "",
    };
  },
  created() {
    this.populateDB();
  },
  methods: {
    saveData() {
      if (!this.parceiroName) return;
      if (!this.parceiroEndereco) return;
      // console.log(this.parceiroName);
      // console.log(this.parceiroEndereco);

      axios
        .post(
          `${process.env.VUE_APP_API_URL}/parceiras/cadastro`,
          {
            nome: this.parceiroName,
            endereco: this.parceiroEndereco,
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
          this.populateDB();
          this.resetData();
        })
        .catch(error => {
          console.log(error);
        });
    },
    populateDB() {
      axios
        .get(`${process.env.VUE_APP_API_URL}/parceiras/all`, {
          auth: {
            username: "USERNAME",
            password: "PASSWORD",
          },
        })
        .then(response => {
          //   console.log(response);
          this.parcerialist = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    resetData() {
      this.parceiroName = "";
      this.parceiroEndereco = "";
      this.editing = false;
    },
    edit(i) {
      this.parceiroName = this.parcerialist[i].nome;
      this.parceiroEndereco = this.parcerialist[i].endereco;
      this.id = this.parcerialist[i]._id;
      this.editing = true;
    },
    apagar(id) {
      let conf = confirm("Deseja apagar essa(e) Parceiro(a)?");
      if (conf) {
        axios
          .delete(`${process.env.VUE_APP_API_URL}/parceiras/remove/` + id, {
            auth: {
              username: "USERNAME",
              password: "PASSWORD",
            },
          })
          .then(() => {
            alert("Apagdo com sucesso");
            this.populateDB();
          })
          .catch(error => {
            console.log(error);
            alert("Erro ao apagar");
          });
      }
    },
  },
};
</script>

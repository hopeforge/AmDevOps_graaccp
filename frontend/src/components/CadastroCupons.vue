<template>
  <div>
    <!-- <navBar></navBar> -->
    <div class="container-fluid">
      <br />     
      <div class="row">
        <div class="col-md-11">
          <form>
            <div class="form-group">
              <label for="exampleInputEmail1">Nome do cupom</label>
              <input
                v-model="cuponNome"
                type="text"
                class="form-control"
                placeholder="Informe o nome do cupom"
              />
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Empresa Parceira</label>
              <select class="form-control" v-model="parceira">
                <option value="-1">Selecione a empresa parceira</option>
                <option v-for="empresa in empresList" :value="empresa._id" :key="empresa._id">{{empresa.nome}}</option>                
              </select>
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">Data de expiração</label>
              <input v-model="datafim" type="date" class="form-control" />
            </div>
            <div class="form-group form-check text-center">
              <button type="button" class="btn btn-primary" @click="saveData()">
                Salvar
              </button>
              <span>&nbsp;</span>
              <button type="button" class="btn btn-danger" @click="resetData()">
                Reset
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
                  <th scope="col">#</th>
                  <th scope="col">Nome</th>
                  <th scope="col">Empresa Parceira</th>
                  <th scope="col">Validade</th>
                  <th scope="col">Ação</th>
                </tr>
              </thead>
              <tbody v-for="(par, i) in cadastrolist" :key="i">
                <tr>
                  <th scope="row">{{ par.id }}</th>
                  <td>{{ par.nome }}</td>
                  <td>{{ par.parceiras.nome }}</td>
                  <td>{{ parseDAte(par.data_fim) }}</td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-outline-primary"
                      @click="edit(i)"
                    >
                      Edit
                    </button>
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
      cuponNome: "",
      parceira: "-1",
      datafim: "",
      cadastrolist: [],
      empresList: [],
      editing: false,
      id: "",
    };
  },
  created() {
    this.populateDB();
    this.populateEmpresa();
  },
  methods: {
    parseDAte(t){
      try {
        let convert = new Date(t);
        return convert.toGMTString()
      } catch (error) {
        return "--"
      }
    },
    saveData() {
      if (!this.cuponNome) return;
      if (this.parceira == "-1") return;
      if (!this.datafim) return;
      try {
        let _date = new Date(this.datafim);
        let currentDate = new Date();
        if(currentDate.getTime() > _date.getTime()){
          return alert("Hora do cupon não pode ser menor que a atual");
        }
      } catch (error) {
        alert("Erro ao fazer parse de Data");
      }
      axios
        .post(
          this.editing ? `${process.env.VUE_APP_API_URL}/cupons/edit` : `${process.env.VUE_APP_API_URL}/cupons/cadastro`,
          {
            nome: this.cuponNome,
            parceiras: this.parceira,
            data_fim : this.datafim,
            id: this.id
          },
          {
            auth: {
              username: "USERNAME",
              password: "PASSWORD",
            },
          }
        )
        .then(response => {
          // console.log(response);
          this.populateDB();
          this.resetData();
        })
        .catch(error => {
          // console.log(error);
        });
    },
    populateDB() {
      axios
        .get(`${process.env.VUE_APP_API_URL}/cupons/all`, {
          auth: {
            username: "USERNAME",
            password: "PASSWORD",
          },
        })
        .then(response => {
            console.log(response);
          this.cadastrolist = response.data;
        })
        .catch(error => {
          // console.log(error);
        });
    },
    populateEmpresa() {
      axios
        .get(`${process.env.VUE_APP_API_URL}/parceiras/all`, {
          auth: {
            username: "USERNAME",
            password: "PASSWORD",
          },
        })
        .then(response => {
            console.log(response);
          this.empresList = response.data;
        })
        .catch(error => {
          // console.log(error);
        });
    },
    resetData() {
      this.cuponNome = "";
      this.parceira = "-1";
      this.datafim = "";
      this.editing = false;
    },
    edit(i) {
      this.cuponNome = this.cadastrolist[i].nome;
      this.parceira = this.cadastrolist[i].parceiras._id;
      let et = new Date(this.cadastrolist[i].data_fim);
      var date = et.getDate();
      var month = et.getMonth() + 1; 
      var year = et.getFullYear();      
      var dateStr = year + "-" + (month > 9 ? month : "0"+month) + "-" + (date > 9 ? date : "0"+date);
      this.datafim = dateStr
      this.id = this.cadastrolist[i]._id;
      this.editing = true;
    },
    apagar(id) {
      let conf = confirm("Deseja apagar essa(e) Parceiro(a)?");
      if (conf) {
        axios
          .delete(`${process.env.VUE_APP_API_URL}/cupons/remove/` + id, {
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
            // console.log(error);
            alert("Erro ao apagar");
          });
      }
    },
  },
};
</script>

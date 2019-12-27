<template>
  <q-page class="docs-input row justify-center">
    <div class="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-xs-12 q-pa-xl">
      <div class="text-center" style="color:black">
        <img src="statics/clubeamigo.svg" width="130em" alt />
      </div>
      <div>
        <q-form class="q-gutter-md">
          <q-input
            v-model="email"
            label="E-mail"
            required
            :disable="disable"
            :rules="[ this.email == null || 'Favor informe o e-mail']"
          ></q-input>
          <q-input
            v-model="nome"
            label="Nome"
            :disable="disable"
            required
            :rules="[ this.nome ==null  || 'Favor informe seu nome']"
          ></q-input>

          <q-input
            v-if="edit"
            type="password"
            v-model="passwordOld"
            label="Senha antiga"
            required
            :rules="[
            this.password ==null || 'Favor informe a senha',
          ]"
          ></q-input>

          <q-input
            type="password"
            v-model="password"
            :label="senha"
            required
            :rules="[
            this.password ==null || 'Favor informe a senha',
          ]"
          ></q-input>
          <q-input
            type="password"
            v-model="repPassword"
            required
            label="Confirma Senha"
            :rules="[
            this.repPassword ==null|| 'Favor informe a senha',this.password != this.repPassword || 'As senhas Não são iguais'
          ]"
          ></q-input>
          <!-- <q-toggle type="checkbox" v-model="accept" required label="Você aceita os termos" ></q-toggle> -->
          <div style="text-align: center;">
            <q-btn :label="label" @click="cadastra()" type="submit" color="primary"></q-btn>
          </div>
        </q-form>
      </div>
    </div>
  </q-page>
</template>
<script>
import UserServices from '../../service/userService'
import Swal from 'sweetalert2'
export default {
  components: {},
  data () {
    return {
      edit: false,
      senha: 'Senha',
      label: 'Cadastre-se',
      accept: false,
      email: null,
      disable: false,
      nome: null,
      password: null,
      repPassword: null,
      passwordOld: null
    }
  },
  created () {
    this.meusDados()
  },
  methods: {
    cadastra () {
      if (this.edit) {
        if (this.repPassword !== this.password) {
          Swal.fire('Erro!', 'As senhas não são iguais', 'error')
        } else {
          let email = this.email
          let password = this.password
          let passwordOld = this.passwordOld
          UserServices.editUser(email, password, passwordOld)
            .then(res => {
              if (res.data === true) {
                Swal.fire('Sucesso!', 'Alteração de senha realizada com sucesso', 'sucess')
              } else {
                Swal.fire('Error!', res.error, 'error')
              }
            })
            .catch(err => {
              Swal.fire('Erro!', err.response.data, 'error')
            })
        }
      } else {
        if (this.repPassword !== this.password) {
          Swal.fire('Erro!', 'As senhas não são iguais', 'error')
        } else {
          let email = this.email
          let password = this.password
          let nome = this.nome
          UserServices.saveUser(email, password, nome)
            .then(res => {
              Swal.fire('warning!', res, 'warning')
            })
            .catch(err => {
              Swal.fire('Erro!', err.response.data, 'error')
            })
        }
      }
    },
    meusDados () {
      UserServices.getDados()
        .then(res => {
          if (res.data.name != null && res.data !== undefined) {
            this.nome = res.data.name
            this.email = res.data.email
            this.label = 'Salvar'
            this.disable = true
            this.edit = true
            this.senha = 'Nova senha'
          }
        })
        .catch(err => {
          // Swal.fire('Erro!', err.response.data, 'error')
          console.log('loginError: ', err)
        })
    }
  }
}
</script>
<style lang="css">
.swal2-center {
  z-index: 50000;
}
</style>

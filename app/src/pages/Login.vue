<template>
  <q-page class="docs-input row justify-center">
    <div class="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-xs-12 q-pa-xl ">
      <div class="text-center" style="color:black">
        <img src="statics/clubeamigo.svg" width="180em" alt />
      </div>
      <div>
        <q-form class="q-gutter-md" style="margin-top: 121px; !important">
          <q-input
            type="email"
            v-model="email"
            label="E-mail"
            :rules="[  this.email == null || 'Favor informe o usuário'  ]"
          ></q-input>
          <q-input
            type="password"
            v-model="password"
            label="Senha"
            :rules="[
            this.password == null || 'Favor informe a senha',
          ]"
          ></q-input>
          <div style="text-align: center;">
            <q-btn label="Entra" @click="login()" type="button" color="primary"></q-btn>
          </div>
          <div style="text-align: center;">
            <q-btn
              label="Cadastre-se"
              type="reset"
              color="primary"
              @click="dialog = true"
              flat
              class="q-ml-sm"
            />
          </div>
        </q-form>
        <q-dialog
          v-model="dialog"
          persistent
          :maximized="maximizedToggle"
          transition-show="slide-up"
          transition-hide="slide-down"
        >
          <q-card class=" text-white">
            <q-bar>
              <q-space></q-space>
              <q-btn dense flat icon="close" v-close-popup>
                <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
              </q-btn>
            </q-bar>
            <q-card-section>
              <cadastro-user />
            </q-card-section>
          </q-card>
        </q-dialog>
      </div>
    </div>
  </q-page>
</template>
<script>
import CadastroUser from '../components/user/Cadastro.vue'
import AuthServices from '../service/AuthService'
import Swal from 'sweetalert2'
export default {
  components: {
    CadastroUser: CadastroUser
  },
  data () {
    return {
      dialog: false,
      maximizedToggle: true,
      password: null,
      email: null
    }
  },
  created () {
    AuthServices.verifyToken().then((result) => {
      if (result) this.$router.push('/')
    })
  },
  methods: {
    login () {
      let email = this.email
      let password = this.password
      if (!email && !password) return
      AuthServices.authenticate(email, password)
        .then(res => {
          if (res) {
            Swal.fire('Error!', res, 'error')
          } else {
            this.$router.push('/')
          }
        }
        )
        .catch(err => {
          Swal.fire('Error!', 'Erro ao realizar o login', 'error')
          // const errorNotification = Swal.mixin({
          //   toast: true,
          //   position: 'bottom-end',
          //   showConfirmButton: false,
          //   timer: 3000
          // })
          console.log('loginError: ', err)
        })
    }
  }
}
</script>
<style lang="stylus" scoped>

</style>

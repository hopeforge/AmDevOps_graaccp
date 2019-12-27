<template>
  <q-page class="flex">
    <div></div>
    <div class="q-pa-md row items-start q-gutter-md" style="width: 485px;text-align: center;" v-for="(doacao, i) in doacoes" :key="i" >
      <q-card class="my-card">
        <q-card-section class="bg-primary text-white" style="">
          <i class="material-icons" style="font-size: 40px;">attach_money</i>
          <div class="text-h6">
            {{doacao.valor}}
            <div class="text-subtitle2">{{formatD(doacao.created_At)}}</div>
          </div>

        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import DoacaoServices from '../service/DoacaoService'
import Swal from 'sweetalert2'
export default {
  name: 'PageDoacao',
  data () {
    return {
      doacoes: []
    }
  },
  created () {
    this.getHistorico()
  },
  methods: {
    formatD (dt) {
      try {
        let parseDate = new Date(dt)
        return parseDate.toLocaleDateString()
      } catch (error) {
        return ''
      }
    },
    getHistorico () {
      DoacaoServices.historicoDoacao()
        .then(res => {
          if (res.data) {
            this.doacoes = res.data
          } else {
            Swal.fire(
              'Erro!',
              'Não foi possivel fazer a doação no valor de  . ',
              'error'
            )
          }
        })
        .catch(err => {
          Swal.fire('Erro!', err.response.data, 'error')
          console.log('loginError: ', err)
        })
    }
  }
}
</script>
<style lang="stylus" scoped>
.my-card {
  width: 100%;
}
</style>

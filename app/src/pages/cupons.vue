<template>
  <q-page class="flex">
    <div></div>
   <div class="q-pa-md row items-start q-gutter-md" style="width: 485px;text-align: center;"  >
  <q-card class="my-card">
    <p style="font-size:17px"> Você esta no nível </p>
 <div class="bg-transparent">
          <q-circular-progress
            show-value
            font-size="25px"
            class="text-primary q-mb-sm"
            :value="xp"
            size="100px"
            :thickness="0.2"
            color="blue"
            track-color="grey-4"
          >
            <q-icon name="emoji_flags" class="q-mr-xs" />
            {{level}}
          </q-circular-progress>
        </div>
      </q-card>
   </div>
    <div class="q-pa-md row items-start q-gutter-md" style="width: 485px;text-align: center;" v-for="(cupon, i) in cupons" :key="i" >
     <q-card class="my-card">
        <img src="https://cdn.quasar.dev/img/parallax2.jpg">
        <q-list>
          <q-item clickable>
            <q-item-section avatar>
              <q-icon color="primary" name="local_offer" ></q-icon>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{cupon.desconto}}%</q-item-label>
              <q-item-label caption>Descontos</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable>
            <q-item-section avatar>
              <q-icon color="red" name="storefront" ></q-icon>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{cupon.parceiras.nome}}</q-item-label>
              <q-item-label caption>{{cupon.parceiras.endereco}}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable>
            <q-item-section avatar>
              <q-icon color="amber" name="query_builder" ></q-icon>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{formatD(cupon.data_fim)}}</q-item-label>
              <q-item-label caption>Validade</q-item-label>
            </q-item-section>
          </q-item>
           <q-item clickable>
            <q-item-section>
             <q-btn label="Usar cupon" @click="usar(cupon.id)" color="primary"></q-btn>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import UserServices from '../service/userService'
import cuponsServices from '../service/CuponsService'
import Swal from 'sweetalert2'
export default {
  name: 'PageCupons',
  data () {
    return {
      xp: 0,
      level: 0,
      cupons: []
    }
  },
  created () {
    this.getXp()
    this.getcupons()
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
    getXp () {
      UserServices.getXp().then(res => {
        this.xp = res.xp
        this.level = res.level
      })
    },
    getcupons () {
      cuponsServices.getcupons()
        .then(res => {
          if (res.data) {
            this.cupons = res.data
          } else {
            Swal.fire(
              'Erro!',
              'Não foi possivel . ',
              'error'
            )
          }
        })
        .catch(err => {
          Swal.fire('Erro!', err.response.data, 'error')
        })
    },
    usar (id) {
      cuponsServices.ativeCupons(id)
        .then(res => {
          if (res.data) {
            Swal.fire({
              title: '<strong>Seu Cupon</strong>',
              icon: 'info',
              html:
    'User esse codigo  <b>' + res.data.cuponId + '</b> e ganhe descontos. ' +
    'Sua identificação é <b>' + res.data.userID + '</b>',
              showCloseButton: false,
              showCancelButton: false,
              focusConfirm: false,
              confirmButtonText:
    '<i class="fa fa-thumbs-up"></i> ok!'
            })
          } else {
            Swal.fire(
              'Erro!',
              'Não foi possivel. ',
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

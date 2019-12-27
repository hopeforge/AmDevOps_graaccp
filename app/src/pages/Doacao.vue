<template>
  <div class="q-pa-md">
    <div class="fit row wrap justify-center">
        <h3 class="mx-auto">Doar</h3>
    </div>
    <q-stepper
      v-model="step"
      vertical
      color="primary"
      animated
    >
      <q-step
        :name="1"
        title="Informe o valor da doação"
        icon="settings"
        :done="step > 1"
      >
        <q-input
          filled
          v-model="valor"
          label="Valor da doação"
          mask="#.##"
          fill-mask="0"
          reverse-fill-mask
          input-class="text-right"
          :rules="[ val => val && val.length > 0 || 'Por favor, informe um valor']"
        />
        <q-stepper-navigation>
          <q-btn @click="step = 2" color="primary" label="Próximo" v-if='!$v.valor.$invalid' />
          <q-btn disable="" color="primary" label="Próximo" v-if='$v.valor.$invalid' />
        </q-stepper-navigation>
      </q-step>
      <q-step
        :name="2"
        title="Dados de pagamento"
        icon="credit_card"
        :done="step > 2"
      >
        <q-input
          filled
          v-model="cardNo"
          mask="#### #### #### ####"
          label="Número do cartão"
          input-class="text-right"
        />
        <q-input
          filled
          v-model="cvv"
          mask="###"
          label="CVV"
          size="3"
          input-class="text-right"
        />
        <q-input
          filled
          v-model="validade"
          mask="##/##"
          label="Válido até"
          size="5"
          input-class="text-right"
        />
        <q-input
          filled
          v-model="titular"
          label="Nome do titular do cartão"
          size="5"
          input-class="text-right"
        />
        <q-stepper-navigation>
          <q-btn @click="doar()" color="primary" label="Doar"/>
          <q-btn flat @click="step = 1" color="primary" label="Voltar" class="q-ml-sm" />
        </q-stepper-navigation>
      </q-step>
      <q-step
        :name="4"
        title="Concluir"
        icon="add_comment"
      >
        Sua doação no valor de {{valor}} foi efetuada com sucesso!
        <q-stepper-navigation>
          <q-btn color="primary" label="Concluir"  @click="$router.replace('/')"/>
        </q-stepper-navigation>
      </q-step>
    </q-stepper>
  </div>
</template>

<script>
import DoacaoServices from '../service/DoacaoService'
import Swal from 'sweetalert2'
const { required, between } = require('vuelidate/lib/validators')

export default {
  name: 'PageDoacao',
  data () {
    return {
      valor: '',
      step: 1,
      cardNo: '',
      cvv: '',
      validade: '',
      titular: ''

    }
  },
  validations: {
    valor: {
      required,
      between: between(5, 1000)
    },
    cardNo: {
      required
    },
    cvv: {
      between: between(20, 30)
    },
    validade: {
      between: between(20, 30)
    },
    titular: {
      between: between(20, 30)
    },
    age: {
      between: between(20, 30)
    }
  },
  methods: {
    doar () {
      let valor = this.valor
      if (valor > 0) {
        DoacaoServices.doar(valor)
          .then(res => {
            if (res.data) {
              this.step = 4
            //   Swal.fire('Sucesso', 'Sua doação foi realizada com sucesso . ', 'sucess')
            } else {
              Swal.fire('Erro!', 'Não foi possivel fazer a doação no valor de ' + valor + '. ', 'error')
            }
          })
          .catch(err => {
            Swal.fire('Erro!', err.response.data, 'error')
            console.log('loginError: ', err)
          })
      }
    }
  }
}
</script>
<style lang="stylus" scoped>

</style>

<template>
  <q-page >
        <cadastro-user />
  </q-page>
</template>

<script>
import CadastroUser from '../components/user/Cadastro.vue'
export default {
  components: {
    CadastroUser: CadastroUser
  },
  name: 'PageMeusDados',
  data () {
    return {
      valor: 0
    }
  },
  methods: {
  }
}
</script>
<style lang="stylus" scoped>

</style>

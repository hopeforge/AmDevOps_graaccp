<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card class="my-card">
        <q-card-section class="bg-primary text-white"  @click="$router.replace('/doe')">
        <div style="text-align: center;font-size: 50px;">
         <i class="material-icons">favorite_border</i>
        </div>
          <div class="text-h6" style="text-align: center">
            Quero Doar
          </div>
          <div class="text-subtitle2" style="text-align: center">Toda doação é importante e fundamental para o GRAACC continuar a garantir todas as chances de cura a crianças e adolescentes com câncer.</div>
        </q-card-section>
        <q-separator></q-separator>
      </q-card>
      <q-card class="my-card">
        <q-card-section class="bg-primary text-white" @click="$router.replace('/doe/list')">
        <div style="text-align: center;font-size: 50px;">
         <i class="material-icons">history</i>
        </div>
          <div class="text-h6" style="text-align: center">
            Meu Historico
          </div>
          <div class="text-subtitle2" style="text-align: center">Aqui você encontra todas sua doações realizadas.</div>
        </q-card-section>
        <q-separator></q-separator>
      </q-card>
    </div>
  </q-page>
</template>

<script>

export default {
  name: 'PageIndex'
}
</script>
<style lang="stylus" scoped>
.my-card {
  width: 100%;
 cursor: pointer
}
</style>

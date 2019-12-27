<template>
  <q-layout  class="img-background">
    <q-page-container class="container-fluid">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style lang="stylus" scoped>
::-webkit-scrollbar {
  display: none;
}
.img-background{
    background :#fff;
    height :100%;
    background-position :center;
    background-repeat:no-repeat;
}
</style>

<template>
  <div class="row">
    <template v-if="this.$route.path == '/'" >
    <div class="col-md-12">
      <div class="container">
        <router-view></router-view>
      </div>
    </div>
  </template>
  <template v-else-if="this.$route.path == '/login'" >
    <div class="col-md-12">
      <div class="container">
        <router-view></router-view>
      </div>
    </div>
  </template>
  <template v-else>
      <div class="col col-md-2">
        <navBar/>
      </div>
      <div class="col col-md-6">
        <router-view></router-view>
      </div>
  </template>
  </div>
</template>
<script>
export default {
  name: 'app',
  data () {
    return {      
      sideShow: false
    }
  },
  methods: {
    showsidebar(){
      if(this.$route.path == "/" || this.$route.path ==  "/login"){
        this.sideShow = false
      }
      else{
        this.sideShow = true
      }
    }
  },
  mounted(){
    this.showsidebar()
  }
}
</script>
<style>
.naoegambiarra{
  width: 100vw;
}
</style>
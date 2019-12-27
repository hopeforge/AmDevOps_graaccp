<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />
        <q-toolbar-title>Clube Amigo GRAACC
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-drawer v-model="leftDrawerOpen" show-if-above bordered :width="300" :breakpoint="400">
      <q-scroll-area
        style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd"
      >
        <q-list bordered padding class="rounded-borders">
          <q-item clickable v-ripple @click="$router.replace('/home')">
            <q-item-section avatar>
              <q-icon name="home" />
            </q-item-section>

            <q-item-section>Home</q-item-section>
          </q-item>

          <q-expansion-item expand-separator icon="perm_identity" label="Meu Perfil">
            <q-list>
              <q-item clickable v-close-popup @click="$router.replace('/meusdados')">
                <q-item-section>
                  <q-item-label>
                    <q-icon name="edit" style="font-size: 20px;" /> Meus Dados
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
             <q-list>
              <q-item clickable v-close-popup @click="$router.replace('/meuscupons')">
                <q-item-section>
                  <q-item-label>
                    <q-icon name="local_activity" style="font-size: 20px;" />  Meus cupons
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-expansion-item>
          <q-expansion-item expand-separator icon="local_atm" label="Doar">
            <q-list>
              <q-item clickable v-close-popup @click="$router.replace('/doe')">
                <q-item-section>
                  <q-item-label>
                    <q-icon name="add_shopping_cart" style="font-size: 20px;"/> Nova Doação
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="$router.replace('/doe/list')">
                <q-item-section>
                  <q-item-label>
                    <q-icon name="history" style="font-size: 20px;"/>   Histórico de Doações
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-expansion-item>
          <q-expansion-item expand-separator icon="contacts" label="Redes Sociais">
            <q-list>
              <q-item clickable v-close-popup @click="onItemClick">
                <q-item-section>
                  <q-item-label>
                    <q-icon name="img:statics/icons/facebook.png"  style="font-size: 20px;"/>
                    <a
                      href="https://www.facebook.com/GRAACC/"
                      target="_blank"
                      class="link"
                    > Facebook</a>
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="onItemClick">
                <q-item-section>
                  <q-item-label>
                    <q-icon name="img:statics/icons/twitter.png"  style="font-size: 20px;" />
                    <a
                      href="https://twitter.com/GRAACC"
                      target="_blank"
                     class="link"
                    > Twitter</a>
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="onItemClick">
                <q-item-section>
                  <q-item-label>
                    <q-icon name="img:statics/icons/instagram.png"  style="font-size: 20px;"/>
                    <a
                      href="https://www.instagram.com/instagraacc/?hl=pt-br"
                      target="_blank"
                      class="link"
                    > Instagram</a>
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="onItemClick">
                <q-item-section>
                  <q-item-label>
                    <q-icon name="img:statics/icons/youtube.png"  style="font-size: 20px;" />
                    <a
                      href="https://www.youtube.com/channel/UCCVuN0oF9TH6FkVFBrjDuzw"
                      target="_blank" class="link"
                    > Youtube</a>
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-expansion-item>

          <q-item clickable v-ripple @click="logout">
            <q-item-section avatar>
              <q-icon name="exit_to_app" />
            </q-item-section>

            <q-item-section>Encerrar Sessão</q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>

      <q-img
        class="absolute-top"
        src="statics/clubeamigo.svg"
      >
      </q-img>
    </q-drawer>

    <q-page-container>
      <div v-if="proceed">
        <div class="q-pa-lg">
          <q-carousel
            animated
            v-model="slide"
            arrows
            navigation
            infinite
            style="height: 77vh;"
          >
            <q-carousel-slide :name="1" img-src="statics/descontos.jpg" />
            <q-carousel-slide :name="2" img-src="statics/clubePDV1.svg" />
          </q-carousel>
          <div class="q-pa-md q-gutter-sm text-center">
            <q-btn color="primary" label="Ok" @click="register()" />
          </div>
        </div>

      </div>
      <router-view v-else />
    </q-page-container>
  </q-layout>
</template>

<script>
import AuthServices from '../service/AuthService'

export default {
  name: 'MyLayout',

  data () {
    return {
      leftDrawerOpen: true,
      name: localStorage.getItem('username'),
      slide: 1,
      proceed: true
    }
  },
  created () {
    if (localStorage.getItem('showedBanner')) {
      this.proceed = false
    }
  },
  methods: {
    register () {
      localStorage.setItem('showedBanner', 'ok')
      this.proceed = false
    },
    logout () {
      AuthServices.logout().then(() => {
        this.$router.push('/')
      })
    },
    onItemClick () {}
  }
}
</script>

<style scoped>
.fixed-bottom {
  margin-bottom: 1%;
}

.fixed-bottom a img {
  width: 25px;
  height: 25px;
}
.link{
  text-decoration:none; color:black
}
#avatar {
  margin: auto;
  top: 0;
  left: 110px;
}
#profile {
  height: 934px;
  background-color: #5b5f74;
}
#user-name {
  margin: center;
  bottom: -70px;
  position: relative;
  width: 100%;
  background: none;
}
#q-app {
  margin: center;
  position: relative;
  width: 120%;
  background: none;
  margin-left: -30px;
  margin-right: 0;
  overflow: auto;
}

#user-actions {
  margin: auto;
  width: 100%;
  position: relative;
  bottom: 0;
  background: none;
  text-align: center;
}

#menu-collapse {
  margin-top: 5%;
}
</style>

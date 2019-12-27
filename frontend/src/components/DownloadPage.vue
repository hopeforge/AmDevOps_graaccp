<template>
    <div class="container">
        <div class="row">
            <div class="col-lg text-center">
                <img src="@/assets/img/clubeamigo.svg" class="logolanding">
            </div>
        </div>
        <div class="spacer">&nbsp;</div>
        <div class="spacer">&nbsp;</div>
        <div class="spacer">&nbsp;</div>
        <div class="row">
            <div class="col-lg-6 poin" @click="getFile()">
                <h1>Usuário</h1>
                Baixe nosso App para ajudar o GRAACC e ter os melhores descontos em suas compras!
                <div class="spacer">&nbsp;</div>
                <p><button type="button" class="btn btn-secondary btn-sm">Clique aqui para baixar o app</button></p>
            </div>
            <router-link tag="div" class="col-lg-6 poin" to="/login">
                <h1>Empresas</h1>
                Acesse aqui a página de gerenciamento de cupons e conceda desconto para clientes.
                <div class="spacer">&nbsp;</div>
                <p><button type="button" class="btn btn-secondary btn-sm">Acesse o painel administrativo</button></p>
            </router-link>
        </div>
    </div>
</template>
<style>
.logolanding{
    height: 200px;
    width: auto;
    margin-left: 10px;
}
.spacer{
    height: 20px;
}
.poin{
    cursor: pointer;
}
</style>

<script>
export default {
    methods: {
        getFile(){
            window.open(`${process.env.VUE_APP_API_URL}/file/get`)
        }
    }
}
</script>
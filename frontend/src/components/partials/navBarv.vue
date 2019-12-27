<template>
    <div>
        <nav class="d-none d-md-block bg-light sidebar">
            <div class="sidebar-sticky">
                <a class="navbar-brand" href="#">
                    <img src="@/assets/img/clubeamigo.svg" class="logoTop">
                </a>
                <ul class="nav flex-column">
                    <li class="nav-item">
                        <router-link class="nav-link active" to="/home">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                        Página inicial <span class="sr-only">(current)</span>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/parceiras">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
                        Cadastrar parceiros
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/cupons">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-shopping-cart"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                        Cadastrar cupons
                        </router-link>
                    </li>
                     <li class="nav-item">
                        <router-link class="nav-link" to="/email">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-users"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                        E-mail {{this.$route.params.side}}
                        </router-link>
                    </li>
                   
                </ul>
            </div>
        </nav>
    </div>
</template>
<style>
    .logoTop{
        height: 100px;
        width: auto;
        margin-left: 10px;
    }
    .nav-link {
        color: #000000 !important;
    }
    .sidebar {
        height: 100vh !important;
        position: fixed;
    }
</style>
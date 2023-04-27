<script>
import { RouterLink } from 'vue-router'
import MyButton from './Button.vue'
import { mapWritableState, mapActions} from 'pinia';
import { useMovieStore } from '../stores/movieStore';
  export default {
    components: {
        MyButton
    },
    methods : {
        ...mapActions(useMovieStore, ['swalFire']),
        logout() {
            let username = localStorage.username
            localStorage.clear()
            this.$router.push('/home')
            this.isLogin = false
            this.swalFire('LogoutSuccess', `${username} is successfully logged out.`)
        },
    },
    computed: {
      ...mapWritableState(useMovieStore, ['isLogin']),
      getCurrentPage(){
        return this.$route.name
      }
      // ...mapState(useMovieStore, ['username'])
    }
  }
</script>
<template>
     <!-- Navbar -->
     <nav class="navbar fixed-top navbar-dark navbar-expand-lg" style="background-color: #191919;">
  <div class="container-fluid m-1">
    <RouterLink to="/home" class="navbar-brand">
      <img src="../assets/zetflix-logo-no-bg.png" width="120" alt="Zetflix" />
    </RouterLink>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item" style="font-size: 17px;" v-bind:class="{ active: getCurrentPage === 'home' }">
          <RouterLink to="/home"  class="nav-link text-white" >Home</RouterLink>
        </li>
        <li class="nav-item" v-if="!isLogin" style="font-size: 17px;" v-bind:class="{ active: getCurrentPage === 'login' }">
          <RouterLink to="/login"  class="nav-link text-white">Sign In</RouterLink>
        </li>
        <li class="nav-item" v-if="!isLogin" style="font-size: 17px;" v-bind:class="{ active: getCurrentPage === 'register' }">
          <RouterLink to="/register"  class="nav-link text-white">Sign Up</RouterLink>
        </li>
        <li class="nav-item" v-if="isLogin" style="font-size: 17px;" v-bind:class="{ active: getCurrentPage === 'favorite' }">
          <RouterLink to="/favorites"  class="nav-link text-white" >My Favorites</RouterLink>
        </li>
        <li class="nav-item d-flex m-1" v-if="isLogin">
          <MyButton @click.prevent="logout" class="btn btn-outline-danger btn-sm" type="button" style="background-color: #fe0002; color: white; font-size: 15px;" :buttonName="'Sign Out'" />
        </li>
      </ul>
    </div>              
  </div>
</nav>
    <!-- End Navbar -->
</template>

<style scoped>
  .active {
    font-weight: bolder;
  }
</style>


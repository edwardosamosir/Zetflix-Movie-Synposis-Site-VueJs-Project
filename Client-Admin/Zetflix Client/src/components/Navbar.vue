<script>
import MyButton from './Button.vue'
  export default {
    components: {
        MyButton
    },
    props: ['currentPage', 'username'],
    emits: ['logoutHandler','navPageHandler'],
    methods: {
        changePage(toPage) {
            this.$emit('navPageHandler', toPage)
        },
        logout(){
            this.$emit('logoutHandler')
        }
    }
  }
</script>
<template>
     <!-- Navbar -->
     <nav class="navbar fixed-top navbar-dark  navbar-expand-lg" style="background-color: #191919;">
        <div class="container-fluid m-1">
            <a class="navbar-brand" @click.prevent="changePage('dashboard')">
                <img src="../assets/zetflix-logo-no-bg.png" width="120" alt="Zetflix" />
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav" >
                <div class="navbar-nav mx-auto justify-content-center">
                  <ul class="navbar-nav" style="margin-left:270px;" v-if="currentPage !== 'login' && currentPage !== 'register'">
                    <li class="nav-item" style="margin-right:100px;">
                      <a class="nav-link text-white" aria-current="page" v-bind:class="{ active: currentPage === 'dashboard' }"
                      @click.prevent="changePage('dashboard')"
                      >Dashboard</a>
                    </li>
                    <li class="nav-item" style="margin-right:100px;">
                      <a class="nav-link text-white" v-bind:class="{ active: currentPage === 'movies' }"
                      @click.prevent="changePage('movies')"
                      >Movies</a>
                    </li>
                    <li class="nav-item" style="margin-right:100px;">
                      <a class="nav-link text-white" v-bind:class="{ active: currentPage === 'genres' }"
                      @click.prevent="changePage('genres')"
                      >Genres</a>
                    </li>
                    <li class="nav-item" style="margin-right:100px;">
                      <a class="nav-link text-white" v-bind:class="{ active: currentPage === 'histories' }"
                      @click.prevent="changePage('histories')" 
                      >Logs</a>
                    </li>
                  </ul>
                </div>
                <ul class="nav navbar-nav ml-auto" v-if="currentPage !== 'login' && currentPage !== 'register'">
                  <li class="nav-item d-flex m-1">
                    <span class="navbar-text text-white" id="user-username">{{ "You're logged in as " + username}}</span>
                  </li>
                  <li class="nav-item d-flex m-1" @click="logout()">
                    <MyButton class="btn btn-outline-danger btn-sm" type="button" style="background-color: #fe0002; color: white;" :buttonName="'Log Out'" />
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
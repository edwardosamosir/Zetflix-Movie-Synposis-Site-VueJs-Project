<script>
import { RouterLink, RouterView } from 'vue-router';
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
import { mapActions, mapWritableState } from 'pinia';
import { useMovieStore } from './stores/movieStore';
export default {
  components : {
    Navbar, Footer,
  },
  methods:{
    ...mapActions(useMovieStore, ['fetchMovies', 'fetchGenres', 'fetchFavorites'])
  },
  computed: {
    ...mapWritableState(useMovieStore, ['isLogin'])
  },
  created() {
    if(localStorage.access_token){
      this.isLogin = true;
    }
    this.fetchMovies()
    this.fetchGenres()
    this.fetchFavorites()
  }

}
</script>

<template>
  <div>
    <Navbar />
    <RouterView />
    <Footer />
  </div>
</template>

<style>
body {
  background-image: url('./assets/zetflix-bg.jpg');
  
}
</style>

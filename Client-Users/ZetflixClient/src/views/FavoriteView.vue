<script>
    import FavoriteMovieCard from '../components/FavoriteMovieCard.vue';
    import { mapState } from 'pinia';
    import { useMovieStore } from '../stores/movieStore';
    export default {
        components : {
            FavoriteMovieCard
        },
        computed: {
            ...mapState(useMovieStore, ['favorites'])
        }
    }
</script>
<template>
<div>
    <div class="banner" style="height: 600px; width: 100%; background-color: #191919; text-align: center;">
      <img src="../assets/infinitywars-bg.jpg" style="margin-top: 80px; width: 60%" alt="Zetflix" />
    </div>
    <div class="bg-black" style="padding: 7px;">
        <h2 class="text-white" style="text-align: center;">My Favorite Movies List</h2>
    </div>
    <div class="container" style="margin-bottom: 150px; max-width: 90%;">
      <div class="row" style="margin-top: 1.5%;">
        
          <div class="d-flex flex-wrap justify-content-center">
            <FavoriteMovieCard v-for="favorite in favorites" :key="favorite.id" :favorite="favorite" />
          </div>
        </div>
      </div>
    </div>
</template>
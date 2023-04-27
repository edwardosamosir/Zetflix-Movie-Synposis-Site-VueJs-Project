<script>
import { mapActions } from 'pinia';
import { useMovieStore } from '../stores/movieStore';
      export default {
        props: ['movie'],
        methods: {
            ...mapActions(useMovieStore, ['addMyFavorite'])
        }
      }
</script>
<template>
    <div>
        <div class="card" style="width: 21rem; height: 40rem; margin-left: 20px; margin-bottom: 34px; background-color: #191919; margin-right: 63px;">
        <img  :src="movie.imgUrl" class="card-img-top text-white" style="height: 25rem;" alt="News' Image" />
        <div class="card-body">
            <h5 class="card-title text-white">{{ movie.title }}</h5>
            <h5 class="card-text text-white">Rating: {{ movie.rating}}/10</h5>
        </div>
        <ul class="list-group list-group-flush">
            <div class="btn-group" role="article">
                <button @click.prevent="addMyFavorite(this.movie.id)" type="button" class="btn btn-secondary btn-sm btn-block rounded-0" style="font-size: 18px;">Add to My Favorite</button>
                <RouterLink :to="`/movies/${movie.id}`" class="btn btn-sm btn-block rounded-0 text-white" style="background-color: #fe0002; font-size: 18px;">View Details</RouterLink>
            </div>
        </ul>
        <div class="card-footer">
            <h5 class="text-secondary text-white"> {{ movie.genre }}</h5>
        </div>
    </div>
    </div>
</template>

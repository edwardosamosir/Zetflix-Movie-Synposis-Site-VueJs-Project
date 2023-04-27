<script>
      export default {
        props: ['favorite']
      }
</script>
<template>
    <div>
        <div class="card" style="width: 19rem; height: 39rem; margin-left: 20px; margin-bottom: 34px; background-color: #191919;">
        <img  :src="favorite.Movie.imgUrl" class="card-img-top text-white" style="height: 24rem;" alt="News' Image" />
        <div class="card-body">
            <h5 class="card-title text-white">{{ favorite.Movie.title }}</h5>
            <h5 class="card-text text-white">Rating: {{ favorite.Movie.rating}}/10</h5>
        </div>
        <ul class="list-group list-group-flush">
            <div class="btn-group" role="article">
                <RouterLink :to="`/movies/${this.favorite.Movie.id}`" class="btn btn-sm btn-block text-white" style="font-size: 17px; background-color: red;">View Details</RouterLink>
            </div>
        </ul>
        <div class="card-footer">
            <h5 class="text-secondary text-white"> {{ favorite.Movie.Genre.name }}</h5>
        </div>
    </div>
    </div>
</template>
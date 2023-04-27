<script>
import MyButton from '../components/Button.vue'
import { mapState, mapActions } from 'pinia';
import { useMovieStore } from '../stores/movieStore';
  export default {
    data(){
        return{
            id : this.$route.params.id
        }
    },
    components: {
        MyButton
    },
    computed: {
        ...mapState(useMovieStore, ['moviesWithId']),
    },
    methods: {
        ...mapActions(useMovieStore, ['fetchMovieWithDetails', 'addMyFavorite'])
    },
    created(){
        this.fetchMovieWithDetails(this.id, location)
    }
  }
</script>
<template>
    <div class="d-flex align-items-center justify-content-center" style="height: 500px; margin-top: 200px;">
        <div class="card" style="width: 75%; height: 500px; background-color: #191919;">
            <div class="row">
                <div class="col-12">
                    <h1 class="card-header text-center text-white" style="background-color: #191919;">{{ moviesWithId.title }}</h1>
                </div>
            </div>
            <div class="row">
                <div class="col-3">
                    <img :src="moviesWithId.imgUrl" class="img-fluid rounded-start" style="height: 380px; width: 300px; margin-left: 40px; margin-top: 20px; border-radius: 5px;" alt="News Image">
                </div>
                <div class="col-6">
                    <div class="card-body">
                        <h4 class="card-text text-white"> {{ "Rating : " + moviesWithId.rating }}/10 </h4>
                        <h4 class="card-title text-white">  {{ "Genre : " + moviesWithId.genre }}</h4>
                        <h4 class="card-text text-white"> Trailer Link : <a :href="moviesWithId.trailerUrl" style="color: red;"> {{moviesWithId.title}}</a></h4>
                        <h4 class="card-text text-white mt-5"> Synopsis : </h4>
                        <p class="card-text text-white"> {{ moviesWithId.synopsis }} </p>
                    </div>
                    <div style="margin-left: 15px;">
                        <MyButton  @click.prevent="addMyFavorite(id)" class="btn btn-outline-danger btn-sm" type="button" style="background-color: red;color: white; font-size: 18px; font-weight: bolder;" :buttonName="'Add to My Favorite'" />
                    </div>
                </div>
                <div class="col-2">
                <div v-html="moviesWithId.qrCodeUrl" style="margin-top: 100px; margin-left: 100px; margin-right: 100px ;height: 200px; width: 200px;"> </div>
                </div>
            </div>
        </div>
    </div>
</template>
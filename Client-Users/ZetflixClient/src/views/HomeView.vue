<script>
import MovieCard from '../components/MovieCard.vue';
import { mapActions, mapState, mapWritableState } from 'pinia';
import { useMovieStore } from '../stores/movieStore';
export default {
  components: {
    MovieCard
  },
  data() {
    return {
      currentPage: '',
      previousPage: '',
      nextPage: '',
      maxPage: '',
      localFilterMovies: '',
      localFilterRating: '',
      localFilterGenres: ''
    }
  },
  computed: {
    ...mapState(useMovieStore, ['movies', 'genres', 'moviesWithPagination']),
    ...mapWritableState(useMovieStore, ['filter', 'targetPage']),
    formattedFilter() {
      let formatFilter = ''

      if (this.localFilterMovies !== '' ) formatFilter += this.localFilterMovies
      if (this.localFilterRating === '' ) formatFilter += ',' 
      if (this.localFilterRating !== '' ) formatFilter += ',' + this.localFilterRating
      if (this.localFilterGenres === '' ) formatFilter += ',' 
      if (this.localFilterGenres !== '' ) formatFilter += ',' + this.localFilterGenres

      if(this.localFilterMovies === '' &&  this.localFilterGenres === '' && this.localFilterRating === ''){
        formatFilter = ''
      }
      return formatFilter
    }
  },
  methods: {
    ...mapActions(useMovieStore, ['fetchMovies']),
    localFetchMovies(page) {
      this.fetchMovies(page, this.formattedFilter)
      if (this.formattedFilter !== '') this.$router.push({ name: 'home', query: { filter: this.formattedFilter } })
      else this.$router.push({ name: 'home' })
    }
  },
  watch: {
    moviesWithPagination: {
      handler(newStatus) {
        const { previousPage, currentPage, nextPage, maxPage } = newStatus
        // console.log({previousPage, currentPage, nextPage})
        this.currentPage = currentPage
        this.previousPage = previousPage
        this.nextPage = nextPage
        this.maxPage = maxPage
      },
      deep: true
    }
  },
  mounted() {
    this.currentPage = this.moviesWithPagination.currentPage
    this.previousPage = this.moviesWithPagination.previousPage
    this.nextPage = this.moviesWithPagination.nextPage
    this.maxPage = this.moviesWithPagination.maxPage
  },
  created() {
    // console.log(this.$route.query)
    const rawFilter = this.$route.query.filter || ''
    this.localFilterMovies = rawFilter.split(',')[0] || ''
    this.localFilterRating = rawFilter.split(',')[1] || ''
    this.localFilterGenres = rawFilter.split(',')[2] || ''
    // this.fetchMovies(1,this.$route.query.filter)
    this.localFetchMovies(1)
  }
}
</script>

<template>
  <div>
    <div class="banner" style="height: 600px; width: 100%; background-color: #191919; text-align: center;">
      <img src="../assets/infinitywars-bg.jpg" style="margin-top: 80px; width: 60%" alt="Zetflix" />
    </div>
    <div class="container" style="margin-bottom: 150px; max-width: 90%;">
      <div class="row" style="margin-top: 1.5%;">
        <div class="col-3">
        </div>
        <div class="col-6">
          <h2 class="mt-2 text-white" style="margin-left:20px ; font-weight: bolder;">Movie List</h2>
        </div>
        <div class="col-3">
          <nav aria-label="Page navigation example" class="mt-2 float-end">
            <ul class="pagination">
              <li class="page-item" :class="{ disabled: previousPage === undefined }">
                <a class="page-link text-white" href="#" tabindex="-1" style="background-color: #191919;"
                  @click.prevent="localFetchMovies(previousPage)">Previous</a>
              </li>
              <li class="page-item"><a class="page-link disabled text-white" href="#" style="background-color: #191919;"
                  @click.prevent="localFetchMovies(currentPage)">{{
                    currentPage }} of {{ maxPage }}</a></li>
              <li class="page-item" :class="{ disabled: nextPage === undefined }">
                <a class="page-link text-white" href="#" style="background-color: #191919;"
                  @click.prevent="localFetchMovies(nextPage)">Next</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div class="row">
        <div class="col-3">
          <div class="card mx-auto" style="max-width: 300px; max-height:400px; background-color: #191919;">
            <div class="card-header text-center">
              <h3 class="mt-2 text-white" style="margin-bottom: 25px;">Find Your Movie</h3>
            </div>
            <div class="card-body">
              <form class="form" @submit.prevent="localFetchMovies(1, filter)">
                <div class="form-floating mb-3">
                  <input type="text" class="form-control" id="floatingInput" placeholder="Movie Title" v-model="localFilterMovies" />
                  <label for="floatingInput">Movie Title</label>
                </div>
                <div class="form-floating mb-3">
                  <input type="number" class="form-control" id="floatingInput" placeholder="Movie Rating" v-model="localFilterRating"/>
                  <label for="floatingInput">Movie Rating</label>
                </div>
                <div class="form-floating mb-3">
                  <select id="movies-genres" class="form-select" v-model="localFilterGenres">
                    <option value="" selected>
                      -- Select Movie Genre --
                    </option>
                    <template v-for="genre in genres" :key="genre.id">
                      <option :value="genre.name">{{ genre.name }}</option>
                    </template>
                  </select>
                  <label for="movies-category" style="color: black;">Movie Genre <span
                      class="text-danger fw-bold">*</span></label>
                </div>
                <div>
                  <button type="submit" class="btn float-end" style="background-color: #fe0002; color: white;">
                    Search
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="col-9">
          <div class="d-flex flex-wrap justify-content-start">
            <MovieCard  v-for="movie in moviesWithPagination.moviesData" :key="movie.id" :movie="movie" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
      props: ['genres', 'currentPage', 'movieToEdit', 'formId'],
      emits:['createMovie','editMovie', 'fetchGenres', 'fetchMovies','changePage'],
      data(){
          return {
            movieData:{
              id: null,
              title: "", 
              genreId: null,
              synopsis: "",
              rating: null,
              imgUrl: "", 
              trailerUrl: ""
            }
          }
      },
      methods: {
        submitMovie() {
          if(this.formId === 'New Movie'){
            this.$emit("createMovie", this.movieData)
          }
          else{
            this.$emit("editMovie", this.movieData)
          }
        },
        changePage(value) {
            this.$emit('changePage', value)
        }
      },
      created() {
        if(this.movieToEdit){
          this.movieData.id = this.movieToEdit.id
          this.movieData.title = this.movieToEdit.title
          this.movieData.genreId = this.movieToEdit.genreId
          this.movieData.synopsis = this.movieToEdit.synopsis
          this.movieData.rating = this.movieToEdit.rating
          this.movieData.imgUrl = this.movieToEdit.imgUrl
          this.movieData.trailerUrl = this.movieToEdit.trailerUrl
        }
      }
  }
</script>
<template>
    <section class="container d-flex justify-content-center align-items-center" style="color: white;  margin-top: 150px; margin-bottom: 150px; height: 80vh; ">
        <div class="card w-100" style="max-width: 600px; background-color: #191919; ">
          <div class="card-header text-center w-100">
            <h1>{{ formId }}</h1>
          </div>
          <div class="card-body">
            <form @submit.prevent="submitMovie" id="movies-form">
              <div class="form-floating mt-3">
                <input v-model="movieData.title" type="text" class="form-control" id="movies-name" placeholder="Enter movie title"
                autocomplete="off" required />
                <label for="movies-name" style="color: black;">Title <span class="text-danger fw-bold">*</span></label>
              </div>
              <div class="form-floating mt-3">
                <select v-model="movieData.genreId" id="movies-genres" class="form-select" required>
                  <option value="0" selected disabled>
                    -- Select Movie Genres --
                  </option>
                  <option v-for="genre in genres" :key="genre.id" :value="genre.id">{{genre.name}}</option>
                </select>
                <label for="movies-category" style="color: black;">Genres <span class="text-danger fw-bold">*</span></label>
              </div>
              <div class="form-floating mt-3">
                <input v-model="movieData.synopsis" type="text" class="form-control" id="movies-desc" placeholder="Enter movie synopsis"
                autocomplete="off" required />
                <label for="movies-desc" style="color: black;">Synopsis <span class="text-danger fw-bold">*</span></label>
              </div>

              <div class="form-floating mt-3">
                <input v-model="movieData.rating" type="number" min="0" class="form-control" id="movie-rating" placeholder="Enter movie rating"
                autocomplete="off" required />
                <label for="movies-stock" style="color: black;">Rating <span class="text-danger fw-bold">*</span></label>
              </div>

              <div class="form-floating mt-3">
                <input v-model="movieData.imgUrl" type="text" class="form-control" id="movies-image" placeholder="Enter movie image url"
                autocomplete="off" required />
                <label for="movies-image" style="color: black;">Image <span class="text-danger fw-bold">*</span></label>
              </div>
              <div class="form-floating mt-3">
                <input v-model="movieData.trailerUrl" type="text" class="form-control" id="trailer-url" placeholder="Enter movie trailer url"
                autocomplete="off" required />
                <label for="trailer-url" style="color: black;">Trailer <span class="text-danger fw-bold">*</span></label>
              </div>

              <div class="row mt-5 mb-3">
                <div class="col-6">
                  <a @click="changePage('movies')" class="btn btn-lg btn-light rounded w-100 p-2">Cancel</a>
                </div>
                <div class="col-6">
                  <button class="btn btn-lg btn-danger rounded w-100 p-2" style="background-color: #fe0002;" type="submit">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
</template>
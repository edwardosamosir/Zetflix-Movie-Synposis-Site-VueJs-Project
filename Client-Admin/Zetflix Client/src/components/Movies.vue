<script>
    import TableRow from './TableRow.vue'
    import MyButton from './Button.vue'

    export default {
        components: {
            MyButton,
            TableRow
        },
        props: ['movies', 'role'],
        emits: ['changePage', 'fetchMovies', 'patchMovieStatus', 'setMovieToEdit'],
        methods: {
            changePage(value) {
                this.$emit('changePage', value)
            },
            fetchMovies(){
                this.$emit('fetchMovies')
            },
            patchMovieStatus(value){
                this.$emit('patchMovieStatus', value)
            },
            setMovieToEdit(value){
                this.$emit('setMovieToEdit', value)
            },
        },
        created(){
            this.fetchMovies()
        },
    }
</script>

<template>
    <section class="movies-section" style="margin-top: 200px;">
          <div class="container d-flex flex-column" style="background-color: #191919;  margin-bottom: 100px;">
              <div class="row justify-content-center">
                  <h1 class="text-white text-center">Movies</h1>
              </div>
              <div class="d-flex justify-content-end mb-3">
                <MyButton :buttonId="'addButton'" class="btn btn-danger" style="background-color: #fe0002;" :buttonName="'Add Movies'" @click.prevent="changePage('add-movies')" />
            </div>
              <div class="d-flex justify-content-center gap-3">
                  <table id="movies-table" class="table">
                      <thead class="text-white">
                          <tr>
                              <th scope="col">No</th>
                              <th scope="col">Title</th>
                              <th scope="col">Image</th>
                              <th scope="col">Genre</th>
                              <th scope="col">Trailer URL</th>
                              <th scope="col">Synopsis</th>
                              <th scope="col">Rating</th>
                              <th scope="col">Author</th>
                              <th scope="col">Status</th>
                              <th scope="col">Action</th>
                          </tr>
                      </thead>
                      <tbody class="text-white">
                          <TableRow :tableId="'moviesTable'" @changePage="changePage" @setMovieToEdit="setMovieToEdit" :role="role"
                            v-for="(movie, idx) in movies" :key="movie.id"
                            :movie="movie" :idx="idx" @patchMovieStatus="patchMovieStatus"
                          />
                      </tbody>
                  </table>
              </div>
          </div>
      </section>
</template>

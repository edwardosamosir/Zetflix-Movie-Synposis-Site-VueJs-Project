<script>
    export default {
        props: ['moviesLength', 'genresLength'],
        emits: ['fetchMovies', 'fetchGenres', 'fetchHistories'],
        created(){
          this.$emit('fetchMovies')
          this.$emit('fetchGenres')
          this.$emit('fetchHistories')
        }
    }

</script>
<template>
     <!-- Dashboard Section  -->
     <section class="dashboard-section" style="margin-top: 150px;">
          <div class="container mt-5 pt-4 d-flex flex-column justify-content-start align-items-center" style="height: 90vh;">
            <div class="row mb-3 justify-content-center" style="background-color: #191919; width: 47rem; padding: 10px 0;">
              <h1 class="text-white text-center">Dashboard of Collections</h1>
              <div class="card-header text-center w-100">
                <img src="../assets/zetflix-logo-no-bg.png" width="120" alt="Zetflix">
              </div>
            </div>
            <div class="d-flex justify-content-center gap-3">
              <div class="card text-white" style="width: 23rem; height: 10rem; background-color: #191919;">
                <div class="card-body d-flex flex-column justify-content-center align-items-center">
                  <h3 class="card-title text-center">Total Movies</h3>
                  <br>
                  <h1 class="card-text text-center">{{moviesLength}}</h1>
                </div>
              </div>
              <div class="card text-white" style="width: 23rem; height: 10rem; background-color: #191919;">
                <div class="card-body d-flex flex-column justify-content-center align-items-center">
                  <h3 class="card-title text-center">Total Genres</h3>
                  <br>
                  <h1 class="card-text text-center">{{genresLength}}</h1>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <!-- End Dashboard Section  -->
</template>
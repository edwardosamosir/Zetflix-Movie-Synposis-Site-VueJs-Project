<script>
  export default {
      name: 'FormGenre',
      props:['formId', 'genreToEdit'],
      emits:['createGenre', 'editGenre'],
      data(){
          return {
            genreData:{
              name: "",
              id: null
            }
          }
      },
      created(){
        if (this.genreToEdit) {
          this.genreData.name = this.genreToEdit.name
          this.genreData.id = this.genreToEdit.id

        }
      },
      methods: {
        submitGenre() {
          if(this.formId === 'New Genre'){
            this.$emit("createGenre", this.genreData)
          }
          else{
            this.$emit("editGenre", this.genreData)
          }
        },
        changePage(value) {
            this.$emit('changePage', value)
        }
      }
  }
</script>
<template>
    <section class="container d-flex justify-content-center align-items-center" style="color: white;  margin-bottom: 330px; height: 80vh; ">
      <div class="card w-100" style="max-width: 800px; background-color: #191919; ">
        <div class="card-header text-center w-100">
          <h1>{{ formId }}</h1>
        </div>
        <div class="card-body">
          <form id="genres-form" @submit.prevent="submitGenre">
            <div class="form-floating mt-3">
              <input v-model="genreData.name" type="text" class="form-control" id="genres-name" placeholder="Enter movie title"
              autocomplete="off" required />
              <label for="genres-name" style="color: black;">Name <span class="text-danger fw-bold">*</span></label>
            </div>
            
            <div class="row mt-5 mb-3">
              <div class="col-6">
                <a @click="changePage('genres')" class="btn btn-lg btn-light rounded w-100 p-2" >Cancel</a>
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
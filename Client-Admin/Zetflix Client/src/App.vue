<script>
    import axios from 'axios'
    import Swal from 'sweetalert2'
    import Navbar from './components/Navbar.vue'
    import Login from './components/Login.vue'
    import Register from './components/Register.vue'
    import Dashboard from './components/Dashboard.vue'
    import Movies from './components/Movies.vue'
    import Genres from './components/Genres.vue'
    import Histories from './components/Histories.vue'
    import FormMovies from './components/FormMovies.vue'
    import FormGenres from './components/FormGenres.vue'

    
    
    export default {
        components: {
            Navbar,
            Login,
            Register,
            Dashboard,
            Movies,
            Genres,
            Histories,
            FormMovies,
            FormGenres
        },
        data(){
            return {
                baseUrl: 'https://zetflix-movies.up.railway.app/',
                currentPage: "login",
                username: '',
                email: '',
                role: '',
                genreToEdit: {},
                movieToEdit: {},
                moviesLength: 0,
                genresLength: 0,
                movies: [],
                genres: [],
                histories: [],
            }
        },
        methods: {
            async changePage(page) {
                this.currentPage = page;
            },
            async navPageHandler(value) {
                this.changePage(value)
            },
            async loginHandler(user) {
                // console.log(user)

                try {
                    let { data } = await axios.post(this.baseUrl + "users/login", user)

                    localStorage.setItem('access_token', data.access_token)
                    localStorage.setItem('username', data.username)
                    localStorage.setItem('email', data.email)
                    localStorage.setItem('role', data.role)

                    this.username = data.username
                    this.role = data.role

                    this.changePage('dashboard')

                    this.swalFire('LoginSuccess', data.message)
                } catch (err) {
                    this.swalFire('LoginError', err.response.data.message)
                    // console.log(err.response.data.message)
                }
            },
            async googleLoginHandler(inputData) {
                try {
                    // console.log(inputData)
                    const googleLoginData = await axios({
                        method: 'post',
                        url: `${this.baseUrl}users/login-with-google`,
                        headers: {
                            google_access_token: inputData
                        }
                    })

                    const { data } = googleLoginData
                    localStorage.setItem('access_token', data.access_token)
                    localStorage.setItem('username', data.username)
                    localStorage.setItem('email', data.email)
                    localStorage.setItem('role', data.role)
                    
                    // console.log(data)
                    this.username = data.username
                    this.role = data.role

                    this.fetchMovies()
                    this.fetchGenres()
                    this.fetchHistories()
                    
                    this.changePage('dashboard')
                    // console.log(googleLoginData)

                    this.swalFire('LoginSuccess', data.message)

                } catch (err) {
                    // console.log(err);
                    this.swalFire('LoginError', err.response.data.message)
                }
            },

            async logoutHandler() {
                localStorage.clear()
                this.changePage('login')
                this.swalFire('LogoutSuccess', `${this.username} is successfully logged out.`)
            },
            async registerHandler(newUser){
                try {
                    // console.log(newUser)

                    const {username, email, password, address, phoneNumber} = newUser
                    const registeredUser =  await axios({
                        url: `${this.baseUrl}users/register`,
                        method: 'post',
                        data: {username, email, password, address, phoneNumber}
                    })
                    this.swalFire('RegisterSuccess', registeredUser.data.message)
                    this.changePage('login')
                } catch (err) {
                    // console.log(err.response.data);
                    this.swalFire('RegisterError', err.response.data.message)
                }
            },
            async fetchMovies() {
                try {
                    const {data} = await axios({
                        url: `${this.baseUrl}movies`,
                        method: 'get',
                        headers: {
                            access_token: localStorage.access_token
                        }
                    })

                    this.moviesLength = data.length

                    this.movies = data
                    // console.log(this.movies)
                    // console.log(this.moviesLength)
                } catch (err) {
                    console.log(err)
                }
            },
            async fetchGenres() {
                try {
                    const {data} = await axios({
                        url: `${this.baseUrl}genres`,
                        method: 'get',
                        headers: {
                            access_token: localStorage.access_token
                        }
                    })

                    this.genresLength = data.length

                    this.genres = data
                    // console.log(this.genres)
                    // console.log(this.genresLength)
                } catch (err) {
                    console.log(err)
                }
            },
            async fetchHistories() {
                try {
                    const {data} = await axios({
                        url: `${this.baseUrl}histories`,
                        method: 'get',
                        headers: {
                            access_token: localStorage.access_token
                        }
                    })

                    this.histories = data.allHistory
                    // console.log(this.histories)
                } catch (err) {
                    console.log(err)
                }
            },
            async patchMovieStatus(value){
                try{
                    const {movieId, status} = value
                    const patchedMovie = await axios({
                        url: `${this.baseUrl}movies/${movieId}`,
                        method:'patch',
                        headers: {
                            access_token: localStorage.access_token
                        },
                        data: {
                            status
                        }
                    })
                    this.swalFire('SuccessPatchedMovieStatus', patchedMovie.data.message)
                    
                    this.fetchMovies()
                }
                catch(err){
                    // console.log(err)
                    this.swalFire('ErrorPatchedMovieStatus', err.response.data.message)
                }   
            },
            async createMovie(value){
                try {
                    const {title, genreId, synopsis, rating,imgUrl, trailerUrl} = value
                    const newMovie = await axios({
                        url: `${this.baseUrl}movies`,
                        method:'post',
                        headers: {
                            access_token: localStorage.access_token
                        },
                        data: {
                            title, 
                            genreId,
                            synopsis,
                            rating,
                            imgUrl, 
                            trailerUrl
                        }
                    })
                    // console.log(newMovie)

                    this.swalFire('SuccessAddedMovie', newMovie.data.message)
                    this.changePage('movies')
                } catch (err) {
                    // console.log(err)
                    this.swalFire('ErrorAddedMovie', err.response.data.message)
                }
            },
            async editMovie(value){
                try {
                    const {id, title, genreId, synopsis, rating,imgUrl, trailerUrl} = value
                    const editedMovie = await axios({
                        url: `${this.baseUrl}movies/${id}`,
                        method:'put',
                        headers: {
                            access_token: localStorage.access_token
                        },
                        data: {
                            title, 
                            genreId,
                            synopsis,
                            rating,
                            imgUrl, 
                            trailerUrl
                        }
                    })
                    // console.log(editedMovie)

                    if(editedMovie.status === 200){
                        this.swalFire('SuccessEditedMovie', editedMovie.data.message)
                    }

                    this.changePage('movies')
                } catch (err) {
                    // console.log(err)
                    this.swalFire('ErrorEditedMovie', err.response.data.message)
                }
            },
            async createGenre(value){
                try {
                    const {name} = value
                    const newGenre = await axios({
                        url: `${this.baseUrl}genres`,
                        method:'post',
                        headers: {
                            access_token: localStorage.access_token
                        },
                        data: {
                            name
                        }
                    })
                    // console.log(newGenre)
                    this.swalFire('SuccessAddedGenre', newGenre.data.message)
                    this.changePage('genres')
                } catch (err) {
                    // console.log(err)
                    this.swalFire('ErrorAddedGenre', err.response.data.message)
                }
            },
            async editGenre(value){
                try {
                    // console.log(value)
                    const {id, name} = value
                    const editedGenre = await axios({
                        url: `${this.baseUrl}genres/${id}`,
                        method:'put',
                        headers: {
                            access_token: localStorage.access_token
                        },
                        data: {
                            name
                        }
                    })
                    // console.log(editedGenre)
                    if(editedGenre.status === 200){
                        this.swalFire('SuccessEditedGenre', editedGenre.data.message)
                    }
                    this.changePage('genres')
                } catch (err) {
                    // console.log(err)
                    this.swalFire('ErrorEditedGenre', err.response.data.message)
                }
            },
            async deleteGenre(value){
                try {
                    // console.log(value);
                    const {id} = value
                    const deletedGenre = await axios({
                        url: `${this.baseUrl}genres/${id}`,
                        method:'delete',
                        headers: {
                            access_token: localStorage.access_token
                        }
                    })
                    // console.log(deletedGenre)
                    this.swalFire('SuccessDeletedGenre', deletedGenre.data.message)
                    this.fetchGenres()
                    this.changePage('genres')
                } catch (err) {
                    // console.log(err)
                    this.swalFire('ErrorDeletedGenre', err.response.data.message)
                }
            },
            setGenreToEdit(value){
                this.genreToEdit = value
            },
            setMovieToEdit(value){
                this.movieToEdit = value
            },
            swalFire(value, data){
                
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 2000
                });

                switch (value) {
                    case 'LoginSuccess':
                    case 'RegisterSuccess':
                    case 'LogoutSuccess':
                        Toast.fire({
                            icon: "success",
                            iconColor: "red",
                            background: "#191919",
                            color: "white",
                            template: '#toast-template',
                            title: data
                        });
                        break;
                    case 'SuccessPatchedMovieStatus':
                    case 'SuccessAddedMovie':
                    case 'SuccessEditedMovie':
                    case 'SuccessAddedGenre':
                    case 'SuccessEditedGenre':
                    case 'SuccessDeletedGenre':
                        Swal.fire({
                            icon: "success",
                            iconColor: "red",
                            confirmButtonColor: "red",
                            background: "#191919",
                            color: "white",
                            template: '#my-template',
                            title: data
                        });   
                        break;
                    case 'LoginError':
                    case 'RegisterError':                     
                    case 'ErrorPatchedMovieStatus':
                    case 'ErrorAddedMovie':
                    case 'ErrorEditedMovie':
                    case 'ErrorAddedGenre':
                    case 'ErrorEditedGenre':
                    case 'ErrorDeletedGenre':
                        Swal.fire({
                            icon: "error",
                            iconColor: "red",
                            confirmButtonColor: "red",
                            background: "#191919",
                            color: "white",
                            template: '#my-template',
                            title: data
                        });   
                        break;

                } 
            }
            
        },
        created(){
            if(localStorage.access_token){
                this.currentPage = 'dashboard'
                this.username = localStorage.username
                this.role = localStorage.role
                // console.log(this.role)
                this.fetchMovies()
                this.fetchGenres()
                this.fetchHistories()
            }
        }
    }
    
</script>

<template>

    <!-- Sweet Alert template -->
  <template id="my-template">
    <swal-icon type="warning" color="red"></swal-icon>
    <swal-button type="confirm" color="red">OK</swal-button>
  </template>

  <template id="toast-template">
    <swal-icon type="warning" color="red"></swal-icon>
  </template>

  <!-- End Sweet Alert template -->

   <Navbar 
        :currentPage="currentPage"
        :username="username"
        @logoutHandler="logoutHandler"
        @navPageHandler="navPageHandler"
    />
   <Login 
        v-if="currentPage === 'login'"
        @loginHandler="loginHandler"
        @changePage="changePage"
        @googleLoginHandler="googleLoginHandler" 
    />
   <Register 
        v-if="currentPage === 'register'"
        @registerHandler="registerHandler"
        @changePage="changePage"
    />
   <Dashboard 
        v-if="currentPage === 'dashboard'"
        :moviesLength="moviesLength"
        :genresLength="genresLength"
        @fetchMovies="fetchMovies"
        @fetchGenres="fetchGenres"
        @fetchHistories="fetchHistories"
   />
   <Movies 
        v-else-if="currentPage === 'movies'" :role="role"
        @changePage="changePage"
        @fetchMovies="fetchMovies"
        @patchMovieStatus="patchMovieStatus"
        :movies="movies"
        @setMovieToEdit="setMovieToEdit"
   />
   <Genres 
        v-else-if="currentPage === 'genres'"
        @changePage="changePage"
        @fetchGenres="fetchGenres"
        :genres="genres"
        @setGenreToEdit="setGenreToEdit"
        @deleteGenre="deleteGenre"
   />
   <Histories
        v-else-if="currentPage === 'histories'"
        @changePage="changePage"
        @fetchHistories="fetchHistories"
        :histories="histories"
   />
   <FormMovies
        v-else-if="currentPage === 'add-movies'"
        @changePage="changePage"
        @fetchMovies="fetchMovies"
        @fetchGenres="fetchGenres"
        @createMovie="createMovie"
        :genres="genres"
        :currentPage="currentPage"
        :formId="'New Movie'"
   />
   <FormMovies
        v-else-if="currentPage === 'edit-movies'"
        @changePage="changePage"
        @fetchMovies="fetchMovies"
        @fetchGenres="fetchGenres"
        @editMovie="editMovie"
        :genres="genres"
        :currentPage="currentPage"
        :formId="'Edit Movie'"
        :movieToEdit="movieToEdit"
   />
   <FormGenres
        v-else-if="currentPage === 'add-genres'"
        @changePage="changePage"
        @createGenre="createGenre"
        :formId="'New Genre'"
   />
   <FormGenres
        v-else-if="currentPage === 'edit-genres'"
        @changePage="changePage"
        @editGenre="editGenre"
        :formId="'Edit Genre'"
        :genreToEdit="genreToEdit"
   />
   
</template>

<style scoped>

</style>

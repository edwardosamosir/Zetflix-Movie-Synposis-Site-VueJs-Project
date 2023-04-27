import { defineStore } from 'pinia'
import axios from "axios";
import Swal from "sweetalert2";

export const useMovieStore = defineStore('movie', {
  state: () => ({
    baseUrl: 'https://zetflix-movies.up.railway.app/customers/',
    isLogin: false,
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
    movies: [],
    favorites: [],
    genres:[],
    moviesWithPagination: {
      moviesData: [],
      currentPage: "",
      previousPage: "",
      nextPage: "",
      maxPage: 0,
    },
    targetPage: 1,
    filter: "",
    customerInfo: "",
    idDetailMovie: "",
    moviesWithId: {
      title: "",
      genre: "",
      rating: 0,
      synopsis: "",
      author: "",
      imgUrl: "",
      trailerUrl: "",
      qrCodeUrl: "",
    }

  }),
  actions: {

    async login() {
      try {
        const { data } = await axios({
          method: "post",
          url: `${this.baseUrl}login`,
          data: {
            email: this.email,
            password: this.password,
          },
        });
        localStorage.setItem('access_token', data.access_token)
        localStorage.setItem('username', data.username)
        localStorage.setItem('email', data.email)
        this.fetchMovies()
        this.fetchGenres()
        this.fetchFavorites()
        

        this.router.push("/");
        this.isLogin = true;
        this.username = data.username
        this.email = data.email

        this.username = ''
        this.email = ''
        this.password = ''
        // console.log(data)
        this.swalFire('LoginSuccess', data.message)
      } catch (err) {
        // console.log(err)
        this.swalFire('LoginError', err.response.data.message)
      }
    },
    async googleLogin(googleCredential) {
      try {
        const { data } = await axios({
          method: "post",
          url: `${this.baseUrl}login-with-google`,
          headers: {
            google_access_token: googleCredential,
          },
        });

        localStorage.setItem('access_token', data.access_token)
        localStorage.setItem('username', data.username)
        localStorage.setItem('email', data.email)
        this.fetchMovies()
        this.fetchGenres()
        this.fetchFavorites()
        

        this.router.push("/");
        this.isLogin = true;

        // console.log(data)
        this.swalFire('LoginSuccess', data.message)
      } catch (err) {
        // console.log(err)
        this.swalFire('LoginError', err.response.data.message)
      }
    },
    async register() {
      try {
        const { data } = await axios({
          method: "post",
          url: `${this.baseUrl}register`,
          data: {
            username: this.username,
            email: this.email,
            password: this.password,
            phoneNumber: this.phoneNumber,
            address: this.address
          },
        });
        // console.log(data.message)
        this.swalFire('RegisterSuccess', data.message)
        this.username = ''
        this.email = ''
        this.password = ''
        this.phoneNumber = ''
        this.address = ''
        this.router.push("/login");
      } catch (err) {
        // console.log(err)
        this.swalFire('RegisterError', err.response.data.message)
      }
    },
    async fetchMovies(value1 = this.targetPage, value2 = this.filter) {
      try {
        
        const { data } = await axios({
          url: `${this.baseUrl}movies`,
          method: 'get',
          params: {
            page: value1,
            filter: value2
          }
        })

        this.movies = data.result.data
        this.moviesWithPagination.moviesData = data.result.data
        this.moviesWithPagination.currentPage = data.result.page
        this.moviesWithPagination.previousPage = data.result.previousPage
        this.moviesWithPagination.nextPage = data.result.nextPage
        this.moviesWithPagination.maxPage= data.result.maxPage
        // console.log(data)
      } catch (err) {
        console.log(err)
      }
    },
    async fetchGenres(){
      try {
        const { data } = await axios({
          url: `${this.baseUrl}genres`,
          method: 'get'
        });

        this.genres = data;
        // console.log(data)
      } catch (err) {
        console.log(err)
      }
    },
    async fetchFavorites() {
      try {
        const {data} = await axios({
          method: "get",
          url: `${this.baseUrl}favorites`,
          headers: {
            access_token: localStorage.access_token
          },
        });

        this.favorites = data;
        // console.log(data)
      } catch (err) {
        console.log(err);
      }
    },
    async addMyFavorite(value) {
      try {
        const { data } = await axios({
          method: "post",
          url: `${this.baseUrl}favorites/${value}`,
          headers: {
            access_token: localStorage.access_token,
          },
        });

        this.fetchFavorites();
        this.swalFire('SuccessAddedFavorite', data.message)
        console.log(data)

      } catch (err) {
        // console.log(err.response.data.message)
        this.swalFire('ErrorAddedFavorite', err.response.data.message)
      }
    },
    async fetchMovieWithDetails(value, origin) {
      try {
        const { data } = await axios({
          method: "get",
          url: `${this.baseUrl}movies/${value}`,
          params: {
            origin
          },
        });

        // console.log(data)
        this.moviesWithId.title = data.title,
        this.moviesWithId.genre = data.Genre.name
        this.moviesWithId.rating = data.rating
        this.moviesWithId.synopsis = data.synopsis
        this.moviesWithId.author = data.author.username
        this.moviesWithId.imgUrl = data.imgUrl
        this.moviesWithId.trailerUrl = data.trailerUrl
        this.moviesWithId.qrCodeUrl = data.qrcode
      } catch (err) {
        console.log(err)
        this.router.push('/NotFound')
        this.swalFire('ErrorViewDetails', err.response.data.message)
      }
    },
    swalFire(value, data) {

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
        case 'SuccessAddedFavorite':
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
        case 'ErrorAddedFavorite':
        case 'ErrorViewDetails':
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
})

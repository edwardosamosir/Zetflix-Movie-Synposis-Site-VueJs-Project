<script>
import { RouterLink } from 'vue-router'
import { mapActions, mapWritableState } from 'pinia';
import { useMovieStore } from '../stores/movieStore';

export default {
  methods:{
    ...mapActions(useMovieStore, ['login', 'googleLogin']),
    async loginGoogle(response){
            try {
                this.googleLogin(response.credential)
            } catch (err) {
                console.log(err)
            }
        },
  },
  computed : {
    ...mapWritableState(useMovieStore, ['isLogin','email','password'])
  },

}
</script>
<template>
  <!-- Login Section -->
  <section class="container " style="margin-top: 200px; color: white; height: 90vh;">
         <div class="card mx-auto" style="max-width: 500px; background-color: #191919;">
           <div class="card-header text-center">
             <img src="../assets/zetflix-logo-no-bg.png" width="120" alt="Zetflix">
           </div>
           <div class="card-body">
             <form @submit.prevent="login">
               <h5 class="card-title text-center">Sign in to Zetflix</h5>
               <br>
               <div class="form-floating mt-3">
                   <input v-model="email" type="email" class="form-control" id="login-email" placeholder="Enter Email Address" autocomplete="off" required>
                   <label for="login-email" class="form-label" style="color: #191919;">Email</label>
               </div>
               <div class="form-floating mt-3">
                   <input v-model="password" type="password" class="form-control" id="login-password" placeholder="Enter your password" autocomplete="off" required>
                   <label for="login-password" class="form-label" style="color: #191919;">Password</label>
               </div>
               <br>
               <div class="mb-3 form-check">
                 <input type="checkbox" class="form-check-input" id="login-remember">
                 <label class="form-check-label" for="login-remember">Remember me</label>
                 <br>
               </div>
               <button type="submit" class="btn btn-danger w-100" style="background-color: #fe0002;">Sign In</button>
             </form>
             <hr>
             <div style="text-align: center;">
                <GoogleLogin :callback="loginGoogle" prompt style="display: inline-block;" />
             </div>
             <br>
             <p class="card-text text-center">Don't have an account? <RouterLink to="/register"  style="color: #fe0002;">Sign up</RouterLink></p>
         </div>
         </div>
       </section>
 <!-- End Login Section -->
</template>
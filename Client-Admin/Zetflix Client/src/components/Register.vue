<script>
  export default{
    emits: ['registerHandler', 'changePage'],
    data(){
      return {
        newUser: {
          username: "",
          email: "",
          password: "",
          phoneNumber: "",
          address: ""
        }
      }
    },
    methods: {
      submitRegister() {
        this.$emit("registerHandler", this.newUser)
      },
      moveToLogin() {
        this.$emit("changePage", "login")
      }   
    }
  }
    

</script>

<template>
    <!-- Signup Section -->      
    <section class="container  d-flex justify-content-center align-items-center" style="margin-top: 100px; margin-bottom: 100px; color: white; height: 90vh;">
        <div class="card w-100" style="max-width: 500px; background-color: #191919;">
          <div class="card-header text-center w-100">
            <img src="../assets/zetflix-logo-no-bg.png" width="120" alt="Zetflix">
          </div>
          <div class="card-body">
            <form id="Signup-form" @submit.prevent="submitRegister">
              <h5 class="card-title text-center">Sign up to Zetflix</h5>
              <br>
              <div class="form-floating mt-3">
                <input v-model="newUser.username" type="text" class="form-control" id="Signup-username" placeholder="Enter your username" autocomplete="off" required>
                <label for="Signup-username" class="form-label" style="color: #191919;">Username</label>
              </div>
              <div class="form-floating mt-3">
                <input v-model="newUser.email" type="email" class="form-control" id="Signup-email" placeholder="Enter email address" autocomplete="off" required>
                <label for="Signup-email" class="form-label" style="color: #191919;">Email</label>
              </div>
              <div class="form-floating mt-3">
                <input v-model="newUser.password" type="password" class="form-control" id="Signup-password" placeholder="Enter your password" autocomplete="off" required>
                <label for="Signup-password" class="form-label" style="color: #191919;">Password</label>
              </div>
              <div class="form-floating mt-3">
                <input v-model="newUser.phoneNumber" type="number" class="form-control" id="Signup-phone" placeholder="Enter phone number (optional)" autocomplete="off">
                <label for="Signup-phone" class="form-label" style="color: #191919;">Phone Number</label>
              </div>
              <div class="form-floating mt-3">
                <textarea v-model="newUser.address"  id="Signup-address" class="form-control" rows="3" placeholder="Enter your address (optional)" autocomplete="off"></textarea>
                <label for="Signup-address" class="form-label" style="color: #191919;">Address</label>
              </div>
              <br>
              <button class="btn btn-danger w-100" type="submit" style="background-color: #fe0002;">Sign Up</button>
              <br>
              <br>
              <p class="card-text text-center">Already have an account? <a a href="" @click.prevent="moveToLogin" style="color: #fe0002;">Log in</a></p>
            </form>
          </div>
        </div>
      </section>
  <!-- End Signup Section -->
</template>
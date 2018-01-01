<template>
  <div>
    <section class="hero is-info ">
      <div class="hero-body">
        <div class="container is-fluid">


          <div class="level">

            <div class="level-item">
              <div class="login-page">

                <div class="form">

                  <template v-if="show">

                    <template v-if="signedUp">
                      <form class="login-form">
                        <input type="text"  placeholder="email@natterbase.com" v-model="email" />
                        <input type="password" placeholder="password" v-model="password" />
                        <a class="button is-info is-rounded" v-bind:class="{'is-loading':loading}" v-on:click="login()">Clock In </a>
                        <p class="message">Not registered?
                          <a v-on:click="signUp()">Create an account</a>
                        </p>
                      </form>
                    </template>


                    <template v-if="notSignedUp">

                      <form class="register-form">
                        <input type="text" placeholder="email@natterbase.com" v-model="email" />
                        <input type="password" placeholder="password" v-model="password" />

                        <select name="access" id="access" v-model="access">
                          <option value="" disabled selected>Access</option>
                          <option value="staff" selected>Staff</option>
                          <option value="admin">Admin</option>
                        </select>

                        <a class="button is-info is-rounded" v-bind:class="{'is-loading':loading}" v-on:click="createUser()">Create Account</a>

                        <p class="message">Already registered?
                          <a v-on:click="signUp()">Sign In</a>
                        </p>
                      </form>
                    </template>



                  </template>

                  <template v-if="welcome">
                    <div class="response-page">
                      <h2>Success</h2>
                      <h5>Youve successfully created your time tracking account
                      </h5>
                    </div>
                  </template>

                </div>

              </div>
            </div>
            <div class="level-item">
              <h1 class="title is-size-1-desktop">Logger
                <span class="is-size-6">by</span>
                </by>
                <span class="is-size-4-desktop has-text-white">NatterBase</span>
              </h1>
            </div>

          </div>


        </div>
      </div>
    </section>

  </div>
</template>

<script>
  import axios from 'axios';
  import {
    OrbitSpinner
  } from 'epic-spinners';
  import Toasted from 'vue-toasted';
  import fontawesome from '@fortawesome/fontawesome'
  import faSolid from '@fortawesome/fontawesome-free-solid'

  export default {
    name: 'Login',

    data() {
      return {
        signedUp: true,
        email: "",
        password: "",
        access: "",
        resp: "",
        welcome: false,
        logins: {},
        loading: false,
        notSignedUp: false,
        show: true


      }
    },
    methods: {
      signUp() {
        this.signedUp = !this.signedUp
        this.notSignedUp = !this.notSignedUp
      },
      login() {
        this.loading = !this.loading
        axios.post("http://localhost:4000/api/auth/login", {

          password: this.password,
          email: this.email

        }).then(response => {
          this.loading = !this.loading
          if (response.data.type == true && response.data.data == 'staff') {


            this.resp = response.data.user.dateLoggedIn
            this.logins = response.data.logins
            this.access = response.data.user.access

            this.$router.push({
              name: 'LoggedIn',
              params: {
                email: this.email,
                resp: this.resp,
                logins: this.logins,
                access: this.access
              }
            })
          }

          if (response.data.type == true && response.data.data == 'admin') {
            this.resp = response.data.user.dateLoggedIn
            this.logins = response.data.logins
            this.access = response.data.data.access

            this.$router.push({
              name: 'adminLoggedIn',
              params: {
                email: this.email,
                resp: this.resp,
                logins: this.logins,
                access: this.access
              }
            })
          } else {

            this.$toasted.show(`${fontawesome.icon(faSolid.faMinusCircle).html} &nbsp ${response.data.message} `, {
              type: 'error',
              duration: 3000
            })
          };

        }).catch(e => {
          done(e)
        })
      },


      createUser() {

        this.loading = !this.loading
        axios.post("http://localhost:4000/api/auth/signup", {

          password: this.password,
          email: this.email,
          access: this.access

        }).then(response => {
         
          if (response.data.type == true) {
            this.show = !this.show
            this.loading = !this.loading
            this.welcome = !this.welcome
            this.signedUp = !this.signedUp;
          } else {
            this.loading = !this.loading
            this.$toasted.show(`${fontawesome.icon(faSolid.faMinusCircle).html} &nbsp ${response.data.message} `, {
              type: 'error',
              duration: 3000
            })
            this.password = "";
            this.email = "";


          }


        }).catch(e => {
          console.log(e)

        })
      }
    },
    components: {
      OrbitSpinner
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /* @import url(https://fonts.googleapis.com/css?family=Roboto:300); */

  @import url('https://fonts.googleapis.com/css?family=Ubuntu');

  .title {
    font-family: "Ubuntu";
  }

  .spinner {
    margin: 20px auto;
  }

  .login-page {
    width: 360px;
    padding: 8% 0 0;
    margin: auto;
  }

  .response-page {
    font-family: "Roboto", sans-serif;
  }

  .response-page h2 {
    color: #43A047
  }




  .form {
    position: relative;
    z-index: 1;
    background: #FFFFFF;
    max-width: 360px;
    margin: 0 auto 100px;
    padding: 45px;
    text-align: center;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
    
  }

  .form input {
    font-family: "Roboto", sans-serif;
    outline: 0;
    background: #f2f2f2;
    width: 100%;
    border: 0;
    margin: 0 0 15px;
    padding: 15px;
    box-sizing: border-box;
    font-size: 14px;
  }

  .form select {
    font-family: "Roboto", sans-serif;
    outline: 0;
    background: #f2f2f2;
    width: 100%;
    border: 0;
    margin: 0 0 15px;
    padding: 15px;
    box-sizing: border-box;
    font-size: 14px;
  }
  /* 
  .form button {
    font-family: "Roboto", sans-serif;
    text-transform: uppercase;
    outline: 0;
    background: #4CAF50;
    width: 100%;
    border: 0;
    padding: 15px;
    color: #FFFFFF;
    font-size: 14px;
    -webkit-transition: all 0.3 ease;
    transition: all 0.3 ease;
    cursor: pointer;
  } */
  /* .form button:hover,
  .form button:active,
  .form button:focus {
    background: #43A047;
  } */

  .form .message {
    margin: 15px 0 0;
    color: #b3b3b3;
    font-size: 12px;
  }

  .form .message a {
    color: #55acee;
    text-decoration: none;
  }
  /* #app {
    margin:0
  } */
  /* .form .register-form {
    display: none;
  } */
  /* .container {
    position: relative;
    z-index: 1;
    max-width: 300px;
    margin: 0 auto;
  }

  .container:before,
  .container:after {
    content: "";
    display: block;
    clear: both;
  }

  .container .info {
    margin: 50px auto;
    text-align: center;
  }

  .container .info h1 {
    margin: 0 0 15px;
    padding: 0;
    font-size: 36px;
    font-weight: 300;
    color: #1a1a1a;
  }

  .container .info span {
    color: #4d4d4d;
    font-size: 12px;
  }

  .container .info span a {
    color: #000000;
    text-decoration: none;
  }

  .container .info span .fa {
    color: #EF3B3A;
  } */

  body {
    background: #76b852;
    /* fallback for old browsers */
    background: -webkit-linear-gradient(right, #76b852, #8DC26F);
    background: -moz-linear-gradient(right, #76b852, #8DC26F);
    background: -o-linear-gradient(right, #76b852, #8DC26F);
    background: linear-gradient(to left, #76b852, #8DC26F);
    font-family: "Roboto", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

</style>

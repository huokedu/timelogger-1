<template>
  <div>
    <section class="hero is-info ">
      <div class="hero-body">
        <div class="container is-fluid">
        </div>
        <div class="login">

          <div class="login-page">

            <div class="form">

              <div class="response-page">
                <h2 class="title is-size-3 has-text-info">Welcome {{email}}</h2>
                <h2 class=" is-size-6  has-text-grey-dark">You clocked in today at
                  <br>
                  <span>{{ resp | moment('MMMM Do YYYY, h:mm:ss a') }}</span>
                </h2>
                <hr>
                <h2 class=" is-size-6  has-text-info ">Your previous logins include</h2>
                <hr>
                <h5 class=" is-size-6 has-text-grey-light has-text-weight-light">
                  <p v-for="login in logins">{{login.dateLoggedIn | moment('MMMM Do YYYY, h:mm:ss a')}}
                    <p/>
                </h5>
                <br>
                <router-link class="has-text-info is-size-7 has-text-weight-light" to="/">Back</router-link>
              </div>




              <!-- <template v-if="welcome"> -->
              <!-- <div class="response-page">
                            <h2>Success</h2>
                            <h5>Youve successfully created your time tracking account
                            </h5>
                          </div> -->
              <!-- </template> -->

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

  export default {
    name: 'LoggedIn',
    props: ['resp', 'email', 'logins'],

    data() {

      return {

      }
    },


    components: {
      OrbitSpinner
    },

    mounted() {
      console.log(this.resp, "ha")
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import url('https://fonts.googleapis.com/css?family=Ubuntu');

  .title {
    font-family: "Ubuntu";
  }

  #app {
    margin: 0;
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
  /* .response-page h2 {
          color: #43A047
        } */

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

</style>

<template>
  <div>
    <section class="hero is-info ">
      <div class="hero-body">
        <div class="container is-fluid">
          <div class="login">
           <router-link to="/" class="button has-text-info is-pulled-left " style="display:inline">Back</router-link> <h1  style="display:inline" class="title has-text-white is-size-3">Admin Dashboard</h1>
            <hr>

            <h2 class="title is-size-4 has-text-white">Welcome {{email}}</h2> 

            <div class="columns">
              <div class="column">
                <div class="box is-pulled-right">


                  <h5 class="title is-size-6 has-text-grey">You clocked in today at
                    <br>
                    <span>{{ resp | moment('MMMM Do YYYY, h:mm:ss a') }}</span>
                  </h5>
                </div>
              </div>

              <div class="column">

                <div class="box is-pulled-left">
                  <h2 class="title has-text-info is-size-5 ">List of Staff</h2>
                  <br>

                  <template v-for="staff in staffs">
                    <div class="box" @click="getStaff(staff)">
                      <article class="media">
                        <div class="media-left">
                          <figure class="image is-64x64">
                            <img src="../assets/avataaars.png" alt="Image">
                          </figure>
                        </div>
                        <div class="media-content">
                          <div class="content">
                            <p>
                              <strong>{{staff.email}}</strong>
                              <br> {{staff.access}}
                            </p>
                          </div>

                        </div>
                      </article>
                    </div>
                  </template>

                </div>
              </div>



              <!-- <template v-show="infoShown">
              <div class="staff-info">
                <h2>Staff Logins</h2>
                <template v-for="date in logindates">
                  <h5>{{date.dateLoggedIn | moment('MMMM Do YYYY, h:mm:ss a') }}</h5>
                </template>
              </div>
            </template> -->
            </div>




          </div>
          <div class="modal" v-bind:class="{'is-active': modalActive}">
              <div class="modal-background"></div>
              <div class="modal-content">
                
                <div class="box">
                    <h2 class="title has-text-info is-size-4">{{staff}}</h2>
                    <hr>
                <template v-for="date in logindates">
                  
                  <h5 class="title has-text-grey is-size-7">{{date.dateLoggedIn | moment('MMMM Do YYYY, h:mm:ss a') }}</h5>
                
                </template>
              </div>
              </div>
              <a class="modal-close is-large" v-on:click="modalClose()" aria-label="close"></a>
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
        staffs: [],
        infoShown: false,
        logindates: [],
        modalActive: false,
        staff:""
      }
    },

    methods: {

      getStaff(staff) {
        this.staff = staff.email
        this.modalActive = !this.modalActive
        axios.get(`http://localhost:4000/api/user/${staff.email}`, {

        }).then(response => {

          var res = response.data
          this.logindates = res
        })

      },
      modalClose() {
        this.modalActive = !this.modalActive;
      }
    },

    components: {
      OrbitSpinner
    },

    created() {
      axios.get("http://localhost:4000/api/user/users").then(response => {
        var res = response.data
        this.staffs = res
      })


    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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



    padding: 45px;
    text-align: center;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.20);
    border-radius: 10px;
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

<template>
    <div>
      <header-logo/>
      <div class="col-md-4">
        <form class ="signup_form">
          <label for ="firstName-input" class = "form-label"></label>
            <input type="text" class="form-control" id = "signup_firstName" placeholder="First Name" maxlength="15" v-model="firstName" required/> 
          <label for ="lastName-input" class = "form-label"></label>
            <input type = "text" class="form-control" id = "signup_lastName" placeholder="Last Name" maxlength = "20" v-model="lastName" required />
          <label for ="email-input" class = "form-label"></label>
            <input type = "text" class="form-control" id = "signup_email" placeholder= "Email" minlength="10" v-on:change="emailValidation()" v-model="email" required />
          <label for = "password-input" class = "form-label"></label>
            <input type = "text" class="form-control" id = "signup_password" placeholder = "Password" minlength="8" v-on:change="passwordValidation()" v-model="password" required/>
          <router-link to = "/">
            <input type="submit" id = "signup_btn_2" v-on:click ="SignUp()" value = "Sign Up"/>
          </router-link>
        </form>
      </div>
    </div>
  </template>
  
  
  <script>
  import HeaderLogo from './HeaderLogo.vue';
  export default {
    name: "SignUp",
    data() {
      return {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passConditions: {
          email: false,
          password: false
        }
      };
    },
    watch: {
      password() {
        this.passwordValidation()
      },
      email() {
        this.emailValidation()
      }
    },
   
    methods: {
      passwordValidation() {
        let password = this.password;
        // console.log(password)
        let passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        // console.log(passwordRegEx.test(password))
        if (passwordRegEx.test(password)) {
          this.passConditions.password = true 
          // console.log(this.passConditions)
        } else {
          this.passConditions.password = false
        }
        //Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
      },
      emailValidation() {
        let email = this.email;
        let emailRegEx = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
        if (emailRegEx.test(email)) {
          this.passConditions.email = true 
        } else {
          this.passConditions.email = false
        }
      },
      SignUp() {
        const signUpForm = {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password
        }
        const requestOptions = {
          method: "POST",
          headers: {
          "Content-Type": "application/json",
          },
          body: JSON.stringify(signUpForm),
        };
        if (this.passConditions.password && this.passConditions.email === true) {
          fetch("http://localhost:3000/api/users/signup", requestOptions)
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              console.log(data);
              if (response.ok) {
                // localStorage.setItem('token', res.data.token);
                this.$router.push("/");
              }
            })
            .catch((error) => {
              error: error;
            })
          }
        }
      },
    
    components: { 
      HeaderLogo
    }
  }
  </script>

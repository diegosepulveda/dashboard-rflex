<template>
  <v-app id="inspire">
    <div class="limiter">
		<div class="container-login100">
			<div class="wrap-login100">
				<div class="login100-pic js-tilt" data-tilt>
					<img src="../assets/login/images/img-01.png" alt="IMG">
				</div>

				<form v-on:submit.prevent="" class="login100-form validate-form">
					<span class="login100-form-title">
						Login
					</span>

					<div class="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
						<input class="input100" type="text"  v-model="user" placeholder="Usuario">
						<span class="focus-input100"></span>
						<span class="symbol-input100">
							<i class="fa fa-envelope" aria-hidden="true"></i>
						</span>
					</div>

					<div class="wrap-input100 validate-input" data-validate = "Password is required">
						<input class="input100" type="password"  v-model="pass" placeholder="Password">
						<span class="focus-input100"></span>
						<span class="symbol-input100">
							<i class="fa fa-lock" aria-hidden="true"></i>
						</span>
					</div>
					
					<div class="container-login100-form-btn">
						<button @click="btnLogin()" class="login100-form-btn">
							Login
						</button>
					</div>

					<div  class="text-center p-t-12">
						<span class="txt1">
						</span>
						<a class="txt2" href="#">
							
						</a>
					</div>

					<div  class="text-center p-t-136">
						<a class="txt2" href="#">
							
						</a>
					</div>
				</form>
			</div>
		</div>
	</div>
  </v-app>
</template>


<script>
    // import axios from "axios"
    export default {
        props: {
			source: String,
		},
		data : () => ({
			user : '',
			pass : ''
		}),
        methods:{

            btnLogin() {
				const { user, pass } = this //Interesante esta forma
                this.$store.dispatch('auth/login',{
					'name' : user,
					'password' : pass,

				})
                .then(() => this.$router.push('/inicio'))
            }
        }
    }
</script>

<style scoped>
	@import '../assets/login/fonts/font-awesome-4.7.0/css/font-awesome.min.css';
	@import '../assets/login/css/util.css';
	@import '../assets/login/css/main.css';
</style>
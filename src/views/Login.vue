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

					<div id="customBtn" @click="btnLoginGoogle()">
							<span class="icon"></span>
							<span class="buttonText">Log In</span>
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
	import firebase from "@/plugins/firebaseConfig"
    export default {
        props: {
			source: String,
		},
		components : {
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
			},
			btnLoginGoogle() {
				// Me faltan estas cosas
				// Poder guardar el token, que me da google, definir la expiracion
				var provider = new firebase.auth.GoogleAuthProvider();
				var vm = this;
				firebase.auth().signInWithPopup(provider).then(async function(result) {
					// console.log(result.credential.idToken); // No es este token
					let idToken;
					await firebase.auth().currentUser.getIdToken(true).then(res => idToken = res);
					// console.log(idToken); // Este el token
					// console.log(result);
					vm.$store.dispatch('auth/loginGoogle',{
						'idToken' : idToken,
						'user' : result.user.email
					})
					.then(() => vm.$router.push('/inicio'))
				// This gives you a Google Access Token. You can use it to access the Google API.
				// var token = result.credential.accessToken;
				// The signed-in user info.
				// var user = result.user;
				// ...
				}).catch(function(error) {
				console.log(error);
				// Handle Errors here.
				// var errorCode = error.code;
				// var errorMessage = error.message;
				// The email of the user's account used.
				// var email = error.email;
				// The firebase.auth.AuthCredential type that was used.
				// var credential = error.credential;
				// ...
				});
            }
        }
    }
</script>

<style scoped>
	@import '../assets/login/fonts/font-awesome-4.7.0/css/font-awesome.min.css';
	@import '../assets/login/css/util.css';
	@import '../assets/login/css/main.css';

	#customBtn {
		cursor: pointer;
    display: inline-block;
    background: white;
    color: #444;
	margin-top: 20px;
    width: 290px;
    border-radius: 20px;
    border: thin solid #888;
    box-shadow: 1px 1px 1px grey;
    white-space: nowrap;
}
span.icon {
    background: url(https://developers-dot-devsite-v2-prod.appspot.com/identity/sign-in/g-normal.png) transparent 5px 50% no-repeat;
    display: inline-block;
    vertical-align: middle;
    width: 70px;
    height: 44px;
}

#customBtn {
  transition: box-shadow .3s;
}
#customBtn:hover {
  box-shadow: 0 0 11px rgba(33,33,33,.2); 
}

span.buttonText {
    display: inline-block;
    vertical-align: middle;
    padding-left: 12px;
    padding-right: 42px;
    font-size: 14px;
    font-weight: bold;
    font-family: 'Roboto', sans-serif;
}
</style>
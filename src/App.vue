<template>
  <div id="app">
    <div id="nav">
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> -->
    </div>
    <router-view/>
  </div>
</template>

<script>
    export default {
		
		created: function () {
			let vm = this;
			this.$http.interceptors.response.use(
				
				undefined, function (err) {
					const originalRequest = err.config;
					if (err.response.status === 401 && !originalRequest._retry) {
						vm.$store.dispatch('auth/logout').then(() => vm.$router.push('/login'))
					}

				// return new Promise(function (resolve, reject) {
				// 	if (err.status === 401){
				// 		this.$store.dispatch('auth/logout').then(() => this.$router.push('/inicio'))
				// 		resolve()
				// 	}
				// 	if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
				// 		this.$store.dispatch('auth/logout')
				// 		resolve()
				// 	}
				// 	reject()
				// 	throw err;
				// });
			});
		}
    }
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  #padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

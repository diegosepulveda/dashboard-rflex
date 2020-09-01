<template>
  <v-app id="inspire">
      <app-bar></app-bar>
    <v-main>
		<v-container bg fill-height grid-list-md text-xs-center v-show="ocultarInformacionYMostrarSpinner">
			<v-layout row wrap align-center>
				<v-flex>
					<v-progress-circular 
						indeterminate
						color="blue"
						size="64"
					></v-progress-circular>
				</v-flex>
			</v-layout>
		</v-container>
      <v-container fluid>
		<GlobalEvents
				@keydown.up="goUp"
				@keydown.down="goDown"
				@keydown.esc="closeAndReset"
				@keydown.ctrl.space="toggle"
			/>
		<div class="overlay" v-if="searchBarIsOpen">
			<div class="search-bar">
				<div class="search-icon">
					<v-icon  color="grey lighten-1" >mdi-magnify</v-icon>
				</div>
				<input
				type="text"
				v-model="search"
				class="search-input"
				placeholder="Búsqueda"
				ref="busquedaTexto" 
				>
			</div>
		</div>
        <v-row>
			<v-col v-for="objCliente in filterClientes" :key="objCliente.id" md="6" sm="12" lg="3">
				<card-cliente :cliente="objCliente"><a target="_blank" :href="objCliente.link">{{objCliente.nombreCompleto}}</a></card-cliente>
			</v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-footer color="indigo" app>
      <span class="white--text">&copy; 2020</span>
    </v-footer>
  </v-app>
</template>

<script>
import CardCliente from "@/components/CardCliente.vue";
import AppBar from "@/components/AppBar.vue";
import _ from 'lodash'
import GlobalEvents from "vue-global-events";


export default {
	props: {
		source: String
	},
	components: {
		CardCliente,
		AppBar,
		GlobalEvents
		
	},
	computed : {
		filterClientes: function () {
			return this.listaClientes.filter((objCliente) => {
				return _.toLower(this.quitarTildes(objCliente.nombreCompleto)).match(this.search);
			})
		}
	},
	methods : {
		closeAndReset() {
			console.log('cerrar')
			this.searchBarIsOpen = false;
		},
		toggle() {
			console.log('Abrir y cerrar')
			this.searchBarIsOpen = !this.searchBarIsOpen;
			if(this.searchBarIsOpen) {
				this.$nextTick(() => {
					this.focusInput()
				});
			}
		},
		focusInput() {
			this.$refs.busquedaTexto.focus();
		},
		quitarTildes(texto) {
			return texto.normalize('NFD')
				.replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi,"$1$2")
				.normalize();
		}
	},
	mounted : function() {
		var direccion = window.location.href;
		var ruta = "api.dashboard.test";
		if(direccion.includes('kindall'))
		{
			ruta = "api.dashboard.kindall.io";
		}
		let vm = this; //this con arrow function funciona, pero sin se tiene que hacer esto

		fetch("http://"+ruta+"/api/lista-clientes").then(
			function(data) {
				vm.ocultarInformacionYMostrarSpinner = false;
				return data.json()
			}
		).then(
			function(datos) {
				fetch("http://"+ruta+"/api/replica-masiva").then((data)=>data.json()).then(function(listaClientesReplicas){
					vm.listaClientes.forEach(element => {
						element.replica = _.find(listaClientesReplicas,{'nombre' : element.nombre}).replica;
					});
				});

				fetch("http://"+ruta+"/api/lista-version").then((data)=>data.json()).then(function(listaVersion){
					vm.listaClientes.forEach((element,indice) => {
						vm.$set(vm.listaClientes[indice], 'version', _.find(listaVersion,{'nombre' : element.nombre}).version)
					});
				});
				vm.listaClientes = datos;
			}
		);
	},
	data: () => ({
		searchBarIsOpen: false,
		search: '',
		ocultarInformacionYMostrarSpinner : true,
		listaClientes : [],
	})
};
</script>
<style scoped>
.overlay {
  top: 20%;
  left: 50%;
  width: 680px;
  z-index: 100;
  font-size: 12px;
  overflow: hidden;
  border-radius: 6px;
  position: absolute;
  margin-left: -340px;
  letter-spacing: 0.3px;
  font-family: Verdana, "Lucida Sans Unicode", sans-serif;
  box-shadow: 0 12px 15px 0 rgba(0, 0, 0, 0.24),
    0 17px 50px 0 rgba(0, 0, 0, 0.19);
}

.search-bar {
  z-index: 10;
  height: 55px;
  position: relative;
  background-color: rgba(0, 21, 41, 0.97);
}
.search-icon {
  float: left;
  width: 22px;
  height: 22px;
  margin: 16.5px;
  position: static;
  background-size: cover;
}
.search-icon > svg {
  color: #a6a6a6;
}
.search-input {
  margin: 0;
  padding: 0;
  float: left;
  height: 55px;
  color: #ffffff;
  font-size: 1.7em;
  font-weight: 100;
  padding-left: 55px;
  padding-right: 50px;
  width: 400px !important;
  box-sizing: content-box;
  border: none !important;
  outline: none !important;
  max-width: 350px !important;
  background-color: transparent;
}
.search-input:-ms-input-placeholder {
  color: #a6a6a6;
}
.search-input:-moz-placeholder {
  color: #a6a6a6;
}
.search-input::-moz-placeholder {
  color: #a6a6a6;
}
.search-input::-webkit-input-placeholder {
  color: #a6a6a6;
}
</style>
<template>
  <v-app id="inspire">
      <app-bar></app-bar>
    <v-main>
      <v-container fluid>
        <v-row>		
			<v-col v-for="objCliente in listaClientes" :key="objCliente.id" md="6" sm="12" lg="3">
				<card-cliente-implementacion :cliente="objCliente">{{objCliente.nombreCompleto}}</card-cliente-implementacion>
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
import CardClienteImplementacion from "@/components/CardClienteImplementacion.vue";
import AppBar from "@/components/AppBar.vue";
import _ from 'lodash'


export default {
  props: {
    source: String
  },
  components: {
    CardClienteImplementacion,
    AppBar
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
				return data.json()
			}
		).then(
			function(datos) {
				fetch("http://"+ruta+"/api/replica-masiva").then((data)=>data.json()).then(function(listaClientesReplicas){
					vm.listaClientes.forEach(element => {
						element.replica = _.find(listaClientesReplicas,{'nombre' : element.nombre}).replica;
					});
					
				});
				vm.listaClientes = datos;
			}
		);
	},
  data: () => ({
	sidebar: false,
	listaClientes : [],
  })
};
</script>
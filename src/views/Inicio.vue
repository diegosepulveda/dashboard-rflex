<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="sidebar" app>
      <v-list dense>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-chart-areaspline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Principal</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-card-text-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Metricas</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="indigo" dark>
      <v-app-bar-nav-icon @click.stop="sidebar = !sidebar"></v-app-bar-nav-icon>
      <v-toolbar-title>rFlex Dash</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-row>		
			<v-col v-for="objCliente in listaClientes" :key="objCliente.id" md="6" sm="12" lg="4">
				<card-cliente :cliente="objCliente">{{objCliente.nombreCompleto}}</card-cliente>
			</v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-footer color="indigo" app>
      <span class="white--text">&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import CardCliente from "@/components/CardCliente.vue";
import _ from 'lodash'


export default {
  props: {
    source: String
  },
  components: {
    CardCliente
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
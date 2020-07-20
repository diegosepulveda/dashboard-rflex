<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-email</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Contact</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="indigo" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>rFlex Dash</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-row>		
			<v-col v-for="objCliente in listaClientes" :key="objCliente.id" md="6" sm="12" lg="4">
				<card-cliente :cliente="objCliente"  >{{objCliente.nombre}}</card-cliente>
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

export default {
  props: {
    source: String
  },
  components: {
    CardCliente
  },
	mounted : function() {
	fetch("http://api.dashboard.test/api/lista-clientes").then((data)=>data.json()).then((data)=>this.listaClientes = data)
	},
  data: () => ({
    drawer: false,
	dialog3: false,
	listaClientes : [],
    listaClientes2: [
		{
			id : 1,
			nombre: 'davila',
			integraciones : [
				{
					nombre : 'alta',
					activo : true
				},
				{
					nombre : 'permisos',
					activo : false
				},
				{
					nombre : 'marcas',
					activo : false
				}
			],
			holding: false
		},
	]
  })
};
</script>
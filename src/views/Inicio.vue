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
			<v-col v-for="objCliente in listaClientes" :key="objCliente.id" md="6" sm="12" lg="4" v-show="!objCliente.holding">
				<card-cliente v-if="!objCliente.holding" :cliente="objCliente">{{objCliente.nombre}}</card-cliente>
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
  data: () => ({
    drawer: false,
    dialog3: false,
    listaClientes: [
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
		{
			id : 2,
			nombre: 'stamaria',
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
					activo : true
				}
			],
			holding: false
		},
		{
			id : 3,
			nombre: 'tabancura',
			integraciones : [
				{
					nombre : 'alta',
					activo : true
				},
				{
					nombre : 'permisos',
					activo : true
				},
				{
					nombre : 'marcas',
					activo : true
				}
			],
			holding: false
		},
		{
			id : 4,
			nombre: 'ccdm',
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
					activo : true
				}
			],
			holding: false
		},

		{
			id: 5.1,
			nombre: 'cordillera',
			integraciones : [
				{
					nombre : 'alta',
					activo : false
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
		},
		{
			id: 5.2,
			nombre: 'loscarrera',
			integraciones : [
				{
					nombre : 'alta',
					activo : false
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
		},
		{
			id: 5.3,
			nombre: 'tarapaca',
			integraciones : [
				{
					nombre : 'alta',
					activo : false
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
		},
		{
			id: 5.4,
			nombre: 'losleones',
			integraciones : [
				{
					nombre : 'alta',
					activo : false
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
		},
		{
			id : 6,
			nombre: 'clc',
			integraciones : [
				{
					nombre : 'alta',
					activo : true
				},
				{
					nombre : 'permisos',
					activo : true
				},
				{
					nombre : 'marcas',
					activo : true
				}
			],
			holding: false
		},
		{
			id: 7.1,
			nombre: 'ucsancarlos',
			integraciones : [
				{
					nombre : 'alta',
					activo : false
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
		},
		{
			id: 7.2,
			nombre: 'uchospital',
			integraciones : [
				{
					nombre : 'alta',
					activo : false
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
		},
		{
			id: 7.3,
			nombre: 'ucambulatorio',
			integraciones : [
				{
					nombre : 'alta',
					activo : false
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
		},
		{
			id: 7.4,
			nombre: 'ucclinica',
			integraciones : [
				{
					nombre : 'alta',
					activo : false
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
		},
		{
			id : 8,
			nombre: 'ambar',
			integraciones : [
				{
					nombre : 'alta',
					activo : false
				},
				{
					nombre : 'permisos',
					activo : false
				},
				{
					nombre : 'marcas',
					activo : true
				}
			],
			holding: false
		}
	]
  })
};
</script>
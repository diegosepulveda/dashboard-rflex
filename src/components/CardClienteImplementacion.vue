<template>
  <v-card class="mx-auto piloto" max-width="1000" outlined :color="colorCard">
        <v-row>
            <v-col style="padding: padding">
                <slot></slot>
            </v-col>
        </v-row>
		<v-row>
			<v-col>
				<ul class="letraChica" style="list-style-type:none;">
				<li style="text-align: start;font-weight: bold;text-decoration: underline;">Numero Personas</li>
				<li style="text-align: start;" v-for="(obj , index) in listaNumeroPersonas" :key="index">{{obj.nombre}} : {{obj.cantidad}} </li>
			</ul>
			</v-col>
		</v-row>

        
      <v-row>
          <v-col>
                <v-chip v-for="(objIntegracion, nombre) in cliente.integraciones" :key="objIntegracion.nombre" class="ma-2" x-small v-bind:class="{ success: objIntegracion }"  >{{nombre}}</v-chip>
				<v-chip v-if="cliente.replica === false" class="ma-2 red" text-color="white" x-small>Error Replica</v-chip>
          </v-col>
      </v-row>

    <v-card-actions>
		<v-btn text >Uso Unidades</v-btn>
		<v-btn text >Uso Total</v-btn>
		<v-btn text >Errores</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
// import _ from 'lodash'

export default {
    name: "CardClienteImplementacion",
    components: {
    },
    props : {
        'cliente' : Object
	},
	computed : {
		colorCard : function(){
			if(this.cliente.estado === 'piloto')
			{
				return '#B2DFDB'
			}
			return undefined;
		}
	},
    methods : {
        
		
	},
	watch: {
		
	},
    mounted : function() {
		// var direccion = window.location.href;
		// let vm = this;
		// var ruta = "api.dashboard.test";
		// if(direccion.includes('kindall'))
		// {
		// 	ruta = "api.dashboard.kindall.io";
		// }
		this.listaNumeroPersonas = this.cliente.listaNumeroPersonas
		this.listaCantidadTurnosPorSemana = this.cliente.listaCantidadTurnosPorSemana
		this.listaUnidadAdmin = this.cliente.listaUnidadAdmin
     
    },
    data: () => ({
        listaNumeroPersonas : [],
        listaCantidadTurnosPorSemana : [],
        listaUnidadAdmin : [],
    })
};
</script>
<style scoped>
table{
    font-size: 10px;
}

.letraChica{
    font-size: 11px;
}

.errorMarca{
	color : red;
}

.errorMarcaWarning{
	color :darkorange;
	font-weight: bold;
}

.errorMarcaDanger{
	color : red;
	font-weight: bold;

}

.periodoActual{
	font-weight: bold;
}

.periodoAnterior{
	color : #1976d2;
	font-weight: bold;

}

table {
  border-collapse: collapse;
}

table.borde, th.borde, td.borde {
  border: 1px solid black;
}

td.boton {
    background-color: #2196f3;
    color: white;
    border-radius: 10px;

}

</style>
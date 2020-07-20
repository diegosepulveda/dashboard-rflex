<template>
  <v-card class="mx-auto piloto" max-width="1000" outlined :color="colorCard">
        <v-row>
            <v-col style="padding: padding">
                <slot></slot>
            </v-col>
        </v-row>
        <v-row>
          <v-col>
                <li v-for="(item) in listaUltimasMarcas" :key="item.RUT_FUNCIONARIO + item.FECHA_MARCA + item.HORA_MARCA + item.SENTIDO_MARCA" v-bind:class="{ errorMarca: item.posibleError }" >
                    {{ item.FECHA_MARCA }} {{ item.HORA_MARCA }}
                </li>
          </v-col>
          <v-col>
              <table>
                <tr v-for="(item) in listaInconsistencia" :key="item.nombre + item.cantidad">
                    <td>{{item.nombre}}</td>
                    <td>{{item.cantidad}}</td>
                </tr>
              </table>
          </v-col>
      </v-row>
      <v-row>
          <v-col>
                <v-chip v-for="(objIntegracion, nombre) in cliente.integraciones" :key="objIntegracion.nombre" class="ma-2" x-small v-bind:class="{ success: objIntegracion }"  >{{nombre}}</v-chip>
				<v-chip v-if="cliente.replica === false" class="ma-2 red" text-color="white" x-small>Error Replica</v-chip>
          </v-col>
      </v-row>


    
    <v-dialog
        v-model="modalUso"
        max-width="1200px"
      >
        <v-card>
          <v-card-title>
            <span>Uso unidades</span>
            <v-spacer></v-spacer>
          </v-card-title>
          <v-card-text>
                <v-data-table
                    :headers="headersListaUsoUnidades"
                    :items="listaLoginUnidadesSemanaTabla"
                    :items-per-page="20"
                    class="elevation-1"
                ></v-data-table>

          </v-card-text>
          <v-card-actions>
            <v-btn
              color="primary"
              text
              @click="modalUso = false"
            >
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
    </v-dialog>

    <v-dialog
        v-model="modalErorres"
        max-width="1200px"
      >
        <v-card>
          <v-card-title>
            <span>Errores</span>
            <v-spacer></v-spacer>
          </v-card-title>
          <v-card-text>
               <bar :lista-data="listaErroresPorFecha" titulo-grafico="Lista Errores"></bar>
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="primary"
              text
              @click="modalErorres = false"
            >
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
    </v-dialog>


    <v-card-actions>
      <v-btn text @click="modalUso = true">Uso</v-btn>
      <v-btn text @click="modalErorres = true">Errores</v-btn>
		<v-btn text @click="getData">Cambiar Color</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import Bar from "@/components/Bar.vue";

export default {
    name: "CardCliente",
    components: {
        Bar
    },
    props : {
        'cliente' : Object
	},
	computed : {
		colorCard : {
			get: function () {
				if(this.cliente.estado === 'piloto')
				{
					return '#B2DFDB'
				}
				return undefined;
			},
			set: function (newValue) {
				return newValue;
			}
		}
	},
    methods : {
        getData() {
			
        }
    },
    mounted : function() {
        fetch("http://api.dashboard.test/api/inconsistencias?cliente="+this.cliente.nombre).then((data)=>data.json()).then((data)=>this.listaInconsistencia = data)
        fetch("http://api.dashboard.test/api/marcas?cliente="+this.cliente.nombre).then((data)=>data.json()).then((data)=>this.listaUltimasMarcas = data)
        fetch("http://api.dashboard.test/api/logunidad?cliente="+this.cliente.nombre).then((data)=>data.json()).then((data)=>this.listaLoginUnidadesSemanaTabla = data)
        fetch("http://api.dashboard.test/api/errores?cliente="+this.cliente.nombre).then((data)=>data.json()).then((data)=>this.listaErroresPorFecha = data)
    },
    data: () => ({
        tab: null,
        modalUso: false,
        modalErorres: false,
        listaUltimasMarcas : [],
        listaLoginUnidadesSemanaTabla : [],
        listaErroresPorFecha : [],
        listaInconsistencia : [],
        headersListaUsoUnidades: [
          {
            text: 'Nombre Unidad',
            align: 'start',
            sortable: false,
            value: 'nombreUnidad',
          },
          { text: 'ID Unidad', value: 'unidad_idunidad' },
          { text: 'Dias', value: 'diasNumeros' },
          { text: 'Nombre Dia', value: 'diasNombres' },
          { text: 'Semana Año', value: 'numeroSemanaAño' },
          { text: 'Cantidad', value: 'cantidadDias' },
          { text: 'Fecha', value: 'fecha' },
          { text: 'Semana', value: 'semana' },
          { text: 'Actualizacion', value: 'horaActualizacion' },
        ],
        headersListaErrores: [
          { text: 'Fecha', value: 'fecha' },
          { text: 'Cuenta', value: 'cuenta' },
        ]
    })
};
</script>
<style scoped>
table{
    font-size: 13px;
}

.errorMarca{
	color : red;
}


</style>
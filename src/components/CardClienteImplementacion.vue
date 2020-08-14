<template>
  <v-card class="mx-auto piloto" max-width="1000" outlined :color="colorCard">
        <v-row>
            <v-col style="padding: padding">
                <slot></slot>
            </v-col>
        </v-row>
		<v-row>
			<v-col>
				<ul class="letraChica sinTipoLista">
					<li class="tituloLista">Número Personas</li>
					<li class="estiloLista" v-for="(obj , index) in listaNumeroPersonas" :key="index">{{obj.nombre}} : {{obj.cantidad}} </li>
				</ul>
				<ul class="letraChica sinTipoLista">
					<li class="tituloLista">Número Unidades Tipo</li>
					<li class="estiloLista" v-for="(obj , index) in listaUnidadAdmin.cantidadUnidadesPorTipo" :key="index">{{obj.nombre}} : {{obj.cantidad}} </li>
				</ul>
				<ul class="letraChica sinTipoLista">
					<li class="tituloLista">Número Admins</li>
					<li class="estiloLista" v-for="(obj , index) in listaUnidadAdmin.totalAdminClasificados" :key="index">{{obj.nombre}} : {{obj.cantidad}} </li>
				</ul>
				<ul class="letraChica sinTipoLista">
					<li class="tituloLista">Asociaciones Uso/No Uso</li>
					<li class="estiloLista" v-for="(obj , index) in listaAltaccpuestoAsociacion" :key="index">
							{{obj.nombre}} : {{obj.cantidad}}
							<v-tooltip top>
							<template v-slot:activator="{ on, attrs }">
								<v-btn class="mejoraTooltipBoton" icon v-bind="attrs" v-on="on">
								<v-icon class="mejoraTooltipIcono" color="grey lighten-1" size="17">mdi-help</v-icon>
								</v-btn>
							</template>
							<span>{{obj.descripcion}}</span>
							</v-tooltip>
					</li>
				</ul>
				<ul class="letraChica sinTipoLista">
					<li class="tituloLista">Altas No Gestionado</li>
					<li class="estiloLista" v-for="(obj , index) in listaAltaSinUso" :key="index">{{obj.nombre}} : {{obj.cantidad}} </li>
				</ul>
			</v-col>
			<v-col>
				<table>
					<tr>
						<td colspan="3" style="font-weight: bold;text-decoration: underline;">Informacion Turnos</td>
					</tr>
					<tr>
						<td colspan="3">
							<v-icon @click="moverSemana('back',listaCantidadTurnosPorSemana.numeroSemanaActual,listaCantidadTurnosPorSemana.listaNumeroSemanaDetalleTurno)">mdi-chevron-left</v-icon>
							{{listaCantidadTurnosPorSemana.numeroSemanaActual}}
							<v-icon @click="moverSemana('forward',listaCantidadTurnosPorSemana.numeroSemanaActual,listaCantidadTurnosPorSemana.listaNumeroSemanaDetalleTurno)">mdi-chevron-right</v-icon>
						</td>
					</tr>
					<tr v-for="(obj,index) in listaCantidadTurnosPorSemana.listaNumeroSemanaDetalleTurno[listaCantidadTurnosPorSemana.numeroSemanaActual]" :key="index">
						<td>{{obj.nombre}}</td>
						<td>{{obj.cantidad}}</td>
						<td>
							
						</td>
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

    <v-card-actions>
		<v-btn text >Uso Unidades</v-btn>
		<v-btn text >Uso Total</v-btn>
		<v-btn text >Errores</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import _ from 'lodash'

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
        moverSemana(direccion,numeroSemanaActual,lista) {
			
			var numeroSemana = numeroSemanaActual
			var objCompleto = _.keys(lista)

			var indiceActual = objCompleto.indexOf(numeroSemana)
			var largoTotal = objCompleto.length

			var indiceRequerido
			if(direccion == 'back')
			{
				indiceRequerido = indiceActual - 1;
				if(indiceRequerido == -1)
				{
					return;
				}
			}
			else
			{
				indiceRequerido = indiceActual + 1;
				if(indiceRequerido == largoTotal)
				{
					return;
				}
			}
			var numeroSemanaEncontrado = objCompleto[indiceRequerido]
			this.listaCantidadTurnosPorSemana.numeroSemanaActual = numeroSemanaEncontrado
			console.log(this.listaCantidadTurnosPorSemana.numeroSemanaActual)
		},
		formatDataListaCantidadTurnosPorSemana(listaCantidadTurnosPorSemana,numeroSemana) {
			var listaNumeroSemanaDetalleTurno = _.mapKeys(_.groupBy(listaCantidadTurnosPorSemana,'numeroSemana'),(value) => value[0].primerDiaSemana+'-'+value[0].ultimoDiaSemana)
			if(numeroSemana === undefined) {
				numeroSemana = _.keys(listaNumeroSemanaDetalleTurno)[_.keys(listaNumeroSemanaDetalleTurno).length -1 ]
			}

			this.listaCantidadTurnosPorSemana.numeroSemanaActual = numeroSemana
			this.listaCantidadTurnosPorSemana.listaNumeroSemanaDetalleTurno = listaNumeroSemanaDetalleTurno
		},
		formatDataAsociacion(lista) {
			return _.map(_.groupBy(lista,'nombre'),function(valor){
				return {
					'nombre' : valor[0].nombre,
					'cantidad' : _.find(valor,{'ocupado' : 1}).cantidad + '/' + _.find(valor,{'ocupado' : 0}).cantidad,
					'descripcion' : valor[0].descripcion
				}
			})
		}

	},
	watch: {
		
	},
    mounted : function() {
		this.listaNumeroPersonas = this.cliente.listaNumeroPersonas
		this.listaUnidadAdmin.cantidadUnidadesPorTipo = this.cliente.listaUnidadAdmin.cantidadUnidadesPorTipo
		this.listaUnidadAdmin.totalAdminClasificados = this.cliente.listaUnidadAdmin.totalAdminClasificados
		this.formatDataListaCantidadTurnosPorSemana(this.cliente.listaCantidadTurnosPorSemana)

		this.listaAltaccpuestoAsociacion = this.formatDataAsociacion(this.cliente.listaAltaccpuestoAsociacion)
		this.listaAltaSinUso = this.cliente.listaAltaSinUso

		console.log(this.listaAltaccpuestoAsociacion)
     
    },
    data: () => ({
		listaCantidadTurnosPorSemana : {
			numeroSemanaActual : 0,
			listaNumeroSemanaDetalleTurno : [],
		},
        listaNumeroPersonas : [],
        listaAltaccpuestoAsociacion : [],
        listaAltaSinUso : [],
        listaUnidadAdmin : {
			cantidadUnidadesPorTipo : [],
			totalAdminClasificados: []
		},
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

ul.sinTipoLista {
	list-style-type: none;
}

li.tituloLista {
	text-align: start;
	font-weight: bold;
	text-decoration: underline
}

li.estiloLista {
	text-align: start;
}

.errorMarca{
	color : red;
}

i:hover {
  background-color: #1976d2;
  border-radius: 10px;
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

.mejoraTooltipBoton {
	height: 0px;
}

.mejoraTooltipIcono {
	height: 0px;
	width:  0px;
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
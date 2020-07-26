<template>
  <v-card class="mx-auto piloto" max-width="1000" outlined :color="colorCard">
        <v-row>
            <v-col style="padding: padding">
                <slot></slot>
            </v-col>
        </v-row>
		<v-row class="letraChica">
			<v-col>Ultima marca hace </v-col>
			<v-col v-bind:class="{ errorMarcaWarning: ultimaMarcaTiempo.tipoAdvertencia === 'warning',errorMarcaDanger: ultimaMarcaTiempo.tipoAdvertencia === 'danger' }" >{{ultimaMarcaTiempo.cantidad}}</v-col>
		</v-row>
        <v-row>
          <v-col>
                <li class="letraChica"  v-for="(item, index) in listaUltimasMarcas" :key="index" v-bind:class="{ errorMarca: item.posibleError }" >
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
        v-model="modalUsoTotalTipoUsuario"
        max-width="1800px"
      >
        <v-card>
          <v-card-title>
            <span>Uso unidades</span>
            <v-spacer></v-spacer>
          </v-card-title>
          <v-card-text>
				<v-row v-if="!mostrarDatosUsoTotalTipoUsuario">
					<v-col>
						<v-progress-circular
							indeterminate
							color="primary"
						></v-progress-circular>
					</v-col>
				</v-row>
				<v-row v-if="mostrarDatosUsoTotalTipoUsuario">
					<v-col md="3">
						<v-combobox
							v-model="seleccionSemana"
							:items="listaNumeroSemanaAño"
							label="Selección de semana"
							></v-combobox>
					</v-col>
				</v-row>
				<v-row v-if="mostrarDatosUsoTotalTipoUsuario">

					<v-tabs
						v-model="tab"
						background-color="transparent"
						color="blue"
						grow
						
						>
						<v-tab> Jefaturas </v-tab>
						<v-tab> Gerencia </v-tab>
						<v-tab> Jefatura RRHH </v-tab>
						<v-tab> Usuario </v-tab>
						<v-tab> rFlex </v-tab>
					</v-tabs>

						<v-tabs-items v-model="tab">
							<v-tab-item>
								<v-data-table
										:headers="headersListaUsoJefatura"
										:items="listaUsoJefaturaVista"
										:items-per-page="20"
										class="elevation-1"
									></v-data-table>
								
							</v-tab-item>
							<v-tab-item>
								<v-data-table
									:headers="headersListaUsoJefatura"
									:items="listaUsoGerenciaVista"
									:items-per-page="20"
									class="elevation-1"
								></v-data-table>
							</v-tab-item>
							<v-tab-item>
								<v-data-table
									:headers="headersListaUsoJefatura"
									:items="listaUsoJefaturaRRHHVista"
									:items-per-page="20"
									class="elevation-1"
								></v-data-table>
							</v-tab-item>
							<v-tab-item>
								<v-data-table
									:headers="headersListaUsoJefatura"
									:items="listaUsoUsuarioVista"
									:items-per-page="20"
									class="elevation-1"
								></v-data-table>
							</v-tab-item>
							<v-tab-item>
								<v-data-table
									:headers="headersListaUsoJefatura"
									:items="listaUsoRflexVista"
									:items-per-page="20"
									class="elevation-1"
								></v-data-table>
							</v-tab-item>
						</v-tabs-items>
				</v-row>
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="primary"
              text
              @click="modalUsoTotalTipoUsuario = false"
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
		<v-btn text @click="abrirModalUsoUnidades()">Uso Unidades</v-btn>
		<v-btn text @click="abrirModalUsoTotal()">Uso Total</v-btn>
		<!-- <v-btn text @click="getData">Uso Web</v-btn>
		<v-btn text @click="getData">Uso Mobile</v-btn> -->
		<v-btn text @click="abrirModalErrores()">Errores</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import Bar from "@/components/Bar.vue";
import _ from 'lodash'

export default {
    name: "CardCliente",
    components: {
        Bar
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
        abrirModalUsoTotal() {
			this.modalUsoTotalTipoUsuario = true
			let vm = this;
			vm.mostrarDatosUsoTotalTipoUsuario = false
			fetch("http://api.dashboard.test/api/uso-total?cliente="+this.cliente.nombre).then((data)=>data.json()).then(function(data) {
				vm.listaUsoCompleta = data
				vm.mostrarDatosUsoTotalTipoUsuario = true

				
				vm.listaUsoJefatura = _.filter(data,{'tipo_segun_nombre': 'jefatura'});
				vm.listaUsoGerencia = _.filter(data,{'tipo_segun_nombre': 'gerencia'});
				vm.listaUsoJefaturaRRHH = _.filter(data,{'tipo_segun_nombre': 'jefatura_rrhh'});
				vm.listaUsoUsuario = _.filter(data,{'tipo_segun_nombre': 'usuario'});
				vm.listaUsoRflex = _.filter(data,{'tipo_segun_nombre': 'rFlex'});
				console.log(data);


				vm.listaNumeroSemanaAño = _.uniq(_.map(data,'numeroSemanaAño')).sort(function(a,b){return b-a})
				if(vm.listaNumeroSemanaAño.length > 0)
				{
					vm.seleccionSemana = vm.listaNumeroSemanaAño[0]
				}
			});
		},
		abrirModalErrores() {
			var direccion = window.location.href;
			var ruta = "api.dashboard.test";
			if(direccion.includes('kindall'))
			{
				ruta = "api.dashboard.kindall.io";
			}
			this.modalErorres = true
			fetch("http://"+ruta+"/api/errores?cliente="+this.cliente.nombre).then((data)=>data.json()).then((data)=>this.listaErroresPorFecha = data)

		},
		abrirModalUsoUnidades() {
			var direccion = window.location.href;
			var ruta = "api.dashboard.test";
			if(direccion.includes('kindall'))
			{
				ruta = "api.dashboard.kindall.io";
			}
			this.modalUso = true
			fetch("http://"+ruta+"/api/logunidad?cliente="+this.cliente.nombre).then((data)=>data.json()).then((data)=>this.listaLoginUnidadesSemanaTabla = data)
		}
	},
	watch: {
		seleccionSemana: function (val) {			
			this.listaUsoJefaturaVista = _.filter(this.listaUsoJefatura, {'numeroSemanaAño' : parseInt(val)});
			this.listaUsoGerenciaVista = _.filter(this.listaUsoGerencia, {'numeroSemanaAño' : parseInt(val)});
			this.listaUsoJefaturaRRHHVista = _.filter(this.listaUsoJefaturaRRHH, {'numeroSemanaAño' : parseInt(val)});
			this.listaUsoUsuarioVista = _.filter(this.listaUsoUsuario, {'numeroSemanaAño' : parseInt(val)});
			this.listaUsoRflexVista = _.filter(this.listaUsoRflex, {'numeroSemanaAño' : parseInt(val)});
		}
	},
    mounted : function() {
		let vm = this;
		var direccion = window.location.href;
		var ruta = "api.dashboard.test";
		if(direccion.includes('kindall'))
		{
			ruta = "api.dashboard.kindall.io";
		}

        fetch("http://"+ruta+"/api/inconsistencias?cliente="+this.cliente.nombre).then((data)=>data.json()).then((data)=>this.listaInconsistencia = data)
        fetch("http://"+ruta+"/api/marcas?cliente="+this.cliente.nombre).then((data)=>data.json()).then(
				function(data) {
					vm.listaUltimasMarcas = data;
					if(data.length > 0)
					{
						var diferenciaHoraria = data[0].diferencia;
						
						var diferenciaTotalSegundos = diferenciaHoraria.split(':').map(function(data,indice){
							if(indice === 0) {
								return parseInt(data)*60*60
							}
							if(indice === 1) {
								return parseInt(data)*60
							}
							return parseInt(data)

						}).reduce(function(valorAnterior, valorActual){
							return valorAnterior + valorActual;
						});

						vm.ultimaMarcaTiempo = {
							'tipoAdvertencia' : null,
							'cantidad' : ''
						}

						if(diferenciaTotalSegundos > 43200 && diferenciaTotalSegundos < 86400)
						{
							vm.ultimaMarcaTiempo.tipoAdvertencia = 'warning';
						}
						else if(diferenciaTotalSegundos > 86400)
						{
							vm.ultimaMarcaTiempo.tipoAdvertencia = 'danger';
						}

						vm.ultimaMarcaTiempo.cantidad = window.moment.duration(diferenciaTotalSegundos,"seconds").humanize()
					}
				}
			)
    },
    data: () => ({
        tab: null,
        modalUso: false,
        ultimaMarcaTiempo: false,
        mostrarDatosUsoTotalTipoUsuario: false,
        seleccionSemana: '',
        modalErorres: false,
        modalUsoTotalTipoUsuario: false,
        listaUltimasMarcas : [],
        listaLoginUnidadesSemanaTabla : [],
        listaNumeroSemanaAño : [],
        listaUsoCompleta : [],
        listaUsoJefatura : [],
        listaUsoGerencia : [],
        listaUsoJefaturaRRHH : [],
		listaUsoUsuario : [],
		listaUsoRflex : [],
		listaUsoJefaturaVista : [],
        listaUsoGerenciaVista : [],
        listaUsoJefaturaRRHHVista : [],
		listaUsoUsuarioVista : [],
		listaUsoRflexVista : [],
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
        headersListaUsoJefatura: [
          {
            text: 'Usuario',
            align: 'start',
            sortable: false,
            value: 'usuario',
          },
          { text: 'tipo_segun_nombre', value: 'tipo_segun_nombre' },
          { text: 'idunidad', value: 'idunidad' },
          { text: 'nombreUnidad', value: 'nombreUnidad' },
          { text: 'tipoUnidad', value: 'tipoUnidad' },
          { text: 'numeroSemanaAño', value: 'numeroSemanaAño' },
          { text: 'minFecha', value: 'minFecha' },
          { text: 'maxFecha', value: 'maxFecha' },
          { text: 'sumaAuditoria', value: 'sumaAuditoria' },
          { text: 'sumaWeb', value: 'sumaWeb' },
          { text: 'sumaMobile', value: 'sumaMobile' },
          { text: 'cantidadDias', value: 'cantidadDias' },
          { text: 'diasNumeros', value: 'diasNumeros' },
          { text: 'diasNombres', value: 'diasNombres' },
          { text: 'diasNumeros_auditoria', value: 'diasNumeros_auditoria' },
          { text: 'diasNumeros_web', value: 'diasNumeros_web' },
          { text: 'diasNumeros_mobile', value: 'diasNumeros_mobile' },
          { text: 'horaActualizacion', value: 'horaActualizacion' },
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
    font-size: 11px;
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

</style>
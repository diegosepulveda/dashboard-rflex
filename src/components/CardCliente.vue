<template>
  <v-card class="mx-auto piloto" max-width="1000" outlined :color="colorCard">
        <v-row>
            <v-col style="padding: padding">
                <slot></slot>
            </v-col>
        </v-row>

        <v-row>
          <v-col class="letraChica">
			<ul>
				<li  style="font-weight: bold;text-decoration: underline; list-style-type:none;">
					Últimos Registros Integración
				</li>
				<li style="text-align: start;">
					Alta: <span v-bind:class="{ errorMarcaWarning: ultimaAltaTiempo.tipoAdvertencia === 'warning',errorMarcaDanger: ultimaAltaTiempo.tipoAdvertencia === 'danger' }">{{ultimaAltaTiempo.cantidad || '-'}}</span> 
				</li>
				<li style="text-align: start;">
					Permiso: <span v-bind:class="{ errorMarcaWarning: ultimoPermisoTiempo.tipoAdvertencia === 'warning',errorMarcaDanger: ultimaMarcaTiempo.tipoAdvertencia === 'danger' }">{{ultimoPermisoTiempo.cantidad  || '-'}}</span> 
				</li>
				<li style="text-align: start;">
					Marca: <span v-bind:class="{ errorMarcaWarning: ultimaMarcaTiempo.tipoAdvertencia === 'warning',errorMarcaDanger: ultimaMarcaTiempo.tipoAdvertencia === 'danger' }">{{ultimaMarcaTiempo.cantidad || '-'}}</span> 
				</li>
			</ul>
			
			<table>
				<tr>
					<td>
					</td>
					<td style="font-weight: bold;text-decoration: underline; ">
						Usuarios activos
					</td>
					<td>
					</td>
				</tr>
				<tr>
					<td>
						<v-icon @click="moverSemana('back')">mdi-chevron-left</v-icon>
					</td>
					<td>
						Semana: {{listaMostarUsoResumido.numeroSemanaActual}}
					</td>
					<td>
						<v-icon @click="moverSemana('forward')">mdi-chevron-right</v-icon>
					</td>
				</tr>
			</table>
			<table >
				<tr>
					<td></td>
					<td class="borde">Usuarios</td>
					<td class="borde">Admins</td>
					<td class="borde">RRHH</td>
				</tr>
				<tr class="borde">
					<td class="borde">Web</td>
					<td class="borde" v-for="(numero , index) in listaMostarUsoResumido.listaMostarWeb" :key="index" >{{numero}}</td>
				</tr>
				<tr class="borde">
					<td class="borde">Mobile</td>
					<td class="borde" v-for="(numero , index) in listaMostarUsoResumido.listaMostarMobile" :key="index" >{{numero}}</td>
				</tr>
			</table>

			<table>
				<tr>
					<td ></td>
					<td style="font-weight: bold;text-decoration: underline;">Métricas Producto</td>
					<td ></td>
				</tr>
				<tr v-for="(obj , index) in listaMostarUsoResumido.listaMostarProducto" :key="index">
					<td></td>
					<td>
						{{obj.nombre}} : {{obj.cantidad}}
					</td>
					<td></td>
				</tr>
			</table>
			

			<table>
				<tr>
					<td ></td>
					<td style="font-weight: bold;text-decoration: underline;">FDAs</td>
					<td ></td>
				</tr>
				<tr>
					<td>
						<v-icon @click="moverSemana('back','FDA')">mdi-chevron-left</v-icon>
					</td>
					<td v-bind:class="{ periodoActual: listaMostarFichasValidadas.objActualFDA.periodoActual === 1,periodoAnterior: listaMostarFichasValidadas.idperiodoAnterior ===  listaMostarFichasValidadas.objActualFDA.idperiodo}">
						{{listaMostarFichasValidadas.objActualFDA.fechaInicio}} - {{listaMostarFichasValidadas.objActualFDA.fechaTermino}}
					</td>
					<td>
						<v-icon @click="moverSemana('forward','FDA')">mdi-chevron-right</v-icon>
					</td>
				</tr>
			</table>
			
			<ul style="list-style-type:none;">
				<li style="text-align: start;" v-for="(obj , index) in listaMostarFichasValidadas.listaMostarFDA" :key="index">FDAs Validadas : {{obj.cantidad}} </li>
			</ul>
			
			

          </v-col>
          <v-col>
			<v-btn text @click="getDataInconsistencias()">Inconsistencias</v-btn>
			
				<v-progress-circular v-show="!ocultarInformacionYMostrarSpinner && mostrarInconsistencias"
						indeterminate
						color="red"
				></v-progress-circular>
					
				<table v-show="ocultarInformacionYMostrarSpinner || mostrarInconsistencias">
					<tr>
						<td colspan="2" style="font-weight: bold;text-decoration: underline;">Inconsistencias</td>
					</tr>

					
					<tr v-for="(item) in listaInconsistencia" :key="item.nombre + item.cantidad">
						<td>{{item.nombre}}</td>
						<td>{{item.cantidad}}</td>
					</tr>
				</table>
			
			<ul class="letraChica" style="list-style-type:none;">
				<li style="text-align: start;font-weight: bold;text-decoration: underline;">Numero Personas</li>
				<li style="text-align: start;" v-for="(obj , index) in listaNumeroPersonas" :key="index">{{obj.nombre}} : {{obj.cantidad}} </li>
			</ul>

			<ul class="letraChica" style="list-style-type:none;">
				<li style="text-align: start;font-weight: bold;text-decoration: underline;">Numero cuentas confirmadas</li>
				<li style="text-align: start;" v-for="(obj , index) in listaConfirmadosCuentas.listaConfirmados" :key="index">{{obj.nombre}}  {{obj.cantidad}} / {{obj.totalSumado}} ({{obj.totalPorcentaje}}) </li>
			</ul>

			<ul class="letraChica" style="list-style-type:none;">
				<li style="text-align: start;font-weight: bold;text-decoration: underline;">Numero Confirmados Mobile</li>
				<li style="text-align: start;" v-for="(obj , index) in listaConfirmadosCuentas.listaTotalConfirmadosMobile" :key="index">{{obj.nombre}} : {{obj.cantidad}} </li>
			</ul>



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
				<v-row v-if="!ocultarInformacionYMostrarSpinner">
					<v-col>
						<v-progress-circular
							indeterminate
							color="primary"
						></v-progress-circular>
					</v-col>
				</v-row>
				<v-row v-if="ocultarInformacionYMostrarSpinner">
					<v-col md="3">
						<v-combobox
							v-model="seleccionSemanaUsoUnidades"
							:items="listaNumeroSemanaAño"
							label="Selección de semana"
							></v-combobox>
					</v-col>
				</v-row>
                <v-data-table
                    :headers="headersListaUsoUnidades"
                    :items="listaLoginUnidadesSemanaTablaVista"
                    :items-per-page="20"
                    class="elevation-1"
					v-if="ocultarInformacionYMostrarSpinner"
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
            <span>Uso total usuarios</span>
            <span class="letraChica errorMarcaDanger">{{mostrarError}}</span>
            <v-spacer></v-spacer>
          </v-card-title>
          <v-card-text>
				<v-row v-if="!ocultarInformacionYMostrarSpinner">
					<v-col>
						<v-progress-circular
							indeterminate
							color="primary"
						></v-progress-circular>
					</v-col>
				</v-row>
				<v-row v-if="ocultarInformacionYMostrarSpinner">
					<v-col md="3">
						<v-combobox
							v-model="seleccionSemana"
							:items="listaNumeroSemanaAño"
							label="Selección de semana"
							></v-combobox>
					</v-col>
				</v-row>
				<v-row v-if="ocultarInformacionYMostrarSpinner">

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
			var direccion = window.location.href;
			var ruta = "api.dashboard.test";
			if(direccion.includes('kindall'))
			{
				ruta = "api.dashboard.kindall.io";
			}
			vm.mostrarError = ''
			vm.ocultarInformacionYMostrarSpinner = false
			fetch("http://"+ruta+"/api/uso-total?cliente="+this.cliente.nombre).then((data)=>data.json()).then(function(data) {
				vm.listaUsoCompleta = data
				vm.ocultarInformacionYMostrarSpinner = true

				
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
			}).catch(function(error) {
				vm.mostrarError = 'Hubo un problema con la petición Fetch:' + error
				console.log('Hubo un problema con la petición Fetch:' + error);
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
			let vm = this;
			var ruta = "api.dashboard.test";
			if(direccion.includes('kindall'))
			{
				ruta = "api.dashboard.kindall.io";
			}
			this.modalUso = true
			vm.ocultarInformacionYMostrarSpinner = false
			fetch("http://"+ruta+"/api/logunidad?cliente="+this.cliente.nombre).then((data)=>data.json()).then(
				function(data){

					//Con eso construyo el combobox
					vm.listaNumeroSemanaAño = _.uniq(_.map(data,'numeroSemanaAño')).sort(function(a,b){return b-a})
					if(vm.listaNumeroSemanaAño.length > 0)
					{
						vm.seleccionSemanaUsoUnidades = vm.listaNumeroSemanaAño[0]
					}


					vm.listaLoginUnidadesSemanaTabla = data
					vm.ocultarInformacionYMostrarSpinner = true
				}


			)
		},
		mostrarUltimaAltaMarcaPermiso(estadoIntegraciones) {
			let vm = this;
			let ultimasMarcas = estadoIntegraciones.marcas
			let ultimaAlta = estadoIntegraciones.alta
			let ultimoPermiso = estadoIntegraciones.permiso
			var diferenciaTotalSegundos = 0

			vm.listaUltimasMarcas = ultimasMarcas;
			if(ultimasMarcas.length > 0)
			{
				diferenciaTotalSegundos = vm.calculoDiferenciaTiempo(ultimasMarcas[0].diferencia);
				vm.ultimaMarcaTiempo.tipoAdvertencia = this.getTipoWarningSegunSegundos(diferenciaTotalSegundos)
				vm.ultimaMarcaTiempo.cantidad = window.moment.duration(diferenciaTotalSegundos,"seconds").humanize()
			}

			if(ultimaAlta !== null)
			{
				diferenciaTotalSegundos = vm.calculoDiferenciaTiempo(ultimaAlta.diferencia)
				vm.ultimaAltaTiempo.tipoAdvertencia = this.getTipoWarningSegunSegundos(diferenciaTotalSegundos)
				vm.ultimaAltaTiempo.cantidad = window.moment.duration(diferenciaTotalSegundos,"seconds").humanize()
			}
			if(ultimoPermiso !== null)
			{
				diferenciaTotalSegundos = vm.calculoDiferenciaTiempo(ultimoPermiso.diferencia);
				vm.ultimoPermisoTiempo.tipoAdvertencia = this.getTipoWarningSegunSegundos(diferenciaTotalSegundos)
				vm.ultimoPermisoTiempo.cantidad = window.moment.duration(diferenciaTotalSegundos,"seconds").humanize()
			}
		},
		getTipoWarningSegunSegundos(numeroSegundos) {
			if(numeroSegundos > 43200 && numeroSegundos < 86400)
			{
				return 'warning'
			}
			else if(numeroSegundos > 86400)
			{
				return 'danger'
			}
			return ''
		},
		calculoDiferenciaTiempo(diferenciaTiempoBD) {
			return diferenciaTiempoBD.split(':').map(function(objArreglo,indice){
					if(indice === 0) {
						return parseInt(objArreglo)*60*60
					}
					if(indice === 1) {
						return parseInt(objArreglo)*60
					}
					return parseInt(objArreglo)

				}).reduce(function(valorAnterior, valorActual){
					return valorAnterior + valorActual;
				});
		},
		moverSemana(direccion,tipoMovimiento){
			var numeroSemana
			var objCompleto
			if(tipoMovimiento === undefined) {
				numeroSemana = this.listaMostarUsoResumido.numeroSemanaActual
				objCompleto = this.listaNumeroSemanaAñoFrontUsoResumido
			}
			else {
				//Aca va el movimiento nuevo
				numeroSemana = this.listaMostarFichasValidadas.numeroPeriodoActual
				objCompleto = this.listaNumeroPeriodos

			}

			var indiceActual = objCompleto.indexOf(numeroSemana)
			var largoTotal = objCompleto.length
			var indiceRequerido;
			
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

			var numeroSemanaActual = objCompleto[indiceRequerido];

			if(tipoMovimiento === undefined) {
				this.listaMostarUsoResumido.numeroSemanaActual = numeroSemanaActual
				this.mostarDatosUsoTipoUsuarioResumidoMaster(this.cliente.usoMetricaResumida,this.listaMostarUsoResumido,numeroSemanaActual)
				this.listaMostarUsoResumido.listaMostarProducto = this.mostrarMetricasProducto(this.cliente.usoMetricaProducto,numeroSemanaActual)
			}
			else{
				this.listaMostarFichasValidadas.numeroPeriodoActual = numeroSemanaActual
				this.listaMostarFichasValidadas.listaMostarFDA = this.mostarFichasValidadas(this.cliente.listaFichaValidadas,numeroSemanaActual)
				this.listaMostarFichasValidadas.objActualFDA = _.find(this.cliente.listaFichaValidadas,{'idperiodo' : numeroSemanaActual}) 
			}
		},
		mostarDatosUsoTipoUsuarioResumidoMaster(listaUsoMetricaReducido,objView,numeroSemanaAño) {
			var lista = _.filter(listaUsoMetricaReducido,{'numeroSemanaAño' : numeroSemanaAño})

			objView.numeroSemanaActual = numeroSemanaAño
			
			var valorGerencia = _.filter(lista,{'tipo_segun_nombre' : 'gerencia'})
			var valorJefatura = _.filter(lista,{'tipo_segun_nombre' : 'jefatura'})
			var valorUsuario = _.filter(lista,{'tipo_segun_nombre' : 'usuario'})
			
			objView.listaMostarWeb = [0,0,0]
			objView.listaMostarMobile = [0,0,0]

			if(valorUsuario.length > 0)
			{
				objView.listaMostarWeb[0]	= valorUsuario[0].totalWeb
				objView.listaMostarMobile[0]	= valorUsuario[0].totalMobile
			}

			if(valorJefatura.length > 0)
			{
				objView.listaMostarWeb[1]	= valorJefatura[0].totalWeb
				objView.listaMostarMobile[1]	= valorJefatura[0].totalMobile
			}

			if(valorGerencia.length > 0)
			{
				objView.listaMostarWeb[2]	= valorGerencia[0].totalWeb
				objView.listaMostarMobile[2]	= valorGerencia[0].totalMobile
			}
		},
		mostrarMetricasProducto(usoMetricaProducto,numeroSemana) {
			//Me falta el let vm ? no lo se....
			var lista = _.uniq(_.map(usoMetricaProducto,'nombre'))

			var listaVacia = []
			_.each(lista,function(nombre){

				var objMetrica = _.find(usoMetricaProducto,{'numeroSemanaAño' : numeroSemana,'nombre' : nombre})
				var cantidadObjMetrica = 0
				if(objMetrica !== undefined)
				{
					cantidadObjMetrica = objMetrica.cantidad
				}

				listaVacia.push({'nombre':nombre,'cantidad': cantidadObjMetrica })
			})
			return listaVacia;
		},
		mostarFichasValidadas(listaFDA,idperiodo)
		{
			//Me falta el let vm ? no lo se....
			// var listaTipoPeriodo = _.uniq(_.map(listaFDA,'nombreTipoPeriodo'))

			var listaVacia = []
			// _.each(listaTipoPeriodo,function(nombreTipoPeriodo){

				var objMetrica = _.find(listaFDA,{'idperiodo' : idperiodo})
				var cantidadObjMetrica = 0
				if(objMetrica !== undefined)
				{
					cantidadObjMetrica = objMetrica.cantidad
				}

				listaVacia.push({'cantidad': cantidadObjMetrica })
			// })
			return listaVacia
			
		},
		getDataInconsistencias()
		{
			let vm = this;
			var direccion = window.location.href;
			var ruta = "api.dashboard.test";
			vm.ocultarInformacionYMostrarSpinner = false;
			if(direccion.includes('kindall'))
			{
				ruta = "api.dashboard.kindall.io";
			}
			vm.mostrarInconsistencias = true;
			fetch("http://"+ruta+"/api/inconsistencias?cliente="+vm.cliente.nombre).then((data)=>data.json()).then(
				function(data) {
					vm.listaInconsistencia = data
					vm.ocultarInformacionYMostrarSpinner = true;
				}
			)
		}
		
	},
	watch: {
		seleccionSemana: function (val) {			
			this.listaUsoJefaturaVista = _.filter(this.listaUsoJefatura, {'numeroSemanaAño' : parseInt(val)});
			this.listaUsoGerenciaVista = _.filter(this.listaUsoGerencia, {'numeroSemanaAño' : parseInt(val)});
			this.listaUsoJefaturaRRHHVista = _.filter(this.listaUsoJefaturaRRHH, {'numeroSemanaAño' : parseInt(val)});
			this.listaUsoUsuarioVista = _.filter(this.listaUsoUsuario, {'numeroSemanaAño' : parseInt(val)});
			this.listaUsoRflexVista = _.filter(this.listaUsoRflex, {'numeroSemanaAño' : parseInt(val)});
		},
		seleccionSemanaUsoUnidades: function (val) {			
			this.listaLoginUnidadesSemanaTablaVista = _.filter(this.listaLoginUnidadesSemanaTabla, {'numeroSemanaAño' : parseInt(val)});
		},
	},
    mounted : function() {
		
		this.listaNumeroSemanaAñoFrontUsoResumido = _.uniq(_.map(this.cliente.usoMetricaResumida,'numeroSemanaAño')).sort(function(a,b){return a-b})
		var ultimaSemana = this.listaNumeroSemanaAñoFrontUsoResumido[this.listaNumeroSemanaAñoFrontUsoResumido.length - 1]

		this.listaNumeroPeriodos = _.map(this.cliente.listaFichaValidadas,'idperiodo').sort(function(a,b){return a-b})
		// console.log(this.listaNumeroPeriodos)
		var objPeriodoActual = _.find(this.cliente.listaFichaValidadas,{'periodoActual': 1});
		var indicePeriodoAnterior
		var indicePeriodoActual = -1
		// console.log(objPeriodoActual,'objPeriodoActual')
		if(objPeriodoActual != undefined)
		{
			this.listaMostarFichasValidadas.objActualFDA = objPeriodoActual
			indicePeriodoActual = this.listaNumeroPeriodos.indexOf(objPeriodoActual.idperiodo)
			this.listaMostarFichasValidadas.numeroPeriodoActual = indicePeriodoActual
			if(indicePeriodoActual > 0)
			{
				indicePeriodoAnterior  = this.listaNumeroPeriodos[indicePeriodoActual - 1]
				this.listaMostarFichasValidadas.objActualFDA = _.find(this.cliente.listaFichaValidadas,{'idperiodo': indicePeriodoAnterior});
				this.listaMostarFichasValidadas.numeroPeriodoActual = indicePeriodoAnterior
				this.listaMostarFichasValidadas.idperiodoAnterior = indicePeriodoAnterior
				// console.log(numeroPeriodoActual,'numeroPeriodoActual')
				// console.log(objPeriodoAnterior,'objPeriodoAnterior')
			}
		}
		



		//Ultima integraciones
		this.mostrarUltimaAltaMarcaPermiso(this.cliente.estadoIntegraciones)

		//Metricas producto
		this.listaMostarUsoResumido.listaMostarProducto = this.mostrarMetricasProducto(this.cliente.usoMetricaProducto,ultimaSemana)
		this.listaNumeroPersonas = this.cliente.listaNumeroPersonas


		this.listaConfirmadosCuentas.listaConfirmados = _.filter(this.cliente.listaConfirmadosCuentas.listaConfirmados,{'confirmacion' : 1})
		this.listaConfirmadosCuentas.listaTotalConfirmadosMobile = this.cliente.listaConfirmadosCuentas.listaTotalConfirmadosMobile




		//FDAs validadas
		// this.listaMostarFichasValidadas.numeroPeriodoActual = this.listaNumeroPeriodos[0]
		// this.listaMostarFichasValidadas.objActualFDA = _.find(this.cliente.listaFichaValidadas,{'nombrePeriodo': this.listaNumeroPeriodos[0]})
		this.listaMostarFichasValidadas.listaMostarFDA = this.mostarFichasValidadas(this.cliente.listaFichaValidadas,this.listaMostarFichasValidadas.numeroPeriodoActual)



		this.mostarDatosUsoTipoUsuarioResumidoMaster(this.cliente.usoMetricaResumida,this.listaMostarUsoResumido,ultimaSemana)
        
     
    },
    data: () => ({
        tab: null,
        modalUso: false,
        mostrarInconsistencias: false,
        mostrarError: '',
        ultimaMarcaTiempo: {
					'tipoAdvertencia' : null,
					'cantidad' : ''
				},
        ultimaAltaTiempo: {
					'tipoAdvertencia' : null,
					'cantidad' : ''
				},
        ultimoPermisoTiempo: {
					'tipoAdvertencia' : null,
					'cantidad' : ''
				},
        ocultarInformacionYMostrarSpinner: false,
        seleccionSemana: '',
        seleccionSemanaUsoUnidades: '',
        modalErorres: false,
        modalUsoTotalTipoUsuario: false,
        listaUltimasMarcas : [],
        listaNumeroPeriodos : [],
        listaUsoTipoUsuarioResumidaFront : [],
        listaLoginUnidadesSemanaTabla : [],
        listaLoginUnidadesSemanaTablaVista : [],
        listaNumeroSemanaAño : [],
        listaNumeroSemanaAñoFrontUsoResumido : [],
        listaUsoCompleta : [],
        listaConfirmadosCuentas : {
			listaConfirmados : [],
			listaTotalConfirmadosMobile : [],
		},
        listaNumeroPersonas : [],
        listaMostarUsoResumido : {
			numeroSemanaActual : 0,
			listaMostarWeb : [],
			listaMostarMobile : [],
			listaMostarProducto : [],
		},
		listaMostarFichasValidadas : {
			numeroPeriodoActual : 0,
			idperiodoAnterior : 0,
			objActualFDA : {
				'fechaInicio' : '',
				'fechaTermino' : ''
			},
			listaMostarFDA : []
		},
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
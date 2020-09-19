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
			<v-btn x-small color="primary" @click="getDataInconsistenciasRefresh()">Inconsistencias</v-btn>
			
				
					
				<!-- <table v-show="ocultarInformacionYMostrarSpinner || mostrarInconsistencias"> -->
				<table >
					<tr>
						<td colspan="2" style="font-weight: bold;text-decoration: underline;">Inconsistencias  {{cliente.listaInconsistencia[0].fechaActualizacion}}</td>
					</tr>
					<tr>
						<v-progress-circular v-show="!ocultarInformacionYMostrarSpinner && mostrarInconsistencias"
								indeterminate
								color="red"
						></v-progress-circular>
					</tr>

					
					<tr v-for="(item) in cliente.listaInconsistencia" :key="item.nombre + item.cantidad">
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
						<v-select
							v-model="seleccionSemanaUsoUnidades"
							item-text="nombreFecha"
							item-value="numeroSemana"
							:items="objListaUsoUnidades.listaNumeroSemanaAño"
							label="Selección de semana"
							return-object
							></v-select>
					</v-col>
					<v-col md="3">
						<div>
							{{objListaUsoUnidades.ultimaActualizacion}}
						</div>
					</v-col>
				</v-row>
                <v-data-table
                    :headers="headersListaUsoUnidades"
                    :items="objListaUsoUnidades.listaLoginUnidadesSemanaTablaVista"
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
						<v-select
							v-model="seleccionSemana"
							item-text="nombreFecha"
							item-value="numeroSemana"
							:items="objListaUsoTotal.listaNumeroSemanaAño"
							label="Selección de semana"
							return-object
							></v-select>
					</v-col>
					<v-col md="3">
						<div>
							{{objListaUsoTotal.ultimaActualizacion}}
						</div>
					</v-col>
				</v-row>
				<v-row style="display: block;"  v-if="ocultarInformacionYMostrarSpinner">

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
										:items="objListaUsoTotal.listaUsoJefaturaVista"
										:items-per-page="20"
										class="elevation-1"
									></v-data-table>
								
							</v-tab-item>
							<v-tab-item>
								<v-data-table
									:headers="headersListaUsoJefatura"
									:items="objListaUsoTotal.listaUsoGerenciaVista"
									:items-per-page="20"
									class="elevation-1"
								></v-data-table>
							</v-tab-item>
							<v-tab-item>
								<v-data-table
									:headers="headersListaUsoJefatura"
									:items="objListaUsoTotal.listaUsoJefaturaRRHHVista"
									:items-per-page="20"
									class="elevation-1"
								></v-data-table>
							</v-tab-item>
							<v-tab-item>
								<v-data-table
									:headers="headersListaUsoJefatura"
									:items="objListaUsoTotal.listaUsoUsuarioVista"
									:items-per-page="20"
									class="elevation-1"
								></v-data-table>
							</v-tab-item>
							<v-tab-item>
								<v-data-table
									:headers="headersListaUsoJefatura"
									:items="objListaUsoTotal.listaUsoRflexVista"
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
		<div style="font-weight: bold;">
			{{cliente.version}}
		</div>
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
		weekDateToDate (year, week, day) {
			const firstDayOfYear = new Date(year, 0, 1)
			const days = 2 + day + (week - 1) * 7 - firstDayOfYear.getDay()
			return new Date(year, 0, days)
		},
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

				if(data[0] !== undefined){
					vm.objListaUsoTotal.ultimaActualizacion = 'Hora Actualizacion '+data[0].horaActualizacion
				}
				
				vm.objListaUsoTotal.listaUsoJefatura = _.filter(data,{'tipo_segun_nombre': 'jefatura'});
				vm.objListaUsoTotal.listaUsoGerencia = _.filter(data,{'tipo_segun_nombre': 'gerencia'});
				vm.objListaUsoTotal.listaUsoJefaturaRRHH = _.filter(data,{'tipo_segun_nombre': 'jefatura_rrhh'});
				vm.objListaUsoTotal.listaUsoUsuario = _.filter(data,{'tipo_segun_nombre': 'usuario'});
				vm.objListaUsoTotal.listaUsoRflex = _.filter(data,{'tipo_segun_nombre': 'rFlex'});


				//Con eso construyo el combobox
				vm.objListaUsoTotal.listaNumeroSemanaAño = _.map(_.uniq(_.map(data,'numeroSemanaAño')).sort(function(a,b){return b-a}),function(valor){
					return {
							numeroSemana : valor,
							nombreFecha : window.moment(vm.weekDateToDate((new Date).getFullYear(),valor,0)).format('YYYY-MM-DD')+' - '+window.moment(vm.weekDateToDate((new Date).getFullYear(),valor,6)).format('YYYY-MM-DD')
						}
				})


				if(vm.objListaUsoTotal.listaNumeroSemanaAño.length > 0)
				{
					
					vm.seleccionSemana = vm.objListaUsoTotal.listaNumeroSemanaAño[0]
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

				if(data[0] !== undefined) {
					vm.objListaUsoUnidades.ultimaActualizacion = 'Hora Actualizacion '+data[0].horaActualizacion
				}

					//Con eso construyo el combobox
					vm.objListaUsoUnidades.listaNumeroSemanaAño = _.map(_.uniq(_.map(data,'numeroSemanaAño')).sort(function(a,b){return b-a}),function(valor){
						return {
								numeroSemana : valor,
								nombreFecha : window.moment(vm.weekDateToDate((new Date).getFullYear(),valor,0)).format('YYYY-MM-DD')+' - '+window.moment(vm.weekDateToDate((new Date).getFullYear(),valor,6)).format('YYYY-MM-DD')
							}
					})

					if(vm.objListaUsoUnidades.listaNumeroSemanaAño.length > 0)
					{
						// Con var no funciona pasa algo nada que ver...
						vm.seleccionSemanaUsoUnidades = vm.objListaUsoUnidades.listaNumeroSemanaAño[0]
						// vm.objListaUsoUnidades.listaLoginUnidadesSemanaTablaVista = _.filter(data, {'numeroSemanaAño' : parseInt(vm.seleccionSemanaUsoUnidades.numeroSemana)});
					}

					vm.objListaUsoUnidades.listaLoginUnidadesSemanaTabla = data
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
		getDataInconsistenciasRefresh()
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
					vm.cliente.listaInconsistencia = data
					vm.ocultarInformacionYMostrarSpinner = true;
				}
			)
		}
		
	},
	watch: {
		seleccionSemana: function (val) {			
			this.objListaUsoTotal.listaUsoJefaturaVista = _.filter(this.objListaUsoTotal.listaUsoJefatura, {'numeroSemanaAño' : parseInt(val.numeroSemana)});
			this.objListaUsoTotal.listaUsoGerenciaVista = _.filter(this.objListaUsoTotal.listaUsoGerencia, {'numeroSemanaAño' : parseInt(val.numeroSemana)});
			this.objListaUsoTotal.listaUsoJefaturaRRHHVista = _.filter(this.objListaUsoTotal.listaUsoJefaturaRRHH, {'numeroSemanaAño' : parseInt(val.numeroSemana)});
			this.objListaUsoTotal.listaUsoUsuarioVista = _.filter(this.objListaUsoTotal.listaUsoUsuario, {'numeroSemanaAño' : parseInt(val.numeroSemana)});
			this.objListaUsoTotal.listaUsoRflexVista = _.filter(this.objListaUsoTotal.listaUsoRflex, {'numeroSemanaAño' : parseInt(val.numeroSemana)});
		},
		seleccionSemanaUsoUnidades: function (val) {
			this.objListaUsoUnidades.listaLoginUnidadesSemanaTablaVista = _.filter(this.objListaUsoUnidades.listaLoginUnidadesSemanaTabla, {'numeroSemanaAño' : parseInt(val.numeroSemana)});
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
        seleccionSemana : {
			'numeroSemana' : '',
			'nombreFecha' : ''
		},
        seleccionSemanaUsoUnidades: {
			'numeroSemana' : '',
			'nombreFecha' : ''
		},
        modalErorres: false,
        modalUsoTotalTipoUsuario: false,
        listaUltimasMarcas : [],
        listaNumeroPeriodos : [],
        listaUsoTipoUsuarioResumidaFront : [],
		objListaUsoUnidades : {
			ultimaActualizacion : '',
			listaLoginUnidadesSemanaTablaVista : [],
			listaLoginUnidadesSemanaTabla : [],
		},
        listaNumeroSemanaAñoFrontUsoResumido : [],
        listaUsoCompleta : [],
        listaConfirmadosCuentas : {
			listaConfirmados : [],
			listaNumeroSemanaAño : [],
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
		objListaUsoTotal : {
			ultimaActualizacion : '',
			listaNumeroSemanaAño : [],
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
		},
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
          { text: 'Nombre Dia', value: 'diasNombres' },
          { text: 'Cantidad Días', value: 'cantidadDias' },
          { text: 'Ultimo Login', value: 'ultimoRegistro' },
        ],
        headersListaUsoJefatura: [
          {
            text: 'Usuario',
            align: 'start',
            sortable: false,
            value: 'usuario',
          },
          { text: 'idunidad', value: 'idunidad' },
          { text: 'nombreUnidad', value: 'nombreUnidad' },
        
          { text: 'Suma Login', value: 'sumaAuditoria' },
          { text: 'Uso Web', value: 'sumaWeb' },
          { text: 'Uso Mobile', value: 'sumaMobile' },
          { text: 'Cantidad Días', value: 'cantidadDias' },
          { text: 'Días', value: 'diasNombres' },
          { text: 'Días Login', value: 'diasNumeros_auditoria' },
          { text: 'Días Web', value: 'diasNumeros_web' },
          { text: 'Días Mobile', value: 'diasNumeros_mobile' },
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
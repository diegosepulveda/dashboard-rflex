<template>
  <v-app id="inspire">
      <app-bar></app-bar>
    <v-main>
		<v-container bg fill-height grid-list-md text-xs-center v-show="ocultarInformacionYMostrarSpinner">
			<v-layout row wrap align-center>
				<v-flex>
					<v-progress-circular 
						indeterminate
						color="blue"
						size="64"
					></v-progress-circular>
				</v-flex>
			</v-layout>
		</v-container>
      <v-container fluid>
        <v-row>
            <v-col md="6">
                <v-card
                    class="mx-auto"
                >

                    <v-row>
                        <!-- <v-col md="12"> -->
                            <v-col md="6">
                                <v-select
                                    v-model="seleccionListaDropDownDias"
                                    item-text="nombreFecha"
                                    item-value="numeroSemana"
                                    :items="listaDropDownDias"
                                    label="Selección intervalo dias"
                                    return-object
                                    ></v-select>
                            </v-col>
                        <!-- </v-col> -->
                        <!-- <v-col md="3">
                            <v-select
                                v-model="seleccionSemana"
                                item-text="nombreFecha"
                                item-value="numeroSemana"
                                :items="listaDropDownSemana"
                                label="Selección de semana"
                                return-object
                                ></v-select>
                        </v-col> -->
                    </v-row>
                    <v-row>
                        <v-col md="12">
                            <table>
                                <tr>
                                    <td colspan="2">Colaboradores gestionados</td>
                                </tr>
                                <tr>
                                    <td>
                                        <v-icon x-large class="">mdi-account-group</v-icon>
                                    </td>
                                    <td>
                                        {{listaColaboradoresGestionados.listaTotalColaboradores}}
                                    </td>
                                </tr>
                            </table>
                        </v-col>
                    </v-row>
                    
                    <v-row>
                        <v-col md="12">
                            <table>
                                <tr>
                                    <th colspan="3"># {{seleccionListaDropDownDias}} días</th>
                                    <td>Gerencia</td>
                                    <td>Jefatura</td>
                                    <td>Usuario</td>
                                </tr>
                                <tr>
                                    <td colspan="3"><v-icon x-large class="" >mdi-desktop-mac</v-icon></td>
                                    <td>{{this.listaActividadUsuarioPorIntervaloVista.webAuditoria.gerencia}}</td>
                                    <td>{{this.listaActividadUsuarioPorIntervaloVista.webAuditoria.jefatura}}</td>
                                    <td>{{this.listaActividadUsuarioPorIntervaloVista.webAuditoria.usuario}}</td>
                                </tr>
                            </table>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col md="12">
                            <table>
                                <tr>
                                    <th colspan="3"># {{seleccionListaDropDownDias}} días</th>
                                    <td>Jefatura</td>
                                    <td>Usuario</td>
                                </tr>
                                <tr>
                                    <td colspan="3"><v-icon x-large class="" >mdi-cellphone</v-icon></td>
                                    <td>{{this.listaActividadUsuarioPorIntervaloVista.mobile.jefatura}}</td>
                                    <td>{{this.listaActividadUsuarioPorIntervaloVista.mobile.usuario}}</td>
                                </tr>
                            </table>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col md="12">
                            <table>
                                <tr>
                                    <td colspan="2">Por estamento</td>
                                </tr>
                                <tr v-for="(obj,index) in listaColaboradoresGestionados.listaTotalColaboradoresPorEstamento" :key="index">
                                    <td>{{index}}</td>
                                    <td>{{obj}}</td>
                                </tr>
                            </table>
                        </v-col>
                    </v-row>
                   
                </v-card>
            </v-col>

            <v-col md="6">
                <v-card
                    max-width="450"
                    class="mx-auto"
                >
                    <v-list expand>
                        <template v-for="(feedback) in listaFeedback">
                            <v-subheader 
                            :key="feedback.idfeedback+feedback.cliente">
                            {{feedback.cliente}} | {{feedback.nombreUnidad}}
                            </v-subheader>

                            <!-- <v-divider
                            v-else-if="item.divider"
                            :key="index"
                            :inset="item.inset"
                            ></v-divider>
                            -->
                            <v-list-item :key="feedback.idfeedback+feedback.cliente+feedback.idfeedback"> 
                                <v-list-item-avatar>
                                    <v-icon class="blue" dark>mdi-clipboard-text</v-icon>
                                </v-list-item-avatar>

                                <v-list-item-content>
                                    <v-list-item-title >{{feedback.Nombre}} {{feedback.nombreDetPuesto}} </v-list-item-title>
                                    <v-list-item-subtitle style="white-space: inherit;">
                                        {{feedback.mensaje}}
                                        {{feedback.created_at}}
                                    </v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                        </template>
                    </v-list>
                </v-card>
            </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

import AppBar from "@/components/AppBar.vue"
import _ from 'lodash'


export default {
	props: {
		source: String
	},
	components: {
		AppBar
		
	},
	computed : {
		
    },
    watch : {
        seleccionListaDropDownDias: function (val) {			
			console.log(val);
            console.log(this.listaActividadUsuarioPorIntervalo[val]);
            this.listaActividadUsuarioPorIntervaloVista.mobile = this.listaActividadUsuarioPorIntervalo[val].mobile
            this.listaActividadUsuarioPorIntervaloVista.webAuditoria = this.listaActividadUsuarioPorIntervalo[val].webAuditoria
		},
    },
	methods : {
		getFeedback(){
            this.ocultarInformacionYMostrarSpinner = true
            this.$http.get("api/consolidado/feedback").then(data=>data.data).then((data)=>{
                this.listaFeedback = _.take(data,10) // Aca tengo que crear un ID unico
                // this.listaFeedback = data
                this.ocultarInformacionYMostrarSpinner = false
            })
        },
        getColaboradoresGestionados(){
            this.ocultarInformacionYMostrarSpinner = true
            this.$http.get("api/consolidado/colaboradores-gestionados").then(data=>data.data).then((data)=>{
                this.listaColaboradoresGestionados = data
                this.ocultarInformacionYMostrarSpinner = false
            })
        },
        getActividadPorUsuario7_14_30_yPorSemana(){
            this.ocultarInformacionYMostrarSpinner = true
            this.$http.get("api/consolidado/actividad").then(data=>data.data).then((data)=>{
                console.log(data);

                this.listaActividadUsuarioPorIntervalo = data.listaActividadUsuarioPorIntervalo
                this.listaDropDownDias = _.keysIn(data.listaActividadUsuarioPorIntervalo)
                this.seleccionListaDropDownDias = this.listaDropDownDias[0];
                // this.listaDropDownSemana = _.uniq(_.map(data.listaActividadUsuarioPorSemana,'numeroSemanaAño'));

                this.ocultarInformacionYMostrarSpinner = false
            })
        }
	},
	mounted : function() {
		this.getFeedback();
		this.getColaboradoresGestionados();
		this.getActividadPorUsuario7_14_30_yPorSemana();
	},
	data: () => ({
		listaFeedback : [],
        listaActividadUsuarioPorIntervalo : [],
        listaActividadUsuarioPorIntervaloVista : {
            mobile : {
                jefatura : 0,
                usuario : 0
            },
            webAuditoria : {
                jefatura : 0,
                usuario : 0,
                gerencia : 0
            }
        },
        listaDropDownDias : [],
        listaColaboradoresGestionados : {
            listaTotalColaboradores: 0,
            listaTotalColaboradoresPorEstamento: {
                "Enfermeras/Matronas": 0,
                Médicos: 0,
                TENS: 0,
                Tecnólogos: 0,
                Nutricionistas: 0,
                Kinesiologos: 0
            }
        },
		seleccionListaDropDownDias : 0,
		listaDropDownSemana : [],
		ocultarInformacionYMostrarSpinner: true
	})
};
</script>
<style scoped>
.v-card {
    padding: 12px;
}
</style>
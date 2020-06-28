<template>
  <v-card class="mx-auto" max-width="1000" outlined>
        <!-- <v-sheet elevation="6"> -->
            <!-- <v-tabs
            background-color="cyan"
            dark
            v-model="tab"
            next-icon="mdi-arrow-right-bold-box-outline"
            prev-icon="mdi-arrow-left-bold-box-outline"
            show-arrows
            >
            <v-tabs-slider color="yellow"></v-tabs-slider>
            <v-tab
                v-for="i in 30"
                :key="i"
                :href="'#tab-' + i"
            >
                Item {{ i }}
            </v-tab>
            </v-tabs>
            <v-tabs-items v-model="tab">
                <v-tab-item
                    v-for="item in items"
                    :key="item.tab"
                >
                    <v-card flat>
                    <v-card-text>{{ item.content }}</v-card-text>
                    </v-card>
                </v-tab-item>
            </v-tabs-items> -->
        <!-- </v-sheet> -->
        <v-row>
            <v-col style="padding: 0px;">
                <slot></slot>
            </v-col>
        </v-row>
        <v-row>
          <v-col>
                <li v-for="(item) in listaUltimasMarcas" :key="item.RUT_FUNCIONARIO + item.FECHA_MARCA + item.HORA_MARCA">
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
          <!-- <v-col>
              <table>
                <tr><td>ausenciaTipoPermisoFueraRangoPermiso</td> <td>4</td></tr>
                <tr><td>duplicadosPermisos</td> <td>0</td></tr>
                <tr><td>duplicadosAlta</td> <td>0</td></tr>
                <tr><td>duplicadosPermisosResumen</td> <td>1</td></tr>
                <tr><td>duplicadosPersonaRflex</td> <td>6</td></tr>
                <tr><td>duplicadosTurnos</td> <td>3</td></tr>
                <tr><td>InconsistenciasMarcaPagoReloj</td> <td>6</td></tr>
                <tr><td>turnoContratoNull</td> <td>2</td></tr>
                <tr><td>erroresCambioTurno</td> <td>13</td></tr>
              </table>
          </v-col>
          <v-col>
              <table>
                <tr><td>ausenciaTipoPermisoFueraRangoPermiso</td> <td>4</td></tr>
                <tr><td>duplicadosPermisos</td> <td>0</td></tr>
                <tr><td>duplicadosAlta</td> <td>0</td></tr>
                <tr><td>duplicadosPermisosResumen</td> <td>1</td></tr>
                <tr><td>duplicadosPersonaRflex</td> <td>6</td></tr>
                <tr><td>duplicadosTurnos</td> <td>3</td></tr>
                <tr><td>InconsistenciasMarcaPagoReloj</td> <td>6</td></tr>
                <tr><td>turnoContratoNull</td> <td>2</td></tr>
                <tr><td>erroresCambioTurno</td> <td>13</td></tr>
              </table>
          </v-col> -->
      </v-row>

    <v-card-actions>
      <v-btn text>Detalles</v-btn>
      <v-btn v-on:click="getData" text>Data</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
    name: "CardCliente",
    props : {
        'clinica' : String
    },
    methods : {
        getData() {
            console.log(this.clinica)
            // fetch("http://api.dashboard.test/api/data").then((data)=>data.json()).then((data)=>console.log(data));
        }
    },
    mounted : function() {
        fetch("http://api.dashboard.test/api/inconsistencias?clinica="+this.clinica).then((data)=>data.json()).then((data)=>this.listaInconsistencia = data)


        fetch("http://api.dashboard.test/api/marcas?clinica="+this.clinica).then((data)=>data.json()).then((data)=>this.listaUltimasMarcas = data)
    },
    data: () => ({
        tab: null,
        listaUltimasMarcas : [],
        listaInconsistencia : [],
        items: [
          { tab: 'One', content: 'Tab 1 Content' },
          { tab: 'Two', content: 'Tab 2 Content' },
          { tab: 'Three', content: 'Tab 3 Content' },
          { tab: 'Four', content: 'Tab 4 Content' },
          { tab: 'Five', content: 'Tab 5 Content' },
          { tab: 'Six', content: 'Tab 6 Content' },
          { tab: 'Seven', content: 'Tab 7 Content' },
          { tab: 'Eight', content: 'Tab 8 Content' },
          { tab: 'Nine', content: 'Tab 9 Content' },
          { tab: 'Ten', content: 'Tab 10 Content' },
        ],

    })
};
</script>
<style scoped>
    table{
    font-size: 13px;
}
</style>
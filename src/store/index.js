import Vue from "vue"
import Vuex from "vuex"
import _ from 'lodash'

// import axios from "axios"

Vue.use(Vuex)

export default new Vuex.Store({
    // In a state we are keeping our data, and shared data between componentes
    state : {
        listaClientes : [],
        ocultarInformacionYMostrarSpinner: true
    },
    //Computed propoerties, get a state from a vue store. Simple functions to get a state
    getters : {
        listaClientes (state){
            return state.listaClientes           
        },
        ocultarInformacionYMostrarSpinner (state) {
            return state.ocultarInformacionYMostrarSpinner
        }
    },
    //methods in a vue componentes
    //Very good spot to fetch data. Action call usualy should resolve into data
    actions : {
        getListaClientes(context) {
            var direccion = window.location.href;
            var ruta = "api.dashboard.test";
            if (direccion.includes('kindall')) {
                ruta = "api.dashboard.kindall.io";
            }
            context.commit('setSpinner', true)
            let vm = this._vm;

            fetch("http://" + ruta + "/api/lista-clientes").then(
                function (data) {
                    return data.json()
                }
            ).then(
                function (datos) {

                    fetch("http://" + ruta + "/api/replica-masiva").then((data) => data.json()).then(function (listaClientesReplicas) {
                        datos.forEach(element => {
                            element.replica = _.find(listaClientesReplicas, { 'nombre': element.nombre }).replica;
                        });
                        // context.commit('setListaCliente', datos)
                    });

                    fetch("http://" + ruta + "/api/lista-version").then((data) => data.json()).then(function (listaVersion) {
                        datos.forEach((element,indice) => {
                            // element.version = _.find(listaVersion, { 'nombre': element.nombre }).version;
                            console.log(vm);
                            vm.$set(datos[indice], 'version', _.find(listaVersion, { 'nombre': element.nombre }).version)
                            // vm.$nextTick()
                        });
                        // console.log('commit setListaCliente version',datos)
                        // console.log(vm)
                        
                        // context.commit('setListaCliente', datos)
                        // Vue.nextTick();
                    });
                    
                    // listaClientes = datos;
                    context.commit('setListaCliente', datos)
                    context.commit('setSpinner', false)
                    
                }
            );
        }
    },
    // Simple function to mutate the state
    mutations : {
        setListaCliente(state,listaClientes){
            state.listaClientes = listaClientes
        },
        setSpinner(state,valor){
            state.ocultarInformacionYMostrarSpinner = valor
        }
    }
})
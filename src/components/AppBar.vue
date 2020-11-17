<template>
    <div>
        <v-app-bar app color="indigo" class="hola" dark>
            <v-app-bar-nav-icon @click.stop="sidebar = !sidebar"></v-app-bar-nav-icon>
            <v-toolbar-title>rFlex Dash</v-toolbar-title>
        </v-app-bar>
        <v-navigation-drawer v-model="sidebar" app>
        <v-list dense>
            <v-list-item link>
            <v-list-item-action>
                <v-icon>mdi-chart-areaspline</v-icon>
            </v-list-item-action>
            <v-list-item-content>
                <v-list-item-title>
                <router-link to="Inicio">Principal</router-link>
                </v-list-item-title>
            </v-list-item-content>
            </v-list-item>
            <v-list-item link>
            <v-list-item-action>
                <v-icon>mdi-card-text-outline</v-icon>
            </v-list-item-action>
            <v-list-item-content>
                <v-list-item-title>
                <router-link to="Implementacion">Implementación</router-link>
                </v-list-item-title>
            </v-list-item-content>
            </v-list-item>
            <v-list-item link>
            <v-list-item-action>
                <v-icon>mdi-card-text-outline</v-icon>
            </v-list-item-action>
            <v-list-item-content>
                <v-list-item-title>
                <router-link to="Producto">Producto</router-link>
                </v-list-item-title>
            </v-list-item-content>
            </v-list-item>
            <v-list-item link>
            <v-list-item-action>
                <v-icon>mdi-account-arrow-right-outline</v-icon>
            </v-list-item-action>
            <v-list-item-content>
                <v-list-item-title>
                    <div @click="logout()">Log Out</div>
                <!-- <router-link to="Implementacion"></router-link> -->
                </v-list-item-title>
            </v-list-item-content>
            </v-list-item>
        </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script>
export default {
    data: () => ({
        sidebar : false,
    }),
    computed : {
      isLoggedIn : function(){ return this.$store.getters.isLoggedIn}
    },
    methods: {
        logout : function(){
            this.$store.dispatch('auth/logout')
                .then(() => {
                this.$router.push('/login')
            })
        }
    }
}
</script>

<style>
.hola {
    background: #9053c7;
    background: -webkit-linear-gradient(-135deg, #17a2b8, #4158d0);
    background: -o-linear-gradient(-135deg, #17a2b8, #4158d0);
    background: -moz-linear-gradient(-135deg, #17a2b8, #4158d0);
    background: linear-gradient(-135deg, #17a2b8, #4158d0);
}
</style>
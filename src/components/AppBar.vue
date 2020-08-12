<template>
    <div>
        <v-app-bar app color="indigo" dark>
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
        </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script>
export default {
    data: () => ({
        sidebar : false,
    })
}
</script>

<style>

</style>
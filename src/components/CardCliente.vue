<template>
  <v-card class="mx-auto" max-width="344" outlined>
      <v-row>
          <v-col>
                <v-chip
                    class="ma-2"
                    color="orange"
                    text-color="white"
                >
                Premium
                <v-icon right>mdi-star</v-icon>
                </v-chip>
          </v-col>
          <v-col>
              <v-chip
                    class="ma-2"
                    color="orange"
                    text-color="white"
                >
                Premium
                <v-icon right>mdi-star</v-icon>
                </v-chip>
          </v-col>
          <v-col>
              <v-chip
                    class="ma-2"
                    color="orange"
                    text-color="white"
                >
                Premium
                <v-icon right>mdi-star</v-icon>
                </v-chip>
          </v-col>
          <v-col>
              <v-chip
                    class="ma-2"
                    color="orange"
                    text-color="white"
                >
                Premium
                <v-icon right>mdi-star</v-icon>
                </v-chip>
          </v-col>
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
    methods : {
        getData() {
            fetch("http://api.dashboard.test/api/data").then((data)=>data.json()).then((data)=>console.log(data));
        }
    },
    data: () => ({})
};
</script>
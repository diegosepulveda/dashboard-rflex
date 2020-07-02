<script>
import { Bar } from 'vue-chartjs'
import _ from 'lodash'

export default {
  extends: Bar,
  props : ['listaData','tituloGrafico'],
  data : function(){
    return {


      data: {
            labels: _.map(this.listaData,'fecha'),
            datasets: [{
                label: this.tituloGrafico,
				data: _.map(this.listaData,'cuenta'),
				backgroundColor: '#f87979',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        },
    }
  },
  mounted () {
    this.renderChart(this.data, this.options)
  }
}
</script>

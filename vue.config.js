const fs = require('fs')

module.exports = {

  devServer: {
    // https: {
    //   key: fs.readFileSync('./localhost.key'),
    //   cert: fs.readFileSync('./localhost.crt'),
    // },
    // public: 'https://localhost:8080/'
  },

  "transpileDependencies": [
    "vuetify"
  ]
}
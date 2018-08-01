const express = require('express')
const tyboost = require('tyboost')
const bodyParser = require('body-parser')
let yamlConfig = require('node-yaml-config')
let config = yamlConfig.load(__dirname + '/config/config.yml')

let app = tyboost(express(), config)

app.register((app)=>{
  app.use(bodyParser.json())
})

app.register(tyboost.services(__dirname + '/src/models'))
app.register(tyboost.services(__dirname + '/src/services'))
app.register(tyboost.routes(__dirname + '/src/controllers'))
app.register(tyboost.middlewares(__dirname + '/src/middlewares'))


async function start () {
  try {
    await app.boot()
    app.listen(8080, () => {
      console.log('Listen on port 8080')
    })
  } catch(err) {
    console.log(err)
  }
}

start()

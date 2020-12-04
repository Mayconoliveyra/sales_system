const bodyParser = require("body-parser") /* faz as requisição get, post, put, delete... */
const cors = require("cors") /* nessesario para fazer a ligação entre frontend e backend */

module.exports = app => {
    app.use(bodyParser.json({limit: '150mb', extended: true}))  // aumenta o limite que pode ser requisitado no body
    app.use(cors())
}
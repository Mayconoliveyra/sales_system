import Vue from "vue"
import Toasted from "vue-toasted"


Vue.use(Toasted, {
    iconPack: "fontawesome",
    duration: 4000
})


Vue.toasted.register(
    "defaultSuccess",
    payload => !payload.msg ? "Operação realizada com sucesso!" : payload.msg,
    { type: "success", icon: "check", theme: "outline" }
)

Vue.toasted.register(
    "defaultError",
    payload => !payload.msg ? "Oops... Erro inesperado." : payload.msg,
    { type: "error", icon: "times", theme: "outline" }
)

// xml
Vue.toasted.register(
    "defaultSuccessImportXml",
    payload => !payload.msg ? "Nota fiscal importada com sucesso!" : payload.msg,
    { type: "success", icon: "fa-cloud-upload", theme: "outline" }
),
Vue.toasted.register(
    "defaultSuccessFinalizarCompra",
    payload => !payload.msg ? "Compra finalizada com sucesso!" : payload.msg,
    { type: "success", icon: "fa-cloud-upload", theme: "outline" }
),
Vue.toasted.register(
    "erroXmlNaoSelec",
    payload => !payload.msg ? "Selecione um arquivo XML" : payload.msg,
    { type: "error", icon: "fa-exclamation-triangle", theme: "outline" }
)
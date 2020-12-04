import Vue from "vue"

export const baseApiUrl = "http://localhost:3030"


export function showError(e) {
    if (e && e.response && e.response.data) {
        Vue.toasted.global.defaultError({ msg: e.response.data })
    } else if (typeof e === "string") {
        Vue.toasted.global.defaultError({ msg: e })
    } else {
        Vue.toasted.global.defaultError() /* mensagem do msg sera invocada */
    }
}
export function showSuccesImportNota() {

    Vue.toasted.global.defaultSuccessImportXml() /* mensagem do msg sera invocada */

}




export default { baseApiUrl, showError, showSuccesImportNota }
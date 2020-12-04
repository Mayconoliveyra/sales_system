import Vue from "vue"
import Vuex from "vuex" /* faz a manilação de uma pagina mesmo sem ter ela como filha */


Vue.use(Vuex)


export default new Vuex.Store({
    state: {
        isMenuVisible: false,
        cadastrosMenuVisible: false,
        produtosMenuVisible: false,
        estoqueMenuVisible: false
    },
    mutations: {
        toggleMenu(state, isVisible) {
            if (isVisible === undefined) {
                state.isMenuVisible = !state.isMenuVisible
            } else {
                state.isMenuVisible = isVisible
            }
            /* console.log("toggleMenu= " + state.isMenuVisible) */
        },

        toggleCadastros(state, isVisible) {
            if (isVisible === undefined) {
                state.cadastrosMenuVisible = !state.cadastrosMenuVisible
            } else {
                state.cadastrosMenuVisible = isVisible
            }
        },
        toggleProdutos(state, isVisible) {
            if (isVisible === undefined) {
                state.produtosMenuVisible = !state.produtosMenuVisible
            } else {
                state.produtosMenuVisible = isVisible
            }
        },
        toggleEstoque(state, isVisible) {
            if (isVisible === undefined) {
                state.estoqueMenuVisible = !state.estoqueMenuVisible
            } else {
                state.estoqueMenuVisible = isVisible
            }
        },

    }
})
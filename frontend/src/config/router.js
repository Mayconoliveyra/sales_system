import Vue from "vue"
import VueRouter from "vue-router"

import Home from "@/components/home/Home"
import ClientesAdmin from "@/components/admin/pages/ClientesAdmin"
import FornecedoresAdmin from "@/components/admin/pages/FornecedoresAdmin"
import ProdutosAdmin from "@/components/admin/pages/ProdutosAdmin"
import ValoresVendaAdmin from "@/components/admin/pages/ValoresVendaAdmin"
import OpcoesAuxiliaresAdmin from "@/components/admin/pages/OpcoesAuxiliaresAdmin"
import ComprasAdmin from "@/components/admin/pages/ComprasAdmin"
import ImportaXmlAdmin from "@/components/admin/pages/ImportaXmlAdmin"


Vue.use(VueRouter)

const routes = [{
    name: "home",
    path: "/",
    component: Home
},
{
    name: "clientesAdmin",
    path: "/admin/clientes",
    component: ClientesAdmin
},
{
    name: "fornecedoresAdmin",
    path: "/admin/fornecedores",
    component: FornecedoresAdmin
},
{
    name: "produtosAdmin",
    path: "/admin/produtos",
    component: ProdutosAdmin
},
{
    name: "valoresVendaAdmin",
    path: "/admin/produtos/valores_venda",
    component: ValoresVendaAdmin
},
{
    name: "opcoesAuxiliaresAdmin",
    path: "/admin/produtos/opcoes_auxiliares",
    component: OpcoesAuxiliaresAdmin
},
{
    name: "compasAdmin",
    path: "/admin/estoque/compras",
    component: ComprasAdmin
},
{
    name: "importaXML",
    path: "/admin/estoque/compras/importa_xml",
    component: ImportaXmlAdmin
}]

export default new VueRouter({
    mode: "history",
    routes
})
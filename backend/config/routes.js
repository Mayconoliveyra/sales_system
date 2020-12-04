module.exports = app => {
    app.route("/cliente")
        .post(app.api.cliente.save)
        .get(app.api.cliente.getCliente)
    app.route("/cliente/:id")
        .put(app.api.cliente.save)
        .delete(app.api.cliente.remove)


    app.route("/fornecedor")
        .post(app.api.fornecedor.save)
        .get(app.api.fornecedor.getFornecedor)
    app.route("/fornecedor/:id")
        .put(app.api.fornecedor.save)
        .get(app.api.fornecedor.getFornecedoPorCNPJ)
        .delete(app.api.fornecedor.remove)


    app.route("/produto")
        .post(app.api.produto.save)
        .get(app.api.produto.getProdutos)
    app.route("/produto/:id")
        .put(app.api.produto.save)
        .delete(app.api.produto.remove)


    app.route("/produto/grupos_produtos")
        .post(app.api.produto.saveGruposProdutos)
        .get(app.api.produto.getGruposProdutos)
    app.route("/produto/grupos_produtos/:id")
        .put(app.api.produto.saveGruposProdutos)
        .delete(app.api.produto.removeGruposProdutos)


    app.route("/produto/unidades_medidas")
        .post(app.api.produto.saveUnidadeMedida)
        .get(app.api.produto.getUnidadesMedidas)
    app.route("/produto/unidades_medidas/:id")
        .put(app.api.produto.saveUnidadeMedida)
        .delete(app.api.produto.removeUnidadeMedida)


    app.route("/produto/campos_extras")
        .post(app.api.produto.saveCampoExtra)
        .get(app.api.produto.getCamposExtras)
    app.route("/produto/campos_extras/:id")
        .put(app.api.produto.saveCampoExtra)
        .delete(app.api.produto.removeCampoExtra)


    app.route("/produto/valores_venda")
        .post(app.api.produto.saveValoresVenda)
        .get(app.api.produto.getValoresVenda)
    app.route("/produto/valores_venda/:id")
        .put(app.api.produto.saveValoresVenda)
        .delete(app.api.produto.removeValoresVenda)


    app.route("/importa_nova_nota_xml")
        .post(app.api.importaNotaXML.salvaNovaNotaXML)


    app.route("/importa_nova_nota_xml/leitura")
        .get(app.api.importaNotaXML.getNotasXmls)


    app.route("/importa_nova_nota_xml/verifica_produto/:codigo_importacao/:prod_ucom") // VERIFICA SE O PRODUTO JÁ FOI CADASTRADO NA TABELA DE IMPORTAÇÃO AUTOMATICA
        .get(app.api.importaNotaXML.getImportaProdAutimatico)

    app.route("/importa_nova_nota_xml/finalizar_compra") // finaliza a compra
        .post(app.api.importaNotaXML.finalizarCompra)

}
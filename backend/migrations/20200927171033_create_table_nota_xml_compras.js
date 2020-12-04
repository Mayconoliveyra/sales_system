exports.up = function (knex) {
    return knex.schema.createTable("nota_xml_compras", table => {
        table.increments("id").primary()
        table.decimal("chave_acesso", 44, 0).notNull().unique() // (tamanho maximo 44, 0 casa decimais)
        table.string("status") // status da nfe - se ja foi compra ou esta pedente
        table.string("cnpj_forn")  // cnpj do fornecedor
        table.string("nome_forn") // xnome- nome do fornecedor 
        table.string("data_emi") // ide_dhemi - data da emissão
        table.string("vlr_total")  // vNF - valor total da nota
        table.text("identificacao") // criptografado
        table.text("emitente") // criptografado
        table.text("destinario") // criptografado
        table.text("total") // criptografado
        table.text("transporte") // criptografado
        table.text("cobrancas") // criptografado
        table.text("pag") // criptografado
        table.text("consolida_nfe")  // criptografado
        table.string("cadastrado_em", 19) /*ex: 01/08/2020 11:45:18 */
        table.string("comprado_em", 19) // data da compra(finalizo a compra)
        table.string("cadastrado_por") // nome da pessoa que finalizo a compra
        table.text("nota_xml_original_completa") // criptografado
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable("nota_xml_compras")
};

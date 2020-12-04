
exports.up = function (knex) {
    return knex.schema.createTable("produtos", table => {
        table.increments("id").primary()
        table.string("nome_produto")
        table.string("codigo_interno")/* .unique() */
        table.string("codigo_barra")/* .unique() */
        table.string("grupo_produto")
        table.string("movimenta_estq",3)
        table.string("hblt_nota_fiscal",3)
        table.string("variacoes",3)
        table.string("unid_cvs_entrada")
        table.string("unid_cvs_saida")
        table.string("qtd_saida_cvs")
        /* table.decimal("lucro", 9, 2) */ /* tamanho maximo = 9 , casa apos = . 2 */

        table.json("detalhes")
        table.json("valores_custo_despesas")
        table.json("valores_venda")
        table.json("campos_extras")
        
        table.integer("estoque_minimo")
        table.integer("estoque_maximo")
        table.integer("estoque_atual")

        table.json("fornecedores")

        table.string("produto_ativo",7)
        table.string("vendido_separadamente",3)
        table.string("comercializavel_pdv",3)

        table.string("cadastrado_em", 19) /*ex: 01/08/2020 11:45:18 */
        table.string("modificado_em", 19)
        table.string("deletado_em", 19)

        table.decimal("codigo_importacao_produto", 74, 0).notNull() // importação automatica (tamanho maximo 74, 0 casa decimais) codigo de importação, gerado atraves do numero do cnpj do emitente + codigo do produto 
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable("produtos")
};

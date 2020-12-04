
exports.up = function (knex) {
    return knex.schema.createTable("fornecedores", table => {
        table.increments("id").primary()
        table.string("status", 7).notNull().defaultTo("Ativo")
        table.string("tipo_fornecedor").notNull().defaultTo("Pessoa jurídica")
        table.string("nome_fantasia").notNull().unique() /* unico faz referencia na hora de adiciona selecionar os fornecedores do produto */
        table.string("razao_social")
        table.string("cnpj_cpf").unique()
        table.string("contato1")
        table.string("contato2")
        table.string("inscricao_estadual")
        table.string("inscricao_municipal")
        table.string("inscricao_suframa")
        table.string("responsavel")
        table.string("cep")
        table.string("bairro_distrito")
        table.string("localidade_uf")
        table.string("logradouro_nome")
        table.string("numero")
        table.text("complemento")
        table.string("cadastrado_em", 19) /*ex: 01/08/2020 11:45:18 */
        table.string("modificado_em", 19)
        table.string("deletado_em", 19)
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable("fornecedores")
};

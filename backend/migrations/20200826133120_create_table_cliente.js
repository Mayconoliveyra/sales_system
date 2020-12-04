
exports.up = function (knex) {
    return knex.schema.createTable("clientes", table => {
        table.increments("id").primary()
        table.string("status", 7).notNull().defaultTo("Ativo")
        table.string("nome").notNull()
        table.string("sobrenome").notNull()
        table.string("cpf", 11).notNull().unique()
        table.string("contato", 11).notNull()
        table.string("cep")
        table.string("bairro").notNull()
        table.string("logradouro_rua")
        table.string("numero")
        table.text("complemento")
        table.double("limite_credito")
        table.string("cadastrado_em", 19) /*ex: 01/08/2020 11:45:18 */
        table.string("modificado_em", 19)
        table.string("deletado_em", 19)

    })
};

exports.down = function (knex) {
    return knex.schema.dropTable("clientes")
};

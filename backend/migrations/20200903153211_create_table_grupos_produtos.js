exports.up = function (knex) {
    return knex.schema.createTable("grupos_produtos", table => {
        table.increments("id").primary()
        table.string("nome")
        table.integer("id_grupo_pai")
        table.string("cadastrado_em", 19) /*ex: 01/08/2020 11:45:18 */
        table.string("modificado_em", 19)
        table.string("deletado_em", 19)
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable("grupos_produtos")
};

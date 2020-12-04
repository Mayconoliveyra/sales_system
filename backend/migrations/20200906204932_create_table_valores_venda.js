
exports.up = function (knex) {
    return knex.schema.createTable("valores_venda", table => {
        table.increments("id").primary()
        table.string("nome")
        table.decimal("lucro", 9, 2) /* tamanho maximo = 9 , casa apos = . 2 */

        table.string("cadastrado_em", 19) /*ex: 01/08/2020 11:45:18 */
        table.string("modificado_em", 19)
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable("valores_venda")
};

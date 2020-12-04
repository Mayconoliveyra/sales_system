exports.up = function (knex) {
    return knex.schema.createTable("nota_xml_compras_produtos", table => {
        table.increments("id").primary()
        table.decimal("chave_nota_xml_compras", 44, 0).references("chave_acesso").inTable("nota_xml_compras").notNull() // chave secundaria (tamanho maximo 44, 0 casa decimais)
        table.integer("num_item_nota", 3, 0).notNull()  // número do item na nota
        table.decimal("det_prod_cprod", 60, 0).notNull()  // informar o código do produto ou serviço. Preencher com CFOP, caso se trate de itens não relacionados com mercadorias/produtos e que o contribuinte não possua codificação própria. Formato ”CFOP9999”.
        table.string("det_prod_cean", 14).notNull()  // informar o GTIN (Global Trade Item Number) do produto, antigo código EAN ou código de barras. Preencher com o código GTIN-8, GTIN-12, GTIN-13 ou GTIN-14 (antigos códigos EAN, UPC e DUN-14), informar "SEM GTIN" quando o produto não possuir este código.
        table.string("det_prod_xprod", 120).notNull()  // informar a descrição do produto ou serviço.
        table.integer("det_prod_ncm", 8, 0).notNull()  // informar o Código NCM com 8 dígitos; informar a posição do capítulo do NCM (as duas primeiras posições do NCM) quando a operação não for de comércio exterior (importação/ exportação) ou o produto não seja tributado pelo IPI; se for serviços, informar 00.
        table.integer("det_imposto_icms_cst", 3, 0).notNull()  // Tributação do ICMS
        table.integer("det_prod_cfop", 4, 0).notNull()  // informar o CFOP - Código Fiscal de Operações e Prestações.
        table.string("det_prod_ucom", 6).notNull()  // informar a unidade de comercialização do produto (Ex. pc, und, dz, kg, etc.).
        table.decimal("det_prod_qcom", 15, 2).notNull()  // informar a quantidade de comercialização do produto já formatado com ponto decimal. A quantidade de casas decimais pode variar de 0 a 4.
        table.decimal("det_prod_vuncom", 21, 2).notNull()  // Informar o valor unitário de comercialização do produto já formatado com ponto decimal, campo meramente informativo, o contribuinte pode utilizar a precisão desejada (0-10 decimais). Para efeitos de cálculo, o valor unitário será obtido pela divisão do valor do produto pela quantidade comercial.
        table.decimal("det_prod_vprod", 15, 2).notNull()  // informar o valor total bruto do produto ou serviços.
        table.decimal("det_prod_vfrete", 15, 2).notNull()  //informar o valor do Frete, o Frete deve ser rateado entre os itens de produto.
        table.decimal("det_prod_vdesc", 15, 2).notNull()  // informar o valor do desconto do item de produto ou serviço.
        table.decimal("det_imposto_icms_vbc", 15, 2).notNull()  // Valor da BC do ICMS
        table.decimal("det_imposto_icms_vicms", 15, 2).notNull()  // Valor do ICMS
        table.decimal("det_imposto_ipitrib_vipi", 15, 2).notNull()   // Informar o Valor do IPI
        table.integer("det_imposto_icms_picms", 5, 4).notNull() // Alíquota do imposto do ICMS ST
        table.decimal("det_imposto_icms_vicmsst", 15, 2).notNull() // 	informar o Valor do ICMS ST
        table.integer("det_imposto_ipitrib_pipi", 5, 4).notNull()  // Informar a alíquota percentual do IPI, este campo deve ser informado em caso de alíquota ad valorem. (quantidade de decimais alterado para aceitar de 2 a 4 decimais)
        table.string("cadastrado_em", 19) /*ex: 01/08/2020 11:45:18 */
        table.text("produto_completo") // informações completa do produto  // criptografado
        table.string("status", 8).notNull() // status do produto, se já foi comprado(comprado) ou ainda esta para ser comprado (pendente)
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable("nota_xml_compras_produtos")
};

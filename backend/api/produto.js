module.exports = app => {
    const { existeOuErro, naoExisteOuErro, validarCpfOuErro, FormateSoNumero, validarTelefoneOuErro } = app.api.validacao
    const { dataAtualFormatadaBR } = app.api.otherScripts

    const save = async (req, res) => {
        const produto = { ...req.body }

        /* console.log(FormateSoNumero(aa)) */
        if (req.params.id) produto.id = req.params.id

        try {
            existeOuErro(produto.nome_produto, "Nome do produto não informado.")
            existeOuErro(produto.codigo_interno, "Código interno não informado.")
            existeOuErro(produto.qtd_saida_cvs, "Quantidade saida de conversão não informada ou menor que 1,00")
            existeOuErro(FormateSoNumero(produto.valores_venda), "Valor de venda não informado.")

            if (!produto.id) {
                const produtoFromDB = await app.db("produtos").where({ codigo_interno: produto.codigo_interno }).first()
                naoExisteOuErro(produtoFromDB, "Código interno já ultilizado")
            }
        } catch (msg) {
            return res.status(400).send(msg)
        }

        if (produto.id) {
            produto.modificado_em = dataAtualFormatadaBR()
            await app.db("produtos")
                .update(produto)
                .where({ id: produto.id })
                .whereNull("deletado_em") /* so altera se tiver null */
                .then(() => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            produto.cadastrado_em = dataAtualFormatadaBR()
            produto.modificado_em = dataAtualFormatadaBR()
            await app.db("produtos")
                .insert(produto)
                .then(() => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }

    }

    const remove = async (req, res) => {
        try {
            const produtoId = await app.db("produtos")
                .where({ id: req.params.id })
            existeOuErro(produtoId, "Produto não foi encontrado.")

            if (produtoId) {
                await app.db("produtos")
                    .update({ deletado_em: dataAtualFormatadaBR() })
                    .whereNull("deletado_em")
                    .where({ id: req.params.id })
                    .then(() => res.status(204).send())
                    .catch(err => res.status(500).send(err))
            }
        } catch (msg) {
            res.status(400).send(msg)
        }
    }

    const getProdutos = (req, res) => {
        app.db("produtos")
            .select("id", "nome_produto", "codigo_interno", "codigo_barra", "grupo_produto", "movimenta_estq", "hblt_nota_fiscal", "variacoes", "produto_ativo", "vendido_separadamente", "comercializavel_pdv", "unid_cvs_entrada", "unid_cvs_saida", "qtd_saida_cvs", "detalhes", "valores_venda", "valores_custo_despesas", "campos_extras", "estoque_minimo","estoque_maximo","estoque_atual", "fornecedores", "modificado_em", "cadastrado_em")
            .whereNull("deletado_em")
            .then(produtos => res.json(produtos))
            .catch(err => res.status(500).send(err))
    }

    const getValoresVenda = (req, res) => {
        app.db("valores_venda")
            .select()
            .then(valoresVenda => res.json(valoresVenda))
            .catch(err => res.status(500).send(err))
    }

    const saveValoresVenda = async (req, res) => {
        const valoresVenda = { ...req.body }

        if (req.params.id) valoresVenda.id = req.params.id

        try {
            existeOuErro(valoresVenda.nome, "Nome não informado.")
            existeOuErro(valoresVenda.lucro, "Lucro não informado.")

            if (!valoresVenda.id) {
                const valoresVendaFromDB = await app.db("valores_venda").where({ nome: valoresVenda.nome }).first()
                naoExisteOuErro(valoresVendaFromDB, "Já existe valores de venda com esse nome")
            }
        } catch (msg) {
            return res.status(400).send(msg)
        }

        if (valoresVenda.id) {
            valoresVenda.modificado_em = dataAtualFormatadaBR()
            await app.db("valores_venda")
                .update(valoresVenda)
                .where({ id: valoresVenda.id })
                .then(() => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            valoresVenda.cadastrado_em = dataAtualFormatadaBR()
            valoresVenda.modificado_em = dataAtualFormatadaBR()
            await app.db("valores_venda")
                .insert(valoresVenda)
                .then(() => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const removeValoresVenda = async (req, res) => {
        try {
            const valoreID = await app.db("valores_venda")
                .where({ id: req.params.id }).first()
            existeOuErro(valoreID, "Valor de venda não encontrado.")

            if (valoreID) {
                await app.db("valores_venda")
                    .del()
                    .where({ id: req.params.id })
                    .then(() => res.status(204).send())
                    .catch(err => res.status(500).send(err))
            }
        } catch (msg) {
            res.status(400).send(msg)
        }
    }

    const saveGruposProdutos = async (req, res) => {
        const gruposProdutos = { ...req.body }
        if (req.params.id) gruposProdutos.id = req.params.id

        if (gruposProdutos.id_grupo_pai) {
            try {
                if (gruposProdutos.id_grupo_pai == "Nenhum") {
                    gruposProdutos.id_grupo_pai = null
                } else {
                    if (gruposProdutos.id_grupo_pai) {
                        const gruposProdutosFromDB = await app.db("grupos_produtos").where({ nome: gruposProdutos.id_grupo_pai }).first()
                        existeOuErro(gruposProdutosFromDB, "Grupo não encontrado")
                        if (gruposProdutosFromDB) {
                            gruposProdutos.id_grupo_pai = gruposProdutosFromDB.id
                        }
                    }
                }
            } catch (msg) {
                return res.status(400).send(msg)
            }
        } else {
            gruposProdutos.id_grupo_pai = null
        }

        try {
            existeOuErro(gruposProdutos.nome, "Nome não informado.")
            if (!gruposProdutos.id) {
                const gruposProdutosFromDB = await app.db("grupos_produtos").where({ nome: gruposProdutos.nome }).first()
                naoExisteOuErro(gruposProdutosFromDB, "Já existe grupo com esse nome")
            }
        } catch (msg) {
            return res.status(400).send(msg)
        }

        if (gruposProdutos.id) {
            gruposProdutos.modificado_em = dataAtualFormatadaBR()
            await app.db("grupos_produtos")
                .update(gruposProdutos)
                .where({ id: gruposProdutos.id })
                .then(() => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            gruposProdutos.cadastrado_em = dataAtualFormatadaBR()
            gruposProdutos.modificado_em = dataAtualFormatadaBR()
            await app.db("grupos_produtos")
                .insert(gruposProdutos)
                .then(() => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const getGruposProdutos = (req, res) => {
        app.db("grupos_produtos")
            .select()
            .then(grupo => res.json(grupo))
            .catch(err => res.status(500).send(err))
    }

    const removeGruposProdutos = async (req, res) => {
        try {
            const grupoID = await app.db("grupos_produtos")
                .where({ id: req.params.id }).first()
            existeOuErro(grupoID, "Grupo não encontrado.")

            if (grupoID) {
                await app.db("grupos_produtos")
                    .del()
                    .where({ id: req.params.id })
                    .then(() => res.status(204).send())
                    .catch(err => res.status(500).send(err))
            }
        } catch (msg) {
            res.status(400).send(msg)
        }
    }

    const saveUnidadeMedida = async (req, res) => {
        const unidadeMedida = { ...req.body }
        if (req.params.id) unidadeMedida.id = req.params.id


        try {
            existeOuErro(unidadeMedida.nome, "Nome não informado.")
            existeOuErro(unidadeMedida.sigla, "Sigla não informada.")
            unidadeMedida.sigla = unidadeMedida.sigla.toUpperCase()
            if (!unidadeMedida.id) {
                const unidadeMedidaFromDB = await app.db("unidades_medidas").where({ nome: unidadeMedida.nome }).first()
                const unidadeMedidaSiglaFromDB = await app.db("unidades_medidas").where({ sigla: unidadeMedida.sigla }).first()
                naoExisteOuErro(unidadeMedidaFromDB, "Já existe unidade com esse nome")
                naoExisteOuErro(unidadeMedidaSiglaFromDB, "Já existe unidade com essa sigla")
            }
        } catch (msg) {
            return res.status(400).send(msg)
        }

        if (unidadeMedida.id) {
            unidadeMedida.modificado_em = dataAtualFormatadaBR()
            await app.db("unidades_medidas")
                .update(unidadeMedida)
                .where({ id: unidadeMedida.id })
                .then(() => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            unidadeMedida.cadastrado_em = dataAtualFormatadaBR()
            unidadeMedida.modificado_em = dataAtualFormatadaBR()
            await app.db("unidades_medidas")
                .insert(unidadeMedida)
                .then(() => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }
    const getUnidadesMedidas = (req, res) => {
        app.db("unidades_medidas")
            .select()
            .then(unidadeMedida => res.json(unidadeMedida))
            .catch(err => res.status(500).send(err))
    }

    const removeUnidadeMedida = async (req, res) => {
        try {
            const unidadeMedidaID = await app.db("unidades_medidas")
                .where({ id: req.params.id }).first()
            existeOuErro(unidadeMedidaID, "Unidade não encontrada.")

            if (unidadeMedidaID) {
                await app.db("unidades_medidas")
                    .del()
                    .where({ id: req.params.id })
                    .then(() => res.status(204).send())
                    .catch(err => res.status(500).send(err))
            }
        } catch (msg) {
            res.status(400).send(msg)
        }
    }


    const saveCampoExtra = async (req, res) => {
        const campoExtra = { ...req.body }

        if (req.params.id) campoExtra.id = req.params.id

        try {
            existeOuErro(campoExtra.nome, "Nome não informado.")
            if (!campoExtra.id) {
                const unidadeMedidaFromDB = await app.db("campos_extras").where({ nome: campoExtra.nome }).first()
                naoExisteOuErro(unidadeMedidaFromDB, "Já existe campo com esse nome")
            }
        } catch (msg) {
            return res.status(400).send(msg)
        }

        if (campoExtra.id) {
            campoExtra.modificado_em = dataAtualFormatadaBR()
            await app.db("campos_extras")
                .update(campoExtra)
                .where({ id: campoExtra.id })
                .then(() => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            campoExtra.cadastrado_em = dataAtualFormatadaBR()
            campoExtra.modificado_em = dataAtualFormatadaBR()
            await app.db("campos_extras")
                .insert(campoExtra)
                .then(() => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }
    const getCamposExtras = (req, res) => {
        app.db("campos_extras")
            .select()
            .then(camposExtras => res.json(camposExtras))
            .catch(err => res.status(500).send(err))
    }
    const removeCampoExtra = async (req, res) => {
        try {
            const campoExtraID = await app.db("campos_extras")
                .where({ id: req.params.id }).first()
            existeOuErro(campoExtraID, "Campo extra não encontrado.")

            if (campoExtraID) {
                await app.db("campos_extras")
                    .del()
                    .where({ id: req.params.id })
                    .then(() => res.status(204).send())
                    .catch(err => res.status(500).send(err))
            }
        } catch (msg) {
            res.status(400).send(msg)
        }
    }



    return { save, getProdutos, remove, getValoresVenda, saveValoresVenda, removeValoresVenda, saveGruposProdutos, getGruposProdutos, removeGruposProdutos, saveUnidadeMedida, getUnidadesMedidas, removeUnidadeMedida, saveCampoExtra, getCamposExtras, removeCampoExtra }
}
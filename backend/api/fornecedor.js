module.exports = app => {
    const { existeOuErro, naoExisteOuErro, validarCpfOuErro, FormateSoNumero, validarCNPJ } = app.api.validacao
    const { dataAtualFormatadaBR } = app.api.otherScripts
    const save = async (req, res) => {
        const fornecedor = { ...req.body }

        if (req.params.id) fornecedor.id = req.params.id

        try {
            existeOuErro(fornecedor.tipo_fornecedor, "Tipo de fornecedor não informada")
            existeOuErro(fornecedor.nome_fantasia, "Nome fatasia não informado")
            existeOuErro(fornecedor.cnpj_cpf, "CNPJ/ CPF não informado")
            fornecedor.cnpj_cpf = FormateSoNumero(fornecedor.cnpj_cpf)

            if (fornecedor.tipo_fornecedor == "Pessoa física") {
                validarCpfOuErro(fornecedor.cnpj_cpf, "CPF inválido!")
            } else {
                validarCNPJ(fornecedor.cnpj_cpf, "CNPJ inválido!")
            }


            if (!fornecedor.id) {
                const fornecedorCnpjFromDB = await app.db("fornecedores").where({ cnpj_cpf: fornecedor.cnpj_cpf }).first()
                naoExisteOuErro(fornecedorCnpjFromDB, "Fornecedor já cadastrado")
            }

        } catch (msg) {
            return res.status(400).send(msg)
        }

        if (fornecedor.id) {
            fornecedor.modificado_em = dataAtualFormatadaBR()
            await app.db("fornecedores")
                .update(fornecedor)
                .where({ id: fornecedor.id })
                .whereNull("deletado_em")
                .then(() => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            fornecedor.cadastrado_em = dataAtualFormatadaBR()
            fornecedor.modificado_em = dataAtualFormatadaBR()
            await app.db("fornecedores")
                .insert(fornecedor)
                .then(() => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req, res) => {
        try {
            const idFornecedor = await app.db("fornecedores")
                .where({ id: req.params.id }).first()
            existeOuErro(idFornecedor, "Fornecedor não foi encontrado")

            if (idFornecedor) {
                await app.db("fornecedores")
                    .update({ deletado_em: dataAtualFormatadaBR() })
                    .where({ id: req.params.id })
                    .whereNull("deletado_em")
                    .then(() => res.status(204).send())
                    .catch(err => res.status(500).send(err))
            }
        } catch (msg) {
            res.status(400).send(msg)

        }

    }

    const getFornecedor = (req, res) => {
        app.db("fornecedores")
            .select("id", "status", "tipo_fornecedor", "nome_fantasia", "razao_social", "cnpj_cpf", "contato1", "contato2", "inscricao_estadual", "inscricao_municipal", "inscricao_suframa", "responsavel", "cep", "bairro_distrito", "localidade_uf", "logradouro_nome","numero", "complemento", "modificado_em", "cadastrado_em")
            .whereNull("deletado_em")
            .then(fornecedores => res.json(fornecedores))
            .catch(err => res.status(500).send(err))
    }

    const getFornecedoPorCNPJ = (req, res) => {
        app.db("fornecedores")
            .select("razao_social", "id")
            .where({ cnpj_cpf: req.params.id }) // id aqui e o cnpj do fornecedor que veio no params da requisição
            .first()
            .then(fornecedor => res.json(fornecedor))
            .catch(err => res.status(500).send(err))
    }


    return { save, remove, getFornecedor, getFornecedoPorCNPJ }
}


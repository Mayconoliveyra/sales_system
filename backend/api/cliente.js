
module.exports = app => {
    const { existeOuErro, naoExisteOuErro, validarCpfOuErro, FormateSoNumero, validarTelefoneOuErro } = app.api.validacao
    const { dataAtualFormatadaBR } = app.api.otherScripts

    const save = async (req, res) => {
        const cliente = { ...req.body }
        if (req.params.id) cliente.id = req.params.id

        try {
            existeOuErro(cliente.nome, "Nome não informado")
            existeOuErro(cliente.sobrenome, "Sobrenome não informado")
            existeOuErro(cliente.cpf, "CPF não informado")
            existeOuErro(cliente.contato, "Número de telefone não informado")
            existeOuErro(cliente.bairro, "Bairro não informado")
           /*  cliente.cpf = FormateSoNumero(cliente.cpf) */
            validarCpfOuErro(cliente.cpf, "CPF inválido!")
            /* cliente.contato = FormateSoNumero(cliente.contato) */
            validarTelefoneOuErro(cliente.contato, "Número de telefone inválido!")

            if (!cliente.id) {
                const clienteFromDB = await app.db("clientes").where({ cpf: cliente.cpf }).first()
                naoExisteOuErro(clienteFromDB, "Cliente já cadastrado")
            }
        } catch (msg) {
            return res.status(400).send(msg)
        }

        if (cliente.id) {
            cliente.modificado_em = dataAtualFormatadaBR()
            await app.db("clientes")
                .update(cliente)
                .where({ id: cliente.id })
                .whereNull("deletado_em") /* so altera se tiver null */
                .then(() => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            cliente.cadastrado_em = dataAtualFormatadaBR()
            cliente.modificado_em = dataAtualFormatadaBR()
            await app.db("clientes")
                .insert(cliente)
                .then(() => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }

    }

    const remove = async (req, res) => {
        try {
            const clienteId = await app.db("clientes")
                .where({ id: req.params.id })
            existeOuErro(clienteId, "Usúario não foi encotrado.")

            if (clienteId) {
                await app.db("clientes")
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

    const getCliente = (req, res) => {
        app.db("clientes")
            .select("id", "status", "nome", "sobrenome", "cpf", "contato", "cep", "bairro", "logradouro_rua", "numero", "complemento", "limite_credito", "modificado_em", "cadastrado_em")
            .whereNull("deletado_em")
            .then(clientes => res.json(clientes))
            .catch(err => res.status(500).send(err))
    }

    return { save, getCliente, remove }
}
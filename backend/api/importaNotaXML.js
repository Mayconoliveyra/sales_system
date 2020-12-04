const crypto = require("crypto");
const { dados_criptografia } = require("../.env")

module.exports = app => {
    const { existeOuErro, naoExisteOuErro, FormateSoNumero, tamanhoEqualsOuErro } = app.api.validacao
    const { dataAtualFormatadaBR } = app.api.otherScripts

    function encrypt(text) {
        let cipher = crypto.createCipher(dados_criptografia.algoritmo,
            dados_criptografia.segredo)
        let crypted = cipher.update(text, dados_criptografia.codificacao, dados_criptografia.tipo)
        return crypted
    }
    function decrypt(text) {
        let decipher = crypto.createDecipher(dados_criptografia.algoritmo,
            dados_criptografia.segredo)
        let dec = decipher.update(text, dados_criptografia.tipo, dados_criptografia.codificacao)
        return dec
    }
    /*   let ivstring = crypto.randomBytes(8).toString(dados_criptografia.tipo);
  
      function encrypt(text) {
          let cipher = crypto.createCipheriv(dados_criptografia.algoritmo,
              dados_criptografia.segredo, ivstring)
          let crypted = cipher.update(text, dados_criptografia.codificacao, dados_criptografia.tipo)
          crypted += cipher.final(dados_criptografia.tipo)
          return crypted
      }
      function decrypt(text) {
          var decipher = crypto.createDecipheriv(dados_criptografia.algoritmo,
              dados_criptografia.segredo, ivstring)
          var dec = decipher.update(text, dados_criptografia.tipo, dados_criptografia.codificacao)
          dec += decipher.final(dados_criptografia.codificacao)
          return dec
      } */

    function formataData(data) {
        const ano = data.substring(0, 4)
        const mes = data.substring(5, 7)
        const dia = data.substring(8, 10)
        return `${dia}/${mes}/${ano}`;
    }

    const salvaNovaNotaXML = async (req, res) => {
        const dadosNotaXML = { ...req.body }
        /*  console.log(dadosNotaXML) */
        try {
            dadosNotaXML.protnfe.protnfe_chnfe = FormateSoNumero(dadosNotaXML.protnfe.protnfe_chnfe)
            existeOuErro(dadosNotaXML.protnfe.protnfe_chnfe, "Nota fiscal sem chave de acesso!")
            if (dadosNotaXML.protnfe.protnfe_chnfe.length == 44) {
            } else {
                throw "Chave de acesso de NF-e inválida!"
            }
            existeOuErro(dadosNotaXML.det_produtos, "Nota fiscal sem produtos!")
            existeOuErro(FormateSoNumero(dadosNotaXML.emit.emit_cnpj), "Nota fiscal sem CNPJ do emitente!")
            existeOuErro(dadosNotaXML.emit.emit_xnome, "Nota fiscal sem o nome do emitente!")
            dadosNotaXML.det_produtos.forEach((elem, index) => {
                dadosNotaXML.det_produtos[index].det_prod_cprod = FormateSoNumero(dadosNotaXML.det_produtos[index].det_prod_cprod)
                existeOuErro(dadosNotaXML.det_produtos[index].det_prod_cprod, "Existe produto sem o código do produto! <br>" + "Numero do item: " + dadosNotaXML.det_produtos[index].num_item_nota)
                if (dadosNotaXML.det_produtos[index].det_prod_cprod.length > 60) {
                    throw "Existe produto com o código  do produto inválido! <br>" + "Numero do item: " + dadosNotaXML.det_produtos[index].num_item_nota
                }
                if (dadosNotaXML.det_produtos[index].det_prod_cean.length > 14) {
                    throw "Existe produto com o código EAN inválido! <br>" + "Numero do item: " + dadosNotaXML.det_produtos[index].num_item_nota
                }
                if (dadosNotaXML.det_produtos[index].det_prod_xprod.length > 120) {
                    throw "Existe produto com a descrição maior que permitido (max. 120 caracteres)! <br>" + "Numero do item: " + dadosNotaXML.det_produtos[index].num_item_nota
                }
                if (dadosNotaXML.det_produtos[index].det_prod_ucom.length > 6) {
                    throw "Existe produto com a unidade de comercialização maior que permitido (max. 6 caracteres)! <br>" + "Numero do item: " + dadosNotaXML.det_produtos[index].num_item_nota
                }
                existeOuErro(dadosNotaXML.det_produtos[index].det_prod_xprod, "Existe produto sem a descrição do produto! <br>" + "Numero do item: " + dadosNotaXML.det_produtos[index].num_item_nota)
                existeOuErro(dadosNotaXML.det_produtos[index].det_prod_ucom, "Existe produto sem a unidade de comercialização! <br>" + "Numero do item: " + dadosNotaXML.det_produtos[index].num_item_nota)
                existeOuErro(dadosNotaXML.det_produtos[index].det_prod_qcom, "Existe produto sem a quantidade de comercialização! <br>" + "Numero do item: " + dadosNotaXML.det_produtos[index].num_item_nota)
                existeOuErro(FormateSoNumero(dadosNotaXML.det_produtos[index].det_prod_vuncom), "Existe produto sem o valor unitário de comercialização! <br>" + "Numero do item: " + dadosNotaXML.det_produtos[index].num_item_nota)
                existeOuErro(FormateSoNumero(dadosNotaXML.det_produtos[index].det_prod_vprod), "Existe produto sem o valor total bruto do produto ou serviços! <br>" + "Numero do item: " + dadosNotaXML.det_produtos[index].num_item_nota)
            })

            if (dadosNotaXML.cobr) {
                dadosNotaXML.cobr.dup.forEach((elem, index) => {
                    dadosNotaXML.cobr.dup[index].cobr_dup_dvenc = formataData(dadosNotaXML.cobr.dup[index].cobr_dup_dvenc)
                })
            }
            // verifica se ja tem nota importada com aquela chave de acesso
            const notasXMLFromDB = await app.db("nota_xml_compras").where({ chave_acesso: dadosNotaXML.protnfe.protnfe_chnfe }).first()
            naoExisteOuErro(notasXMLFromDB, "Nota fiscal já foi cadastrada!")
        } catch (msg) {
            return res.status(400).send(msg)
        }


        try {
            let dataEmissao = null;
            dataEmissao = dadosNotaXML.ide.ide_dhemi.substring(0, 10); // pega a data da emissão da nota é formata para apenas pegar o ano/mes/dia
            // se não tiver o campo, o adicione com uma string vazia. (tratamento para nao da erro na criptografia, caso o campo nao exista)
            if (!dadosNotaXML.ide) dadosNotaXML.ide = "";
            if (!dadosNotaXML.dest) dadosNotaXML.dest = "";
            if (!dadosNotaXML.total_vlrs_icms) dadosNotaXML.total_vlrs_icms = "";
            if (!dadosNotaXML.transpo) dadosNotaXML.transpo = "";
            if (!dadosNotaXML.cobr) dadosNotaXML.cobr = "";
            if (!dadosNotaXML.pag) dadosNotaXML.pag = "";
            const modeloNota = {
                chave_acesso: dadosNotaXML.protnfe.protnfe_chnfe,
                status: "Pendente",
                cnpj_forn: FormateSoNumero(dadosNotaXML.emit.emit_cnpj),
                nome_forn: dadosNotaXML.emit.emit_xnome,
                data_emi: formataData(dataEmissao),
                vlr_total: dadosNotaXML.total_vlrs_icms.total_vnf,
                identificacao: encrypt(JSON.stringify(dadosNotaXML.ide)),
                emitente: encrypt(JSON.stringify(dadosNotaXML.emit)),
                destinario: encrypt(JSON.stringify(dadosNotaXML.dest)),
                total: encrypt(JSON.stringify(dadosNotaXML.total_vlrs_icms)),
                transporte: encrypt(JSON.stringify(dadosNotaXML.transpo)),
                cobrancas: encrypt(JSON.stringify(dadosNotaXML.cobr)),
                pag: encrypt(JSON.stringify(dadosNotaXML.pag)),
                consolida_nfe: encrypt(JSON.stringify(dadosNotaXML.protnfe)),
                cadastrado_em: dataAtualFormatadaBR(),
                nota_xml_original_completa: encrypt(dadosNotaXML.notaOriginal),
            }

            let statusImportacao = 0; // se receber 1, cancela o for de importação dos produtos
            let index = 0;
            await app.db("nota_xml_compras")
                .insert(modeloNota)
            do {
                if (!statusImportacao == 0) break

                // se os campos não tiverem setados, adiciona 0 a eles ( tratamento para nao da erro na hora de inserir no banco)
                if (!dadosNotaXML.det_produtos[index].num_item_nota) dadosNotaXML.det_produtos[index].num_item_nota = 0;
                if (!dadosNotaXML.det_produtos[index].det_prod_ncm) dadosNotaXML.det_produtos[index].det_prod_ncm = 0;
                if (!dadosNotaXML.det_produtos[index].det_imposto_ipitrib_vipi) dadosNotaXML.det_produtos[index].det_imposto_ipitrib_vipi = 0;
                if (!dadosNotaXML.det_produtos[index].det_imposto_icms_cst) dadosNotaXML.det_produtos[index].det_imposto_icms_cst = 0;
                if (!dadosNotaXML.det_produtos[index].det_prod_cfop) dadosNotaXML.det_produtos[index].det_prod_cfop = 0;
                if (!dadosNotaXML.det_produtos[index].det_imposto_icms_vbc) dadosNotaXML.det_produtos[index].det_imposto_icms_vbc = 0;
                if (!dadosNotaXML.det_produtos[index].det_imposto_icms_vicms) dadosNotaXML.det_produtos[index].det_imposto_icms_vicms = 0;
                if (!dadosNotaXML.det_produtos[index].det_imposto_icms_picms) dadosNotaXML.det_produtos[index].det_imposto_icms_picms = 0;
                if (!dadosNotaXML.det_produtos[index].det_imposto_ipitrib_pipi) dadosNotaXML.det_produtos[index].det_imposto_ipitrib_pipi = 0;
                if (!dadosNotaXML.det_produtos[index].det_prod_vfrete) dadosNotaXML.det_produtos[index].det_prod_vfrete = 0;
                if (!dadosNotaXML.det_produtos[index].det_prod_vdesc) dadosNotaXML.det_produtos[index].det_prod_vdesc = 0;
                if (!dadosNotaXML.det_produtos[index].det_imposto_icms_vicmsst) dadosNotaXML.det_produtos[index].det_imposto_icms_vicmsst = 0;
                if (!dadosNotaXML.det_produtos[index].det_prod_cean) dadosNotaXML.det_produtos[index].det_prod_cean = "SEM GTIN"

                const modeloProduto = {
                    chave_nota_xml_compras: dadosNotaXML.protnfe.protnfe_chnfe,   // chave secundaria                        
                    num_item_nota: parseInt(dadosNotaXML.det_produtos[index].num_item_nota), // parseFloat o valor inteiro tem que ser menor que 11 caracter (ex: xxxxxxxxxxx.1454.. ) (x <= 11)
                    det_prod_cprod: dadosNotaXML.det_produtos[index].det_prod_cprod,
                    det_prod_xprod: dadosNotaXML.det_produtos[index].det_prod_xprod,
                    det_prod_ncm: parseFloat(dadosNotaXML.det_produtos[index].det_prod_ncm),
                    det_imposto_icms_cst: parseFloat(dadosNotaXML.det_produtos[index].det_imposto_icms_cst),
                    det_prod_cfop: parseFloat(dadosNotaXML.det_produtos[index].det_prod_cfop),
                    det_prod_ucom: dadosNotaXML.det_produtos[index].det_prod_ucom,
                    det_prod_qcom: dadosNotaXML.det_produtos[index].det_prod_qcom,
                    det_prod_vuncom: dadosNotaXML.det_produtos[index].det_prod_vuncom,
                    det_prod_vprod: dadosNotaXML.det_produtos[index].det_prod_vprod,
                    det_prod_vfrete: parseFloat(dadosNotaXML.det_produtos[index].det_prod_vfrete),
                    det_prod_vdesc: parseFloat(dadosNotaXML.det_produtos[index].det_prod_vdesc),
                    det_prod_cean: dadosNotaXML.det_produtos[index].det_prod_cean,

                    det_imposto_icms_vbc: dadosNotaXML.det_produtos[index].det_imposto_icms_vbc,
                    det_imposto_icms_vicms: dadosNotaXML.det_produtos[index].det_imposto_icms_vicms,
                    det_imposto_ipitrib_vipi: dadosNotaXML.det_produtos[index].det_imposto_ipitrib_vipi,
                    det_imposto_icms_picms: parseFloat(dadosNotaXML.det_produtos[index].det_imposto_icms_picms),
                    det_imposto_icms_vicmsst: parseFloat(dadosNotaXML.det_produtos[index].det_imposto_icms_vicmsst),
                    det_imposto_ipitrib_pipi: parseFloat(dadosNotaXML.det_produtos[index].det_imposto_ipitrib_pipi),
                    cadastrado_em: dataAtualFormatadaBR(),
                    produto_completo: encrypt(JSON.stringify(dadosNotaXML.det_produtos[index])),
                    status: "Pendente"
                }

                if (index == dadosNotaXML.det_produtos.length - 1) { // se for o ultimo produto da nota retorne o then() com a mesagem de importação com successo
                    await app.db("nota_xml_compras_produtos")
                        .insert(modeloProduto)
                        .then(() => res.status(204).send())
                } else {
                    await app.db("nota_xml_compras_produtos")
                        .insert(modeloProduto)
                }
                index++;
            } while (index < dadosNotaXML.det_produtos.length);

        } catch (msg) { // se der algum erro na importação, cancela a importação
            statusImportacao = 1;
            await app.db("nota_xml_compras_produtos")
                .del()
                .where({ chave_nota_xml_compras: dadosNotaXML.protnfe.protnfe_chnfe })
            await app.db("nota_xml_compras")
                .del()
                .where({ chave_acesso: dadosNotaXML.protnfe.protnfe_chnfe })
            return res.status(400).send("Erro inesperado ao tentar importa NF-e! <br> Se o problema persistir, procure a assistência técnica.")
        }

    }

    const getNotasXmls = async (req, res) => {
        try {
            app.db({ nota: "nota_xml_compras" })
                .select(/* "nota.chave_acesso", "nota.status", "nota.cnpj_forn", "nota.nome_forn", "nota.data_emi", "nota.vlr_total", "nota.identificacao", "nota.emitente", "nota.destinario", "nota.total", "nota.transporte", "nota.cobrancas", "nota.pag", "nota.consolida_nfe", "nota.cadastrado_em" */)
                .orderBy("nota.id", "desc")
                .then((notasNfe) => {
                    for (let i = 0; i < notasNfe.length; i++) {
                        notasNfe[i].identificacao = JSON.parse(decrypt(notasNfe[i].identificacao)),
                            notasNfe[i].emitente = JSON.parse(decrypt(notasNfe[i].emitente)),
                            notasNfe[i].destinario = JSON.parse(decrypt(notasNfe[i].destinario)),
                            notasNfe[i].total = JSON.parse(decrypt(notasNfe[i].total)),
                            notasNfe[i].transporte = JSON.parse(decrypt(notasNfe[i].transporte)),
                            notasNfe[i].cobrancas = JSON.parse(decrypt(notasNfe[i].cobrancas)),
                            notasNfe[i].pag = JSON.parse(decrypt(notasNfe[i].pag)),
                            notasNfe[i].consolida_nfe = JSON.parse(decrypt(notasNfe[i].consolida_nfe))

                        app.db({ prod: "nota_xml_compras_produtos" })
                            .select("prod.chave_nota_xml_compras", "prod.num_item_nota", "prod.det_prod_cprod", "prod.det_prod_cean", "prod.det_prod_xprod", "prod.det_prod_ncm", "prod.det_imposto_icms_cst", "prod.det_prod_cfop", "prod.det_prod_ucom", "prod.det_prod_qcom", "prod.det_prod_vuncom", "prod.det_prod_vprod", "prod.det_prod_vfrete", "prod.det_prod_vdesc", "prod.det_imposto_icms_vbc", "prod.det_imposto_icms_vicms", "prod.det_imposto_ipitrib_vipi", "prod.det_imposto_icms_picms", "prod.det_imposto_icms_vicmsst", "prod.det_imposto_ipitrib_pipi", "prod.cadastrado_em")
                            .orderBy("prod.num_item_nota", "cresc")
                            .where({ chave_nota_xml_compras: notasNfe[i].chave_acesso })
                            .then(notasNfep => {
                                notasNfe[i].produtos = notasNfep
                                /* console.log(notasNfe) */
                                if (i + 1 == notasNfe.length) {
                                    res.json(notasNfe)
                                }
                            })
                            .catch(err => res.status(500).send(err))
                    }
                })
                .catch(err => res.status(500).send(err))

        } catch (msg) {
            throw "Erro ao tranzer notas do banco! <br> Erro: " + msg
        }

        /* app.db({ n: "nota_xml_compras", p: "nota_xml_compras_produtos" })
           .select("n.id", "n.chave_acesso", "n.emitente ", {id_prod: "p.id"}, "p.chave_nota_xml_compras", "p.det_prod_xprod")
           .whereRaw("?? = ??", ["n.chave_acesso", "p.chave_nota_xml_compras"])
           .then()
           .catch() */
    }

    // VERIFICA SE O PRODUTO JÁ TEM CADASTRO NA TABELA DE IMPORTAÇÃO AUTOMATICA
    const getImportaProdAutimatico = (req, res) => {
        app.db("nota_xml_compras_importa_produtos")
            .select()
            // faz o sql com paramentros onde o codigo_importação e a unidade medida em que ser igual
            .where({ codigo_importacao_produto: req.params.codigo_importacao })
            .andWhere({ det_prod_ucom_entrada: req.params.prod_ucom })
            .first()
            .then(importAuto => res.json(importAuto))
            .catch(err => res.status(500).send(err))
    }

    const finalizarCompra = async (req, res) => {
        const dadosCompra = { ...req.body }
        try {
            existeOuErro(dadosCompra.chave_acesso, "Nota fiscal sem chave de acesso!")
            existeOuErro(dadosCompra.cnpj_forn, "Fornecedor sem o CNPJ!")
            existeOuErro(dadosCompra.produtos, "Nota fiscal sem produtos!")
            existeOuErro(dadosCompra.data_emi, "Nota fiscal sem data de emissão!")
            existeOuErro(dadosCompra.nome_forn, "Nota fiscal sem o nome do emitente!")
            existeOuErro(dadosCompra.status_fornecedor, "Nota fiscal sem o status do fornecedor!")
            existeOuErro(dadosCompra.total, "Nota fiscal sem os valores totais!")
            existeOuErro(dadosCompra.emitente, "Nota fiscal sem os dados do emitente!")

            dadosCompra.produtos.forEach((elem, index) => {
                existeOuErro(dadosCompra.produtos[index].det_prod_cprod, "Existe produto sem o código do produto! <br>" + "Numero do item: " + dadosCompra.produtos[index].num_item_nota)
                existeOuErro(dadosCompra.produtos[index].codigo_importacao_produto, "Existe produto sem o código de importação do produto! <br>" + "Numero do item: " + dadosCompra.produtos[index].num_item_nota)
                existeOuErro(dadosCompra.produtos[index].conversao_qcom_sainda, "Existe produto sem a quantidade conversão de saida! <br>" + "Numero do item: " + dadosCompra.produtos[index].num_item_nota)
                existeOuErro(dadosCompra.produtos[index].conversao_ucom_sainda, "Existe produto sem a unidade comercial converção de saida! <br>" + "Numero do item: " + dadosCompra.produtos[index].num_item_nota)
                existeOuErro(dadosCompra.produtos[index].det_prod_qcom, "Existe produto sem a quantidade! <br>" + "Numero do item: " + dadosCompra.produtos[index].num_item_nota)
                existeOuErro(dadosCompra.produtos[index].det_prod_ucom, "Existe produto sem a unidade comercial! <br>" + "Numero do item: " + dadosCompra.produtos[index].num_item_nota)
                existeOuErro(dadosCompra.produtos[index].det_prod_vprod, "Existe produto sem o valor total do produto! <br>" + "Numero do item: " + dadosCompra.produtos[index].num_item_nota)
                existeOuErro(dadosCompra.produtos[index].det_prod_vuncom, "Existe produto sem o valor unitario do produto! <br>" + "Numero do item: " + dadosCompra.produtos[index].num_item_nota)
                existeOuErro(dadosCompra.produtos[index].det_prod_xprod, "Existe produto sem a descrição produto! <br>" + "Numero do item: " + dadosCompra.produtos[index].num_item_nota)
                existeOuErro(dadosCompra.produtos[index].status_produto, "Existe produto sem o status de importação! <br>" + "Numero do item: " + dadosCompra.produtos[index].num_item_nota)
                existeOuErro(dadosCompra.produtos[index].valores_de_venda, "Existe produto sem os valores de venda! <br>" + "Numero do item: " + dadosCompra.produtos[index].num_item_nota)
            })
        } catch (msg) {
            return res.status(400).send(msg)
        }

        // CADASTRA O FORNECEDOR(EMITENTE) CASO SEJA TRUE
        if (dadosCompra.status_fornecedor == "cadastrar") {
            const modeloFornecedor = {
                status: "Ativo",
                tipo_fornecedor: "Pessoa jurídica",
                nome_fantasia: dadosCompra.emitente.emit_xfant,
                razao_social: dadosCompra.nome_forn,
                cnpj_cpf: dadosCompra.cnpj_forn,
                contato1: dadosCompra.emitente.emit_fone,
                inscricao_estadual: dadosCompra.emitente.emit_ie,
                inscricao_municipal: dadosCompra.emitente.emit_im,
                cep: dadosCompra.emitente.emit_cep,
                bairro_distrito: dadosCompra.emitente.emit_xbairro,
                localidade_uf: dadosCompra.emitente.emit_uf,
                logradouro_nome: dadosCompra.emitente.emit_xlgr,
                numero: dadosCompra.emitente.emit_nro,
                cadastrado_em: dataAtualFormatadaBR(),
                modificado_em: dataAtualFormatadaBR()

            }
            
            // verifica se ja tem fornecedor cadastrado com o cnpj ou nome iguais
            try {
                const validarForne = await app.db("fornecedores").where({ cnpj_cpf: modeloFornecedor.cnpj_cpf }).andWhere({ razao_social: modeloFornecedor.razao_social }).first()
                naoExisteOuErro(validarForne, "Fornecedor já cadastrado! <br> Atualize a página e tente novamente.")
                if (!validarForne) {
                    await app.db("fornecedores")
                        .insert(modeloFornecedor)
                        .catch(err => res.status(500).send(err))
                }
            } catch (msg) {
                return res.status(400).send(msg)
            }

        }

        // PERCORRE TODOS PRODUTOS E OS CADASTRA
        let casoErroFinalizarCompraProd = 0; //0 - ok, 1 - erro
        let indexProduFinali = 0;
        do {
            if (casoErroFinalizarCompraProd !== 0) break
            if (dadosCompra.produtos[indexProduFinali].status_produto == "novo_produto") {

                const modeloNovoProduto = {
                    nome_produto: dadosCompra.produtos[indexProduFinali].det_prod_xprod,
                    codigo_barra: dadosCompra.produtos[indexProduFinali].det_prod_cean,
                    grupo_produto: "PRODUTOS SEM GRUPO",
                    movimenta_estq: "Sim",
                    hblt_nota_fiscal: "Sim",
                    variacoes: "Não",
                    unid_cvs_entrada: dadosCompra.produtos[indexProduFinali].det_prod_ucom,
                    unid_cvs_saida: dadosCompra.produtos[indexProduFinali].conversao_ucom_sainda,
                    qtd_saida_cvs: dadosCompra.produtos[indexProduFinali].conversao_qcom_sainda,

                    /* valores_custo_despesas: dadosCompra.produtos[indexProduFinali].a, */
                    valores_venda: JSON.stringify(dadosCompra.produtos[indexProduFinali].valores_de_venda),
                    /*  campos_extras: dadosCompra.produtos[indexProduFinali].a, */
                    /*  estoque_quantidades: dadosCompra.produtos[indexProduFinali].a, */
                    /* fornecedores: dadosCompra.produtos[indexProduFinali].a, */

                    produto_ativo: "Ativo",
                    vendido_separadamente: "Sim",
                    comercializavel_pdv: "Sim",

                    cadastrado_em: dataAtualFormatadaBR(),
                    modificado_em: dataAtualFormatadaBR(),
                    codigo_importacao_produto: dadosCompra.produtos[indexProduFinali].codigo_importacao_produto
                }
                // gera código interno para o prod., caso já exista com o codigo, gera outro código.
                do {
                    modeloNovoProduto.codigo_interno = gerarCodigoInterno();
                    var verificaCodInternoProd = await app.db("produtos").where({ codigo_interno: modeloNovoProduto.codigo_interno }).first()
                } while (verificaCodInternoProd)

            
                try {
                    //CADASTRA O PRODUTO NA TABELA DE IMPORTAÇÃO AUTOMATICA
                    const modeloPordImportAutimatico = {
                        codigo_importacao_produto: dadosCompra.produtos[indexProduFinali].codigo_importacao_produto,
                        det_prod_ucom_entrada: dadosCompra.produtos[indexProduFinali].det_prod_ucom,
                        conversao_qcom_sainda: dadosCompra.produtos[indexProduFinali].conversao_qcom_sainda,
                        conversao_ucom_sainda: dadosCompra.produtos[indexProduFinali].conversao_ucom_sainda,
                        cadastrado_em: dataAtualFormatadaBR()
                    }
                    await app.db("nota_xml_compras_importa_produtos")
                        .insert(modeloPordImportAutimatico)


                    // verifica se o ultimo produto da nota, para retorna com mesagem then.
                    if (indexProduFinali == dadosCompra.produtos.length - 1) {
                        //atualiza os status da nota de compras
                        await app.db("nota_xml_compras").update({ status: "Comprada", comprado_em: dataAtualFormatadaBR(), cadastrado_por: "Maycon" }).where({ chave_acesso: dadosCompra.chave_acesso })
                        // cadastra ultimo produto e retorna a msg then
                        await app.db("produtos")
                            .insert(modeloNovoProduto)
                            .then(() => res.status(204).send())
                    } else {
                        await app.db("produtos")
                            .insert(modeloNovoProduto)
                    }

                    // atualiza o status dos produtos na tabela compras_produtos 
                    await app.db("nota_xml_compras_produtos")
                        .update({ status: "Comprado" })
                        .where({ chave_nota_xml_compras: dadosCompra.chave_acesso })
                        .andWhere({ det_prod_cprod: dadosCompra.produtos[indexProduFinali].det_prod_cprod })
                } catch (msg) {
                    // CASO OUVER ALGUM ERRO INESPERADO NA HORA DE INSERIR, PAUSA O WHILE E REMOVE TUDO QUE FOI INSERIDO
                    casoErroFinalizarCompraProd = 1;
                    await app.db("nota_xml_compras").update({ status: "Pendente", comprado_em: null, cadastrado_por: null }).where({ chave_acesso: dadosCompra.chave_acesso })
                    await app.db("nota_xml_compras_produtos").update({ status: "Pendente" }).where({ chave_nota_xml_compras: dadosCompra.chave_acesso })
                    dadosCompra.produtos.forEach(async (produt, index) => {
                        await app.db("produtos").del().where({ codigo_importacao_produto: produt.codigo_importacao_produto })
                        await app.db("nota_xml_compras_importa_produtos").del().where({ codigo_importacao_produto: produt.codigo_importacao_produto }).andWhere({ det_prod_ucom_entrada: produt.det_prod_ucom }).andWhere({ conversao_ucom_sainda: produt.conversao_ucom_sainda })
                    })
                    return res.status(400).send("Erro inesperado ao tentar finalizar a compra! <br>Atualize a página. Se o problema persistir, procure a assistência técnica.")
                }
            }
            indexProduFinali++;
        } while (indexProduFinali < dadosCompra.produtos.length);


        function gerarCodigoInterno() {
            const valorMaximo = 2099999999999;
            const valorMinimo = 2010000000000;

            let sugestao = Math.floor(
                Math.random() * (valorMaximo - valorMinimo + 1) + valorMinimo
            );

            return sugestao; // devolver o numero único
        }




    }


    return { salvaNovaNotaXML, getNotasXmls, getImportaProdAutimatico, finalizarCompra }
}

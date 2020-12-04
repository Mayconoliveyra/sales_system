<template>
  <b-container fluid class="importaNotaXmlAdmin p-2">
    <PageTitle
      v-if="mode == 'null'"
      icon="fa fa-file-text-o fa-lg"
      main="Notas de compras"
    />
    <PageTitle v-else icon="fa fa-shopping-basket fa-lg" main="Gerar compra" />
    <b-row v-if="mode == 'comprar'">
      <b-col sm="12" class="m-0">
        <b-card no-body class="formCadastro-compra">
          <b-tabs card pills justified active-nav-item-class="text-white">
            <!-- ####################  Detalhes  #################### -->
            <b-tab title="Detalhes" active>
              <!-- dados da nf-e -->
              <b-row>
                <b-col sm="12" class="pl-2">
                  <h5><i class="fa fa-server"></i> Dados da NF-e</h5>
                </b-col>
                <b-col sm="8" lg="4" class="bordaFormsXmlCompra">
                  <b-form-group
                    label="Natureza da operação"
                    class="bordaFormsXmlCompraLabel"
                  >
                    <b-form-input
                      class="p-1 fontInputComprar"
                      size="sm"
                      type="text"
                      v-model="notaXmlComprar.identificacao.ide_natope"
                      required
                      readonly
                    />
                  </b-form-group>
                </b-col>
                <b-col sm="4" lg="2" class="bordaFormsXmlCompra">
                  <b-form-group
                    label="Série/NFe"
                    class="bordaFormsXmlCompraLabel"
                  >
                    <b-form-input
                      class="p-1 fontInputComprar"
                      size="sm"
                      type="text"
                      v-model="notaXmlComprar.identificacao.estq_ide_serie_nnf"
                      required
                      readonly
                    />
                  </b-form-group>
                </b-col>
                <b-col sm="4" lg="2" class="bordaFormsXmlCompra">
                  <b-form-group
                    label="Data da emissão"
                    class="bordaFormsXmlCompraLabel"
                  >
                    <b-form-input
                      class="p-1 fontInputComprar"
                      size="sm"
                      type="text"
                      v-model="notaXmlComprar.data_emi"
                      required
                      readonly
                    />
                  </b-form-group>
                </b-col>
                <b-col
                  sm="8"
                  lg="4"
                  class="bordaFormsXmlCompra bordaFormsXmlCompraRight"
                >
                  <b-form-group
                    label="Chave de acesso"
                    class="bordaFormsXmlCompraLabel"
                  >
                    <b-form-input
                      class="p-1 fontInputComprar"
                      size="sm"
                      type="text"
                      v-model="notaXmlComprar.chave_acesso"
                      required
                      readonly
                    />
                  </b-form-group>
                </b-col>
              </b-row>
              <!--  dados do emitente -->
              <b-row class="mt-3">
                <b-col sm="12" class="pl-2">
                  <h5>
                    <i class="fa fa-address-card-o"></i> Dados do emitente
                  </h5>
                </b-col>
                <b-col sm="6" lg="4" class="bordaFormsXmlCompra">
                  <b-form-group
                    label="Razão social"
                    class="bordaFormsXmlCompraLabel"
                  >
                    <b-form-input
                      class="p-1 fontInputComprar"
                      size="sm"
                      type="text"
                      v-model="notaXmlComprar.emitente.emit_xnome"
                      required
                      readonly
                    />
                  </b-form-group>
                </b-col>
                <b-col sm="6" lg="4" class="bordaFormsXmlCompra">
                  <b-form-group
                    label="Fantasia"
                    class="bordaFormsXmlCompraLabel"
                  >
                    <b-form-input
                      class="p-1 fontInputComprar"
                      size="sm"
                      type="text"
                      v-model="notaXmlComprar.emitente.emit_xfant"
                      required
                      readonly
                    />
                  </b-form-group>
                </b-col>
                <b-col sm="6" lg="2" class="bordaFormsXmlCompra">
                  <b-form-group label="CNPJ" class="bordaFormsXmlCompraLabel">
                    <b-form-input
                      class="p-1 fontInputComprar"
                      size="sm"
                      type="text"
                      v-model="notaXmlComprar.emitente.estq_emit_cnpj"
                      required
                      readonly
                    />
                  </b-form-group>
                </b-col>
                <b-col
                  sm="6"
                  lg="2"
                  class="bordaFormsXmlCompra bordaFormsXmlCompraRight"
                >
                  <b-form-group
                    label="Inscrição estadual"
                    class="bordaFormsXmlCompraLabel"
                  >
                    <b-form-input
                      class="p-1 fontInputComprar"
                      size="sm"
                      type="text"
                      v-model="notaXmlComprar.emitente.emit_ie"
                      required
                      readonly
                    />
                  </b-form-group>
                </b-col>

                <b-col
                  sm="6"
                  lg="4"
                  class="bordaFormsXmlCompra bordaFormsXmlCompraRight"
                >
                  <b-form-group
                    label="Endereço"
                    class="bordaFormsXmlCompraLabel"
                  >
                    <b-form-input
                      class="p-1 fontInputComprar"
                      size="sm"
                      type="text"
                      v-model="notaXmlComprar.emitente.estq_emit_xlgr_nro"
                      required
                      readonly
                    />
                  </b-form-group>
                </b-col>
                <b-col
                  sm="6"
                  lg="2"
                  class="bordaFormsXmlCompra bordaFormsXmlCompraRight"
                >
                  <b-form-group label="Bairro" class="bordaFormsXmlCompraLabel">
                    <b-form-input
                      class="p-1 fontInputComprar"
                      size="sm"
                      type="text"
                      v-model="notaXmlComprar.emitente.emit_xbairro"
                      required
                      readonly
                    />
                  </b-form-group>
                </b-col>
                <b-col
                  sm="4"
                  lg="2"
                  class="bordaFormsXmlCompra bordaFormsXmlCompraRight"
                >
                  <b-form-group
                    label="Cidade/UF"
                    class="bordaFormsXmlCompraLabel"
                  >
                    <b-form-input
                      class="p-1 fontInputComprar"
                      size="sm"
                      type="text"
                      v-model="notaXmlComprar.emitente.emit_xmun_uf"
                      required
                      readonly
                    />
                  </b-form-group>
                </b-col>
                <b-col
                  sm="4"
                  lg="2"
                  class="bordaFormsXmlCompra bordaFormsXmlCompraRight"
                >
                  <b-form-group label="CEP" class="bordaFormsXmlCompraLabel">
                    <b-form-input
                      class="p-1 fontInputComprar"
                      size="sm"
                      type="text"
                      v-model="notaXmlComprar.emitente.emit_cep"
                      required
                      readonly
                    />
                  </b-form-group>
                </b-col>
                <b-col
                  sm="4"
                  lg="2"
                  class="bordaFormsXmlCompra bordaFormsXmlCompraRight"
                >
                  <b-form-group
                    label="Telefone"
                    class="bordaFormsXmlCompraLabel"
                  >
                    <b-form-input
                      class="p-1 fontInputComprar"
                      size="sm"
                      type="text"
                      v-model="notaXmlComprar.emitente.emit_fone"
                      required
                      readonly
                    />
                  </b-form-group>
                </b-col>
              </b-row>
              <!-- container do fornecedor (cadastrar ou não) -->
              <b-row>
                <b-col sm="12" class="pt-2 p-0">
                  <b-alert
                    v-show="estq_stateFornecedor == 'ja_cadastrado'"
                    show
                    variant="success"
                    >Este <b>fornecedor</b> já possui cadastro.
                  </b-alert>
                  <b-alert
                    v-show="
                      estq_stateFornecedor == 'cadastrar' ||
                      estq_stateFornecedor == 'buscar'
                    "
                    show
                    variant="warning"
                    >Este <b>fornecedor</b> não possui cadastro, deseja
                    cadastrá-lo?
                    <b-form-radio-group
                      v-model="estq_stateFornecedor"
                      size="sm"
                    >
                      <b-form-radio value="cadastrar">
                        <b> Cadastrar </b>
                      </b-form-radio>
                      <b-form-radio value="buscar"
                        ><b>Buscar no sistema</b></b-form-radio
                      >
                    </b-form-radio-group>

                    <b-row
                      v-show="estq_stateFornecedor == 'buscar'"
                      class="p-1 pr-3 pl-3"
                    >
                      <b-form-input
                        autocomplete="off"
                        type="search"
                        list="my-list-id-pesquisa_fornecedor"
                        v-model="notaXmlComprar.estq_fornecedor_xnome"
                        size="sm"
                        required
                      ></b-form-input>
                      <datalist id="my-list-id-pesquisa_fornecedor">
                        <option
                          v-for="(fornecedor, key) in fornecedores"
                          :key="key"
                        >
                          {{ fornecedor.nome_fantasia }}
                        </option>
                      </datalist>
                    </b-row>
                  </b-alert>
                </b-col>
              </b-row>
              <!-- dados transporte -->
              <b-row>
                <b-col sm="12" class="pl-2 mt-2">
                  <h5><i class="fa fa-truck"></i> Transporte</h5>
                </b-col>
                <b-col sm="12" lg="6" class="bordaFormsXmlCompra">
                  <b-form-group
                    label="Razão social"
                    class="bordaFormsXmlCompraLabel"
                  >
                    <b-form-input
                      class="p-1 fontInputComprar"
                      size="sm"
                      type="text"
                      v-model="
                        notaXmlComprar.transporte.transp_transporta_xnome
                      "
                      required
                      readonly
                    />
                  </b-form-group>
                </b-col>
                <b-col
                  v-if="notaXmlComprar.transporte.estq_transp_transporta_cpf"
                  sm="6"
                  lg="3"
                  class="bordaFormsXmlCompra"
                >
                  <b-form-group label="CPF" class="bordaFormsXmlCompraLabel">
                    <b-form-input
                      class="p-1 fontInputComprar"
                      size="sm"
                      type="text"
                      v-model="notaXmlComprar.transporte.transp_transporta_cpf"
                      required
                      readonly
                    />
                  </b-form-group>
                </b-col>
                <b-col v-else sm="6" lg="3" class="bordaFormsXmlCompra">
                  <b-form-group label="CNPJ" class="bordaFormsXmlCompraLabel">
                    <b-form-input
                      class="p-1 fontInputComprar"
                      size="sm"
                      type="text"
                      v-model="
                        notaXmlComprar.transporte.estq_transp_transporta_cnpj
                      "
                      required
                      readonly
                    />
                  </b-form-group>
                </b-col>
                <b-col
                  sm="6"
                  lg="3"
                  class="bordaFormsXmlCompra bordaFormsXmlCompraRight"
                >
                  <b-form-group
                    label="Inscrição estadual"
                    class="bordaFormsXmlCompraLabel"
                  >
                    <b-form-input
                      class="p-1 fontInputComprar"
                      size="sm"
                      type="text"
                      v-model="notaXmlComprar.transporte.transp_transporta_ie"
                      required
                      readonly
                    />
                  </b-form-group>
                </b-col>

                <b-col
                  sm="6"
                  lg="8"
                  class="bordaFormsXmlCompra bordaFormsXmlCompraRight"
                >
                  <b-form-group
                    label="Endereço"
                    class="bordaFormsXmlCompraLabel"
                  >
                    <b-form-input
                      class="p-1 fontInputComprar"
                      size="sm"
                      type="text"
                      v-model="
                        notaXmlComprar.transporte.transp_transporta_xender
                      "
                      required
                      readonly
                    />
                  </b-form-group>
                </b-col>
                <b-col
                  sm="6"
                  lg="4"
                  class="bordaFormsXmlCompra bordaFormsXmlCompraRight"
                >
                  <b-form-group
                    label="Cidade/UF"
                    class="bordaFormsXmlCompraLabel"
                  >
                    <b-form-input
                      class="p-1 fontInputComprar"
                      size="sm"
                      type="text"
                      v-model="
                        notaXmlComprar.transporte.transp_transporta_xmun_uf
                      "
                      required
                      readonly
                    />
                  </b-form-group>
                </b-col>
              </b-row>
            </b-tab>
            <!-- #######################  Produtos  #################### -->
            <b-tab title="Produtos">
              <b-row>
                <b-col sm="12" class="pl-2">
                  <h5><i class="fa fa-cubes"></i> Produtos</h5>
                </b-col>
              </b-row>
              <b-row
                class="formProdutosXml mt-3"
                v-for="(inputProd, k) in notaXmlComprar.produtos"
                :key="k"
              >
                <b-col sm="12" class="bordaFormsXmlCompraNmrItem text-center">
                  <p class="textNumeroItemCompra">
                    {{ inputProd.num_item_nota }}
                  </p>
                </b-col>
                <b-col sm="3" lg="2" class="bordaFormsXmlCompra">
                  <b-form-group label="Código" class="bordaFormsXmlCompraLabel">
                    <b-form-input
                      class="p-1 fontInputComprar"
                      size="sm"
                      type="text"
                      v-model="inputProd.det_prod_cprod"
                      required
                      readonly
                    />
                  </b-form-group>
                </b-col>
                <b-col sm="9" lg="6" class="bordaFormsXmlCompra">
                  <b-form-group
                    label="Descrição do produto"
                    class="bordaFormsXmlCompraLabel"
                  >
                    <b-form-input
                      class="p-1 fontInputComprar"
                      size="sm"
                      type="text"
                      v-model="inputProd.det_prod_xprod"
                      required
                      readonly
                    />
                  </b-form-group>
                </b-col>
                <b-col
                  sm="6"
                  lg="2"
                  class="bordaFormsXmlCompra bordaFormsXmlCompraRight"
                >
                  <b-form-group label="NCM" class="bordaFormsXmlCompraLabel">
                    <b-form-input
                      class="p-1 fontInputComprar"
                      size="sm"
                      type="text"
                      v-model="inputProd.det_prod_ncm"
                      required
                      readonly
                    />
                  </b-form-group>
                </b-col>

                <b-col
                  sm="6"
                  lg="2"
                  class="bordaFormsXmlCompra bordaFormsXmlCompraRight"
                >
                  <b-form-group label="CFOP" class="bordaFormsXmlCompraLabel">
                    <b-form-input
                      class="p-1 fontInputComprar"
                      size="sm"
                      type="text"
                      v-model="inputProd.det_prod_cfop"
                      required
                      readonly
                    />
                  </b-form-group>
                </b-col>
                <b-col sm="3" lg="2" class="bordaFormsXmlCompra">
                  <b-form-group label="Frete" class="bordaFormsXmlCompraLabel">
                    <b-form-input
                      class="p-1 fontInputComprar"
                      size="sm"
                      type="number"
                      v-model="inputProd.det_prod_vfrete"
                      required
                      readonly
                    />
                  </b-form-group>
                </b-col>
                <b-col sm="3" lg="6" class="bordaFormsXmlCompra">
                  <b-form-group
                    label="Desconto"
                    class="bordaFormsXmlCompraLabel"
                  >
                    <b-form-input
                      class="p-1 fontInputComprar"
                      size="sm"
                      type="number"
                      v-model="inputProd.det_prod_vdesc"
                      required
                      readonly
                    />
                  </b-form-group>
                </b-col>
                <b-col
                  sm="3"
                  lg="2"
                  class="bordaFormsXmlCompra bordaFormsXmlCompraRight"
                >
                  <b-form-group
                    label="ICMS ST"
                    class="bordaFormsXmlCompraLabel"
                  >
                    <b-form-input
                      class="p-1 fontInputComprar"
                      size="sm"
                      type="number"
                      v-model="inputProd.det_imposto_icms_vicmsst"
                      required
                      readonly
                    />
                  </b-form-group>
                </b-col>

                <b-col
                  sm="3"
                  lg="2"
                  class="bordaFormsXmlCompra bordaFormsXmlCompraRight"
                >
                  <b-form-group
                    label="Valor do IPI"
                    class="bordaFormsXmlCompraLabel"
                  >
                    <b-form-input
                      class="p-1 fontInputComprar"
                      size="sm"
                      type="number"
                      v-model="inputProd.det_imposto_ipitrib_vipi"
                      required
                      readonly
                    />
                  </b-form-group>
                </b-col>
                <b-col sm="3" lg="2" class="bordaFormsXmlCompra">
                  <b-form-group
                    label="Unidade"
                    class="bordaFormsXmlCompraLabel"
                  >
                    <b-form-input
                      class="p-1 fontInputComprar"
                      size="sm"
                      type="text"
                      v-model="inputProd.det_prod_ucom"
                      required
                      readonly
                    />
                  </b-form-group>
                </b-col>
                <b-col sm="3" lg="6" class="bordaFormsXmlCompra">
                  <b-form-group
                    label="Quantidade"
                    class="bordaFormsXmlCompraLabel"
                  >
                    <b-form-input
                      class="p-1 fontInputComprar"
                      size="sm"
                      type="number"
                      v-model="inputProd.det_prod_qcom"
                      required
                      readonly
                    />
                  </b-form-group>
                </b-col>
                <b-col
                  sm="3"
                  lg="2"
                  class="bordaFormsXmlCompra bordaFormsXmlCompraRight"
                >
                  <b-form-group
                    label="Valor unitário"
                    class="bordaFormsXmlCompraLabel"
                  >
                    <b-form-input
                      class="p-1 fontInputComprar"
                      size="sm"
                      type="number"
                      v-model="inputProd.det_prod_vuncom"
                      required
                      readonly
                    />
                  </b-form-group>
                </b-col>

                <b-col
                  sm="3"
                  lg="2"
                  class="bordaFormsXmlCompra bordaFormsXmlCompraRight"
                >
                  <b-form-group
                    label="Valor total"
                    class="bordaFormsXmlCompraLabel"
                  >
                    <b-form-input
                      class="p-1 fontInputComprar"
                      size="sm"
                      type="number"
                      v-model="inputProd.det_prod_vprod"
                      required
                      readonly
                    />
                  </b-form-group>
                </b-col>
                <b-col sm="12" class="pl-2 mt-2">
                  <h5><i class="fa fa-arrows-h"></i> Conversão de unidade</h5>
                </b-col>
                <b-col sm="6" class="bordaFormsXmlCompra">
                  <b-form-group
                    label="Entrada"
                    class="bordaFormsXmlCompraLabel p-0 pl-1 pr-1"
                  ></b-form-group
                ></b-col>
                <b-col
                  sm="6"
                  class="bordaFormsXmlCompra bordaFormsXmlCompraRight"
                >
                  <b-form-group
                    label="Saída"
                    class="bordaFormsXmlCompraLabel p-0 pl-1 pr-1"
                  ></b-form-group
                ></b-col>
                <b-col sm="1" class="bordaFormsXmlCompra text-center pt-2">
                  <h5>
                    <b> 1 </b>
                  </h5>
                </b-col>
                <b-col sm="3" class="bordaFormsXmlCompra">
                  <b-form-group class="p-1 m-0">
                    <b-form-input
                      size="sm"
                      class="p-1 fontInputComprarConvesao"
                      type="text"
                      v-model="notaXmlComprar.produtos[k].det_prod_ucom"
                      required
                      readonly
                    />
                  </b-form-group>
                </b-col>
                <b-col sm="2" class="bordaFormsXmlCompra text-center pt-2">
                  equivale a
                </b-col>
                <b-col sm="3" class="bordaFormsXmlCompra">
                  <b-form-group class="p-1 m-0">
                    <b-form-input
                      @click="
                        formataParaInteiroQtdSaida(
                          notaXmlComprar.produtos[k].estq_det_prod_qcom_sainda,
                          k
                        )
                      "
                      @blur="
                        formataComVirgulaQtdSaida(
                          notaXmlComprar.produtos[k].estq_det_prod_qcom_sainda,
                          k
                        )
                      "
                      size="sm"
                      class="p-2 fontInputComprarConvesaoQtdSaida text-right"
                      type="number"
                      v-model="
                        notaXmlComprar.produtos[k].estq_det_prod_qcom_sainda
                      "
                      required
                    />
                  </b-form-group>
                </b-col>
                <b-col
                  sm="3"
                  class="bordaFormsXmlCompra bordaFormsXmlCompraRight"
                >
                  <b-form-group class="p-1 m-0">
                    <b-form-input
                      size="sm"
                      class="p-1 fontInputComprarConvesao"
                      type="search"
                      list="my-list-id-pesquisa_unidadeMedida"
                      v-model="
                        notaXmlComprar.produtos[k].estq_det_prod_ucom_sainda
                      "
                      required
                    />
                    <datalist id="my-list-id-pesquisa_unidadeMedida">
                      <option
                        v-for="(unidadeMed, key) in unidadeMedidas"
                        :key="key"
                      >
                        {{ unidadeMed.sigla }}
                      </option>
                    </datalist>
                  </b-form-group>
                </b-col>
                <b-col sm="12" class="pl-2 mt-2">
                  <h5><i class="fa fa-money"></i> Valores de venda</h5>
                </b-col>

                <b-col
                  v-for="(valoresVenda, keyVlrsVenda) in lucrosUtilizados"
                  :key="keyVlrsVenda"
                  sm="6"
                  lg="3"
                  class="bordaFormsXmlCompra bordaFormsXmlCompraRight"
                >
                  <b-form-group
                    :label="valoresVenda.nome + ` (${valoresVenda.lucro}%)`"
                    class="bordaFormsXmlCompraLabel"
                  >
                    <money
                      class="inputMoneyValoresVenda"
                      autocomplete="off"
                      v-model="
                        inputProd.estq_valores_de_vendas[keyVlrsVenda]
                          .valor_de_venda
                      "
                      v-bind="maskValorComVigulaDecimalReal"
                      required
                    ></money>
                  </b-form-group>
                </b-col>

                <b-col sm="12" class="pt-2 p-0">
                  <b-alert
                    v-show="
                      notaXmlComprar.produtos[k].estq_stateProdutos ==
                      'produto_cadastrado'
                    "
                    show
                    variant="success"
                    >Este <b>produto</b> já possui cadastro.
                  </b-alert>
                  <b-alert
                    v-show="
                      notaXmlComprar.produtos[k].estq_stateProdutos !==
                      'produto_cadastrado'
                    "
                    show
                    variant="warning"
                    >Este <b>produto</b> não possui cadastro, deseja
                    cadastrá-lo?
                    <b-form-radio-group
                      v-model="notaXmlComprar.produtos[k].estq_stateProdutos"
                      size="sm"
                    >
                      <b-form-radio
                        value="novo_produto"
                        @change="atualizaAlertaProdutos(k, 'novo_produto')"
                      >
                        <b> Cadastrar </b>
                      </b-form-radio>
                      <b-form-radio
                        value="buscar_produto"
                        @change="atualizaAlertaProdutos(k, 'buscar_produto')"
                        ><b>Buscar no sistema</b></b-form-radio
                      >
                    </b-form-radio-group>

                    <b-row
                      v-show="
                        notaXmlComprar.produtos[k].estq_stateProdutos ==
                        'buscar_produto'
                      "
                      class="p-1 pr-3 pl-3"
                    >
                      <b-form-input
                        autocomplete="off"
                        type="search"
                        list="my-list-id-pesquisa_produtos"
                        v-model="
                          notaXmlComprar.produtos[k].estq_nome_produto_buscar
                        "
                        size="sm"
                        required
                      ></b-form-input>
                      <datalist id="my-list-id-pesquisa_produtos">
                        <option
                          v-for="(produtosEstq, key) in produtos"
                          :key="key"
                        >
                          {{ produtosEstq.nome_produto }}
                        </option>
                      </datalist>
                    </b-row>
                  </b-alert>
                </b-col>
              </b-row>
            </b-tab>
            <!-- ################################  Totais da nota / Pagamento  #################### -->
            <b-tab title="Totais / Pagamento">
              <!-- Duplicatas -->
              <b-row>
                <b-col sm="12" class="pl-2">
                  <h5><i class="fa fa-usd"></i> Duplicatas</h5>
                </b-col>
                <b-col sm="4" class="bordaFormsXmlCompra">
                  <b-form-group
                    label="Duplicata"
                    class="bordaFormsXmlCompraLabel p-0 pl-1 pr-1"
                  ></b-form-group
                ></b-col>
                <b-col sm="4" class="bordaFormsXmlCompra">
                  <b-form-group
                    label="Data de vencimento"
                    class="bordaFormsXmlCompraLabel p-0 pl-1 pr-1"
                  >
                  </b-form-group
                ></b-col>
                <b-col
                  sm="4"
                  lg="4"
                  class="bordaFormsXmlCompra bordaFormsXmlCompraRight"
                >
                  <b-form-group
                    label="Valor"
                    class="bordaFormsXmlCompraLabel p-0 pl-1 pr-1"
                  >
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row
                v-for="(inputCobran, k) in notaXmlComprar.cobrancas.dup"
                :key="k"
              >
                <b-col sm="4" class="bordaFormsXmlCompra">
                  <b-form-input
                    class="p-1 fontInputComprar"
                    size="sm"
                    type="text"
                    v-model="inputCobran.cobr_dup_ndup"
                    required
                    readonly
                  />
                </b-col>

                <b-col sm="4" class="bordaFormsXmlCompra">
                  <b-form-input
                    class="p-1 fontInputComprar"
                    size="sm"
                    type="text"
                    v-model="inputCobran.cobr_dup_dvenc"
                    required
                    readonly
                  />
                </b-col>
                <b-col
                  sm="4"
                  class="bordaFormsXmlCompra bordaFormsXmlCompraRight"
                >
                  <b-form-input
                    class="p-1 fontInputComprar"
                    size="sm"
                    type="number"
                    v-model="inputCobran.cobr_dup_vdup"
                    required
                    readonly
                  />
                </b-col>
              </b-row>
              <!--  totais da nota -->
              <b-row class="mt-3">
                <b-col sm="12" class="pl-2">
                  <h5><i class="fa fa-money"></i> Totais da nota</h5>
                </b-col>
                <b-col sm="3" lg="3" class="bordaFormsXmlCompra">
                  <b-form-group
                    label="Base de cálculo de ICMS"
                    class="bordaFormsXmlCompraLabel"
                  >
                    <b-form-input
                      class="p-1 fontInputComprar"
                      size="sm"
                      type="number"
                      v-model="notaXmlComprar.total.total_vbc"
                      required
                      readonly
                    />
                  </b-form-group>
                </b-col>
                <b-col sm="3" lg="2" class="bordaFormsXmlCompra">
                  <b-form-group
                    label="Valor do ICMS"
                    class="bordaFormsXmlCompraLabel"
                  >
                    <b-form-input
                      class="p-1 fontInputComprar"
                      size="sm"
                      type="number"
                      v-model="notaXmlComprar.total.total_vicms"
                      required
                      readonly
                    />
                  </b-form-group>
                </b-col>
                <b-col sm="3" lg="2" class="bordaFormsXmlCompra">
                  <b-form-group
                    label="Base de Cálculo ST"
                    class="bordaFormsXmlCompraLabel"
                  >
                    <b-form-input
                      class="p-1 fontInputComprar"
                      size="sm"
                      type="number"
                      v-model="notaXmlComprar.total.total_vbcst"
                      required
                      readonly
                    />
                  </b-form-group>
                </b-col>
                <b-col
                  sm="3"
                  lg="2"
                  class="bordaFormsXmlCompra bordaFormsXmlCompraRight"
                >
                  <b-form-group
                    label="Valor do ICMS ST"
                    class="bordaFormsXmlCompraLabel"
                  >
                    <b-form-input
                      class="p-1 fontInputComprar"
                      size="sm"
                      type="number"
                      v-model="notaXmlComprar.total.total_vst"
                      required
                      readonly
                    />
                  </b-form-group>
                </b-col>
                <b-col
                  sm="4"
                  lg="3"
                  class="bordaFormsXmlCompra bordaFormsXmlCompraRight"
                >
                  <b-form-group
                    label="Total dos produtos"
                    class="bordaFormsXmlCompraLabel"
                  >
                    <b-form-input
                      class="p-1 fontInputComprar"
                      size="sm"
                      type="number"
                      v-model="notaXmlComprar.total.total_vprod"
                      required
                      readonly
                    />
                  </b-form-group>
                </b-col>

                <b-col
                  sm="4"
                  lg="3"
                  class="bordaFormsXmlCompra bordaFormsXmlCompraRight"
                >
                  <b-form-group
                    label="Valor do frete"
                    class="bordaFormsXmlCompraLabel"
                  >
                    <b-form-input
                      class="p-1 fontInputComprar"
                      size="sm"
                      type="number"
                      v-model="notaXmlComprar.total.total_vfrete"
                      required
                      readonly
                    />
                  </b-form-group>
                </b-col>
                <b-col
                  sm="4"
                  lg="2"
                  class="bordaFormsXmlCompra bordaFormsXmlCompraRight"
                >
                  <b-form-group
                    label="Desconto"
                    class="bordaFormsXmlCompraLabel"
                  >
                    <b-form-input
                      class="p-1 fontInputComprar"
                      size="sm"
                      type="number"
                      v-model="notaXmlComprar.total.total_vdesc"
                      required
                      readonly
                    />
                  </b-form-group>
                </b-col>
                <b-col
                  sm="4"
                  lg="2"
                  class="bordaFormsXmlCompra bordaFormsXmlCompraRight"
                >
                  <b-form-group
                    label="Valor do IPI"
                    class="bordaFormsXmlCompraLabel"
                  >
                    <b-form-input
                      class="p-1 fontInputComprar"
                      size="sm"
                      type="number"
                      v-model="notaXmlComprar.total.total_vipi"
                      required
                      readonly
                    />
                  </b-form-group>
                </b-col>
                <b-col
                  sm="4"
                  lg="2"
                  class="bordaFormsXmlCompra bordaFormsXmlCompraRight"
                >
                  <b-form-group
                    label="Peso Bruto - Liquido"
                    class="bordaFormsXmlCompraLabel"
                  >
                    <b-form-input
                      class="p-1 fontInputComprar"
                      size="sm"
                      type="text"
                      v-model="notaXmlComprar.total.total_peso_pesob_pesol"
                      required
                      readonly
                    />
                  </b-form-group>
                </b-col>
                <b-col
                  sm="4"
                  lg="3"
                  class="bordaFormsXmlCompra bordaFormsXmlCompraRight"
                >
                  <b-form-group
                    label="Total da nota"
                    class="bordaFormsXmlCompraLabel"
                  >
                    <b-form-input
                      class="p-1 fontInputComprar"
                      size="sm"
                      type="number"
                      v-model="notaXmlComprar.total.total_vnf"
                      required
                      readonly
                    />
                  </b-form-group>
                </b-col>
              </b-row>
            </b-tab>
          </b-tabs>
        </b-card>
        <b-row v-show="mode == 'comprar'" class="row-btn mt-3 pl-2">
          <b-col sm="12">
            <b-button variant="btn btn-success" @click="finalizarCompra">
              <i class="fa fa-cloud-upload fa-lg"></i> Comprar
            </b-button>
            <b-button
              class="ml-3"
              variant="btn btn-danger"
              @click="navegar('null'), reset()"
            >
              <i class="fa fa-times fa-lg"></i> Cancelar
            </b-button>
          </b-col>
        </b-row>
      </b-col>
    </b-row>

    <!-- container com opções de filtrar -->
    <b-container fluid v-show="mode == 'null'">
      <b-row>
        <b-col sm="2">
          <b-button
            variant="btn btn-success mt-3"
            size="sm"
            @click="navegar('importar')"
          >
            <i class="fa fa-cloud-upload fa-lg"></i> Importa XML
          </b-button>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="12" class="p-2">
          <b-form-group
            class="ml-1"
            align="center"
            description="Nota fiscal de compra é o documento para comprovação fiscal da movimentação de mercadorias recebidas, ao contrário da nota fiscal de venda, que é quando você vende algo. Tanto o fornecedor, quanto o comprador, tem responsabilidade de emitir a nota."
          ></b-form-group>
        </b-col>
      </b-row>

      <!-- User Interface controls -->
      <b-container v-show="mode == 'null'" fluid class="mt-3">
        <b-row cols="12" align-h="center">
          <b-col cols="1" class="m-0 p-0">
            <b-form-group align="right" class="pt-1">
              <i class="fa fa-search fa-2x fa-fw"></i>
            </b-form-group>
          </b-col>
          <b-col cols="11" md="8">
            <b-form
              label-for="filterInputImportXML"
              class="input-group-prepend h6"
            >
              <b-input-group size="md">
                <b-form-input
                  id="filterInputImportXML"
                  type="search"
                  placeholder="Pesquisar..."
                  label-align-sm="left"
                  v-model="filter"
                ></b-form-input>
                <b-input-group-append>
                  <b-button :disabled="!filter" @click="filter = ''"
                    >X</b-button
                  >
                </b-input-group-append>
              </b-input-group>
            </b-form>
          </b-col>
        </b-row>
        <b-row cols="12">
          <b-col md="12" align="center">
            <b-form-group
              class="h6"
              description="Deixe tudo desmarcado para filtrar todos os dados"
            >
              <b-form-checkbox-group v-model="filterOn">
                <b-form-checkbox value="chave_acesso">Chave</b-form-checkbox>
                <b-form-checkbox value="data_emi">Data</b-form-checkbox>
                <b-form-checkbox value="nome_forn">Fornecedor</b-form-checkbox>
                <b-form-checkbox value="status">Situação</b-form-checkbox>
                <b-form-checkbox value="vlr_total">Valor</b-form-checkbox>
              </b-form-checkbox-group>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row align-h="between">
          <b-col sm="12" md="4" class="mt-1">
            <b-form-group
              label="Por página"
              label-cols-sm="0"
              label-cols-md="5"
              label-align-sm="left"
              label-align-md="right"
              label-size="sm"
              label-for="perPageSelect"
            >
              <b-form-select
                id="perPageSelect"
                v-model="perPage"
                aling="left"
                size="sm"
                :options="pageOptions"
              ></b-form-select>
            </b-form-group>
          </b-col>

          <b-col sm="12" md="8" class="mt-0">
            <b-pagination
              v-model="currentPage"
              :total-rows="totalRows"
              :per-page="perPage"
              align="end"
              size="md"
            ></b-pagination>
          </b-col>
        </b-row>
      </b-container>
    </b-container>
    <!-- tabela com informações das notas importadas -->
    <b-table
      v-show="mode == 'null'"
      bordered
      show-empty
      small
      stacked="md"
      :items="notasXmls"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      :filterIncludedFields="filterOn"
      @filtered="onFiltered"
    >
      <template v-slot:cell(situacao)="row">
        <span v-if="row.item.status == 'Pendente'" class="text-warning">
          {{ row.item.status }} <i class="fa fa-exclamation"></i
        ></span>
        <span v-else class="text-success"
          >{{ row.item.status }} <i class="fa fa-check"></i
        ></span>
      </template>
      <template v-slot:cell(actions)="row">
        <b-button @click="row.toggleDetails" class="btnAcoesXml bg-info">
          <i class="fa fa-info"></i>
        </b-button>
        <a href="#idNavegar" v-if="row.item.status == 'Pendente'">
          <b-button
            class="btnAcoesXml bg-success"
            @click="loadNotaXml(row.item, 'comprar')"
          >
            <i class="fa fa-cart-plus"></i>
          </b-button>
        </a>
        <a v-else>
          <b-button disabled class="btnAcoesXml bg-success">
            <i class="fa fa-shopping-cart"></i>
          </b-button>
        </a>
        <a href="#idNavegar" v-if="row.item.status == 'Pendente'">
          <b-button
            class="btnAcoesXml bg-danger"
            @click="loadNotaXml(row.item, 'remove')"
          >
            <i class="fa fa-trash-o"></i>
          </b-button>
        </a>
        <a v-else>
          <b-button disabled class="btnAcoesXml bg-danger">
            <i class="fa fa-trash-o"></i>
          </b-button>
        </a>
      </template>
      <!-- CONTAINER DAS INFORMAÇÕES -->
      <template v-slot:row-details="row">
        <b-row>
          <b-col sm="12" class="m-0">
            <b-card no-body>
              <b-tabs pills card justified>
                <!-- ####################  Dados gerais  #################### -->
                <b-tab title="Dados gerais" active class="p-1">
                  <b-container
                    fluid
                    class="table-responsive mb-4 p-0 heightTblInfoNota"
                  >
                    <span v-if="row.item.status == 'Comprada'">
                      <b-col sm="12" class="mt-1">
                        <h6>
                          <i class="fa fa-shopping-bag"></i> Dados da compra
                        </h6>
                      </b-col>
                      <table class="table table-striped table-dark">
                        <thead>
                          <tr>
                            <th scope="col">Situação</th>
                            <th scope="col">Comprada em</th>
                            <th scope="col">Comprada por</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td class="text-success">
                              <b>{{ row.item.status }}</b>
                            </td>
                            <td>
                              {{ row.item.comprado_em }}
                            </td>
                            <td>
                              {{ row.item.cadastrado_por }}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </span>
                    <b-col sm="12" class="mt-1">
                      <h6><i class="fa fa-server"></i> Dados da NF-e</h6>
                    </b-col>
                    <table class="table table-striped table-dark">
                      <thead>
                        <tr>
                          <th scope="col">Natureza da operação</th>
                          <th scope="col">Série/NFe</th>
                          <th scope="col">Data da emissão</th>
                          <th scope="col">Chave de acesso</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{{ row.item.identificacao.ide_natope }}</td>
                          <td>
                            {{ row.item.identificacao.ide_serie }}{{ "/"
                            }}{{ row.item.identificacao.ide_nnf }}
                          </td>
                          <td>{{ row.item.data_emi }}</td>
                          <td>{{ row.item.chave_acesso }}</td>
                        </tr>
                      </tbody>
                    </table>
                    <b-col sm="12" class="mt-3">
                      <h6>
                        <i class="fa fa-address-card-o"></i> Dados do emitente
                      </h6>
                    </b-col>
                    <table class="table table-striped table-dark">
                      <thead>
                        <tr>
                          <th scope="col">Razão social</th>
                          <th scope="col">Fantasia</th>
                          <th scope="col">CNPJ</th>
                          <th scope="col">Inscrição estadual</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{{ row.item.emitente.emit_xnome }}</td>
                          <td>
                            {{ row.item.emitente.emit_xfant }}
                          </td>
                          <td>
                            {{
                              row.item.emitente.emit_cnpj.replace(
                                /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,
                                "\$1.\$2.\$3\/\$4\-\$5"
                              )
                            }}
                          </td>
                          <td>{{ row.item.emitente.emit_ie }}</td>
                        </tr>
                      </tbody>
                    </table>
                    <table class="table table-striped table-dark mt-1">
                      <thead>
                        <tr>
                          <th scope="col">Endereço</th>
                          <th scope="col">Bairro</th>
                          <th scope="col">Cidade/UF</th>
                          <th scope="col">CEP</th>
                          <th scope="col">Telefone</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            {{ row.item.emitente.emit_xlgr + ", "
                            }}{{ row.item.emitente.emit_nro }}
                          </td>
                          <td>
                            {{ row.item.emitente.emit_xbairro }}
                          </td>
                          <td>
                            {{ row.item.emitente.emit_xmun + "/"
                            }}{{ row.item.emitente.emit_uf }}
                          </td>
                          <td>{{ row.item.emitente.emit_cep }}</td>
                          <td>{{ row.item.emitente.emit_fone }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </b-container>
                </b-tab>
                <!-- #######################  Produtos  #################### -->
                <b-tab title="Produtos" class="p-1">
                  <b-container
                    fluid
                    class="tbodyProdutos table-responsive mb-4 p-0 heightTblInfoNota"
                  >
                    <b-col sm="12" class="mt-1">
                      <h6><i class="fa fa-cubes"></i> Produtos</h6>
                    </b-col>
                    <b-col>
                      <table class="table table-striped table-dark mb-1">
                        <thead>
                          <tr>
                            <th class="tamanhoWidth" scope="col">Código</th>
                            <th class="tamanhoDescri" scope="col">
                              Descrição do produto
                            </th>
                            <th class="tamanhoWidth" scope="col">Unidade</th>
                            <th class="tamanhoWidth" scope="col">Quantidade</th>
                            <th class="tamanhoWidth" scope="col">
                              Valor unitário
                            </th>
                            <th class="tamanhoWidth" scope="col">
                              Valor total
                            </th>
                          </tr>
                        </thead>
                      </table>
                    </b-col>
                    <b-col v-for="(input, k) in row.item.produtos" :key="k">
                      <table class="table table-striped table-dark mb-1">
                        <tbody>
                          <tr>
                            <td class="tamanhoWidth">
                              {{ input.det_prod_cprod }}
                            </td>
                            <td class="tamanhoDescri">
                              {{ input.det_prod_xprod }}
                            </td>
                            <td class="tamanhoWidth">
                              {{ input.det_prod_ucom }}
                            </td>
                            <td class="tamanhoWidth">
                              {{
                                input.det_prod_qcom
                                  .replace(".", ",")
                                  .replace(/(\d)(?=(\d{3})+\,)/g, "$1.")
                              }}
                            </td>
                            <td class="tamanhoWidth">
                              {{
                                input.det_prod_vuncom
                                  .replace(".", ",")
                                  .replace(/(\d)(?=(\d{3})+\,)/g, "$1.")
                              }}
                            </td>
                            <td class="tamanhoWidth">
                              {{
                                input.det_prod_vprod
                                  .replace(".", ",")
                                  .replace(/(\d)(?=(\d{3})+\,)/g, "$1.")
                              }}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </b-col>
                  </b-container>
                </b-tab>
                <!-- ##########################  Transporte  #################### -->
                <b-tab title="Transporte" class="p-1">
                  <b-container
                    fluid
                    class="table-responsive mb-4 p-0 heightTblInfoNota"
                  >
                    <b-col sm="12" class="mt-1">
                      <h6><i class="fa fa-truck"></i> Transporte</h6>
                    </b-col>
                    <table class="table table-striped table-dark">
                      <thead>
                        <tr>
                          <th scope="col">Razão social</th>
                          <th scope="col">CPF / CNPJ</th>
                          <th scope="col">Inscrição estadual</th>
                          <th scope="col">Endereço</th>
                          <th scope="col">Cidade/UF</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            {{ row.item.transporte.transp_transporta_xnome }}
                          </td>
                          <td>
                            {{ row.item.transporte.transp_transporta_cpf }}
                            {{ row.item.transporte.transp_transporta_cnpj }}
                          </td>

                          <td>
                            {{ row.item.transporte.transp_transporta_ie }}
                          </td>

                          <td>
                            {{ row.item.transporte.transp_transporta_xender }}
                          </td>

                          <td>
                            {{ row.item.transporte.transp_transporta_xmun
                            }}{{ "/"
                            }}{{ row.item.transporte.transp_transporta_uf }}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </b-container>
                </b-tab>
                <!-- #############################  Duplicatas  #################### -->
                <b-tab title="Duplicatas" class="p-1">
                  <b-container
                    fluid
                    class="table-responsive mb-4 p-0 heightTblInfoNota"
                  >
                    <b-col sm="12" class="mt-1">
                      <h6><i class="fa fa-usd"></i> Duplicatas</h6>
                    </b-col>
                    <b-col>
                      <table class="table table-striped table-dark mb-1">
                        <thead>
                          <tr>
                            <th class="w-25" scope="col">Duplicata</th>
                            <th class="w-25" scope="col">Data de vencimento</th>
                            <th class="w-25" scope="col">Valor</th>
                          </tr>
                        </thead>
                      </table>
                    </b-col>
                    <b-col
                      v-for="(input, k) in row.item.cobrancas.dup"
                      :key="k"
                    >
                      <table class="table table-striped table-dark mb-1">
                        <tbody>
                          <tr>
                            <td class="w-25">
                              {{ input.cobr_dup_ndup }}
                            </td>
                            <td class="w-25">
                              {{ input.cobr_dup_dvenc }}
                            </td>
                            <td class="w-25">
                              {{
                                input.cobr_dup_vdup
                                  .replace(".", ",")
                                  .replace(/(\d)(?=(\d{3})+\,)/g, "$1.")
                              }}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </b-col>
                  </b-container>
                </b-tab>
                <!-- #############################  Totais da nota  #################### -->
                <b-tab title="Totais da nota" class="p-1">
                  <b-container
                    fluid
                    class="table-responsive mb-4 p-0 heightTblInfoNota"
                  >
                    <b-col sm="12" class="mt-1">
                      <h6><i class="fa fa-money"></i> Totais da nota</h6>
                    </b-col>
                    <table class="table table-striped table-dark">
                      <thead>
                        <tr>
                          <th scope="col">Base de cálculo de ICMS</th>
                          <th scope="col">Valor do ICMS</th>
                          <th scope="col">Base de Cálculo ST</th>
                          <th scope="col">Valor do ICMS ST</th>
                          <th scope="col">Total dos produtos</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            {{
                              row.item.total.total_vbc
                                .replace(".", ",")
                                .replace(/(\d)(?=(\d{3})+\,)/g, "$1.")
                            }}
                          </td>
                          <td>
                            {{
                              row.item.total.total_vicms
                                .replace(".", ",")
                                .replace(/(\d)(?=(\d{3})+\,)/g, "$1.")
                            }}
                          </td>
                          <td>
                            {{
                              row.item.total.total_vbcst
                                .replace(".", ",")
                                .replace(/(\d)(?=(\d{3})+\,)/g, "$1.")
                            }}
                          </td>
                          <td>
                            {{
                              row.item.total.total_vst
                                .replace(".", ",")
                                .replace(/(\d)(?=(\d{3})+\,)/g, "$1.")
                            }}
                          </td>
                          <td>
                            {{
                              row.item.total.total_vprod
                                .replace(".", ",")
                                .replace(/(\d)(?=(\d{3})+\,)/g, "$1.")
                            }}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <b-col sm="12" class="mt-1"> </b-col>
                    <table class="table table-striped table-dark">
                      <thead>
                        <tr>
                          <th scope="col">Valor do frete</th>
                          <th scope="col">Desconto</th>
                          <th scope="col">Valor do IPI</th>
                          <th scope="col">Peso Bruto - Liquido</th>
                          <th scope="col">Total da nota</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            {{
                              row.item.total.total_vfrete
                                .replace(".", ",")
                                .replace(/(\d)(?=(\d{3})+\,)/g, "$1.")
                            }}
                          </td>
                          <td>
                            {{
                              row.item.total.total_vicmsdeson
                                .replace(".", ",")
                                .replace(/(\d)(?=(\d{3})+\,)/g, "$1.")
                            }}
                          </td>
                          <td>
                            {{
                              row.item.total.total_vipi
                                .replace(".", ",")
                                .replace(/(\d)(?=(\d{3})+\,)/g, "$1.")
                            }}
                          </td>
                          <td>
                            {{
                              row.item.transporte.transp_vol_pesob
                                .replace(".", ",")
                                .replace(/(\d)(?=(\d{3})+\,)/g, "$1.") + " - "
                            }}{{
                              row.item.transporte.transp_vol_pesol
                                .replace(".", ",")
                                .replace(/(\d)(?=(\d{3})+\,)/g, "$1.")
                            }}
                          </td>
                          <td>
                            {{
                              row.item.total.total_vnf
                                .replace(".", ",")
                                .replace(/(\d)(?=(\d{3})+\,)/g, "$1.")
                            }}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </b-container>
                </b-tab>
              </b-tabs>
            </b-card>
          </b-col>
        </b-row>
      </template>
    </b-table>

    <!-- container com input para importa novas notas -->
    <b-container v-show="mode == 'importar'" fluid class="inputFileImportaXML">
      <b-row align-h="center">
        <b-col sm="8" align="center">
          <h4>Importar XML manualmente</h4>
          <b-form-group
            description="Importe as notas fiscais recebidas dos seus fornecedores para dar entrada nas mercadorias e no financeiro, faça a importação clicando no botão 'Browse ou Selecionar arquivo XML.'"
          ></b-form-group>
        </b-col>
      </b-row>
      <b-row align-h="center" class="mb-4">
        <b-col sm="7">
          <!--  :state="Boolean(fileNovaNotaXML)" -->
          <!-- Styled -->
          <b-form-file
            type="file"
            multiple
            v-model="fileNovaNotaXML"
            :file-name-formatter="formatNames"
            placeholder="Selecione um arquivo XML..."
          ></b-form-file>
        </b-col>
      </b-row>
    </b-container>
    <!-- CONTAINER MOSTRA AS NOTA COM ERRO NA IMPORTAÇÃO -->
    <b-container
      class="mt-4"
      v-if="
        notasErroAoImportar !== null &&
        notasErroAoImportar.length > 0 &&
        mode == 'importar'
      "
      fluid
    >
      <b-row align-h="end">
        <b-col sm="7" align="center">
          <h4 class="text-danger">Notas NF-e não importadas.</h4>
          <b-form-group
            description="Essas notas fiscais podem ter sido já cadastradas ou houve algum erro inesperado na importação."
          ></b-form-group>
          <b-row v-for="(nota, k) in notasErroAoImportar" :key="k">
            <b-col class="bordaForms p-1" sm="12">
              {{ nota.chave }}
            </b-col>
            <b-col class="bordaForms text-danger mb-3" sm="12">
              {{ nota.error }}
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
    <b-row v-show="mode == 'importar'" class="row-btn mt-2">
      <b-col sm="12">
        <b-button variant="btn btn-success" @click="parseNovaNotaXML">
          <i class="fa fa-cloud-upload fa-lg"></i> Importar
        </b-button>
        <b-button
          class="ml-3"
          variant="btn btn-danger"
          @click="navegar('null'), reset()"
        >
          <i class="fa fa-times fa-lg"></i> Fechar
        </b-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
/* import cep from "cep-promise"; */
import PageTitle from "@/components/template/PageTitle";
import {
  baseApiUrl,
  showError,
  showSuccesImportNota,
} from "../../../../global";
import axios from "axios";
export default {
  components: { PageTitle },
  name: "importaXML",
  data() {
    return {
      estq_stateFornecedor: "",
      mode: "null",
      fileNovaNotaXML: [],
      notasErroAoImportar: null,
      modeloNovaNotaXML: {},
      notaXmlComprar: {},
      notasXmls: [],
      fornecedores: [],
      lucrosUtilizados: [],
      produtos: [],
      unidadeMedidas: [],
      maskValorComVigulaDecimalReal: {
        decimal: ",",
        thousands: ".",
        precision: 2,
        prefix: "R$  ",
        masked: false,
      },
      fields: [
        {
          key: "chave_acesso",
          label: "Chave",
          sortable: true,
        },
        {
          key: "data_emi",
          label: "Data",
          sortable: true,
        },
        {
          key: "nome_forn",
          label: "Fornecedor",
          sortable: true,
        },
        {
          key: "vlr_total",
          label: "Valor total",
          sortable: true,
        },
        {
          key: "situacao",
          label: "Situação",
          class: "text-center",
        },
        {
          key: "actions",
          label: "Ações",
          class: "text-center",
        },
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [10, 30, 50, 100],
      filter: null,
      filterOn: [],
    };
  },
  methods: {
    atualizaAlertaProdutos(k, status) {
      this.notaXmlComprar.produtos[k].estq_stateProdutos = status;
      this.$forceUpdate();
    },
    formatNames(files) {
      return files.length === 1
        ? files[0].name
        : `${files.length} arquivos selecionados.`;
    },
    navegar(mode = "null") {
      this.mode = mode;
    },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    finalizarCompra() {
      /* cep(58046520).then(res=> console.log(res)).catch(console.log); */

      console.log(this.notaXmlComprar);

      let modeloProdutosFinalCompra = [];
      this.notaXmlComprar.produtos.forEach((elem, i) => {
        let modeloProduto = {
          codigo_importacao_produto: this.notaXmlComprar.produtos[i]
            .estq_codigo_importacao_cnpjcprod, // codigo de importação que eu gerei ( cnpj do emitente + cprod)

          det_prod_cprod: this.notaXmlComprar.produtos[i].det_prod_cprod, // codigo do produto
          det_prod_cean: this.notaXmlComprar.produtos[i].det_prod_cean, // codigo de barras do produto
          det_prod_xprod: this.notaXmlComprar.produtos[i].det_prod_xprod, // descrição do produto
          det_prod_qcom: this.notaXmlComprar.produtos[i].det_prod_qcom, // quantidade
          det_prod_ucom: this.notaXmlComprar.produtos[i].det_prod_ucom, // unidade comecial
          det_prod_vuncom: this.notaXmlComprar.produtos[i].det_prod_vuncom, // valor unitario
          det_prod_vprod: this.notaXmlComprar.produtos[i].det_prod_vprod, // valor total
          num_item_nota: this.notaXmlComprar.produtos[i].num_item_nota, // numerdo do produto na nota

          conversao_qcom_sainda: this.notaXmlComprar.produtos[i]
            .estq_det_prod_qcom_sainda, // quantidade de saida após a conversão
          conversao_ucom_sainda: this.notaXmlComprar.produtos[i]
            .estq_det_prod_ucom_sainda, // unidade medida apos a converção

          status_produto: this.notaXmlComprar.produtos[i].estq_stateProdutos, // vai dizer se o produto já tem cadastro ou não na tabela de importação
          status_produto_id_busca: this.notaXmlComprar.produtos[i]
            .estq_stateProdutos_id_busca, // caso o produto já tenha cadastro com outro codigo e eu o selecione no combobox buscar no sistema
          valores_de_venda: this.notaXmlComprar.produtos[i]
            .estq_valores_de_vendas, // valores de vendas já setados
        };
        modeloProdutosFinalCompra.push(modeloProduto);
      });

      this.notaXmlComprar.estq_stateFornecedor = this.estq_stateFornecedor;
      const modeloFinalizarCompra = {
        chave_acesso: this.notaXmlComprar.chave_acesso,
        cnpj_forn: this.notaXmlComprar.cnpj_forn,
        nome_forn: this.notaXmlComprar.nome_forn,
        emitente: this.notaXmlComprar.emitente,
        cobrancas: this.notaXmlComprar.cobrancas,
        total: this.notaXmlComprar.total,
        data_emi: this.notaXmlComprar.data_emi,
        status_fornecedor: this.estq_stateFornecedor,
        status_fornecedor_id_busca: this.notaXmlComprar
          .estq_fornecedor_id_busca,
        produtos: modeloProdutosFinalCompra,
      };

      const urlFinalizarCompra = `${baseApiUrl}/importa_nova_nota_xml/finalizar_compra`;
      axios
        .post(urlFinalizarCompra, modeloFinalizarCompra)
        .then(() => {
          this.$toasted.global.defaultSuccessFinalizarCompra();
          this.reset();
        })
        .catch(showError);
      console.log(modeloFinalizarCompra);
    },
    loadNotasXml() {
      const url = `${baseApiUrl}/importa_nova_nota_xml/leitura`;
      const UrlNomesFornecedores = `${baseApiUrl}/fornecedor`;
      const UrlLucrosUtilizados = `${baseApiUrl}/produto/valores_venda`;
      const urlProdutos = `${baseApiUrl}/produto`;
      const urlUnidadeMedidas = `${baseApiUrl}/produto/unidades_medidas`;

      axios
        .get(url)
        .then((res) => {
          this.notasXmls = res.data;
          this.totalRows = res.data.length;
          this.$forceUpdate(); // atualiza a pagina
        })
        .catch(showError);

      axios
        .get(UrlNomesFornecedores)
        .then((res) => {
          this.fornecedores = res.data;
        })
        .catch(showError);

      axios
        .get(UrlLucrosUtilizados)
        .then((res) => {
          this.lucrosUtilizados = res.data;
        })
        .catch(showError);

      axios
        .get(urlProdutos)
        .then((res) => {
          this.produtos = res.data;
        })
        .catch(showError);

      axios
        .get(urlUnidadeMedidas)
        .then((res) => {
          this.unidadeMedidas = res.data;
        })
        .catch(showError);
    },
    reset() {
      this.notaXmlComprar = {};
      this.fileNovaNotaXML = [];
      this.notasXmls = [];
      this.notasErroAoImportar = null;
      this.fornecedores = [];
      this.lucrosUtilizados = [];
      this.produtos = [];
      this.unidadeMedidas = [];
      this.navegar();
      this.loadNotasXml();
    },
    loadNotaXml(nota, mode = "null") {
      this.mode = mode;
      this.notaXmlComprar = { ...nota };

      //PERCORRE TODOS OS PRODUTOS DA NOTA SELECIONADA
      this.notaXmlComprar.produtos.forEach((elem, i) => {
        // CRIA O CÓDIGO QUE SERA ULTILIZADO PARA IMPORTAÇÃO AUTOMATICA (CNPJ + CPROD)
        this.notaXmlComprar.produtos[i].estq_codigo_importacao_cnpjcprod =
          this.notaXmlComprar.cnpj_forn +
          this.notaXmlComprar.produtos[i].det_prod_cprod;

        //calcular os valores de venda com o percentual cadastrado em "VALORES DE VENDAS"
        this.notaXmlComprar.produtos[i].estq_valores_de_vendas = [];
        this.lucrosUtilizados.forEach((elem, index) => {
          let modeloPrecoVenda = {
            nome: this.lucrosUtilizados[index].nome,
            valor_de_venda:
              (parseFloat(this.lucrosUtilizados[index].lucro) *
                parseFloat(this.notaXmlComprar.produtos[i].det_prod_vuncom)) /
                100 +
              parseFloat(this.notaXmlComprar.produtos[i].det_prod_vuncom),
            lucro_ultilizado: this.lucrosUtilizados[index].lucro,
          };
          this.notaXmlComprar.produtos[i].estq_valores_de_vendas.push(
            modeloPrecoVenda
          );
        });
        // final calcular valores produtos ^^^^

        // SETA VALORES PARA CONVERSÃO
        this.notaXmlComprar.produtos[i].estq_det_prod_qcom_sainda = 1;
        this.notaXmlComprar.produtos[i].estq_det_prod_qcom_sainda = parseInt(
          this.notaXmlComprar.produtos[i].estq_det_prod_qcom_sainda
        ).toFixed(2);
        this.notaXmlComprar.produtos[
          i
        ].estq_det_prod_ucom_sainda = this.notaXmlComprar.produtos[
          i
        ].det_prod_ucom;

        // VERIFICA SE O PRODUTO JA FOI CADASTRADO NA TABELA DE IMPORTAÇÃO (CODIGO_IMPORTAÇÃO E UCOM TEM QUE SER IGUAIS)
        this.notaXmlComprar.produtos[i].estq_stateProdutos = "";
        axios
          .get(
            `${baseApiUrl}/importa_nova_nota_xml/verifica_produto/${this.notaXmlComprar.produtos[i].estq_codigo_importacao_cnpjcprod}/${this.notaXmlComprar.produtos[i].det_prod_ucom}`
          )
          .then((res) => {
            if (res.data.codigo_importacao_produto) {
              this.notaXmlComprar.produtos[i].estq_stateProdutos =
                "produto_cadastrado";
                this.$forceUpdate(); // atualiza a pagina
              this.notaXmlComprar.produtos[i].estq_stateProdutos_id_busca =
                res.data.id;
            } else {
              this.notaXmlComprar.produtos[i].estq_stateProdutos =
                "novo_produto";
                this.$forceUpdate(); // atualiza a pagina
            }
          });
      });

      // criar o campo totais da nota (Peso Bruto - Liquido)
      if (
        this.notaXmlComprar.transporte.transp_vol_pesob &&
        this.notaXmlComprar.transporte.transp_vol_pesol
      ) {
        this.notaXmlComprar.total.total_peso_pesob_pesol =
          parseFloat(this.notaXmlComprar.transporte.transp_vol_pesob)
            .toFixed(2)
            .replace(".", ",")
            .replace(/(\d)(?=(\d{3})+)/g, "$1.")
            .toString() +
          " - " +
          parseFloat(this.notaXmlComprar.transporte.transp_vol_pesol)
            .toFixed(2)
            .replace(".", ",")
            .replace(/(\d)(?=(\d{3})+)/g, "$1.")
            .toString();
      } else {
        this.notaXmlComprar.total.total_peso_pesob_pesol = "";
      }

      // cria campo indentificação (Bairro, Numero)
      if (
        this.notaXmlComprar.emitente.emit_xlgr &&
        this.notaXmlComprar.emitente.emit_nro
      ) {
        this.notaXmlComprar.emitente.estq_emit_xlgr_nro =
          this.notaXmlComprar.emitente.emit_xlgr +
          ", " +
          this.notaXmlComprar.emitente.emit_nro;
      } else {
        this.notaXmlComprar.emitente.estq_emit_xlgr_nro = "";
      }

      // cria campo indentificação (Serie/NFe)
      if (
        this.notaXmlComprar.identificacao.ide_serie &&
        this.notaXmlComprar.identificacao.ide_nnf
      ) {
        this.notaXmlComprar.identificacao.estq_ide_serie_nnf =
          this.notaXmlComprar.identificacao.ide_serie +
          "/" +
          this.notaXmlComprar.identificacao.ide_nnf;
      } else {
        this.notaXmlComprar.identificacao.estq_ide_serie_nnf = "";
      }

      // cria campo emitente (Municipio/UF)
      if (
        this.notaXmlComprar.emitente.emit_xmun &&
        this.notaXmlComprar.emitente.emit_uf
      ) {
        this.notaXmlComprar.emitente.emit_xmun_uf =
          this.notaXmlComprar.emitente.emit_xmun +
          "/" +
          this.notaXmlComprar.emitente.emit_uf;
      } else {
        this.notaXmlComprar.emitente.emit_xmun_uf = "";
      }

      // cria campo transporte (Municipio/UF)
      if (
        this.notaXmlComprar.transporte.transp_transporta_xmun &&
        this.notaXmlComprar.transporte.transp_transporta_uf
      ) {
        this.notaXmlComprar.transporte.transp_transporta_xmun_uf =
          this.notaXmlComprar.transporte.transp_transporta_xmun +
          "/" +
          this.notaXmlComprar.transporte.transp_transporta_uf;
      }

      // cria campo transporte cnpj formatado com mascara
      if (this.notaXmlComprar.transporte.transp_transporta_cnpj) {
        this.notaXmlComprar.transporte.estq_transp_transporta_cnpj = this.notaXmlComprar.transporte.transp_transporta_cnpj.replace(
          /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,
          "$1.$2.$3/$4-$5"
        );
      } else {
        this.notaXmlComprar.transporte.estq_transp_transporta_cnpj = "";
      }

      // cria campo transporte cpf formatado com mascara
      if (this.notaXmlComprar.transporte.transp_transporta_cpf) {
        this.notaXmlComprar.transporte.estq_transp_transporta_cpf = this.notaXmlComprar.transporte.transp_transporta_cpf.replace(
          /(\d{3})(\d{3})(\d{3})(\d{2})/g,
          "$1.$2.$3-$4"
        );
      } else {
        this.notaXmlComprar.transporte.estq_transp_transporta_cpf = "";
      }

      // cria campo emitente cnpj formatado com mascara
      if (this.notaXmlComprar.emitente.emit_cnpj) {
        this.notaXmlComprar.emitente.estq_emit_cnpj = this.notaXmlComprar.emitente.emit_cnpj.replace(
          /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,
          "$1.$2.$3/$4-$5"
        );
      } else {
        this.notaXmlComprar.emitente.estq_emit_cnpj = "";
      }

      // VERIFICA SE O FORNECEDOR DA NOTA JÁ ESTA CADASTRADO
      this.notaXmlComprar.estq_stateFornecedor = "";
      axios
        .get(
          `${baseApiUrl}/fornecedor/${this.notaXmlComprar.cnpj_forn}`,
          this.notaXmlComprar.cnpj_forn
        )
        .then((res) => {
          if (res.data.razao_social) {
            this.estq_stateFornecedor = "ja_cadastrado";
            this.notaXmlComprar.estq_fornecedor_id_busca = res.data.id;
            this.$forceUpdate(); // atualiza a pagina
          } else {
            this.estq_stateFornecedor = "cadastrar";
            this.$forceUpdate(); // atualiza a pagina
          }
        });
    },
    // FUNÇÃO QUE LER O ARQUIVO XML E FAZ A LEITURA DA NOTA
    parseNovaNotaXML() {
      let notasErroAoImportarMod = [];
      let file = this.fileNovaNotaXML;
      let indexDo = 0;
      // toda leitura da nota para a importação
      do {
        let fr = new FileReader();

        if (
          file[indexDo] !== null &&
          file[indexDo] !== undefined &&
          file[indexDo].type == "text/xml"
        ) {
          try {
            fr.readAsBinaryString(file[indexDo]);
            fr.onload = function (e) {
              this.modeloNovaNotaXML = {}; // instancia o array q sera enviado para o sevidor
              const notaXML = e.currentTarget.result;
              let parser = new DOMParser();
              let xmlDoc = parser.parseFromString(notaXML, "text/xml"); // guarda o xml completo

              const nfeNoPai_ide = xmlDoc.getElementsByTagName("ide"); // identificação
              for (let i = 0; i < nfeNoPai_ide.length; i++) {
                var modeloIde = {};
                let noFilhos_ide = nfeNoPai_ide[i].childNodes; // pega nos os filhos de ide [cuf, cnf, natop, indpag...]

                for (let i = 0; i < noFilhos_ide.length; i++) {
                  switch (noFilhos_ide[i].tagName) {
                    case "cUF":
                      modeloIde.ide_cuf = noFilhos_ide[i].textContent;

                      break;
                    case "cNF":
                      modeloIde.ide_cnf = noFilhos_ide[i].textContent;

                      break;
                    case "natOp":
                      modeloIde.ide_natope = noFilhos_ide[i].textContent;

                      break;
                    case "indPag":
                      modeloIde.ide_indpag = noFilhos_ide[i].textContent;

                      break;
                    case "mod":
                      modeloIde.ide_mod = noFilhos_ide[i].textContent;

                      break;
                    case "serie":
                      modeloIde.ide_serie = noFilhos_ide[i].textContent;

                      break;
                    case "nNF":
                      modeloIde.ide_nnf = noFilhos_ide[i].textContent;

                      break;
                    case "dhEmi":
                      modeloIde.ide_dhemi = noFilhos_ide[i].textContent;

                      break;
                    case "dhSaiEnt":
                      modeloIde.ide_dhsaient = noFilhos_ide[i].textContent;

                      break;
                    case "tpNF":
                      modeloIde.ide_tpnf = noFilhos_ide[i].textContent;

                      break;
                    case "idDest":
                      modeloIde.ide_iddest = noFilhos_ide[i].textContent;

                      break;
                    case "cMunFG":
                      modeloIde.ide_cmunfg = noFilhos_ide[i].textContent;

                      break;
                    case "NFRef":
                      modeloIde.ide_nfref = noFilhos_ide[i].textContent;

                      break;
                    case "tpImp":
                      modeloIde.ide_tpimp = noFilhos_ide[i].textContent;

                      break;
                    case "tpEmis":
                      modeloIde.ide_tpemis = noFilhos_ide[i].textContent;

                      break;
                    case "cDV":
                      modeloIde.ide_cdv = noFilhos_ide[i].textContent;

                      break;
                    case "tpAmb":
                      modeloIde.ide_tpamb = noFilhos_ide[i].textContent;

                      break;
                    case "finNFe":
                      modeloIde.ide_finnfe = noFilhos_ide[i].textContent;

                      break;
                    case "indFinal":
                      modeloIde.ide_indfinal = noFilhos_ide[i].textContent;

                      break;
                    case "indPres":
                      modeloIde.ide_indpres = noFilhos_ide[i].textContent;

                      break;
                    case "procEmi":
                      modeloIde.ide_procemi = noFilhos_ide[i].textContent;

                      break;
                    case "verProc":
                      modeloIde.ide_verproc = noFilhos_ide[i].textContent;

                      break;
                    case "dhCont":
                      modeloIde.ide_dhcont = noFilhos_ide[i].textContent;

                      break;
                    case "xJust":
                      modeloIde.ide_xjust = noFilhos_ide[i].textContent;

                      break;

                    default:
                      break;
                  }
                }
                this.modeloNovaNotaXML.ide = modeloIde;
              }
              modeloIde = null; // limpa o modelo ide

              const nfeNoPai_emit = xmlDoc.getElementsByTagName("emit"); // emitente
              for (let i = 0; i < nfeNoPai_emit.length; i++) {
                var modeloEmit = {};
                let noFilhos_emit = nfeNoPai_emit[i].childNodes; // pega os nos filhos de emit (cnpj, xnome, enderemit...)

                for (let i = 0; i < noFilhos_emit.length; i++) {
                  switch (noFilhos_emit[i].tagName) {
                    case "CNPJ":
                      modeloEmit.emit_cnpj = noFilhos_emit[i].textContent;

                      break;
                    case "CPF":
                      modeloEmit.emit_cpf = noFilhos_emit[i].textContent;

                      break;
                    case "xNome":
                      modeloEmit.emit_xnome = noFilhos_emit[i].textContent;
                      modeloEmit.emit_xfant = noFilhos_emit[i].textContent;
                      break;
                    case "xFant":
                      modeloEmit.emit_xfant = noFilhos_emit[i].textContent;

                      break;
                    case "enderEmit":
                      var nosFilhosEnderEmit = noFilhos_emit[i].childNodes; // pega os nos filhos de enderEmit [xlgr, nro, xbairro, cmun...]

                      for (let i = 0; i < nosFilhosEnderEmit.length; i++) {
                        switch (nosFilhosEnderEmit[i].tagName) {
                          case "xLgr":
                            modeloEmit.emit_xlgr =
                              nosFilhosEnderEmit[i].textContent;

                            break;
                          case "nro":
                            modeloEmit.emit_nro =
                              nosFilhosEnderEmit[i].textContent;

                            break;
                          case "xCpl":
                            modeloEmit.emit_xcpl =
                              nosFilhosEnderEmit[i].textContent;

                            break;
                          case "xBairro":
                            modeloEmit.emit_xbairro =
                              nosFilhosEnderEmit[i].textContent;

                            break;
                          case "cMun":
                            modeloEmit.emit_cmun =
                              nosFilhosEnderEmit[i].textContent;

                            break;
                          case "xMun":
                            modeloEmit.emit_xmun =
                              nosFilhosEnderEmit[i].textContent;

                            break;
                          case "UF":
                            modeloEmit.emit_uf =
                              nosFilhosEnderEmit[i].textContent;

                            break;
                          case "CEP":
                            modeloEmit.emit_cep =
                              nosFilhosEnderEmit[i].textContent;

                            break;
                          case "cPais":
                            modeloEmit.emit_cpais =
                              nosFilhosEnderEmit[i].textContent;

                            break;
                          case "xPais":
                            modeloEmit.emit_xpais =
                              nosFilhosEnderEmit[i].textContent;

                            break;
                          case "fone":
                            modeloEmit.emit_fone =
                              nosFilhosEnderEmit[i].textContent;

                            break;

                          default:
                            break;
                        }
                      }

                      break;
                    case "IE":
                      modeloEmit.emit_ie = noFilhos_emit[i].textContent;

                      break;
                    case "IEST":
                      modeloEmit.emit_iest = noFilhos_emit[i].textContent;

                      break;
                    case "IM":
                      modeloEmit.emit_im = noFilhos_emit[i].textContent;

                      break;
                    case "CNAE":
                      modeloEmit.emit_cnae = noFilhos_emit[i].textContent;

                      break;
                    case "CRT":
                      modeloEmit.emit_crt = noFilhos_emit[i].textContent;

                      break;

                    default:
                      break;
                  }
                }
                this.modeloNovaNotaXML.emit = modeloEmit;
              }
              modeloEmit = null; // limpa o medelo emit

              const nfeNoPai_dest = xmlDoc.getElementsByTagName("dest"); // destinario
              for (let i = 0; i < nfeNoPai_dest.length; i++) {
                var modeloDest = {};
                let noFilhos_dest = nfeNoPai_dest[i].childNodes; // pega os nos filhos de dest [cnpj, xnome, enderedest...]

                for (let i = 0; i < noFilhos_dest.length; i++) {
                  switch (noFilhos_dest[i].tagName) {
                    case "CNPJ":
                      modeloDest.dest_cnpj = noFilhos_dest[i].textContent;

                      break;
                    case "CPF":
                      modeloDest.dest_cpf = noFilhos_dest[i].textContent;

                      break;
                    case "idEstrangeiro":
                      modeloDest.dest_idestrangeiro =
                        noFilhos_dest[i].textContent;

                      break;
                    case "xNome":
                      modeloDest.dest_xnome = noFilhos_dest[i].textContent;

                      break;
                    case "enderDest":
                      var nosFilhosEnderDest = noFilhos_dest[i].childNodes; // pega os nos filhos de enderDest [xlgr, nro, xCpl...]
                      for (let i = 0; i < nosFilhosEnderDest.length; i++) {
                        switch (nosFilhosEnderDest[i].tagName) {
                          case "xLgr":
                            modeloDest.dest_xlgr =
                              nosFilhosEnderDest[i].textContent;

                            break;
                          case "nro":
                            modeloDest.dest_nro =
                              nosFilhosEnderDest[i].textContent;

                            break;
                          case "xCpl":
                            modeloDest.dest_xcpl =
                              nosFilhosEnderDest[i].textContent;

                            break;
                          case "xBairro":
                            modeloDest.dest_xbairro =
                              nosFilhosEnderDest[i].textContent;

                            break;
                          case "cMun":
                            modeloDest.dest_cmun =
                              nosFilhosEnderDest[i].textContent;

                            break;
                          case "xMun":
                            modeloDest.dest_xmun =
                              nosFilhosEnderDest[i].textContent;

                            break;
                          case "UF":
                            modeloDest.dest_uf =
                              nosFilhosEnderDest[i].textContent;

                            break;
                          case "CEP":
                            modeloDest.dest_cep =
                              nosFilhosEnderDest[i].textContent;

                            break;
                          case "cPais":
                            modeloDest.dest_cpais =
                              nosFilhosEnderDest[i].textContent;

                            break;
                          case "xPais":
                            modeloDest.dest_xpais =
                              nosFilhosEnderDest[i].textContent;

                            break;
                          case "fone":
                            modeloDest.dest_fone =
                              nosFilhosEnderDest[i].textContent;

                            break;

                          default:
                            break;
                        }
                      }
                      break;
                    case "indIEDest":
                      modeloDest.dest_indiedest = noFilhos_dest[i].textContent;

                      break;
                    case "IE":
                      modeloDest.dest_ie = noFilhos_dest[i].textContent;

                      break;
                    case "ISUF":
                      modeloDest.dest_isuf = noFilhos_dest[i].textContent;

                      break;
                    case "IM":
                      modeloDest.dest_im = noFilhos_dest[i].textContent;

                      break;
                    case "CRT":
                      modeloDest.dest_email = noFilhos_dest[i].textContent;

                      break;
                    case "email":
                      modeloDest.dest_email = noFilhos_dest[i].textContent;

                      break;
                    case "Email":
                      modeloDest.dest_email = noFilhos_dest[i].textContent;

                      break;

                    default:
                      break;
                  }
                }
                this.modeloNovaNotaXML.dest = modeloDest;
              }
              modeloDest = null; // limpa o medelo dest

              const nfeNoPai_det = xmlDoc.getElementsByTagName("det"); // produtos
              this.modeloNovaNotaXML.det_produtos = []; // criar um array para guarda os produtos
              for (let i = 0; i < nfeNoPai_det.length; i++) {
                let noFilhos_det = nfeNoPai_det[i].childNodes; // pega os nos filhos de det [prod, imposto, infadprod...]
                let numItemNota = nfeNoPai_det[i].attributes.nItem.nodeValue; // numero do item na nota xml

                for (let i = 0; i < noFilhos_det.length; i++) {
                  switch (noFilhos_det[i].tagName) {
                    case "prod":
                      var nosFilhosProdProd = noFilhos_det[i].childNodes; // pego os nos filhos de prod [cprod, cean, xprod, ncm...]
                      var modeloProduto = {}; // crio um modelo para o produto

                      for (let i = 0; i < nosFilhosProdProd.length; i++) {
                        modeloProduto.num_item_nota = numItemNota; // numero do item ordenado na nota xml
                        switch (nosFilhosProdProd[i].tagName) {
                          case "cProd":
                            modeloProduto.det_prod_cprod =
                              nosFilhosProdProd[i].textContent;

                            break;
                          case "cEAN":
                            modeloProduto.det_prod_cean =
                              nosFilhosProdProd[i].textContent;

                            break;
                          case "xProd":
                            modeloProduto.det_prod_xprod =
                              nosFilhosProdProd[i].textContent;

                            break;
                          case "NCM":
                            modeloProduto.det_prod_ncm =
                              nosFilhosProdProd[i].textContent;

                            break;
                          case "NVE":
                            modeloProduto.det_prod_nve =
                              nosFilhosProdProd[i].textContent;

                            break;
                          case "CEST":
                            modeloProduto.det_prod_cest =
                              nosFilhosProdProd[i].textContent;

                            break;
                          case "indEscala":
                            modeloProduto.det_prod_indescala =
                              nosFilhosProdProd[i].textContent;

                            break;
                          case "CNPJFab":
                            modeloProduto.det_prod_cnpjfab =
                              nosFilhosProdProd[i].textContent;

                            break;
                          case "cBenef":
                            modeloProduto.det_prod_cbenef =
                              nosFilhosProdProd[i].textContent;

                            break;
                          case "EXTIPI":
                            modeloProduto.det_prod_extipi =
                              nosFilhosProdProd[i].textContent;

                            break;
                          case "CFOP":
                            modeloProduto.det_prod_cfop =
                              nosFilhosProdProd[i].textContent;

                            break;
                          case "uCom":
                            modeloProduto.det_prod_ucom =
                              nosFilhosProdProd[i].textContent;

                            break;
                          case "qCom":
                            modeloProduto.det_prod_qcom =
                              nosFilhosProdProd[i].textContent;

                            break;
                          case "vUnCom":
                            modeloProduto.det_prod_vuncom =
                              nosFilhosProdProd[i].textContent;

                            break;
                          case "vProd":
                            modeloProduto.det_prod_vprod =
                              nosFilhosProdProd[i].textContent;

                            break;
                          case "cEANTrib":
                            modeloProduto.det_prod_ceantrib =
                              nosFilhosProdProd[i].textContent;

                            break;
                          case "uTrib":
                            modeloProduto.det_prod_utrib =
                              nosFilhosProdProd[i].textContent;

                            break;
                          case "qTrib":
                            modeloProduto.det_prod_qtrib =
                              nosFilhosProdProd[i].textContent;

                            break;
                          case "vUnTrib":
                            modeloProduto.det_prod_vuntrib =
                              nosFilhosProdProd[i].textContent;

                            break;
                          case "vFrete":
                            modeloProduto.det_prod_vfrete =
                              nosFilhosProdProd[i].textContent;

                            break;
                          case "vSeg":
                            modeloProduto.det_prod_vseg =
                              nosFilhosProdProd[i].textContent;

                            break;
                          case "vDesc":
                            modeloProduto.det_prod_vdesc =
                              nosFilhosProdProd[i].textContent;

                            break;
                          case "vOutro":
                            modeloProduto.det_prod_voutro =
                              nosFilhosProdProd[i].textContent;

                            break;
                          case "indTot":
                            modeloProduto.det_prod_indtot =
                              nosFilhosProdProd[i].textContent;

                            break;
                          case "DI":
                            modeloProduto.det_prod_di =
                              nosFilhosProdProd[i].textContent;

                            break;
                          case "detExport":
                            modeloProduto.det_prod_detExport =
                              nosFilhosProdProd[i].textContent;

                            break;
                          case "xPed":
                            modeloProduto.det_prod_xped =
                              nosFilhosProdProd[i].textContent;

                            break;
                          case "nItemPed":
                            modeloProduto.det_prod_nitemped =
                              nosFilhosProdProd[i].textContent;

                            break;
                          case "nFCI":
                            modeloProduto.det_prod_nfci =
                              nosFilhosProdProd[i].textContent;

                            break;

                          default:
                            break;
                        }
                      }

                      break;
                    case "imposto":
                      var nosFilhosProdImposto = noFilhos_det[i].childNodes; // pego os nos filhos de imposto [icms, pis, cofins...]

                      for (let i = 0; i < nosFilhosProdImposto.length; i++) {
                        switch (nosFilhosProdImposto[i].tagName) {
                          case "vTotTrib":
                            modeloProduto.det_imposto_vtotTrib =
                              nosFilhosProdImposto[i].textContent;

                            break;
                          case "ICMS":
                            var nosFilhosICMS =
                              nosFilhosProdImposto[i].childNodes[0].childNodes; // pega o no ICMS dps pega os filhos dele (orig, CST,piCMS...)

                            for (let i = 0; i < nosFilhosICMS.length; i++) {
                              switch (nosFilhosICMS[i].tagName) {
                                case "orig":
                                  modeloProduto.det_imposto_icms_orig =
                                    nosFilhosICMS[i].textContent;

                                  break;
                                case "CST":
                                  modeloProduto.det_imposto_icms_cst =
                                    nosFilhosICMS[i].textContent;

                                  break;
                                case "vBCSTRet":
                                  modeloProduto.det_imposto_icms_vbcstret =
                                    nosFilhosICMS[i].textContent;

                                  break;
                                case "pST":
                                  modeloProduto.det_imposto_icms_pst =
                                    nosFilhosICMS[i].textContent;

                                  break;
                                case "vICMSSubstituto":
                                  modeloProduto.det_imposto_icms_vicmssubstituto =
                                    nosFilhosICMS[i].textContent;

                                  break;
                                case "vICMSSTRet":
                                  modeloProduto.det_imposto_icms_vicmsstret =
                                    nosFilhosICMS[i].textContent;

                                  break;
                                case "vBCFCPSTRet":
                                  modeloProduto.det_imposto_icms_vbcfcpstret =
                                    nosFilhosICMS[i].textContent;

                                  break;
                                case "pFCPSTRet":
                                  modeloProduto.det_imposto_icms_pfcpstret =
                                    nosFilhosICMS[i].textContent;

                                  break;
                                case "vFCPSTRet":
                                  modeloProduto.det_imposto_icms_vfcpstRet =
                                    nosFilhosICMS[i].textContent;

                                  break;
                                case "pRedBCEfet":
                                  modeloProduto.det_imposto_icms_predbcefet =
                                    nosFilhosICMS[i].textContent;

                                  break;
                                case "vBCEfet":
                                  modeloProduto.det_imposto_icms_vbcefet =
                                    nosFilhosICMS[i].textContent;

                                  break;
                                case "pICMSEfet":
                                  modeloProduto.det_imposto_icms_picmsefet =
                                    nosFilhosICMS[i].textContent;

                                  break;
                                case "vICMSEfet":
                                  modeloProduto.det_imposto_icms_vicmsefet =
                                    nosFilhosICMS[i].textContent;

                                  break;
                                case "vBCSTDest":
                                  modeloProduto.det_imposto_icms_vbcstdest =
                                    nosFilhosICMS[i].textContent;

                                  break;
                                case "vICMSSTDest":
                                  modeloProduto.det_imposto_icms_vicmsstdest =
                                    nosFilhosICMS[i].textContent;

                                  break;
                                case "pRedBCFfet":
                                  modeloProduto.det_imposto_icms_predbcffet =
                                    nosFilhosICMS[i].textContent;

                                  break;
                                case "CSOSN":
                                  modeloProduto.det_imposto_icms_csosn =
                                    nosFilhosICMS[i].textContent;

                                  break;

                                case "vBC":
                                  modeloProduto.det_imposto_icms_vbc =
                                    nosFilhosICMS[i].textContent;

                                  break;
                                case "pICMS":
                                  modeloProduto.det_imposto_icms_picms =
                                    nosFilhosICMS[i].textContent;

                                  break;
                                case "vICMS":
                                  modeloProduto.det_imposto_icms_vicms =
                                    nosFilhosICMS[i].textContent;

                                  break;
                                case "modBCST":
                                  modeloProduto.det_imposto_icms_modbcst =
                                    nosFilhosICMS[i].textContent;

                                  break;
                                case "pMVAST":
                                  modeloProduto.det_imposto_icms_pmvast =
                                    nosFilhosICMS[i].textContent;

                                  break;
                                case "vBCST":
                                  modeloProduto.det_imposto_icms_vbcst =
                                    nosFilhosICMS[i].textContent;

                                  break;
                                case "pICMSST":
                                  modeloProduto.det_imposto_icms_picmsst =
                                    nosFilhosICMS[i].textContent;

                                  break;
                                case "vICMSST":
                                  modeloProduto.det_imposto_icms_vicmsst =
                                    nosFilhosICMS[i].textContent;

                                  break;

                                default:
                                  break;
                              }
                            }

                            break;
                          case "IPI":
                            var nosFilhosIPI =
                              nosFilhosProdImposto[i].childNodes; // pega os nos filhos de IPI [cnpjprod, cenq, ipitrib]

                            for (let i = 0; i < nosFilhosIPI.length; i++) {
                              switch (nosFilhosIPI[i].tagName) {
                                case "CNPJProd":
                                  modeloProduto.det_imposto_ipi_cnpjprod =
                                    nosFilhosIPI[i].textContent;

                                  break;
                                case "cSelo":
                                  modeloProduto.det_imposto_ipi_cselo =
                                    nosFilhosIPI[i].textContent;

                                  break;
                                case "qSelo":
                                  modeloProduto.det_imposto_ipi_qselo =
                                    nosFilhosIPI[i].textContent;

                                  break;
                                case "cEnq":
                                  modeloProduto.det_imposto_ipi_cenq =
                                    nosFilhosIPI[i].textContent;

                                  break;
                                case "IPITrib":
                                  var nosFilhosIPI_TRIB =
                                    nosFilhosIPI[i].childNodes; // pega os nos filhos de IPITrib [cst, vbc, pIPI, vIPI]

                                  for (
                                    let i = 0;
                                    i < nosFilhosIPI_TRIB.length;
                                    i++
                                  ) {
                                    switch (nosFilhosIPI_TRIB[i].tagName) {
                                      case "CST":
                                        modeloProduto.det_imposto_ipitrib_cst =
                                          nosFilhosIPI_TRIB[i].textContent;

                                        break;
                                      case "vBC":
                                        modeloProduto.det_imposto_ipitrib_vbc =
                                          nosFilhosIPI_TRIB[i].textContent;

                                        break;
                                      case "pIPI":
                                        modeloProduto.det_imposto_ipitrib_pipi =
                                          nosFilhosIPI_TRIB[i].textContent;

                                        break;
                                      case "vIPI":
                                        modeloProduto.det_imposto_ipitrib_vipi =
                                          nosFilhosIPI_TRIB[i].textContent;

                                        break;
                                      default:
                                        break;
                                    }
                                  }
                                  break;
                                case "IPINT": //  OBS: TA PEGANDO A MESMA VARIAVEL DO IPITRIB NO MODELO PRODUTO
                                  var nosFilhosIPI_IPINT =
                                    nosFilhosIPI[i].childNodes; // pega os nos filhos de IPINT [cst, vbc, pIPI, vIPI]

                                  for (
                                    let i = 0;
                                    i < nosFilhosIPI_IPINT.length;
                                    i++
                                  ) {
                                    switch (nosFilhosIPI_IPINT[i].tagName) {
                                      case "CST":
                                        modeloProduto.det_imposto_ipitrib_cst =
                                          nosFilhosIPI_IPINT[i].textContent;

                                        break;
                                      case "vBC":
                                        modeloProduto.det_imposto_ipitrib_vbc =
                                          nosFilhosIPI_IPINT[i].textContent;

                                        break;
                                      case "pIPI":
                                        modeloProduto.det_imposto_ipitrib_pipi =
                                          nosFilhosIPI_IPINT[i].textContent;

                                        break;
                                      case "vIPI":
                                        modeloProduto.det_imposto_ipitrib_vipi =
                                          nosFilhosIPI_IPINT[i].textContent;

                                        break;
                                      default:
                                        break;
                                    }
                                  }
                                  break;
                                default:
                                  break;
                              }
                            }
                            break;
                          case "PIS":
                            var nosFilhosPisAliq =
                              nosFilhosProdImposto[i].childNodes; // pega o no PIS dps pega os filhos dele (PISAliq)
                            nosFilhosPisAliq.forEach(function (elem, index) {
                              switch (nosFilhosPisAliq[index].tagName) {
                                case "PISAliq":
                                  var noFilhosPISAliq =
                                    nosFilhosPisAliq[index].childNodes; // pega o no PISAliq dps pega os filhos dele (cst, vbc, ppis...)

                                  noFilhosPISAliq.forEach(function (
                                    elem,
                                    index
                                  ) {
                                    switch (noFilhosPISAliq[index].tagName) {
                                      case "CST":
                                        modeloProduto.det_imposto_pis_pisaliq_cst =
                                          noFilhosPISAliq[index].textContent;

                                        break;
                                      case "vBC":
                                        modeloProduto.det_imposto_pis_pisaliq_vbc =
                                          noFilhosPISAliq[index].textContent;

                                        break;
                                      case "pPIS":
                                        modeloProduto.det_imposto_pis_pisaliq_ppis =
                                          noFilhosPISAliq[index].textContent;

                                        break;
                                      case "vPIS":
                                        modeloProduto.det_imposto_pis_pisaliq_vpis =
                                          noFilhosPISAliq[index].textContent;

                                        break;

                                      default:
                                        break;
                                    }
                                  });

                                  break;
                                case "PISQtde":
                                  var noFilhosPISQtde =
                                    nosFilhosPisAliq[index].childNodes; // pega o no PISAliq dps pega os filhos dele (cst, vbc, ppis...)

                                  noFilhosPISQtde.forEach(function (
                                    elem,
                                    index
                                  ) {
                                    switch (noFilhosPISQtde[index].tagName) {
                                      case "CST":
                                        modeloProduto.det_imposto_pis_pisqtde_cst =
                                          noFilhosPISQtde[index].textContent;

                                        break;
                                      case "qBCProd":
                                        modeloProduto.det_imposto_pis_pisqtde_qbcprod =
                                          noFilhosPISQtde[index].textContent;

                                        break;
                                      case "vAliqProd":
                                        modeloProduto.det_imposto_pis_pisqtde_valiqprod =
                                          noFilhosPISQtde[index].textContent;

                                        break;
                                      case "vPIS":
                                        modeloProduto.det_imposto_pis_pisqtde_vpis =
                                          noFilhosPISQtde[index].textContent;

                                        break;

                                      default:
                                        break;
                                    }
                                  });
                                  break;
                                case "PISNT":
                                  var noFilhosPISNT =
                                    nosFilhosPisAliq[index].childNodes; // pega o no PISAliq dps pega os filhos dele (cst, vbc, ppis...)

                                  noFilhosPISNT.forEach(function (elem, index) {
                                    switch (noFilhosPISNT[index].tagName) {
                                      case "CST":
                                        modeloProduto.det_imposto_pis_pisnt_cst =
                                          noFilhosPISNT[index].textContent;

                                        break;

                                      default:
                                        break;
                                    }
                                  });

                                  break;
                                case "PISOutr":
                                  var noFilhosPISOutr =
                                    nosFilhosPisAliq[index].childNodes; // pega o no PISAliq dps pega os filhos dele (cst, vbc, ppis...)

                                  noFilhosPISOutr.forEach(function (
                                    elem,
                                    index
                                  ) {
                                    switch (noFilhosPISOutr[index].tagName) {
                                      case "CST":
                                        modeloProduto.det_imposto_pis_outr_cst =
                                          noFilhosPISOutr[index].textContent;

                                        break;
                                      case "vBC":
                                        modeloProduto.det_imposto_pis_outr_vbc =
                                          noFilhosPISOutr[index].textContent;

                                        break;
                                      case "pPis":
                                        modeloProduto.det_imposto_pis_outr_ppis =
                                          noFilhosPISOutr[index].textContent;

                                        break;
                                      case "qBCProd":
                                        modeloProduto.det_imposto_pis_outr_qbcProd =
                                          noFilhosPISOutr[index].textContent;

                                        break;
                                      case "vAliqProd":
                                        modeloProduto.det_imposto_pis_outr_valiqprod =
                                          noFilhosPISOutr[index].textContent;

                                        break;
                                      case "vPIS":
                                        modeloProduto.det_imposto_pis_outr_vpis =
                                          noFilhosPISOutr[index].textContent;

                                        break;

                                      default:
                                        break;
                                    }
                                  });
                                  break;
                                default:
                                  break;
                              }
                            });

                            break;
                          case "COFINS":
                            var noFilhosCofins =
                              nosFilhosProdImposto[i].childNodes; // pega os nos filhos de cofins [cofinsaliq]
                            noFilhosCofins.forEach(function (elem, index) {
                              switch (noFilhosCofins[index].tagName) {
                                case "COFINSAliq":
                                  var noFilhosCofisaAliq =
                                    noFilhosCofins[index].childNodes;

                                  noFilhosCofisaAliq.forEach(function (
                                    elem,
                                    index
                                  ) {
                                    switch (noFilhosCofisaAliq[index].tagName) {
                                      case "CST":
                                        modeloProduto.det_imposto_cofins_cst =
                                          noFilhosCofisaAliq[index].textContent;

                                        break;
                                      case "vBC":
                                        modeloProduto.det_imposto_cofins_vbc =
                                          noFilhosCofisaAliq[index].textContent;

                                        break;
                                      case "pCOFINS":
                                        modeloProduto.det_imposto_cofins_pcofins =
                                          noFilhosCofisaAliq[index].textContent;

                                        break;
                                      case "vCOFINS":
                                        modeloProduto.det_imposto_cofins_vcofins =
                                          noFilhosCofisaAliq[index].textContent;

                                        break;
                                      default:
                                        break;
                                    }
                                  });

                                  break;
                                default:
                                  break;
                              }
                            });

                            break;

                          default:
                            break;
                        }
                      }

                      break;
                    case "infAdProd":
                      modeloProduto.det_infadprod = noFilhos_det[i].textContent;

                      break;

                    default:
                      break;
                  }
                }

                this.modeloNovaNotaXML.det_produtos.push(modeloProduto); // adiciona o produto ao array que sera enviado para o sevidor
              }
              modeloProduto = null; // limpa modelo produto

              const nfeNoPai_total = xmlDoc.getElementsByTagName("total"); // total (valores totais icms, somatorio de valores dos itens)
              for (let i = 0; i < nfeNoPai_total.length; i++) {
                var modeloTotaisICMS = {}; // modelo total icms
                let noFilhos_total = nfeNoPai_total[i].childNodes; // pega o no total e pega seus nos filhos [ICMSTot..]
                noFilhos_total.forEach(function (elem, index) {
                  switch (noFilhos_total[index].tagName) {
                    case "ICMSTot":
                      var noFilhosIcmsTot = noFilhos_total[index].childNodes; // pega os nos filhos de icmsTot [vbc, vcms, vst, vfreet...]

                      noFilhosIcmsTot.forEach(function (elem, index) {
                        switch (noFilhosIcmsTot[index].tagName) {
                          case "vBC":
                            modeloTotaisICMS.total_vbc =
                              noFilhosIcmsTot[index].textContent;

                            break;
                          case "vICMS":
                            modeloTotaisICMS.total_vicms =
                              noFilhosIcmsTot[index].textContent;

                            break;
                          case "vICMSDeson":
                            modeloTotaisICMS.total_vicmsdeson =
                              noFilhosIcmsTot[index].textContent;

                            break;
                          case "vFCPUFDest":
                            modeloTotaisICMS.total_vfcpufdest =
                              noFilhosIcmsTot[index].textContent;

                            break;
                          case "vICMSUFDest":
                            modeloTotaisICMS.total_vicmsufdest =
                              noFilhosIcmsTot[index].textContent;

                            break;
                          case "vICMSUFRemet":
                            modeloTotaisICMS.total_vicmsufremet =
                              noFilhosIcmsTot[index].textContent;

                            break;
                          case "vFCP":
                            modeloTotaisICMS.total_vfcp =
                              noFilhosIcmsTot[index].textContent;

                            break;
                          case "vBCST":
                            modeloTotaisICMS.total_vbcst =
                              noFilhosIcmsTot[index].textContent;

                            break;
                          case "vST":
                            modeloTotaisICMS.total_vst =
                              noFilhosIcmsTot[index].textContent;

                            break;
                          case "vFCPST":
                            modeloTotaisICMS.total_vfcpst =
                              noFilhosIcmsTot[index].textContent;

                            break;
                          case "vFCPSTRet":
                            modeloTotaisICMS.total_vfcpstret =
                              noFilhosIcmsTot[index].textContent;

                            break;
                          case "vProd":
                            modeloTotaisICMS.total_vprod =
                              noFilhosIcmsTot[index].textContent;

                            break;
                          case "vFrete":
                            modeloTotaisICMS.total_vfrete =
                              noFilhosIcmsTot[index].textContent;

                            break;
                          case "vSeg":
                            modeloTotaisICMS.total_vseg =
                              noFilhosIcmsTot[index].textContent;

                            break;
                          case "vDesc":
                            modeloTotaisICMS.total_vdesc =
                              noFilhosIcmsTot[index].textContent;

                            break;
                          case "vII":
                            modeloTotaisICMS.total_vii =
                              noFilhosIcmsTot[index].textContent;

                            break;
                          case "finNFe":
                            modeloTotaisICMS.total_finnfe =
                              noFilhosIcmsTot[index].textContent;

                            break;
                          case "vIPI":
                            modeloTotaisICMS.total_vipi =
                              noFilhosIcmsTot[index].textContent;

                            break;
                          case "vIPIDevol":
                            modeloTotaisICMS.total_vipidevol =
                              noFilhosIcmsTot[index].textContent;

                            break;
                          case "vPIS":
                            modeloTotaisICMS.total_vpis =
                              noFilhosIcmsTot[index].textContent;

                            break;
                          case "vCOFINS":
                            modeloTotaisICMS.total_vcofins =
                              noFilhosIcmsTot[index].textContent;

                            break;
                          case "vOutro":
                            modeloTotaisICMS.total_voutro =
                              noFilhosIcmsTot[index].textContent;

                            break;
                          case "vNF":
                            modeloTotaisICMS.total_vnf =
                              noFilhosIcmsTot[index].textContent;

                            break;
                          case "vTotTrib":
                            modeloTotaisICMS.total_vtottrib =
                              noFilhosIcmsTot[index].textContent;
                            /* console.log(
                          "vTotTrib: " + noFilhosIcmsTot[index].textContent
                        ); */

                            break;

                          default:
                            break;
                        }
                      });
                      break;
                    default:
                      break;
                  }
                });
                this.modeloNovaNotaXML.total_vlrs_icms = modeloTotaisICMS; // adiciona o valores totais ao array que sera enviado para o sevidor
              }
              modeloTotaisICMS = null; // limpa o medelo total

              const nfeNoPai_transp = xmlDoc.getElementsByTagName("transp"); // transportadora
              for (let i = 0; i < nfeNoPai_transp.length; i++) {
                var modeloTransp = {};
                let noFilhos_transp = nfeNoPai_transp[i].childNodes; // pega os nos filhos de transp [modFret, transporta, vol...]

                for (let i = 0; i < noFilhos_transp.length; i++) {
                  switch (noFilhos_transp[i].tagName) {
                    case "modFrete":
                      modeloTransp.transp_modfret_modfret =
                        noFilhos_transp[i].textContent;

                      break;
                    case "transporta":
                      var nosFilhosTransporta = noFilhos_transp[i].childNodes; // pega os nos filhos de transporta [cnpj, xnome, ie, xender...]

                      for (let i = 0; i < nosFilhosTransporta.length; i++) {
                        switch (nosFilhosTransporta[i].tagName) {
                          case "CPF":
                            modeloTransp.transp_transporta_cpf =
                              nosFilhosTransporta[i].textContent;

                            break;
                          case "CNPJ":
                            modeloTransp.transp_transporta_cnpj =
                              nosFilhosTransporta[i].textContent;

                            break;
                          case "xNome":
                            modeloTransp.transp_transporta_xnome =
                              nosFilhosTransporta[i].textContent;

                            break;
                          case "IE":
                            modeloTransp.transp_transporta_ie =
                              nosFilhosTransporta[i].textContent;

                            break;
                          case "xEnder":
                            modeloTransp.transp_transporta_xender =
                              nosFilhosTransporta[i].textContent;

                            break;
                          case "xMun":
                            modeloTransp.transp_transporta_xmun =
                              nosFilhosTransporta[i].textContent;

                            break;
                          case "UF":
                            modeloTransp.transp_transporta_uf =
                              nosFilhosTransporta[i].textContent;

                            break;

                          default:
                            break;
                        }
                      }

                      break;
                    case "retTransp":
                      var nosFilhosRettTrasnp = noFilhos_transp[i].childNodes; // pega os nos filhos de retttransp [vServ, vBCRet, pICMSSRet...]

                      for (let i = 0; i < nosFilhosRettTrasnp.length; i++) {
                        switch (nosFilhosRettTrasnp[i].tagName) {
                          case "vServ":
                            modeloTransp.transp_rettransp_vserv =
                              nosFilhosRettTrasnp[i].textContent;

                            break;
                          case "vBCRet":
                            modeloTransp.transp_rettransp_vbcret =
                              nosFilhosRettTrasnp[i].textContent;

                            break;
                          case "pICMSRet":
                            modeloTransp.transp_rettransp_picmsret =
                              nosFilhosRettTrasnp[i].textContent;

                            break;
                          case "vICMSRet":
                            modeloTransp.transp_rettransp_vicmsret =
                              nosFilhosRettTrasnp[i].textContent;

                            break;
                          case "CFOP":
                            modeloTransp.transp_rettransp_cfop =
                              nosFilhosRettTrasnp[i].textContent;

                            break;
                          case "cMunFG":
                            modeloTransp.transp_rettransp_cmunfg =
                              nosFilhosRettTrasnp[i].textContent;

                            break;

                          default:
                            break;
                        }
                      }

                      break;
                    case "veicTransp":
                      var nosFilhosVeicTransp = noFilhos_transp[i].childNodes; // pega os nos filhos de veicTrans [placa, uf, rntc...]

                      for (let i = 0; i < nosFilhosVeicTransp.length; i++) {
                        switch (nosFilhosVeicTransp[i].tagName) {
                          case "placa":
                            modeloTransp.transp_veictrans_placa =
                              nosFilhosVeicTransp[i].textContent;

                            break;
                          case "UF":
                            modeloTransp.transp_veictrans_uf =
                              nosFilhosVeicTransp[i].textContent;

                            break;
                          case "RNTC":
                            modeloTransp.transp_veictrans_rntc =
                              nosFilhosVeicTransp[i].textContent;

                            break;

                          default:
                            break;
                        }
                      }
                      break;
                    case "vol":
                      var nosFilhosVol = noFilhos_transp[i].childNodes; // pega os nos filhos de vol [qVol, esp, ie, pesoL...]

                      for (let i = 0; i < nosFilhosVol.length; i++) {
                        switch (nosFilhosVol[i].tagName) {
                          case "qVol":
                            modeloTransp.transp_vol_qvol =
                              nosFilhosVol[i].textContent;

                            break;
                          case "esp":
                            modeloTransp.transp_vol_esp =
                              nosFilhosVol[i].textContent;

                            break;
                          case "marca":
                            modeloTransp.transp_vol_marca =
                              nosFilhosVol[i].textContent;

                            break;
                          case "nVol":
                            modeloTransp.transp_vol_nvol =
                              nosFilhosVol[i].textContent;

                            break;
                          case "pesoL":
                            modeloTransp.transp_vol_pesol =
                              nosFilhosVol[i].textContent;

                            break;
                          case "pesoB":
                            modeloTransp.transp_vol_pesob =
                              nosFilhosVol[i].textContent;

                            break;

                          default:
                            break;
                        }
                      }

                      break;

                    default:
                      break;
                  }
                }
                this.modeloNovaNotaXML.transpo = modeloTransp;
              }
              modeloTransp = null; // limpa o medelo total

              const nfeNoPai_cobr = xmlDoc.getElementsByTagName("cobr"); // cobranças
              for (let i = 0; i < nfeNoPai_cobr.length; i++) {
                var modeloCobr = {}; // modelo cobranças
                modeloCobr.dup = []; // array para guarda as parcelas de cobranças
                let noFilhos_cobr = nfeNoPai_cobr[i].childNodes; // pega o no cobr e pega seus nos filhos [fat, dup...]
                noFilhos_cobr.forEach(function (elem, index) {
                  switch (noFilhos_cobr[index].tagName) {
                    case "fat":
                      var noFilhosFat = noFilhos_cobr[index].childNodes; // pega os nos filhos de fat [nFat, vOrigi, vDesc...]

                      noFilhosFat.forEach(function (elem, index) {
                        switch (noFilhosFat[index].tagName) {
                          case "nFat":
                            modeloCobr.cobr_fat_nfat =
                              noFilhosFat[index].textContent;

                            break;
                          case "vOrig":
                            modeloCobr.cobr_fat_vorig =
                              noFilhosFat[index].textContent;

                            break;
                          case "vDesc":
                            modeloCobr.cobr_fat_vdesc =
                              noFilhosFat[index].textContent;

                            break;
                          case "vLiq":
                            modeloCobr.cobr_fat_vliq =
                              noFilhosFat[index].textContent;

                            break;

                          default:
                            break;
                        }
                      });
                      break;
                    case "dup":
                      var modeloDup = {};
                      var noFilhosDup = noFilhos_cobr[index].childNodes; // pega os nos filhos de dup [ndup, dvenc, vdup...]

                      for (let i = 0; i < noFilhosDup.length; i++) {
                        switch (noFilhosDup[i].tagName) {
                          case "nDup":
                            modeloDup.cobr_dup_ndup =
                              noFilhosDup[i].textContent;

                            break;
                          case "dVenc":
                            modeloDup.cobr_dup_dvenc =
                              noFilhosDup[i].textContent;

                            break;
                          case "vDup":
                            modeloDup.cobr_dup_vdup =
                              noFilhosDup[i].textContent;

                            break;

                          default:
                            break;
                        }
                      }
                      modeloCobr.dup.push(modeloDup); // adiciona a parcela no meu array
                      break;
                    default:
                      break;
                  }
                });
                this.modeloNovaNotaXML.cobr = modeloCobr; // adiciona o array de parcela para ser enviado ao sevidor
              }
              modeloCobr = null; // limpa o medelo cobr

              const nfeNoPai_pag = xmlDoc.getElementsByTagName("pag"); // pag
              for (let i = 0; i < nfeNoPai_pag.length; i++) {
                var modeloPag = {};
                let noFilhos_pag = nfeNoPai_pag[i].childNodes; // pega os nos filhos de pag[detPag...]
                for (let i = 0; i < noFilhos_pag.length; i++) {
                  switch (noFilhos_pag[i].tagName) {
                    case "detPag":
                      var nosFilhosDetPag = noFilhos_pag[i].childNodes; // pega os nos filhos de detPag [indPag, tPag, vPag...]
                      for (let i = 0; i < nosFilhosDetPag.length; i++) {
                        switch (nosFilhosDetPag[i].tagName) {
                          case "indPag":
                            modeloPag.pag_indpag =
                              nosFilhosDetPag[i].textContent;

                            break;
                          case "tPag":
                            modeloPag.pag_tpag = nosFilhosDetPag[i].textContent;

                            break;
                          case "vPag":
                            modeloPag.pag_vpag = nosFilhosDetPag[i].textContent;

                            break;

                          default:
                            break;
                        }
                      }
                      break;

                    default:
                      break;
                  }
                }
                this.modeloNovaNotaXML.pag = modeloPag;
              }
              modeloPag = null; // limpa o medelo pag

              const nfeNoPai_protNFe = xmlDoc.getElementsByTagName("protNFe"); // protocolo nfe
              for (let i = 0; i < nfeNoPai_protNFe.length; i++) {
                var modeloProtNFe = {};
                let noFilhos_ProtNFE = nfeNoPai_protNFe[i].childNodes; // pega os nos filhos de protNFE [infProt...]
                var versaoNFE = nfeNoPai_protNFe[i].attributes.versao.nodeValue; // pega a versão do nfe
                modeloProtNFe.versao_nfe = versaoNFE; // salva a vensao no modeloprot
                for (let i = 0; i < noFilhos_ProtNFE.length; i++) {
                  switch (noFilhos_ProtNFE[i].tagName) {
                    case "infProt":
                      var nosFilhosInfProt = noFilhos_ProtNFE[i].childNodes; // pega os nos filhos de infProt [tpAmb, verAplic, chNFe...]
                      for (let i = 0; i < nosFilhosInfProt.length; i++) {
                        switch (nosFilhosInfProt[i].tagName) {
                          case "tpAmb":
                            modeloProtNFe.protnfe_tpamb =
                              nosFilhosInfProt[i].textContent;

                            break;
                          case "verAplic":
                            modeloProtNFe.protnfe_veraplic =
                              nosFilhosInfProt[i].textContent;

                            break;
                          case "chNFe":
                            modeloProtNFe.protnfe_chnfe =
                              nosFilhosInfProt[i].textContent;

                            break;
                          case "dhRecbto":
                            modeloProtNFe.protnfe_dhrecbto =
                              nosFilhosInfProt[i].textContent;

                            break;
                          case "nProt":
                            modeloProtNFe.protnfe_nprot =
                              nosFilhosInfProt[i].textContent;

                            break;
                          case "digVal":
                            modeloProtNFe.protnfe_digval =
                              nosFilhosInfProt[i].textContent;

                            break;
                          case "cStat":
                            modeloProtNFe.protnfe_cstat =
                              nosFilhosInfProt[i].textContent;

                            break;
                          case "xMotivo":
                            modeloProtNFe.protnfe_xmotivo =
                              nosFilhosInfProt[i].textContent;

                            break;

                          default:
                            break;
                        }
                      }
                      break;

                    default:
                      break;
                  }
                }
                this.modeloNovaNotaXML.protnfe = modeloProtNFe;
              }
              modeloProtNFe = null; // limpa o medelo cobr
              this.modeloNovaNotaXML.notaOriginal = null;
              this.modeloNovaNotaXML.notaOriginal = notaXML; // nota completa
              /*  console.log(this.modeloNovaNotaXML); */
              const url = `${baseApiUrl}/importa_nova_nota_xml`;
              axios["post"](url, this.modeloNovaNotaXML)
                .then(() => {
                  showSuccesImportNota(); // mesagem de successo ao importa
                })
                .catch((e) => {
                  const modeloError = {};
                  modeloError.chave = this.modeloNovaNotaXML.protnfe.protnfe_chnfe;
                  modeloError.error = e.response.data;
                  notasErroAoImportarMod.push(modeloError);
                  return showError(e.response.data);
                });
            };
          } catch (erro) {
            showError("Erro ao tentar ler o XML! <br>Erro: " + erro);
          }
          this.notasErroAoImportar = notasErroAoImportarMod;
        } else {
          this.$toasted.global.erroXmlNaoSelec();
        }
        indexDo++;
      } while (indexDo < file.length);
      file = null; // reseta o file
    },
    formataParaInteiroQtdSaida(ele, key) {
      this.notaXmlComprar.produtos[key].estq_det_prod_qcom_sainda = parseInt(
        ele
      );
      this.$forceUpdate();
    },
    formataComVirgulaQtdSaida(ele, key) {
      this.notaXmlComprar.produtos[key].estq_det_prod_qcom_sainda = parseInt(
        ele
      ).toFixed(2);

      this.$forceUpdate();
    },
    // FUNÇÃO RESPÓNSAVEL POR ENVIAR OS DADOS DA NOTA JÁ LIDOS PARA O BACKEND
    importaNovaNotaXML() {
      const url = `${baseApiUrl}/estoque`;
      axios
        .post(url, this.modeloNovaNotaXML)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    remove() {
      const id = this.notaXml.id;
      const url = `${baseApiUrl}/notaXml/${id}`;
      axios
        .delete(url)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
  },
  mounted() {
    this.loadNotasXml();
  },
};
</script>

<style>
.importaNotaXmlAdmin .formProdutosXml {
  /* background-color: #f2f2f2; */
  border: 1px solid rgba(0, 0, 0, 0.215);
  background-color: #f1f1f1;
  padding: 10px;
}
.importaNotaXmlAdmin {
  font-size: 12px;
}
.inputFileImportaXML {
  background-color: #eaeaea;
  border: #dbdbdb solid 1px;
  border-radius: 3px;
  height: 250px;
  display: grid;
  justify-content: center;
  align-items: center;
}
.btnAcoesXml {
  padding: 0px;
  margin: 0px;
  margin-left: 2px;
  width: 10px;
  height: 23px;
}
.btnAcoesXml > i {
  font-size: 15px;
}
/* paginador  (dados, produtos, transporte...) */
.importaNotaXmlAdmin .nav-link {
  font-size: 14px;
  padding: 3px;
  color: black;
  border: solid 1px darkslategray;
}
.heightTblInfoNota {
  min-height: 300px;
}
.tbodyProdutos .tamanhoWidth {
  width: 110px;
}
.tbodyProdutos .tamanhoDescri {
  width: 550px;
}
.formCadastro-compra {
  font-size: 15px;
}
.fontInputComprar {
  /* fonte dos meu inputs em gerar compra */
  font-size: 12px;
}
.fontInputComprarConvesao {
  /* fonte dos meu inputs conversao em gerar compra */
  font-size: 12px;
  padding: 0;
  margin: 0;
}
.fontInputComprarConvesaoQtdSaida {
  /* fonte dos meu inputs conversao em gerar compra */
  font-size: 13px;
  padding: 0;
  margin: 0;
}
.bordaFormsXmlCompra {
  background-color: #f9f9f9;
  border-top: 1px solid rgba(0, 0, 0, 0.215);
  border-left: 1px solid rgba(0, 0, 0, 0.215);
  border-bottom: 1px solid rgba(0, 0, 0, 0.215);
  font-size: 14px;
  font-weight: 600;
  padding: 2px;
}
.importaNotaXmlAdmin .bordaFormsXmlCompraNmrItem {
  background-color: #d4dae0;
  border: 1px solid rgba(0, 0, 0, 0.215);
}
.bordaFormsXmlCompraRight {
  border-right: 1px solid rgba(0, 0, 0, 0.215);
}
.bordaFormsXmlCompraLabel {
  margin-bottom: 0;
  padding: 3px;
}
.importaNotaXmlAdmin .inputMoneyValoresVenda {
  width: 100%;
  height: 100%;
  padding: 6px;
  border: 1px solid #ced4da;
  border-radius: 0.2rem;
  text-align: right;
}
.importaNotaXmlAdmin .inputMoneyInputAtivo {
  width: 100%;
  height: 100%;
  padding: 5px;
  border: 1px solid #ced4da;
  border-radius: 0.2rem;
  text-align: right;
}
.importaNotaXmlAdmin .textNumeroItemCompra {
  font-size: 25px;
  margin: 0px;
  padding: 0px;
  font-weight: 700;
}
</style>
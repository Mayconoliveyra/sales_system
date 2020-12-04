<template>
  <b-container fluid class="produtos-admin">
    <PageTitle icon="fa fa-cube fa-lg" main="Listar produtos" />
    <b-row sm="12" class="mt-3 ml-2" v-show="mode=='null' || mode=='remove'">
      <b-button class="btn btn-success" size="sm" @click="reset(), navegar('save')">
        <i class="fa fa-plus-circle fa-lg"></i> Novo produto
      </b-button>
    </b-row>

    <b-form v-if="mode!=='null'" class="m-0">
      <input type="hidden" id="produto-id" v-model="produto.id" />

      <b-row>
        <b-col sm="12" class="m-0">
          <b-card no-body class="formCadastro-produtos">
            <b-tabs card pills justified active-nav-item-class="text-white">
              <!-- ####################  DADOS  #################### -->
              <b-tab title="Dados" active>
                <b-row>
                  <b-col sm="6" lg="4">
                    <b-form-group label="Nome do Produto*" label-form="produto-nome_produto">
                      <b-form-input
                        autocomplete="off"
                        id="produto-nome_produto"
                        type="text"
                        placeholder="Informe o nome do produto..."
                        v-model="produto.nome_produto"
                        required
                        :readonly="mode === 'remove'"
                      />
                    </b-form-group>
                  </b-col>
                  <b-col sm="6" lg="4">
                    <b-form-group label="Código Interno*" label-form="produto-codigo_interno">
                      <b-input-group>
                        <b-form-input
                          autocomplete="off"
                          id="produto-codigo_interno"
                          type="search"
                          placeholder="Informe o código interno..."
                          v-model="produto.codigo_interno"
                          required
                          :readonly="mode === 'remove'"
                        />
                        <b-input-group-append>
                          <b-button @click="gerarCodigoInterno()" size="sm">
                            <i class="fa fa-refresh"></i> Gerar
                          </b-button>
                        </b-input-group-append>
                      </b-input-group>
                    </b-form-group>
                  </b-col>
                  <b-col sm="6" lg="4">
                    <b-form-group label="Código de Barra" label-form="produto-codigo_barra">
                      <b-form-input
                        autocomplete="off"
                        id="produto-codigo_barra"
                        type="search"
                        placeholder="Informe o código de barra..."
                        v-model="produto.codigo_barra"
                        required
                        :readonly="mode === 'remove'"
                      />
                    </b-form-group>
                  </b-col>
                  <b-col sm="6" lg="3">
                    <b-form-group
                      v-if="mode === 'save'"
                      label="Grupo do Produto"
                      label-for="input-3-grupo-produto"
                    >
                      <b-form-input
                        autocomplete="off"
                        id="input-3-grupo-produto"
                        type="search"
                        list="my-list-id-grupo-produto"
                        v-model="produto.grupo_produto"
                        :readonly="mode === 'remove'"
                        size="md"
                        required
                      ></b-form-input>
                      <datalist id="my-list-id-grupo-produto">
                        <option>PRODUTOS SEM GRUPO</option>
                        <option
                          v-for="(grupoProd, key) in gruposProdutos"
                          :key="key"
                        >{{ grupoProd.nome}}</option>
                      </datalist>
                    </b-form-group>
                  </b-col>
                  <b-col sm="6" lg="3">
                    <b-form-group
                      v-if="mode === 'save'"
                      label="Movimenta Estoque?"
                      label-for="input-3-mvtEstoque"
                    >
                      <b-form-select
                        id="input-3-mvtEstoque"
                        v-model="produto.movimenta_estq"
                        :options="movimentaEstq"
                        size="sm"
                        required
                      ></b-form-select>
                    </b-form-group>
                    <b-form-group v-else label="Movimenta Estoque?" label-for="input-3-mvtEstoque">
                      <b-form-input
                        id="input-3-mvtEstoque"
                        v-model="produto.movimenta_estq"
                        :readonly="mode === 'remove'"
                        size="sm"
                        required
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col sm="6" lg="3">
                    <b-form-group
                      v-if="mode === 'save'"
                      label="Habilitar Nota Fiscal?"
                      label-for="input-3-hbltNota"
                    >
                      <b-form-select
                        id="input-3-hbltNota"
                        v-model="produto.hblt_nota_fiscal"
                        :options="habilitarNotaFiscal"
                        size="sm"
                        required
                      ></b-form-select>
                    </b-form-group>
                    <b-form-group
                      v-else
                      label="Habilitar Nota Fiscal?"
                      label-for="input-3-hbltNota"
                    >
                      <b-form-input
                        id="input-3-hbltNota"
                        v-model="produto.hblt_nota_fiscal"
                        :readonly="mode === 'remove'"
                        size="sm"
                        required
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col sm="6" lg="3">
                    <b-form-group
                      v-if="mode === 'save'"
                      label="Possui Variações?"
                      label-for="input-3-variacoes"
                    >
                      <b-form-select
                        id="input-3-variacoes"
                        v-model="produto.variacoes"
                        :options="possuiVariacoes"
                        size="sm"
                        required
                      ></b-form-select>
                    </b-form-group>
                    <b-form-group v-else label="Possui Variações?" label-for="input-3-variacoes">
                      <b-form-input
                        id="input-3-variacoes"
                        v-model="produto.variacoes"
                        :readonly="mode === 'remove'"
                        size="sm"
                        required
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row class="mt-5">
                  <b-col sm="12">
                    <b-form-group
                      description="A conversão de unidades permite que você compre em uma quantidade de medida e unidade, e venda em outra unidade de medida e quantidade."
                    >
                      <h5>
                        <i class="fa fa-retweet"></i> Conversão de unidades
                      </h5>
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row class="formConversao bordaForms mt-1 p-2">
                  <b-col sm="6" class="bordaForms">
                    <b-col sm="12" class="mt-2">
                      <span>
                        <h6>Entrada</h6>
                      </span>
                    </b-col>
                    <b-row align-v="center" sm="12" class="bordaForms">
                      <b-col align="center" sm="2">
                        <span>
                          <h4>1</h4>
                        </span>
                      </b-col>
                      <b-col sm="7" class="bordaForms pt-3">
                        <b-form-group v-if="mode === 'save'" label-for="input-3" align="center">
                          <b-form-input
                            autocomplete="off"
                            class="input-conver"
                            id="input-3"
                            type="search"
                            list="my-list-id-tipoEntConver"
                            v-model="produto.unid_cvs_entrada"
                            :readonly="mode === 'remove'"
                            size="md"
                            required
                          ></b-form-input>
                          <datalist id="my-list-id-tipoEntConver">
                            <option
                              v-for="(unidadeMed, key) in unidadesMedidas"
                              :key="key"
                            >{{ unidadeMed.nome }}</option>
                          </datalist>
                        </b-form-group>
                      </b-col>
                      <b-col align="end" sm="3" class="bordaForms pt-2">
                        <span>
                          <h6>equivale a</h6>
                        </span>
                      </b-col>
                    </b-row>
                  </b-col>
                  <b-col sm="6" class="bordaForms">
                    <b-col sm="12" class="mt-2">
                      <span>
                        <h6>Saída</h6>
                      </span>
                    </b-col>
                    <b-row sm="12" class="bordaForms">
                      <b-col sm="5" class="bordaForms pt-3">
                        <b-form-group label-for="input-3-qtdSaida">
                          <money
                            class="text-right"
                            id="input-3-qtdSaida"
                            autocomplete="off"
                            v-model="produto.qtd_saida_cvs"
                            :readonly="mode === 'remove'"
                            v-bind="maskValorComVigulaDecimal"
                            required
                          ></money>
                        </b-form-group>
                      </b-col>
                      <b-col sm="7" class="bordaForms pt-3">
                        <b-form-group
                          v-if="mode === 'save'"
                          label-for="input-3-unidSaida"
                          align="center"
                        >
                          <b-form-input
                            autocomplete="off"
                            class="input-conver"
                            id="input-3-unidSaida"
                            type="search"
                            list="my-list-id-saida-unidade"
                            v-model="produto.unid_cvs_saida"
                            :readonly="mode === 'remove'"
                            size="md"
                            required
                          ></b-form-input>
                          <datalist id="my-list-id-saida-unidade">
                            <option
                              v-for="(undMedSaida, key) in unidadesMedidas"
                              :key="key"
                            >{{ undMedSaida.nome }}</option>
                          </datalist>
                        </b-form-group>
                      </b-col>
                    </b-row>
                  </b-col>
                  <b-col sm="6"></b-col>
                  <b-col sm="6">
                    <b-form-group description="Obs: Valores depois da vírgula(,) serão ignorados"></b-form-group>
                  </b-col>
                </b-row>
              </b-tab>
              <!-- #######################  DETALHES  #################### -->
              <b-tab title="Detalhes">
                <b-row class="mt-2">
                  <b-col sm="4">
                    <b-col sm="11">
                      <h6>
                        <i class="fa fa-arrows-alt"></i> Pesos e dimensões
                      </h6>
                    </b-col>

                    <b-col sm="11" class="mt-3">
                      <b-form-group label="Peso(kg)" label-for="input-peso">
                        <money
                          class="inputMascara"
                          type="search"
                          id="input-peso"
                          autocomplete="off"
                          v-model="detalhes.peso"
                          v-bind="maskPesosDimensoes"
                          :readonly="mode === 'remove'"
                          required
                        ></money>
                      </b-form-group>
                    </b-col>
                    <b-col sm="11">
                      <b-form-group label="Largura(m)" label-for="input-largura">
                        <money
                          class="inputMascara"
                          type="search"
                          id="input-largura"
                          autocomplete="off"
                          v-model="detalhes.largura"
                          v-bind="maskPesosDimensoes"
                          :readonly="mode === 'remove'"
                          required
                        ></money>
                      </b-form-group>
                    </b-col>
                    <b-col sm="11">
                      <b-form-group label="Altura(m)" label-for="input-altura">
                        <money
                          class="inputMascara"
                          type="search"
                          id="input-altura"
                          autocomplete="off"
                          v-model="detalhes.altura"
                          v-bind="maskPesosDimensoes"
                          :readonly="mode === 'remove'"
                          required
                        ></money>
                      </b-form-group>
                    </b-col>
                    <b-col sm="11">
                      <b-form-group label="Comprimento(m)" label-for="input-comprimento">
                        <money
                          class="inputMascara"
                          type="search"
                          id="input-comprimento"
                          autocomplete="off"
                          v-model="detalhes.comprimento"
                          v-bind="maskPesosDimensoes"
                          :readonly="mode === 'remove'"
                          required
                        ></money>
                      </b-form-group>
                    </b-col>
                    <b-col sm="11" class="mt-4">
                      <h6>
                        <i class="fa fa-clipboard"></i> Detalhes
                      </h6>
                    </b-col>
                    <b-col sm="12">
                      <b-form-checkbox
                        id="checkbox-1"
                        v-model="produto.produto_ativo"
                        name="checkbox-1"
                        value="Ativo"
                        unchecked-value="Inativo"
                      >Produto ativo</b-form-checkbox>
                    </b-col>
                    <b-col sm="12">
                      <b-form-checkbox
                        id="checkbox-2"
                        v-model="produto.vendido_separadamente"
                        name="checkbox-2"
                        value="Sim"
                        unchecked-value="Não"
                      >Vendido separadamente</b-form-checkbox>
                    </b-col>
                    <b-col sm="12">
                      <b-form-checkbox
                        id="checkbox-3"
                        v-model="produto.comercializavel_pdv"
                        name="checkbox-3"
                        value="Sim"
                        unchecked-value="Não"
                      >Comercializável no PDV</b-form-checkbox>
                    </b-col>
                  </b-col>

                  <!--##### CAMPOS EXTRAS ##### -->
                  <b-col sm="8">
                    <b-row>
                      <b-col sm="12">
                        <h6>
                          <i class="fa fa-files-o"></i> Campos extras
                        </h6>
                        <b-form-group
                          description="Você pode definir alguns campos extras para este produto, como por exemplo uma marca, modelo e etc... Ex. Marca => Adidas."
                        ></b-form-group>
                      </b-col>
                    </b-row>

                    <b-row class="bordaForms ml-1 mr-1">
                      <b-col class="bordaFormsLeft p-2" sm="4">Descrição</b-col>
                      <b-col class="bordaFormsLeft p-2" sm="6">Conteúdo</b-col>
                      <b-col align="center" class="bordaFormsLeft p-2" sm="2">Delete</b-col>
                    </b-row>

                    <b-row
                      class="bordaForms p-1 ml-1 mr-1"
                      v-for="(input,k) in inputs_campos_extras"
                      :key="k"
                    >
                      <b-col class="p-0 m-0" sm="4">
                        <b-form-input
                          id="input-3_campoext_nome"
                          type="search"
                          placeholder="Digite para buscar"
                          autocomplete="off"
                          list="my-list-id-campos_extras"
                          v-model="input.nome"
                          :readonly="mode === 'remove'"
                          size="lg"
                          required
                        ></b-form-input>
                        <datalist id="my-list-id-campos_extras">
                          <option
                            v-for="(camposExNome, key) in nomesCamposExtras"
                            :key="key"
                          >{{ camposExNome.nome }}</option>
                        </datalist>
                      </b-col>
                      <b-col class="p-0 m-0" sm="6">
                        <b-form-input
                          id="conteudo_extra"
                          type="text"
                          placeholder="Informe o conteúdo..."
                          autocomplete="off"
                          v-model="input.conteudo"
                          required
                          :readonly="mode === 'remove'"
                          size="lg"
                        />
                      </b-col>
                      <b-col sm="2">
                        <b-row align-h="center" class="bordaForms p-1">
                          <i class="fa fa-times fa-2x" @click="removeCampoExtra(k)"></i>
                        </b-row>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col sm="12" class="mt-2 ml-4">
                        <b-row>
                          <b-button
                            size="sm"
                            variant="secondary"
                            v-if="mode === 'save'"
                            @click="addCampoExtra()"
                          >
                            <i class="fa fa-plus-circle"></i> Adicionar campo extra
                          </b-button>
                        </b-row>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col sm="12" class="mt-4">
                        <h6>
                          <i class="fa fa-pencil-square-o"></i> Descrição do produto
                        </h6>
                        <b-form-group>
                          <b-form-textarea
                            type="text"
                            id="produto_descricao"
                            class="form-control mt-1"
                            name="produto_descricao"
                            v-model="detalhes.descricao_produto"
                            autocomplete="off"
                            cols="30"
                            rows="4"
                            :readonly="mode === 'remove'"
                          ></b-form-textarea>
                        </b-form-group>
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>
              </b-tab>
              <!-- ##########################  VALORES  #################### -->
              <b-tab title="Valores">
                <b-row>
                  <b-col sm="3" @keyup="calculaCustoFinalProd()">
                    <b-col sm="11">
                      <h6>
                        <i class="fa fa-money"></i> Valores e despesas
                      </h6>
                    </b-col>

                    <b-col sm="11" class="mt-3">
                      <b-form-group label="Valor de custo*" label-for="input-valor_custo">
                        <money
                          class="inputMascaraValoresDes inputValoresDespesas"
                          v-bind="maskValorDinheroRS"
                          id="input-valor_custo"
                          autocomplete="off"
                          v-model="valoresDeCustoDespesas.valor_custo"
                          :readonly="mode === 'remove'"
                          required
                        ></money>
                      </b-form-group>
                    </b-col>
                    <b-col sm="11">
                      <b-form-group
                        label="Despesas acessórias"
                        label-for="input-despesas_acessorias"
                      >
                        <money
                          class="inputMascaraValoresDes inputValoresDespesas"
                          v-bind="maskValorDinheroRS"
                          id="input-despesas_acessorias"
                          autocomplete="off"
                          v-model="valoresDeCustoDespesas.despesa_acessoria"
                          :readonly="mode === 'remove'"
                          required
                        ></money>
                      </b-form-group>
                    </b-col>
                    <b-col sm="11">
                      <b-form-group label="Outras despesas" label-for="input-outras_despesas">
                        <money
                          class="inputMascaraValoresDes inputValoresDespesas"
                          v-bind="maskValorDinheroRS"
                          id="input-outras_despesas"
                          autocomplete="off"
                          v-model="valoresDeCustoDespesas.outras_despesas"
                          :readonly="mode === 'remove'"
                          required
                        ></money>
                      </b-form-group>
                    </b-col>
                    <b-col sm="11">
                      <b-form-group label="Custo final*" label-for="input-custo_final">
                        <money
                          class="inputMascaraValoresDes"
                          v-bind="maskValorDinheroRS"
                          id="input-custo_final"
                          autocomplete="off"
                          v-model="valoresDeCustoDespesas.custo_final"
                          disabled
                        ></money>
                      </b-form-group>
                    </b-col>
                  </b-col>
                  <b-col sm="9">
                    <b-col sm="12">
                      <b-form-group
                        description="O Valor de Venda é a valoração monetária dos produtos comercializados pelo estabelecimento. Ele pode ser calculado, ou então indicado livremente."
                      ></b-form-group>
                    </b-col>
                    <b-col sm="12" class="mb-2">
                      <b-button
                        size="sm"
                        variant="btn btn-success"
                        @click="calculaValorVendaProd()"
                      >
                        <i class="fa fa-calculator"></i> Calcular valor de venda
                      </b-button>
                    </b-col>
                    <b-row class="bordaForms ml-3">
                      <b-col class="bordaFormsLeft p-2" sm="2">Tipo</b-col>
                      <b-col class="bordaFormsLeft p-2" sm="2">Lucro sugerido</b-col>
                      <b-col class="bordaFormsLeft p-2" sm="2">Lucro utilizado</b-col>
                      <b-col class="bordaFormsLeft p-2" sm="3">Valor de venda sugerido</b-col>
                      <b-col class="bordaFormsLeft p-2" sm="3">Valor de venda utilizado</b-col>
                    </b-row>

                    <b-row
                      class="bordaForms ml-3 p-1"
                      v-for="(input, k) in valoresDeVenda"
                      :key="k"
                    >
                      <b-col class="m-0 p-0" sm="2">
                        <b-form-input
                          type="text"
                          autocomplete="off"
                          v-model="input.nome"
                          :readonly="mode === 'remove'"
                          disabled
                          required
                        ></b-form-input>
                      </b-col>
                      <b-col sm="2" class="m-0 p-0">
                        <money
                          class="text-right inputMascara inputDisabledColor"
                          type="text"
                          autocomplete="off"
                          v-model="input.lucro"
                          :readonly="mode === 'remove'"
                          v-bind="maskCalculadora"
                          disabled
                          required
                        ></money>
                      </b-col>
                      <b-col @keyup="calculaCustoFinalProdKey(k)" class="m-0 p-0">
                        <money
                          id="input_lucro_utilizado"
                          class="text-right inputMascara"
                          type="text"
                          autocomplete="off"
                          v-model="input.lucro_utilizado"
                          :readonly="mode === 'remove'"
                          v-bind="maskCalculadora"
                          required
                        ></money>
                      </b-col>
                      <b-col sm="3" class="m-0 p-0">
                        <money
                          class="text-right inputMascara inputDisabledColor"
                          type="text"
                          autocomplete="off"
                          v-model="input.valor_sugerido"
                          :readonly="mode === 'remove'"
                          v-bind="maskValorDinheroRS"
                          disabled
                          required
                        ></money>
                      </b-col>
                      <b-col sm="3" class="p-0 m-0">
                        <money
                          id="input_valor_venda_utilizaso"
                          class="text-right inputMascara inputDisabledColor"
                          type="text"
                          autocomplete="off"
                          v-model="input.valor_venda_utilizado"
                          :readonly="mode === 'remove'"
                          v-bind="maskValorDinheroRS"
                          required
                          disabled
                        ></money>
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>
              </b-tab>
              <!-- #############################  ESTOQUE/ VARIAÇÕES  #################### -->
              <b-tab title="Estoque/ variações">
                <b-row>
                  <b-col sm="4" class="mt-3">
                    <b-form-group label="Estoque mínimo" label-for="input-estoqueMinimo">
                      <money
                        class="inputMascaraValoresDes inputValoresDespesas"
                        v-bind="maskValorComVigulaDecimal"
                        id="input-estoqueMinimo"
                        autocomplete="off"
                        v-model="estoqueQtds.estoque_minimo"
                        :readonly="mode === 'remove'"
                        required
                      ></money>
                    </b-form-group>
                  </b-col>
                  <b-col sm="4" class="mt-3">
                    <b-form-group label="Estoque máximo" label-for="input-estqMaximo">
                      <money
                        class="inputMascaraValoresDes inputValoresDespesas"
                        v-bind="maskValorComVigulaDecimal"
                        id="input-estqMaximo"
                        autocomplete="off"
                        v-model="estoqueQtds.estoque_maximo"
                        :readonly="mode === 'remove'"
                        required
                      ></money>
                    </b-form-group>
                  </b-col>
                  <b-col sm="4" class="mt-3">
                    <b-form-group label="Quantidade atual" label-for="input-estqQtdAtual">
                      <money
                        class="inputMascaraValoresDes inputValoresDespesas"
                        v-bind="maskValorComVigulaDecimal"
                        id="input-estqQtdAtual"
                        autocomplete="off"
                        v-model="estoqueQtds.estoque_qtd_atual"
                        :readonly="mode === 'remove'"
                        required
                      ></money>
                    </b-form-group>
                  </b-col>
                </b-row>
              </b-tab>
              <!-- ################################  FORNECEDORES  #################### -->
              <b-tab title="Fornecedores">
                <b-row align-h="center">
                  <b-col sm="12">
                    <b-row>
                      <b-col sm="12">
                        <b-form-group
                          description="Sugerimos que vincule um ou mais fornecedores a este produto, pois durante o cadastramento de compras e cotações é exigido que você vincule o fornecedor ao cadastro. Caso exista produtos vinculados a este fornecedor, o sistema irá importar automaticamente estes produtos facilitando o processo."
                        ></b-form-group>
                      </b-col>
                    </b-row>

                    <b-row class="bordaForms ml-1 mr-1">
                      <b-col class="bordaFormsLeft p-2" sm="10">Fornecedor</b-col>
                      <b-col align="center" class="bordaFormsLeft p-2" sm="2">Delete</b-col>
                    </b-row>

                    <b-row
                      class="bordaForms p-1 ml-1 mr-1"
                      v-for="(input,k) in inputs_fornecedores"
                      :key="k"
                    >
                      <b-col class="p-0 m-0" sm="10">
                        <b-form-input
                          id="input-3_fornecedor_nome"
                          type="search"
                          placeholder="Digite para buscar"
                          autocomplete="off"
                          list="my-list-id-fornecedores"
                          v-model="input.nome_fantasia"
                          :readonly="mode === 'remove'"
                          size="lg"
                          required
                        ></b-form-input>
                        <datalist id="my-list-id-fornecedores">
                          <option
                            v-for="(fornecedoresOption, key) in fornecedores"
                            :key="key"
                          >{{ fornecedoresOption.nome_fantasia }}</option>
                        </datalist>
                      </b-col>
                      <b-col sm="2">
                        <b-row align-h="center" class="bordaForms p-1">
                          <i class="fa fa-times fa-2x" @click="removeFornecedor(k)"></i>
                        </b-row>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col sm="12" class="mt-2 ml-4">
                        <b-row>
                          <b-button
                            size="sm"
                            variant="secondary"
                            v-if="mode === 'save'"
                            @click="addFornecedor()"
                          >
                            <i class="fa fa-plus-circle"></i> Adicionar fornecedor
                          </b-button>
                        </b-row>
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>
              </b-tab>
            </b-tabs>
          </b-card>
        </b-col>
      </b-row>
      <!-- btn da tabela, salvar, excluir cancelar -->
      <b-row class="row-btn">
        <b-col xs="12">
          <b-button variant="btn btn-success" v-if="mode === 'save'" @click="save">
            <i class="fa fa-check fa-sm"></i> Cadastrar
          </b-button>
          <b-button variant="btn btn-danger" v-else @click="navegar('remove'), remove()">
            <i class="fa fa-trash-o fa-sm"></i> Excluir
          </b-button>
          <b-button variant="btn btn-warning" class="ml-3" @click="reset">
            <i class="fa fa-times fa-sm"></i> Cancelar
          </b-button>
        </b-col>
      </b-row>
      <hr />
    </b-form>
    <!-- input barra de pesquisa -->
    <b-container fluid class="mt-3">
      <b-row cols="12" align-h="center">
        <b-col cols="12" md="8">
          <b-form label-for="filterInputprodutos" class="input-group-prepend h6">
            <b-input-group prepend="Pesquisar" size="md">
              <b-form-input
                id="filterInputprodutos"
                type="search"
                label-align-sm="left"
                v-model="filter"
              ></b-form-input>
              <b-input-group-append>
                <b-button :disabled="!filter" @click="filter = ''">X</b-button>
              </b-input-group-append>
            </b-input-group>
          </b-form>
        </b-col>
      </b-row>
      <b-row cols="12">
        <b-col md="12" align="center">
          <b-form-group class="h6" description="Deixe tudo desmarcado para filtrar todos os dados">
            <b-form-checkbox-group v-model="filterOn">
              <b-form-checkbox value="nome_produto">Nome</b-form-checkbox>
              <b-form-checkbox value="codigo_barra">Código(EAN)</b-form-checkbox>
              <b-form-checkbox value="codigo_interno">Código interno</b-form-checkbox>
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
    <!-- elementos da tabela  -->
    <b-table
      bordered
      show-empty
      small
      stacked="md"
      :items="produtos"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      :filterIncludedFields="filterOn"
      @filtered="onFiltered"
    >
      <template v-slot:cell(actions)="row">
        <b-button size="sm" @click="row.toggleDetails" class="btnDetalhes bg-info">
          <i class="fa fa-info fa-lg"></i>
        </b-button>
        <a href="#idNavegar">
          <b-button class="bg-warning" size="sm" @click="loadProduto(row.item, 'save')">
            <i class="fa fa-pencil fa-lg"></i>
          </b-button>
        </a>
        <a href="#idNavegar">
          <b-button class="bg-danger" size="sm" @click="loadProduto(row.item, 'remove')">
            <i class="fa fa-trash-o fa-lg"></i>
          </b-button>
        </a>
      </template>

      <template v-slot:row-details="row">
        <b-row>
          <b-col sm="12" class="m-0">
            <b-card no-body>
              <b-tabs pills card justified>
                <!-- ####################  Dados gerais  #################### -->
                <b-tab title="Dados gerais" active class="p-1">
                  <b-container fluid class="table-responsive mb-4 p-0">
                    <table class="table table-striped table-dark">
                      <thead>
                        <tr>
                          <th scope="col">Código</th>
                          <th scope="col">Código de barra</th>
                          <th scope="col">Grupo</th>
                          <th scope="col">Nome do produto</th>
                          <th scope="col">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{{row.item.codigo_interno}}</td>
                          <td>{{row.item.codigo_barra}}</td>
                          <td>{{row.item.grupo_produto}}</td>
                          <td>{{row.item.nome_produto}}</td>
                          <td>{{row.item.produto_ativo}}</td>
                        </tr>
                      </tbody>
                    </table>
                  </b-container>
                </b-tab>
                <!-- #######################  Detalhes  #################### -->
                <b-tab title="Detalhes" class="p-1 pt-2">
                  <b-container fluid class="table-responsive mb-4 p-0">
                    <b-col sm="12">
                      <h6>
                        <i class="fa fa-arrows-alt"></i> Pesos e dimensões
                      </h6>
                    </b-col>
                    <table class="table table-striped table-dark">
                      <thead>
                        <tr>
                          <th scope="col">Peso (kg)</th>
                          <th scope="col">Largura (m)</th>
                          <th scope="col">Altura (m)</th>
                          <th scope="col">Comprimento (m)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{{row.item.detalhes.peso}}</td>
                          <td>{{row.item.detalhes.largura}}</td>
                          <td>{{row.item.detalhes.altura}}</td>
                          <td>{{row.item.detalhes.comprimento}}</td>
                        </tr>
                      </tbody>
                    </table>

                    <b-col sm="12" class="mt-3">
                      <h6>
                        <i class="fa fa-clipboard"></i> Detalhes
                      </h6>
                    </b-col>
                    <table class="table table-striped table-dark">
                      <thead>
                        <tr>
                          <th scope="col">Vendido separadamente</th>
                          <th scope="col">Comercializável no PDV</th>
                          <th scope="col">Modificado em</th>
                          <th scope="col">Cadastrado em</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{{row.item.vendido_separadamente}}</td>
                          <td>{{row.item.comercializavel_pdv}}</td>
                          <td>{{row.item.modificado_em}}</td>
                          <td>{{row.item.cadastrado_em}}</td>
                        </tr>
                      </tbody>
                    </table>

                    <b-col sm="12" class="mt-3">
                      <h6>
                        <i class="fa fa-files-o"></i> Campos extras
                      </h6>
                    </b-col>
                    <b-col class="p-0">
                      <table class="table table-striped table-dark mb-1">
                        <thead>
                          <tr>
                            <th class="w-25" scope="col">Nome</th>
                            <th scope="col">Conteúdo</th>
                          </tr>
                        </thead>
                      </table>
                    </b-col>
                    <b-col v-for="(input, k) in row.item.campos_extras" :key="k" class="p-0">
                      <table class="table table-striped table-dark mb-1">
                        <tbody>
                          <tr>
                            <td class="w-25">{{row.item.campos_extras[k].nome}}</td>
                            <td>{{row.item.campos_extras[k].conteudo}}</td>
                          </tr>
                        </tbody>
                      </table>
                    </b-col>

                    <b-col sm="12" class="mt-3">
                      <h6>
                        <i class="fa fa-pencil-square-o"></i> Descrição do produto
                      </h6>
                    </b-col>
                    <table class="table table-striped table-dark">
                      <thead>
                        <tr>
                          <th scope="col">Complemento</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{{row.item.detalhes.descricao_produto}}</td>
                        </tr>
                      </tbody>
                    </table>
                  </b-container>
                </b-tab>
                <!-- ##########################  Custos e valores  #################### -->
                <b-tab title="Custos e valores" class="p-1">
                  <b-container fluid class="table-responsive mb-4 p-0">
                    <b-col sm="12" class="mt-1">
                      <h6>
                        <i class="fa fa-calculator"></i> Custos e despesas
                      </h6>
                    </b-col>
                    <table class="table table-striped table-dark">
                      <thead>
                        <tr>
                          <th scope="col">Custo médio (R$)</th>
                          <th scope="col">Despesas acessórias (R$)</th>
                          <th scope="col">Outras despesas (R$)</th>
                          <th scope="col">Valor de custo (R$)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{{row.item.valores_custo_despesas.valor_custo}}</td>
                          <td>{{row.item.valores_custo_despesas.despesa_acessoria}}</td>
                          <td>{{row.item.valores_custo_despesas.outras_despesas}}</td>
                          <td>{{row.item.valores_custo_despesas.custo_final}}</td>
                        </tr>
                      </tbody>
                    </table>
                    <b-col sm="12" class="mt-3">
                      <h6>
                        <i class="fa fa-money"></i> Valores de venda
                      </h6>
                    </b-col>
                    <b-col>
                      <table class="table table-striped table-dark mb-1">
                        <thead>
                          <tr>
                            <th class="w-25" scope="col">Tipo</th>
                            <th class="w-25" scope="col">Lucro utilizado (%)</th>
                            <th class="w-25" scope="col">Valor de venda (R$)</th>
                          </tr>
                        </thead>
                      </table>
                    </b-col>
                    <b-col v-for="(input, k) in row.item.valores_venda" :key="k">
                      <table class="table table-striped table-dark mb-1">
                        <tbody>
                          <tr>
                            <td class="w-25">{{row.item.valores_venda[k].nome}}</td>
                            <td class="w-25">{{row.item.valores_venda[k].lucro_utilizado}}</td>
                            <td class="w-25">{{row.item.valores_venda[k].valor_venda_utilizado}}</td>
                          </tr>
                        </tbody>
                      </table>
                    </b-col>
                  </b-container>
                </b-tab>
                <!-- #############################  Nota fiscal  #################### -->
                <!--  <b-tab title="Nota fiscal" class="p-1" disabled></b-tab> -->
                <!-- #############################  Estoque  #################### -->
                <b-tab title="Estoque" class="p-1">
                  <b-container fluid class="table-responsive mb-4 p-0">
                    <table class="table table-striped table-dark">
                      <thead>
                        <tr>
                          <th scope="col">Estoque mínimo</th>
                          <th scope="col">Estoque máximo</th>
                          <th scope="col">Quantidade atual</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{{row.item.estoque_minimo}}</td>
                          <td>{{row.item.estoque_maximo}}</td>
                          <td>{{row.item.estoque_qtd_atual}}</td>
                        </tr>
                      </tbody>
                    </table>
                    <b-col sm="12" class="mt-3">
                      <h6>
                        <i class="fa fa-angle-double-right fa-lg"></i> Conversão de unidade
                      </h6>
                    </b-col>
                    <table class="table table-striped table-dark mb-1">
                      <thead>
                        <tr>
                          <th scope="col">Tipo unidade entrada</th>
                          <th scope="col">Quantidade saida</th>
                          <th scope="col">Tipo unidade saida</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td class="w-25">{{row.item.unid_cvs_entrada}}</td>
                          <td class="w-25">{{row.item.qtd_saida_cvs}}</td>
                          <td class="w-25">{{row.item.unid_cvs_saida}}</td>
                        </tr>
                      </tbody>
                    </table>
                  </b-container>
                </b-tab>
                <!-- #############################  Fornecedores  #################### -->
                <b-tab title="Fornecedores" class="p-1">
                  <b-container fluid class="table-responsive mb-4 p-0">
                    <b-col class="p-0">
                      <table class="table table-striped table-dark mb-1">
                        <thead>
                          <tr>
                            <th scope="col">Fornecedor</th>
                          </tr>
                        </thead>
                      </table>
                    </b-col>
                    <b-col v-for="(input, k) in row.item.fornecedores" :key="k" class="p-0">
                      <table class="table table-striped table-dark mb-1">
                        <tbody>
                          <tr>
                            <td>{{row.item.fornecedores[k].nome_fantasia}}</td>
                          </tr>
                        </tbody>
                      </table>
                    </b-col>
                  </b-container>
                  <!--     <b-card>
                    <ul>
                      <li v-for="(value, key) in row.item" :key="key">{{key}}: {{ value }}</li>
                    </ul>
                  </b-card>-->
                </b-tab>
              </b-tabs>
            </b-card>
          </b-col>
        </b-row>
      </template>
    </b-table>
  </b-container>
</template>

<script>
import PageTitle from "@/components/template/PageTitle";
import { baseApiUrl, showError } from "../../../../global";
import axios from "axios";

export default {
  components: { PageTitle },
  name: "Produtos",
  data() {
    return {
      /* nome do campo extra/ conteudo */
      inputs_campos_extras: [],
      /* nome_fantasia do fornecedor */
      inputs_fornecedores: [],
      /* guarda as informaçoes vinda do backend */
      produtos: [],
      codigoSorteados: [],
      fornecedores: [],
      gruposProdutos: [],
      unidadesMedidas: [],
      nomesCamposExtras: [],
      maskValorComVigulaDecimal: {
        decimal: ",",
        thousands: ".",
        precision: 2,
        masked: false,
      },
      maskPesosDimensoes: {
        decimal: ",",
        thousands: ".",
        precision: 3,
        masked: false,
      },
      maskValorDinheroRS: {
        decimal: ",",
        thousands: ".",
        precision: 2,
        prefix: "R$  ",
        masked: false,
      },
      maskCalculadora: {
        decimal: ",",
        thousands: ".",
        precision: 2,
        suffix: " %",
        masked: false,
      },
      mode: "null",
      produto: {},
      /* peso/ largura / altura / comprimento/ descrição_produto */
      detalhes: {},
      /* tipo/ lucro segerido/ lucro ultilizado/ vlr venda sugerido / vlr venda ultilizado */
      valoresDeVenda: {},
      /* valor de custo/ desperas acessorias/ outras despesas/ custo final */
      valoresDeCustoDespesas: {},
      /* quantidade_minima/ quantidade_maxima/ quantidade atual */
      estoqueQtds: {},
      movimentaEstq: [
        { text: "Sim", value: "Sim" },
        { text: "Não", value: "Não" },
      ],
      habilitarNotaFiscal: [
        { text: "Sim", value: "Sim" },
        { text: "Não", value: "Não" },
      ],
      possuiVariacoes: [
        { text: "Sim", value: "Sim" },
        { text: "Não", value: "Não" },
      ],
      fields: [
        {
          key: "codigo_interno",
          label: "Código",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "nome_produto",
          label: "Nome",
          sortable: true,
        },
        {
          key: "estoque_atual",
          label: "Estoque",
        },
        {
          key: "valores_venda",
          formatter: (valor) => {
            return valor[0].valor_de_venda.toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            });
          },
          label: "Vr. varejo",
        },
        {
          key: "produto_ativo",
          label: "Status",
        },
        { key: "actions", label: "Ações", class: "text-center" },
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
    navegar(mode = "null") {
      this.mode = mode;
    },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    loadProdutos() {
      const urlProdutos = `${baseApiUrl}/produto`;
      const urlGrupos_produtos = `${baseApiUrl}/produto/grupos_produtos`;
      const urlUnidades_medidas = `${baseApiUrl}/produto/unidades_medidas`;
      const UrlNomesCamposExtras = `${baseApiUrl}/produto/campos_extras`;
      const UrlNomesFornecedores = `${baseApiUrl}/fornecedor`;

      axios
        .get(urlProdutos)
        .then((res) => {
          /* console.log(res.data); */
          this.produtos = res.data;
          this.totalRows = res.data.length;
        })
        .catch(showError);

      axios
        .get(urlGrupos_produtos)
        .then((res) => {
          this.gruposProdutos = res.data;
        })
        .catch(showError);

      axios
        .get(urlUnidades_medidas)
        .then((res) => {
          this.unidadesMedidas = res.data;
        })
        .catch(showError);

      axios
        .get(UrlNomesCamposExtras)
        .then((res) => {
          this.nomesCamposExtras = res.data;
        })
        .catch(showError);

      axios
        .get(UrlNomesFornecedores)
        .then((res) => {
          this.fornecedores = res.data;
        })
        .catch(showError);

      this.produto = {
        movimenta_estq: "Sim",
        hblt_nota_fiscal: "Sim",
        variacoes: "Não",
        unid_cvs_entrada: "Unidade",
        grupo_produto: "PRODUTOS SEM GRUPO",
        unid_cvs_saida: "Unidade",
        qtd_saida_cvs: 1,
        produto_ativo: "Ativo",
        vendido_separadamente: "Sim",
        comercializavel_pdv: "Sim",
      };
    },
    reset() {
      this.inputs_campos_extras = [];
      this.inputs_fornecedores = [];
      this.nomesCamposExtras = [];
      this.fornecedores = [];
      this.produto = {};
      this.detalhes = {};
      this.estoqueQtds = {};
      this.valoresDeVenda = {};
      this.valoresDeCustoDespesas = {};
      this.navegar();
      this.loadProdutos();
    },
    loadProduto(produto, mode = "null") {
      this.mode = mode;
      this.produto = { ...produto };
      this.detalhes = { ...produto.detalhes };
      this.inputs_campos_extras = [...produto.campos_extras];
      this.valoresDeCustoDespesas = { ...produto.valores_custo_despesas };
      this.valoresDeVenda = { ...produto.valores_venda };
      this.estoqueQtds = { ...produto.estoque_quantidades };
      this.inputs_fornecedores = [...produto.fornecedores];
    },
    save() {
      const produtoModelo = {
        id: this.produto.id,
        nome_produto: this.produto.nome_produto,
        codigo_interno: this.produto.codigo_interno,
        codigo_barra: this.produto.codigo_barra,
        grupo_produto: this.produto.grupo_produto,
        movimenta_estq: this.produto.movimenta_estq,
        hblt_nota_fiscal: this.produto.hblt_nota_fiscal,
        variacoes: this.produto.variacoes,
        unid_cvs_entrada: this.produto.unid_cvs_entrada,
        unid_cvs_saida: this.produto.unid_cvs_saida,
        qtd_saida_cvs: Math.trunc(this.produto.qtd_saida_cvs),
        /*  tbl produtos ok */

        produto_ativo: this.produto.produto_ativo,
        vendido_separadamente: this.produto.vendido_separadamente,
        comercializavel_pdv: this.produto.comercializavel_pdv,
        campos_extras: JSON.stringify(this.inputs_campos_extras),
        detalhes: JSON.stringify(this.detalhes),
        /*  tbl detalhes ok */

        valores_venda: JSON.stringify(this.valoresDeVenda),
        valores_custo_despesas: JSON.stringify(this.valoresDeCustoDespesas),
        /*  tbl valores ok */

        estoque_quantidades: JSON.stringify(this.estoqueQtds),
        /*  tbl estoque/variaçoes ok */

        fornecedores: JSON.stringify(this.inputs_fornecedores),
        /*  tbl fornecedores ok */
      };

      /*  console.log(produtoModelo); */

      const method = this.produto.id ? "put" : "post";
      const id = this.produto.id ? `${this.produto.id}` : "";
      const url = `${baseApiUrl}/produto/${id}`;
      axios[method](url, produtoModelo)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    remove() {
      const id = this.produto.id;
      const url = `${baseApiUrl}/produto/${id}`;
      axios
        .delete(url)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    addCampoExtra() {
      this.inputs_campos_extras.push({
        nome: "",
        conteudo: "",
      });
    },
    addFornecedor() {
      this.inputs_fornecedores.push({
        nome_fantasia: "",
      });
    },
    removeCampoExtra(index) {
      this.inputs_campos_extras.splice(index, 1);
    },
    removeFornecedor(index) {
      this.inputs_fornecedores.splice(index, 1);
    },
    calculaCustoFinalProd() {
      this.valoresDeCustoDespesas.custo_final =
        this.valoresDeCustoDespesas.valor_custo +
        this.valoresDeCustoDespesas.despesa_acessoria +
        this.valoresDeCustoDespesas.outras_despesas;
      /* console.log(this.valoresDeCustoDespesas.custo_final); */
    },
    calculaValorVendaProd() {
      if (this.valoresDeCustoDespesas.custo_final > 0) {
        const UrlValoresDeVenda = `${baseApiUrl}/produto/valores_venda`;
        this.valoresDeVenda = {};

        axios
          .get(UrlValoresDeVenda)
          .then((res) => {
            this.valoresDeVenda = res.data;
            const lucro_utilizado = JSON.parse(JSON.stringify(res.data));
            lucro_utilizado.forEach(
              (lucroUltili, i) => (
                (this.valoresDeVenda[i].lucro_utilizado = lucroUltili.lucro),
                (this.valoresDeVenda[i].valor_sugerido =
                  (lucroUltili.lucro *
                    this.valoresDeCustoDespesas.custo_final) /
                    100 +
                  this.valoresDeCustoDespesas.custo_final),
                (this.valoresDeVenda[i].valor_venda_utilizado =
                  (lucroUltili.lucro *
                    this.valoresDeCustoDespesas.custo_final) /
                    100 +
                  this.valoresDeCustoDespesas.custo_final),
                i++
              )
            );
            /* console.log(this.valoresDeVenda); */
          })
          .catch(showError);
      } else {
        showError("Preencha os campos de valores e despesas...");
        this.valoresDeVenda = {};
      }
    },
    calculaCustoFinalProdKey(id) {
      this.valoresDeVenda[id].valor_venda_utilizado =
        (this.valoresDeVenda[id].lucro_utilizado *
          this.valoresDeCustoDespesas.custo_final) /
          100 +
        this.valoresDeCustoDespesas.custo_final;
      /*  console.log(this.valoresDeVenda[id].valor_venda_utilizado); */
      this.$forceUpdate(); /* atualiza dow */
    },
    gerarCodigoInterno() {
      const valorMaximo = 2099999999999;
      const valorMinimo = 2010000000000;

      let sugestao = Math.floor(
        Math.random() * (valorMaximo - valorMinimo + 1) + valorMinimo
      );

      while (this.codigoSorteados.indexOf(sugestao) >= 0) {
        // Enquanto o numero já existir, escolher outro
        sugestao = Math.floor(
          Math.random() * (valorMaximo - valorMinimo + 1) + valorMinimo
        );
      }
      this.codigoSorteados.push(sugestao); // adicionar este numero à array de numeros codigoSorteados para futura referência
      this.$forceUpdate(); /* atualiza input */
      return (this.produto.codigo_interno = sugestao); // devolver o numero único
    },
  },
  mounted() {
    this.loadProdutos();
  },
};
</script>
<style>
.formCadastro-produtos {
  min-height: 600px;
  background-color: #f2f2f2;
}
.produtos-admin {
  font-size: 13px;
}

/* paginador do cadastro de produtos (dados, detalhes, valores...) */
.produtos-admin .nav-link {
  font-size: 15px;
  color: black;
  border: solid 1px darkslategray;
}

.formConversao {
  background-color: rgb(245, 244, 242);
  margin: 0px 5px;
  border-radius: 5px;
}

.bordaForms {
  border: 1px solid rgba(0, 0, 0, 0.215);
}

.bordaFormsLeft {
  border-left: 1px solid rgba(0, 0, 0, 0.215);
}

.bordaFormsRight {
  border-left: 1px solid rgba(0, 0, 0, 0.215);
  border-right: 1px solid rgba(0, 0, 0, 0.215);
}

#input-3-qtdSaida {
  display: block;
  width: 100%;
  height: 32px;
  padding: 0px 0.75rem;
  font-size: 15px;
  font-weight: 700;
  color: #495057;
  background-color: #fff;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
}

.input-conver {
  font-weight: 700;
}

.inputMascara {
  display: block;
  width: 100%;
  height: 32px;
  padding: 0px 0.75rem;
  font-size: 15px;
  color: #495057;
  background-color: #fff;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
}

.inputMascaraValoresDes {
  width: 100%;
  height: 32px;
  padding: 0px 0.75rem;
  color: #495057;
  background-color: #fff;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
}

.inputValoresDespesas {
  text-align: right;
  font-weight: 550;
  color: rgb(86, 84, 84);
}

#input-custo_final {
  text-align: right;
  background-color: #e9ecef;
  border: solid 1px #63626237;
  font-weight: 550;
  font-size: 15px;
}

.inputDisabledColor {
  /* text-align: right; */
  background-color: #e9ecef;
  border: solid 1px #63626237;
}
#input_valor_venda_utilizaso {
  font-weight: 550;
  font-size: 14px;
}
#input_lucro_utilizado {
  font-size: 13px;
  font-weight: 550;
}
</style>
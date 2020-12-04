<template>
  <b-container fluid class="produtos-admin">
    <PageTitle icon="fa fa-cube fa-lg" main="Listar produtos" />
    <b-row sm="12" class="mt-3 ml-2" v-show="mode=='null' || mode=='remove'">
      <b-button class="btn btn-success" size="sm" @click="reset(), navegar('save')">
        <i class="fa fa-plus-circle fa-lg"></i> Novo produto
      </b-button>
    </b-row>

    <b-form v-if="mode!=='null'" class="mt-5">
      <h6 class="mb-2">
        <i class="fa fa-list-alt"></i> Dados gerais
      </h6>
      <!-- V-IF sé redenriza o elemento se requisição for atendida, já o V-SHOW: apenas esconde o elemento com o display none -->
      <input type="hidden" id="produto-id" v-model="produto.id" />

      <b-row>
        <b-col sm="6" lg="2">
          <b-form-group v-if="mode === 'save'" label="Situação" label-for="input-3">
            <b-form-select
              id="input-3"
              v-model="produto.status"
              :options="tipoStatus"
              size="sm"
              required
            ></b-form-select>
          </b-form-group>
          <b-form-group v-else label="Situação" label-for="input-3">
            <b-form-input
              id="input-3"
              v-model="produto.status"
              :options="tipoStatus"
              :readonly="mode === 'remove'"
              size="sm"
              required
            ></b-form-input>
          </b-form-group>
        </b-col>

        <b-col sm="6" lg="3">
          <b-form-group label="Nome*" label-form="produto-nome">
            <b-form-input
              id="produto-nome"
              type="text"
              placeholder="Informe o nome..."
              v-model="produto.nome"
              required
              :readonly="mode === 'remove'"
            />
          </b-form-group>
        </b-col>
        <b-col sm="6" lg="3">
          <b-form-group label="Sobrenome*" label-form="produto-sobrenome">
            <b-form-input
              id="produto-sobrenome"
              type="text"
              placeholder="Informe o sobrenome..."
              v-model="produto.sobrenome"
              required
              :readonly="mode === 'remove'"
            />
          </b-form-group>
        </b-col>
        <b-col sm="6" lg="2">
          <b-form-group label="CPF*" label-form="produto-cpf">
            <b-form-input
              id="produto-cpf"
              type="text"
              placeholder="Informe o CPF..."
              v-model="produto.cpf"
              required
              :readonly="mode === 'remove'"
            />
          </b-form-group>
        </b-col>
        <b-col sm="6" lg="2">
          <b-form-group label="Contato*" label-form="produto-contato">
            <b-form-input
              id="produto-contato"
              type="text"
              placeholder="Informe o número..."
              v-model="produto.contato"
              required
              :readonly="mode === 'remove'"
            />
          </b-form-group>
        </b-col>
        <b-col sm="12" class="mt-2">
          <h6>
            <i class="fa fa-map-marker" aria-hidden="true"></i> Endereços
          </h6>
        </b-col>
        <b-col sm="6" lg="2">
          <b-form-group label="CEP" label-form="produto-cep">
            <b-form-input
              id="produto-cep"
              type="text"
              placeholder="Informe o CEP..."
              v-model="produto.cep"
              required
              :readonly="mode === 'remove'"
            />
          </b-form-group>
        </b-col>
        <b-col sm="6" lg="3">
          <b-form-group label="Bairro*" label-form="produto-bairro">
            <b-form-input
              id="produto-bairro"
              type="text"
              placeholder="Informe nome do bairro..."
              v-model="produto.bairro"
              required
              :readonly="mode === 'remove'"
            />
          </b-form-group>
        </b-col>
        <b-col sm="12" lg="5">
          <b-form-group label="Logradouro/ Rua" label-form="produto-rua">
            <b-form-input
              id="produto-rua"
              type="text"
              placeholder="Informe o nome da rua..."
              v-model="produto.logradouro_rua"
              required
              :readonly="mode === 'remove'"
            />
          </b-form-group>
        </b-col>
        <b-col sm="2">
          <b-form-group label="Nº Casa" label-form="produto-numero-casa">
            <b-form-input
              id="produto-numero-casa"
              type="text"
              placeholder="Ex:84"
              v-model="produto.numero"
              required
              :readonly="mode === 'remove'"
            />
          </b-form-group>
        </b-col>
        <b-col sm="12">
          <span>Complemento</span>
          <b-form-textarea
            id="produto-complemento"
            class="form-control mt-1"
            name="produto-complemento"
            v-model="produto.complemento"
            autocomplete="off"
            cols="30"
            rows="3"
            :readonly="mode === 'remove'"
          ></b-form-textarea>
        </b-col>
        <b-col sm="10" class="mt-4">
          <h6>
            <i class="fa fa-money"></i> Financeiro
          </h6>
        </b-col>
        <b-col md="4" lg="3">
          <b-form-group
            label="Limite de crédito"
            label-form="produto-limite_credito"
            description="Para não limitar o crédito do produto, deixe este compo em branco."
          >
            <b-form-input
              id="produto-limite_credito"
              type="text"
              placeholder="Informe o limite de crédito..."
              v-model="produto.limite_credito"
              required
              :readonly="mode === 'remove'"
            />
          </b-form-group>
        </b-col>
      </b-row>

      <b-row class="row-btn">
        <b-col xs="12">
          <b-button variant="btn btn-success" v-if="mode === 'save'" @click="save">
            <i class="fa fa-check"></i> Salvar
          </b-button>
          <b-button variant="btn btn-danger" v-else @click="navegar('remove'), remove()">
            <i class="fa fa-trash-o"></i> Excluir
          </b-button>
          <b-button variant="btn btn-warning" class="ml-3" @click="reset">
            <i class="fa fa-times"></i> Cancelar
          </b-button>
        </b-col>
      </b-row>
      <hr />
    </b-form>

    <!-- User Interface controls -->
    <b-container fluid class="mt-3">
      <b-row cols="12" align-h="center">
        <b-col cols="1" class="m-0 p-0">
          <b-form-group align="right" class="pt-1">
            <i class="fa fa-search fa-2x"></i>
          </b-form-group>
        </b-col>
        <b-col cols="11" md="8">
          <b-form label-for="filterInputprodutos" class="input-group-prepend h6">
            <b-input-group size="md">
              <b-form-input
                id="filterInputprodutos"
                type="search"
                placeholder="Pesquisar..."
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
              <b-form-checkbox value="nome">Nome</b-form-checkbox>
              <b-form-checkbox value="sobrenome">Sobrenome</b-form-checkbox>
              <b-form-checkbox value="cpf">CPF</b-form-checkbox>
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

    <!-- Main table element -->
    <b-table
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
        <b-card>
          <ul>
            <li v-for="(value, key) in row.item" :key="key">{{key}}: {{ value }}</li>
          </ul>
        </b-card>
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
      mode: "null",
      produto: {},
      produtos: [],
      tipoStatus: [
        { text: "Ativo", value: "Ativo" },
        { text: "Inativo", value: "Inativo" },
      ],
      fields: [
        {
          key: "id",
          label: "Código",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "nome",
          label: "Nome",
          sortable: true,
        },
        {
          key: "sobrenome",
          label: "Sobrenome",
          sortable: true,
        },
        {
          key: "cpf",
          label: "CPF",
          sortable: true,
        },
        {
          key: "contato",
          label: "Contato",
          sortable: true,
        },
        {
          key: "bairro",
          label: "Bairro",
          sortable: true,
        },
        {
          key: "status",
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
      const url = `${baseApiUrl}/produto`;
      axios
        .get(url)
        .then((res) => {
          this.produtos = res.data;
          this.produto = { status: "Ativo" };
          this.totalRows = res.data.length;
        })
        .catch(showError);
    },
    reset() {
      this.navegar();
      this.produto = {};
      this.loadProdutos();
    },
    loadProduto(produto, mode = "null") {
      this.mode = mode;
      this.produto = { ...produto };
    },
    save() {
      const produtoModelo = {
        id: this.produto.id,
        status: this.produto.status,
        nome: this.produto.nome,
        sobrenome: this.produto.sobrenome,
        cpf: this.produto.cpf,
        contato: this.produto.contato,
        cep: this.produto.cep,
        bairro: this.produto.bairro,
        logradouro_rua: this.produto.logradouro_rua,
        numero: this.produto.numero,
        complemento: this.produto.complemento,
        limite_credito: this.produto.limite_credito,
      };

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
  },
  mounted() {
    this.loadProdutos();
  },
};
</script>
<style>
.produtos-admin{
    font-size: 13px;
}

</style>
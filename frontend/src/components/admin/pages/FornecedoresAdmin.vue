<template>
  <b-container fluid class="fornecedores-admin">
    <PageTitle icon="fa fa-truck fa-lg" main="Listar fornecedores" />
    <b-row sm="12" class="mt-3 ml-2" v-show="mode=='null' || mode=='remove'">
      <b-button class="btn btn-success" size="sm" @click="reset(), navegar('save')">
        <i class="fa fa-plus-circle fa-lg"></i> Novo Fornecedor
      </b-button>
    </b-row>

    <b-form v-if="mode!=='null'" class="mt-5">
      <h6 class="mb-2">
        <i class="fa fa-list-alt"></i> Dados gerais
      </h6>
      <!-- V-IF sé redenriza o elemento se requisição for atendida, já o V-SHOW: apenas esconde o elemento com o display none -->
      <input type="hidden" id="fornecedor-id" v-model="fornecedor.id" />

      <b-row>
        <b-col sm="6" lg="2">
          <b-form-group v-if="mode === 'save'" label="Tipo de Fornecedor*" label-for="input-3">
            <b-form-select
              id="input-3"
              v-model="fornecedor.tipo_fornecedor"
              :options="tiposFornecedores"
              size="sm"
              required
            ></b-form-select>
          </b-form-group>
          <b-form-group v-else label="Tipo de Fornecedor*" label-for="input-3">
            <b-form-input
              id="input-3"
              v-model="fornecedor.tipo_fornecedor"
              :readonly="mode === 'remove'"
              size="sm"
              required
            ></b-form-input>
          </b-form-group>
        </b-col>

        <b-col sm="6" lg="2">
          <b-form-group v-if="mode === 'save'" label="Situação" label-for="input-3">
            <b-form-select
              id="input-3"
              v-model="fornecedor.status"
              :options="tipoStatus"
              size="sm"
              required
            ></b-form-select>
          </b-form-group>
          <b-form-group v-else label="Situação" label-for="input-3">
            <b-form-input
              id="input-3"
              v-model="fornecedor.status"
              :readonly="mode === 'remove'"
              size="sm"
              required
            ></b-form-input>
          </b-form-group>
        </b-col>

        <b-col sm="6" lg="4">
          <b-form-group label="Nome Fantasia*" label-form="fornecedor-nome_fantasia">
            <b-form-input
              id="fornecedor-nome_fantasia"
              type="text"
              placeholder="Informe o nome fantasia..."
              v-model="fornecedor.nome_fantasia"
              required
              :readonly="mode === 'remove'"
            />
          </b-form-group>
        </b-col>
        <b-col sm="6" lg="4">
          <b-form-group label="Razão Social" label-form="fornecedor-razao_social">
            <b-form-input
              id="fornecedor-razao_social"
              type="text"
              placeholder="Informe nome razão social"
              v-model="fornecedor.razao_social"
              required
              :readonly="mode === 'remove'"
            />
          </b-form-group>
        </b-col>
        <b-col sm="6" lg="4" v-if="fornecedor.tipo_fornecedor=='Pessoa jurídica'">
          <b-form-group label="CNPJ*" label-form="fornecedor-cnpj">
            <b-form-input
              id="fornecedor-cnpj"
              type="text"
              placeholder="Informe o CNPJ..."
              v-model="fornecedor.cnpj_cpf"
              required
              :readonly="mode === 'remove'"
            />
          </b-form-group>
        </b-col>
        <b-col sm="6" lg="4" v-else>
          <b-form-group label="CPF*" label-form="fornecedor-cpf">
            <b-form-input
              id="fornecedor-cpf"
              type="text"
              placeholder="Informe o CPF..."
              v-model="fornecedor.cnpj_cpf"
              required
              :readonly="mode === 'remove'"
            />
          </b-form-group>
        </b-col>
        <b-col sm="6" lg="4">
          <b-form-group label="Contato I" label-form="fornecedor-contato1">
            <b-form-input
              id="fornecedor-contato1"
              type="text"
              placeholder="Informe o número I..."
              v-model="fornecedor.contato1"
              required
              :readonly="mode === 'remove'"
            />
          </b-form-group>
        </b-col>
        <b-col sm="6" lg="4">
          <b-form-group label="Contato II" label-form="fornecedor-contato2">
            <b-form-input
              id="fornecedor-contato2"
              type="text"
              placeholder="Informe o número II..."
              v-model="fornecedor.contato2"
              required
              :readonly="mode === 'remove'"
            />
          </b-form-group>
        </b-col>
        <b-col sm="6" lg="3" v-show="fornecedor.tipo_fornecedor=='Pessoa jurídica'">
          <b-form-group label="Inscrição Estadual" label-form="fornecedor-inscricao_estadual">
            <b-form-input
              id="fornecedor-inscricao_estadual"
              type="text"
              placeholder="Informe a inscrição estadual..."
              v-model="fornecedor.inscricao_estadual"
              required
              :readonly="mode === 'remove'"
            />
          </b-form-group>
        </b-col>
        <b-col sm="6" lg="3" v-show="fornecedor.tipo_fornecedor=='Pessoa jurídica'">
          <b-form-group label="Inscrição Municipal" label-form="fornecedor-inscricao_municipal">
            <b-form-input
              id="fornecedor-inscricao_municipal"
              type="text"
              placeholder="Informe a inscrição municipal..."
              v-model="fornecedor.inscricao_municipal"
              required
              :readonly="mode === 'remove'"
            />
          </b-form-group>
        </b-col>
        <b-col sm="6" lg="3" v-show="fornecedor.tipo_fornecedor=='Pessoa jurídica'">
          <b-form-group label="Inscrição SUFRAMA" label-form="fornecedor-inscricao_suframa">
            <b-form-input
              id="fornecedor-inscricao_suframa"
              type="text"
              placeholder="Informe a inscrição suframa..."
              v-model="fornecedor.inscricao_suframa"
              required
              :readonly="mode === 'remove'"
            />
          </b-form-group>
        </b-col>
        <b-col sm="6" lg="3" v-show="fornecedor.tipo_fornecedor=='Pessoa jurídica'">
          <b-form-group label="Responsável" label-form="fornecedor-responsavel">
            <b-form-input
              id="fornecedor-responsavel"
              type="text"
              placeholder="Informe o responsável..."
              v-model="fornecedor.responsavel"
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
          <b-form-group label="CEP" label-form="fornecedor-cep">
            <b-form-input
              id="fornecedor-cep"
              type="text"
              placeholder="Informe o CEP..."
              v-model="fornecedor.cep"
              required
              :readonly="mode === 'remove'"
            />
          </b-form-group>
        </b-col>
        <b-col sm="6" lg="3">
          <b-form-group label="Bairro/ Distrito" label-form="fornecedor-bairro_distrito">
            <b-form-input
              id="fornecedor-bairro_distrito"
              type="text"
              placeholder="Informe o bairro ou distrito..."
              v-model="fornecedor.bairro_distrito"
              required
              :readonly="mode === 'remove'"
            />
          </b-form-group>
        </b-col>
        <b-col sm="5" lg="2">
          <b-form-group label="Localidade/ UF" label-form="fornecedor-localidade_uf">
            <b-form-input
              id="fornecedor-localidade_uf"
              type="text"
              placeholder="Informe nome da cidade..."
              v-model="fornecedor.localidade_uf"
              required
              :readonly="mode === 'remove'"
            />
          </b-form-group>
        </b-col>
        <b-col sm="5" lg="3">
          <b-form-group label="Logradouro/ Rua" label-form="fornecedor-logradouro_nome">
            <b-form-input
              id="fornecedor-logradouro_nome"
              type="text"
              placeholder="Informe o nome da rua..."
              v-model="fornecedor.logradouro_nome"
              required
              :readonly="mode === 'remove'"
            />
          </b-form-group>
        </b-col>
        <b-col sm="2" lg="2">
          <b-form-group label="Número">
            <b-form-input
              type="text"
              v-model="fornecedor.numero"
              required
              :readonly="mode === 'remove'"
            />
          </b-form-group>
        </b-col>
        <b-col sm="12">
          <span>Complemento</span>
          <b-form-textarea
            id="fornecedor-complemento"
            class="form-control mt-1"
            name="fornecedor-complemento"
            v-model="fornecedor.complemento"
            autocomplete="off"
            rows="4"
            :readonly="mode === 'remove'"
          ></b-form-textarea>
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
          <b-form label-for="filterInputFornecedores" class="input-group-prepend h6">
            <b-input-group size="md">
              <b-form-input
                id="filterInputFornecedores"
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
              <b-form-checkbox value="nome_fantasia">Nome</b-form-checkbox>
              <b-form-checkbox value="razao_social">Razão</b-form-checkbox>
              <b-form-checkbox value="cnpj_cpf">CNPJ/ CPF</b-form-checkbox>
              <b-form-checkbox value="responsavel">Responsável</b-form-checkbox>
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
      bordered
      show-empty
      small
      stacked="md"
      :items="fornecedors"
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
          <b-button class="bg-warning" size="sm" @click="loadfornecedor(row.item, 'save')">
            <i class="fa fa-pencil fa-lg"></i>
          </b-button>
        </a>
        <a href="#idNavegar">
          <b-button class="bg-danger" size="sm" @click="loadfornecedor(row.item, 'remove')">
            <i class="fa fa-trash-o fa-lg"></i>
          </b-button>
        </a>
      </template>

      <template v-slot:row-details="row">
        <b-container fluid class="table-responsive mb-4 p-0">
          <b-col class="m-0 p-0">
            <table class="table table-striped table-dark">
              <thead>
                <tr>
                  <th scope="col">Código</th>
                  <th scope="col">Status</th>
                  <th scope="col">Tipo fornecedor</th>
                  <th scope="col">Nome fantasia</th>
                  <th scope="col">Razão social</th>
                  <th scope="col">Contato I</th>
                  <th scope="col">Contato II</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">{{row.item.id}}</th>
                  <td>{{row.item.status}}</td>
                  <td>{{row.item.tipo_fornecedor}}</td>
                  <td>{{row.item.nome_fantasia}}</td>
                  <td>{{row.item.razao_social}}</td>
                  <td>{{row.item.contato1}}</td>
                  <td>{{row.item.contato2}}</td>
                </tr>
              </tbody>
            </table>
          </b-col>
          <b-col class="m-0 p-0">
            <table class="table table-striped table-dark">
              <thead>
                <tr>
                  <th scope="col">CNPJ ou CPF</th>
                  <th scope="col">Inscrição estadual</th>
                  <th scope="col">Inscrição municípal</th>
                  <th scope="col">Inscrição suframa</th>
                  <th scope="col">Responsável</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{{row.item.cnpj_cpf}}</td>
                  <td>{{row.item.inscricao_estadual}}</td>
                  <td>{{row.item.inscricao_municipal}}</td>
                  <td>{{row.item.inscricao_suframa}}</td>
                  <td>{{row.item.responsavel}}</td>
                </tr>
              </tbody>
            </table>
          </b-col>
          <b-col class="m-0 p-0">
            <table class="table table-striped table-dark">
              <thead>
                <tr>
                  <th scope="col">Cep</th>
                  <th scope="col">Bairro</th>
                  <th scope="col">Localidade</th>
                  <th scope="col">Logradouro/ rua</th>
                  <th scope="col">Modificado em</th>
                  <th scope="col">Cadastrado em em</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{{row.item.cep}}</td>
                  <td>{{row.item.bairro_distrito}}</td>
                  <td>{{row.item.localidade_uf}}</td>
                  <td>{{row.item.logradouro_nome}}</td>
                  <td>{{row.item.modificado_em}}</td>
                  <td>{{row.item.cadastrado_em}}</td>
                </tr>
              </tbody>
            </table>
          </b-col>
          <b-col class="m-0 p-0">
            <table class="table table-striped table-dark">
              <thead>
                <tr>
                  <th scope="col-12">Complemento</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{{row.item.complemento}}</td>
                </tr>
              </tbody>
            </table>
          </b-col>
        </b-container>
      </template>
    </b-table>
  </b-container>
</template>

<script>
import PageTitle from "@/components/template/PageTitle";
import { baseApiUrl, showError } from "../../../../global";
import axios from "axios";

export default {
  name: "Fornecedores",
  components: { PageTitle },
  data() {
    return {
      mode: "null",
      fornecedor: {},
      fornecedors: [],
      tiposFornecedores: [
        { text: "Selecione", value: null },
        "Pessoa jurídica",
        "Pessoa física",
      ],
      tipoStatus: [
        { text: "Ativo", value: "Ativo" },
        { text: "Inativo", value: "Inativo" },
      ],
      fields: [
        {
          key: "nome_fantasia",
          label: "Nome Fantasia",
          sortable: true,
        },
        {
          key: "cnpj_cpf",
          label: "CNPJ/ CPF",
          sortable: true,
        },
        {
          key: "contato1",
          label: "Contato I",
          sortable: true,
        },
        {
          key: "responsavel",
          label: "Responsável",
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
    loadFornecedores() {
      const url = `${baseApiUrl}/fornecedor`;
      axios
        .get(url)
        .then((res) => {
          this.fornecedors = res.data;
          this.totalRows = res.data.length;
        })
        .catch(showError);

      this.fornecedor = { status: "Ativo", tipo_fornecedor: null };
    },
    reset() {
      this.navegar();
      this.fornecedor = {};
      this.loadFornecedores();
    },
    loadfornecedor(fornecedor, mode = "null") {
      this.mode = mode;
      this.fornecedor = { ...fornecedor };
    },
    save() {
      const fornecedorModelo = {
        id: this.fornecedor.id,
        tipo_fornecedor: this.fornecedor.tipo_fornecedor,
        status: this.fornecedor.status,
        nome_fantasia: this.fornecedor.nome_fantasia,
        razao_social: this.fornecedor.razao_social,
        cnpj_cpf: this.fornecedor.cnpj_cpf,
        contato1: this.fornecedor.contato1,
        contato2: this.fornecedor.contato2,
        inscricao_estadual: this.fornecedor.inscricao_estadual,
        inscricao_municipal: this.fornecedor.inscricao_municipal,
        inscricao_suframa: this.fornecedor.inscricao_suframa,
        responsavel: this.fornecedor.responsavel,
        cep: this.fornecedor.cep,
        bairro_distrito: this.fornecedor.bairro_distrito,
        localidade_uf: this.fornecedor.localidade_uf,
        logradouro_nome: this.fornecedor.logradouro_nome,
        numero: this.fornecedor.numero,
        complemento: this.fornecedor.complemento,
      };

      const method = this.fornecedor.id ? "put" : "post";
      const id = this.fornecedor.id ? `${this.fornecedor.id}` : "";
      const url = `${baseApiUrl}/fornecedor/${id}`;
      axios[method](url, fornecedorModelo)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    remove() {
      const id = this.fornecedor.id;
      const url = `${baseApiUrl}/fornecedor/${id}`;
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
    this.loadFornecedores();
  },
};
</script>
<style>
.fornecedores-admin {
  font-size: 13px;
}
/* style ta em ClienteAdmin */
</style>
<template>
  <b-container fluid class="cliente-admin">
    <PageTitle icon="fa fa-users fa-lg" main="Listar clientes" />
    <b-row sm="12" class="mt-3 ml-2" v-show="mode=='null' || mode=='remove'">
      <b-button class="btn btn-success" size="sm" @click="reset(), navegar('save')">
        <i class="fa fa-plus-circle fa-lg"></i> Novo Cliente
      </b-button>
    </b-row>

    <b-form v-if="mode!=='null'" class="mt-5">
      <h6 class="mb-2">
        <i class="fa fa-list-alt"></i> Dados gerais
      </h6>
      <!-- V-IF sé redenriza o elemento se requisição for atendida, já o V-SHOW: apenas esconde o elemento com o display none -->
      <input type="hidden" id="cliente-id" v-model="cliente.id" />

      <b-row>
        <b-col sm="6" lg="2">
          <b-form-group v-if="mode === 'save'" label="Situação" label-for="input-3">
            <b-form-select
              id="input-3"
              v-model="cliente.status"
              :options="tipoStatus"
              size="sm"
              required
            ></b-form-select>
          </b-form-group>
          <b-form-group v-else label="Situação" label-for="input-3">
            <b-form-input
              id="input-3"
              v-model="cliente.status"
              :readonly="mode === 'remove'"
              size="sm"
              required
            ></b-form-input>
          </b-form-group>
        </b-col>

        <b-col sm="6" lg="3">
          <b-form-group label="Nome*" label-form="cliente-nome">
            <b-form-input
              id="cliente-nome"
              type="text"
              placeholder="Informe o nome..."
              v-model="cliente.nome"
              required
              :readonly="mode === 'remove'"
            />
          </b-form-group>
        </b-col>
        <b-col sm="6" lg="3">
          <b-form-group label="Sobrenome*" label-form="cliente-sobrenome">
            <b-form-input
              id="cliente-sobrenome"
              type="text"
              placeholder="Informe o sobrenome..."
              v-model="cliente.sobrenome"
              required
              :readonly="mode === 'remove'"
            />
          </b-form-group>
        </b-col>
        <b-col sm="6" lg="2">
          <b-form-group label="CPF*" label-form="cliente-cpf">
            <the-mask
              class="inputMascara"
              :mask="['###.###.###-##']"
              id="cliente-cpf"
              type="text"
              placeholder="Informe o CPF..."
              v-model="cliente.cpf"
              required
              :readonly="mode === 'remove'"
            />
          </b-form-group>
        </b-col>
        <b-col sm="6" lg="2">
          <b-form-group label="Contato*" label-form="cliente-contato">
            <the-mask
              class="inputMascara"
              :mask="['(##) #.####-####']"
              id="cliente-contato"
              type="text"
              placeholder="Informe o número..."
              v-model="cliente.contato"
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
          <b-form-group label="CEP" label-form="cliente-cep">
            <b-form-input
              id="cliente-cep"
              type="text"
              placeholder="Informe o CEP..."
              v-model="cliente.cep"
              required
              :readonly="mode === 'remove'"
            />
          </b-form-group>
        </b-col>
        <b-col sm="6" lg="3">
          <b-form-group label="Bairro*" label-form="cliente-bairro">
            <b-form-input
              id="cliente-bairro"
              type="text"
              placeholder="Informe nome do bairro..."
              v-model="cliente.bairro"
              required
              :readonly="mode === 'remove'"
            />
          </b-form-group>
        </b-col>
        <b-col sm="12" lg="5">
          <b-form-group label="Logradouro/ Rua" label-form="cliente-rua">
            <b-form-input
              id="cliente-rua"
              type="text"
              placeholder="Informe o nome da rua..."
              v-model="cliente.logradouro_rua"
              required
              :readonly="mode === 'remove'"
            />
          </b-form-group>
        </b-col>
        <b-col sm="2">
          <b-form-group label="Nº Casa" label-form="cliente-numero-casa">
            <b-form-input
              id="cliente-numero-casa"
              type="text"
              placeholder="Ex:84"
              v-model="cliente.numero"
              required
              :readonly="mode === 'remove'"
            />
          </b-form-group>
        </b-col>
        <b-col sm="12">
          <span>Complemento</span>
          <b-form-textarea
            id="cliente-complemento"
            class="form-control mt-1"
            name="cliente-complemento"
            v-model="cliente.complemento"
            autocomplete="off"
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
            label-form="cliente-limite_credito"
            description="Para não limitar o crédito do cliente, deixe este compo em branco."
          >
            <b-form-input
              id="cliente-limite_credito"
              type="text"
              placeholder="Informe o limite de crédito..."
              v-model="cliente.limite_credito"
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
          <b-form label-for="filterInputClientes" class="input-group-prepend h6">
            <b-input-group size="md">
              <b-form-input
                id="filterInputClientes"
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
      bordered
      show-empty
      small
      stacked="md"
      :items="clientes"
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
          <b-button class="bg-warning" size="sm" @click="loadCliente(row.item, 'save')">
            <i class="fa fa-pencil fa-lg"></i>
          </b-button>
        </a>
        <a href="#idNavegar">
          <b-button class="bg-danger" size="sm" @click="loadCliente(row.item, 'remove')">
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
                  <th scope="col">Nome</th>
                  <th scope="col">Sobrenome</th>
                  <th scope="col">CPF</th>
                  <th scope="col">Contato</th>
                  <th scope="col">Limite</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">{{row.item.id}}</th>
                  <td>{{row.item.status}}</td>
                  <td>{{row.item.nome}}</td>
                  <td>{{row.item.sobrenome}}</td>
                  <td>{{row.item.cpf}}</td>
                  <td>{{row.item.contato}}</td>
                  <td>{{row.item.limite_credito}}</td>
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
                  <th scope="col">Logradouro/ rua</th>
                  <th scope="col">Número da casa</th>
                  <th scope="col">Modificado em</th>
                  <th scope="col">Cadastrado em</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">{{row.item.cep}}</th>
                  <td>{{row.item.bairro}}</td>
                  <td>{{row.item.logradouro_rua}}</td>
                  <td>{{row.item.numero}}</td>
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
  components: { PageTitle },
  name: "Clientes",
  data() {
    return {
      mode: "null",
      cliente: {},
      clientes: [],
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
    loadClientes() {
      const url = `${baseApiUrl}/cliente`;
      axios
        .get(url)
        .then((res) => {
          this.clientes = res.data;
          this.cliente = { status: "Ativo" };
          this.totalRows = res.data.length;
        })
        .catch(showError);
    },
    reset() {
      this.navegar();
      this.cliente = {};
      this.loadClientes();
    },
    loadCliente(cliente, mode = "null") {
      this.mode = mode;
      this.cliente = { ...cliente };
    },
    save() {
      const clienteModelo = {
        id: this.cliente.id,
        status: this.cliente.status,
        nome: this.cliente.nome,
        sobrenome: this.cliente.sobrenome,
        cpf: this.cliente.cpf,
        contato: this.cliente.contato,
        cep: this.cliente.cep,
        bairro: this.cliente.bairro,
        logradouro_rua: this.cliente.logradouro_rua,
        numero: this.cliente.numero,
        complemento: this.cliente.complemento,
        limite_credito: this.cliente.limite_credito,
      };
      console.log(clienteModelo);

      const method = this.cliente.id ? "put" : "post";
      const id = this.cliente.id ? `${this.cliente.id}` : "";
      const url = `${baseApiUrl}/cliente/${id}`;
      axios[method](url, clienteModelo)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    remove() {
      const id = this.cliente.id;
      const url = `${baseApiUrl}/cliente/${id}`;
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
    this.loadClientes();
  },
};
</script>
<style>
.cliente-admin {
  font-size: 13px;
}

.row-btn {
  margin-top: 30px;
}

.row-btn button {
  width: 120px;
}

table {
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
}

tbody button {
  /* botoes do formulario */
  margin-left: 10px;
}

/* icones da coluna na tabela "Ações" */
tbody tr td:last-child div button {
  min-width: 40px;
}

/* botao informaçoes da tabela "Açoes" */
.card .card-body ul {
  font-size: 15px;
  color: black;
  list-style: none;
}

@media screen and (max-width: 400px) {
  tbody tr td:last-child div button {
    min-width: 35px;
  }
  tbody tr td button {
    max-width: 35px;
    max-height: 30px;
    margin: 1px;
  }
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
</style>
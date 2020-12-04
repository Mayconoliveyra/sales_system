<template>
  <b-container fluid class="valoresVenda-admin">
    <PageTitle icon="fa fa fa-usd fa-lg" main="Listar valores de venda" />
    <b-row sm="12" class="mt-3 ml-2" v-show="mode=='null' || mode=='remove'">
      <b-button class="btn btn-success" size="sm" @click="reset(), navegar('save')">
        <i class="fa fa-plus-circle fa-lg"></i> Adicionar valor de venda
      </b-button>
    </b-row>
    <b-row align="center">
      <b-col sm="12" class="pl-4 pr-4 mt-3">
        <b-form-group
          description="Um mesmo produto pode ter vários valores de venda, de acordo com a Tabela de Valores de Venda, que por sua vez, possui vários Tipos de Valores de Venda. Por exemplo, um produto pode ter o valor de atacado e varejo. Durante o cadastramento dos produtos é possível gerar sugestões de Valores de Venda com base na Média de Lucro."
        ></b-form-group>
      </b-col>
    </b-row>
    <b-form v-if="mode!=='null'" class="mt-1">
      <h6 class="mb-2">
        <i class="fa fa-list-alt"></i> Adicionar valor de venda
      </h6>
      <input type="hidden" id="valorVenda-id" v-model="valorVenda.id" />
      <b-row class="m-4">
        <b-col sm="6">
          <b-form-group label="Nome*" label-form="valor_venda_nome">
            <b-form-input
              id="valor_venda_nome"
              type="text"
              placeholder="Informe o nome..."
              v-model="valorVenda.nome"
              required
              :readonly="mode === 'remove'"
            />
          </b-form-group>
        </b-col>
        <b-col v-if="mode==='save'" sm="6">
          <b-form-group label="Lucro (%)" label-form="valor_venda_lucro">
            <money
              id="valor_venda_lucro"
              class="text-right inputMascara"
              type="text"
              autocomplete="off"
              v-model="valorVenda.lucro"
              v-bind="maskCalculadora"
              required
            ></money>
          </b-form-group>
        </b-col>
        <b-col v-else sm="6">
          <b-form-group label="Lucro (%)" label-form="valor_venda_lucro">
            <b-form-input
              id="valor_venda_lucro"
              class="text-right inputMascara"
              type="text"
              autocomplete="off"
              v-model="valorVenda.lucro"
              readonly
              v-bind="maskCalculadora"
              required
            ></b-form-input>
          </b-form-group>
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

    <!-- elementos da tabela  -->
    <b-row class="p-4">
      <b-table fixed bordered show-empty small stacked="md" :items="valoresVendas" :fields="fields">
        <template v-slot:cell(actions)="row">
          <b-button size="sm" @click="row.toggleDetails" class="btnDetalhes bg-info">
            <i class="fa fa-info fa-lg"></i>
          </b-button>
          <a href="#idNavegar">
            <b-button class="bg-warning" size="sm" @click="loadvalorVenda(row.item, 'save')">
              <i class="fa fa-pencil fa-lg"></i>
            </b-button>
          </a>
          <a href="#idNavegar">
            <b-button class="bg-danger" size="sm" @click="loadvalorVenda(row.item, 'remove')">
              <i class="fa fa-trash-o fa-lg"></i>
            </b-button>
          </a>
        </template>
        <template v-slot:row-details="row">
          <b-container fluid class="table-responsive mb-4 p-0">
            <table class="table table-striped table-dark">
              <thead>
                <tr>
                  <th scope="col">Código</th>
                  <th scope="col">Nome</th>
                  <th scope="col">Média de lucro (%)</th>
                  <th scope="col">Modificado em</th>
                  <th scope="col">Cadastrado em</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">{{row.item.id}}</th>
                  <td>{{row.item.nome}}</td>
                  <td>{{row.item.lucro}}</td>
                  <td>{{row.item.modificado_em}}</td>
                  <td>{{row.item.cadastrado_em}}</td>
                </tr>
              </tbody>
            </table>
          </b-container>
        </template>
      </b-table>
    </b-row>
  </b-container>
</template>

<script>
import PageTitle from "@/components/template/PageTitle";
import { baseApiUrl, showError } from "../../../../global";
import axios from "axios";

export default {
  components: { PageTitle },
  name: "ValoresVenda",
  data() {
    return {
      /* nome do campo extra/ conteudo */
      valoresVendas: [],
      mode: "null",
      valorVenda: {},
      maskCalculadora: {
        decimal: ",",
        thousands: ".",
        precision: 2,
        suffix: " %",
        masked: false,
      },
      fields: [
        {
          key: "nome",
          label: "Nome",
        },
        {
          key: "lucro",
          label: "Média de lucro (%)",
        },
        {
          key: "cadastrado_em",
          label: "Cadastrado em",
        },
        { key: "actions", label: "Ações", class: "text-center" },
      ],
    };
  },
  methods: {
    navegar(mode = "null") {
      this.mode = mode;
    },
    loadvaloresVendas() {
      const urlvaloresVenda = `${baseApiUrl}/produto/valores_venda`;

      axios
        .get(urlvaloresVenda)
        .then((res) => {
          this.valoresVendas = res.data;
        })
        .catch(showError);
    },
    reset() {
      this.valorVenda = {};
      this.navegar();
      this.loadvaloresVendas();
    },
    loadvalorVenda(valorVenda, mode = "null") {
      this.mode = mode;
      this.valorVenda = { ...valorVenda };
    },
    save() {
      const valorVendaModelo = {
        id: this.valorVenda.id,
        nome: this.valorVenda.nome,
        lucro: this.valorVenda.lucro,
      };

      const method = this.valorVenda.id ? "put" : "post";
      const id = this.valorVenda.id ? `${this.valorVenda.id}` : "";
      const url = `${baseApiUrl}/produto/valores_venda/${id}`;
      axios[method](url, valorVendaModelo)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    remove() {
      const id = this.valorVenda.id;
      const url = `${baseApiUrl}/produto/valores_venda/${id}`;
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
    this.loadvaloresVendas();
  },
};
</script>
<style>
.valoresVenda-admin {
  font-size: 14px;
}
</style>
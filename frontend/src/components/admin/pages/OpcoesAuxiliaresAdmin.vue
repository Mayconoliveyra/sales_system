<template>
  <b-container fluid class="opcoesAuxiliares-admin">
    <PageTitle icon="fa fa-file-text fa-lg" main="Opções auxiliares" />
    <b-row>
      <b-col sm="12" class="m-0">
        <b-card no-body class="formCadastro-opcoesAuxiliares">
          <b-tabs pills card justified active-nav-item-class="text-white">
            <!-- ####################  Grupos de produtos  #################### -->
            <b-tab @click="reset" title="Grupos de produtos" active>
              <b-row sm="12" class="ml-2" v-show="mode=='null' || mode=='remove'">
                <b-button class="btn btn-success" size="sm" @click="reset(), navegar('save')">
                  <i class="fa fa-plus-circle fa-lg"></i> Adicionar grupo
                </b-button>
              </b-row>
              <b-row align="center">
                <b-col sm="12" class="pl-4 pr-4 mt-1">
                  <b-form-group
                    description="Durante o cadastramento de produtos, é possível informar a que grupo eles pertencem, facilitando a organização."
                  ></b-form-group>
                </b-col>
              </b-row>
              <b-form class="m-0" v-if="mode=='save' || mode=='remove' ">
                <input type="hidden" id="grupo_id" v-model="grupo.id" />
                <h6 class="mb-4">
                  <i class="fa fa-sitemap fa-lg"></i> Adicionar grupo de produtos
                </h6>
                <b-row class="pr-4 pl-3">
                  <b-col sm="12" lg="6">
                    <b-form-group label="Nome do grupo*" label-form="grupo_produto_nome">
                      <b-form-input
                        autocomplete="off"
                        id="grupo_produto_nome"
                        type="text"
                        placeholder="Informe o nome do grupo..."
                        v-model="grupo.nome"
                        required
                        :readonly="mode === 'remove'"
                      />
                    </b-form-group>
                  </b-col>
                  <b-col class="p-0 m-0" sm="6">
                    <b-form-group label="Grupo pai" label-form="grupo_produto_pai">
                      <b-form-input
                        id="grupo_produto_pai"
                        type="search"
                        placeholder="Digite para buscar"
                        autocomplete="off"
                        list="my-list-id-grupo_produtos"
                        v-model="grupo.id_grupo_pai"
                        :readonly="mode === 'remove'"
                        size="md"
                        required
                      ></b-form-input>
                    </b-form-group>
                    <datalist id="my-list-id-grupo_produtos">
                      <option v-for="(grupos, key) in grupos_produtos" :key="key">{{ grupos.nome }}</option>
                    </datalist>
                  </b-col>
                </b-row>

                <!-- btn da tabela, salvar, excluir cancelar -->
                <b-row class="row-btn mt-5">
                  <b-col xs="12">
                    <b-button
                      variant="btn btn-success"
                      v-if="mode === 'save'"
                      @click="save('grupo')"
                    >
                      <i class="fa fa-check fa-sm"></i> Cadastrar
                    </b-button>
                    <b-button
                      variant="btn btn-danger"
                      v-else
                      @click="navegar('remove'), remove('grupo')"
                    >
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

              <b-table
                bordered
                fixed
                class="mt-5"
                show-empty
                small
                stacked="md"
                :items="grupos_produtos"
                :fields="fieldsGrupos"
              >
                <template v-slot:cell(actions)="row">
                  <b-button size="sm" @click="row.toggleDetails" class="btnDetalhes bg-info">
                    <i class="fa fa-info fa-lg"></i>
                  </b-button>
                  <a href="#idNavegar">
                    <b-button class="bg-warning" size="sm" @click="load(row.item, 'save', 'grupo')">
                      <i class="fa fa-pencil fa-lg"></i>
                    </b-button>
                  </a>
                  <a href="#idNavegar">
                    <b-button
                      class="bg-danger"
                      size="sm"
                      @click="load(row.item, 'remove', 'grupo')"
                    >
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
                          <th scope="col">Grupo pai</th>
                          <th scope="col">Modificado em</th>
                          <th scope="col">Cadastrado em</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">{{row.item.id}}</th>
                          <td>{{row.item.nome}}</td>
                          <td>{{getNomePaiGrupo(row.item.id_grupo_pai)}}</td>
                          <td>{{row.item.modificado_em}}</td>
                          <td>{{row.item.cadastrado_em}}</td>
                        </tr>
                      </tbody>
                    </table>
                  </b-container>
                </template>
              </b-table>
            </b-tab>

            <!-- #######################  Unidades de produtos  #################### -->
            <b-tab @click="reset" title="Unidades de produtos">
              <b-row sm="12" class="ml-2" v-show="mode=='null' || mode=='remove'">
                <b-button class="btn btn-success" size="sm" @click="reset(), navegar('save')">
                  <i class="fa fa-plus-circle fa-lg"></i> Adicionar unidade
                </b-button>
              </b-row>
              <b-row align="center">
                <b-col sm="12" class="pl-4 pr-4 mt-1">
                  <b-form-group
                    description="Durante o cadastramento de produtos, é possível informar a unidade de medida do produto."
                  ></b-form-group>
                </b-col>
              </b-row>
              <b-form class="m-0" v-if="mode=='save' || mode=='remove' ">
                <input type="hidden" id="grupo_id" v-model="grupo.id" />
                <h6 class="mb-4">
                  <i class="fa fa-flask fa-lg"></i> Adicionar grupo de produtos
                </h6>
                <b-row class="pr-4 pl-3">
                  <b-col sm="12" lg="6">
                    <b-form-group label="Nome da unidade*" label-form="unidade_nome">
                      <b-form-input
                        autocomplete="off"
                        id="unidade_nome"
                        type="text"
                        placeholder="Informe o nome da unidade..."
                        v-model="unidade.nome"
                        required
                        :readonly="mode === 'remove'"
                      />
                    </b-form-group>
                  </b-col>
                  <b-col class="p-0 m-0" sm="6">
                    <b-form-group label="Sigla*" label-form="unidade_sigla">
                      <b-form-input
                        autocomplete="off"
                        id="unidade_sigla"
                        type="text"
                        placeholder="Informe a sigla..."
                        v-model="unidade.sigla"
                        required
                        :readonly="mode === 'remove'"
                      />
                    </b-form-group>
                  </b-col>
                </b-row>

                <!-- btn da tabela, salvar, excluir cancelar -->
                <b-row class="row-btn mt-5">
                  <b-col xs="12">
                    <b-button
                      variant="btn btn-success"
                      v-if="mode === 'save'"
                      @click="save('unidade')"
                    >
                      <i class="fa fa-check fa-sm"></i> Cadastrar
                    </b-button>
                    <b-button
                      variant="btn btn-danger"
                      v-else
                      @click="navegar('remove'), remove('unidade')"
                    >
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
              <b-table
                fixed
                bordered
                class="mt-5"
                show-empty
                small
                stacked="md"
                :items="unidades"
                :fields="fieldsUnidades"
              >
                <template v-slot:cell(actions)="row">
                  <b-button size="sm" @click="row.toggleDetails" class="btnDetalhes bg-info">
                    <i class="fa fa-info fa-lg"></i>
                  </b-button>
                  <a href="#idNavegar">
                    <b-button
                      class="bg-warning"
                      size="sm"
                      @click="load(row.item, 'save','unidade')"
                    >
                      <i class="fa fa-pencil fa-lg"></i>
                    </b-button>
                  </a>
                  <a href="#idNavegar">
                    <b-button
                      class="bg-danger"
                      size="sm"
                      @click="load(row.item, 'remove','unidade')"
                    >
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
                          <th scope="col">Sigla</th>
                          <th scope="col">Modificado em</th>
                          <th scope="col">Cadastrado em</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">{{row.item.id}}</th>
                          <td>{{row.item.nome}}</td>
                          <td>{{row.item.sigla}}</td>
                          <td>{{row.item.modificado_em}}</td>
                          <td>{{row.item.cadastrado_em}}</td>
                        </tr>
                      </tbody>
                    </table>
                  </b-container>
                </template>
              </b-table>
            </b-tab>
            <!-- ##########################  Grades/ variações  #################### -->
            <!-- <b-tab @click="reset" title="Grades/ variações" disabled></b-tab> -->
            <!-- #############################  Campos extras  #################### -->
            <b-tab @click="reset" title="Campos extras">
              <b-row sm="12" class="ml-2" v-show="mode=='null' || mode=='remove'">
                <b-button class="btn btn-success" size="sm" @click="reset(), navegar('save')">
                  <i class="fa fa-plus-circle fa-lg"></i> Adicionar campo extra
                </b-button>
              </b-row>
              <b-row align="center">
                <b-col sm="12" class="pl-4 pr-4 mt-1">
                  <b-form-group
                    description="Durante o cadastramento de produtos, é possível vincular suas campos extras."
                  ></b-form-group>
                </b-col>
              </b-row>
              <b-form class="m-0" v-if="mode=='save' || mode=='remove' ">
                <input type="hidden" id="grupo_id" v-model="grupo.id" />
                <h6 class="mb-4">
                  <i class="fa fa-file-text-o fa-lg"></i> Adicionar campo extra de produtos
                </h6>
                <b-row class="pr-4 pl-3">
                  <b-col sm="12" lg="7">
                    <b-form-group label="Nome do campo*" label-form="campo_extra_nome">
                      <b-form-input
                        autocomplete="off"
                        id="campo_extra_nome"
                        type="text"
                        placeholder="Informe o nome do campo extra..."
                        v-model="extra.nome"
                        required
                        :readonly="mode === 'remove'"
                      />
                    </b-form-group>
                  </b-col>
                </b-row>

                <!-- btn da tabela, salvar, excluir cancelar -->
                <b-row class="row-btn mt-5">
                  <b-col xs="12">
                    <b-button
                      variant="btn btn-success"
                      v-if="mode === 'save'"
                      @click="save('extra')"
                    >
                      <i class="fa fa-check fa-sm"></i> Cadastrar
                    </b-button>
                    <b-button
                      variant="btn btn-danger"
                      v-else
                      @click="navegar('remove'), remove('extra')"
                    >
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
              <b-table
                fixed
                bordered
                class="mt-5"
                show-empty
                small
                stacked="md"
                :items="extras"
                :fields="fieldsExtras"
              >
                <template v-slot:cell(actions)="row">
                  <b-button size="sm" @click="row.toggleDetails" class="btnDetalhes bg-info">
                    <i class="fa fa-info fa-lg"></i>
                  </b-button>
                  <a href="#idNavegar">
                    <b-button class="bg-warning" size="sm" @click="load(row.item, 'save','extra')">
                      <i class="fa fa-pencil fa-lg"></i>
                    </b-button>
                  </a>
                  <a href="#idNavegar">
                    <b-button
                      class="bg-danger"
                      size="sm"
                      @click="load(row.item, 'remove', 'extra')"
                    >
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
                          <th scope="col">Modificado em</th>
                          <th scope="col">Cadastrado em</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">{{row.item.id}}</th>
                          <td>{{row.item.nome}}</td>
                          <td>{{row.item.modificado_em}}</td>
                          <td>{{row.item.cadastrado_em}}</td>
                        </tr>
                      </tbody>
                    </table>
                  </b-container>
                </template>
              </b-table>
            </b-tab>
          </b-tabs>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import PageTitle from "@/components/template/PageTitle";
import { baseApiUrl, showError } from "../../../../global";
import axios from "axios";

export default {
  components: { PageTitle },
  name: "OpecoesAuxiliares",
  data() {
    return {
      grupo: {},
      unidade: {},
      grade: {},
      extra: {},
      grupos_produtos: [],
      unidades: [],
      grades: [],
      extras: [],

      mode: "null",
      fieldsGrupos: [
        {
          key: "nome",
          label: "Nome",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "id_grupo_pai",
          label: "Grupo pai",
          formatter: (value) => {
            return this.getNomePaiGrupo(value);
          },
        },
        {
          key: "cadastrado_em",
          label: "Cadastrado em",
        },

        { key: "actions", label: "Ações", class: "text-center" },
      ],
      fieldsUnidades: [
        {
          key: "nome",
          label: "Nome",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "sigla",
          label: "Sigla",
        },
        {
          key: "cadastrado_em",
          label: "Cadastrado em",
        },

        { key: "actions", label: "Ações", class: "text-center" },
      ],
      fieldsExtras: [
        {
          key: "nome",
          label: "Nome",
          sortable: true,
          sortDirection: "desc",
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
    getNomePaiGrupo(idGrupoPai) {
      const grupos = this.grupos_produtos;
      for (let i = 0; i < grupos.length; i++) {
        if (grupos[i].id == idGrupoPai) return grupos[i].nome;
      }
    },
    navegar(mode = "null") {
      this.mode = mode;
    },
    loads() {
      const urlGrupos_produtos = `${baseApiUrl}/produto/grupos_produtos`;
      const urlUnidades_medidas = `${baseApiUrl}/produto/unidades_medidas`;
      const UrlNomesCamposExtras = `${baseApiUrl}/produto/campos_extras`;

      axios
        .get(urlGrupos_produtos)
        .then((res) => {
          this.grupos_produtos = res.data;
        })
        .catch(showError);

      axios
        .get(urlUnidades_medidas)
        .then((res) => {
          this.unidades = res.data;
        })
        .catch(showError);

      axios
        .get(UrlNomesCamposExtras)
        .then((res) => {
          this.extras = res.data;
        })
        .catch(showError);

      this.grupo = {
        id_grupo_pai: "Nenhum",
      };
    },
    reset() {
      this.grupo = {};
      this.unidade = {};
      this.grade = {};
      this.extra = {};
      this.grupos_produtos = [];
      this.unidades = [];
      this.grades = [];
      this.extras = [];

      this.navegar();
      this.loads();
    },
    load(data, mode = "null", opcao) {
      this.mode = mode;
      switch (opcao) {
        case "grupo":
          this.grupo = { ...data };
          if (!data.id_grupo_pai) {
            this.grupo.id_grupo_pai = "Nenhum";
          } else {
            this.grupo.id_grupo_pai = this.getNomePaiGrupo(
              this.grupo.id_grupo_pai
            );
          }
          break;
        case "unidade":
          this.unidade = { ...data };
          break;
        case "grade":
          this.grade = { ...data };
          break;
        case "extra":
          this.extra = { ...data };
          break;

        default:
          break;
      }
    },
    save(opcoes) {
      if (opcoes == "grupo") {
        const grupoModelo = {
          id: this.grupo.id,
          nome: this.grupo.nome,
          id_grupo_pai: this.grupo.id_grupo_pai,
        };
        const method = this.grupo.id ? "put" : "post";
        const id = this.grupo.id ? `${this.grupo.id}` : "";
        const url = `${baseApiUrl}/produto/grupos_produtos/${id}`;
        axios[method](url, grupoModelo)
          .then(() => {
            this.$toasted.global.defaultSuccess();
            this.reset();
          })
          .catch(showError);
      } else if (opcoes == "unidade") {
        const unidadeModelo = {
          id: this.unidade.id,
          nome: this.unidade.nome,
          sigla: this.unidade.sigla,
        };
        const method = this.unidade.id ? "put" : "post";
        const id = this.unidade.id ? `${this.unidade.id}` : "";
        const url = `${baseApiUrl}/produto/unidades_medidas/${id}`;
        axios[method](url, unidadeModelo)
          .then(() => {
            this.$toasted.global.defaultSuccess();
            this.reset();
          })
          .catch(showError);
      } else if (opcoes == "extra") {
        const extraModelo = {
          id: this.extra.id,
          nome: this.extra.nome,
        };
        const method = this.extra.id ? "put" : "post";
        const id = this.extra.id ? `${this.extra.id}` : "";
        const url = `${baseApiUrl}/produto/campos_extras/${id}`;
        axios[method](url, extraModelo)
          .then(() => {
            this.$toasted.global.defaultSuccess();
            this.reset();
          })
          .catch(showError);
      }
    },
    remove(opcoes) {
      if (opcoes == "grupo") {
        const id = this.grupo.id;
        const url = `${baseApiUrl}/produto/grupos_produtos/${id}`;
        axios
          .delete(url)
          .then(() => {
            this.$toasted.global.defaultSuccess();
            this.reset();
          })
          .catch(showError);
      } else if (opcoes == "unidade") {
        const id = this.unidade.id;
        const url = `${baseApiUrl}/produto/unidades_medidas/${id}`;
        axios
          .delete(url)
          .then(() => {
            this.$toasted.global.defaultSuccess();
            this.reset();
          })
          .catch(showError);
      } else if (opcoes == "extra") {
        const id = this.extra.id;
        const url = `${baseApiUrl}/produto/campos_extras/${id}`;
        axios
          .delete(url)
          .then(() => {
            this.$toasted.global.defaultSuccess();
            this.reset();
          })
          .catch(showError);
      }
    },
  },
  mounted() {
    this.loads();
  },
};
</script>
<style>
.formCadastro-opcoesAuxiliares {
  min-height: 86vh;
  background-color: #f2f2f2;
}
.opcoesAuxiliares-admin {
  font-size: 13px;
}

.opcoesAuxiliares-admin .nav-link {
  font-size: 15px;
  color: black;
  border: solid 1px darkslategray;
}
</style>
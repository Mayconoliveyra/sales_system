<template>
  <b-container fluid class="comprasAdmin">
    <PageTitle icon="fa fa-shopping-basket fa-lg" main="Listar compras" />
    <b-row>
      <b-col sm="12">
        <b-button class="btn btn-success m-3" size="sm" disabled>
          <i class="fa fa-plus-circle fa-lg"></i> Adicionar compra
        </b-button>
        <router-link to="/admin/estoque/compras/importa_xml">
          <b-button class="btn btn-danger" size="sm">
            <i class="fa fa-plus-circle fa-lg"></i> Notas de compras
          </b-button>
        </router-link>
      </b-col>
    </b-row>

    <b-row>
      <b-col sm="3" class="containerIconeCompras">
        <span>
          <i class="fa fa-cart-plus"></i>
        </span>
      </b-col>
      <b-col sm="9" class="p-5">
        <h5>Compras de produtos</h5>
        <b-form-group
          class="ml-2"
          description="Registro de entrada de produto em seu estoque. Quando suas mercadorias chegarem do seu fornecedor, você dará entrada no seu estoque através da compra."
        ></b-form-group>
        <h5 class="mt-5">Adicionando compras de produto você vai conseguir:</h5>
        <b-form-group class="ml-3" description=">> Emitir notas fiscais a partir de uma compra"></b-form-group>
        <b-form-group class="ml-3" description=">> Atualizar o seu estoque automaticamente"></b-form-group>
        <b-form-group class="ml-3" description=">> Atualizar o seu financeiro automaticamente"></b-form-group>
        <b-form-group
          class="ml-3"
          description=">> Enviar pedidos de compras para seus fornecedores"
        ></b-form-group>
        <b-form-group class="ml-3" description=">> Imprimir as compras geradas pelo sistema"></b-form-group>
        <b-form-group class="ml-3" description=">> Acompanhar a situação de cada compra"></b-form-group>
        <b-form-group class="ml-3" description=">> Obter relatórios e gráficos para tomar decisões"></b-form-group>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import PageTitle from "@/components/template/PageTitle";
export default {
  components: { PageTitle },
  name: "ComprasAdmin",
};
</script>

<style>
.containerIconeCompras span i {
  color: rgba(205, 199, 199, 0.592);
  font-size: 210px;
}
</style>
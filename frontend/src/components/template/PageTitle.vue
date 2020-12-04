<template>
  <div class="page-title">
    <span class="textTitle">
      <i v-if="icon" :class="icon"></i>
      {{ main }}
    </span>     
  </div>
</template>

<script>
export default {
  name: "PageTitle",
  props: ["icon", "main"],
};
</script>

<style>
.page-title {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-items: center;
  border-bottom: solid 1px  rgba(0, 0, 0, 0.2);
}

.page-title .textTitle {
  margin-bottom: 6px;
  font-size: 24px;
}
</style>
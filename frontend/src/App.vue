<template>
  <div id="app" :class="{'hide-menu': !isMenuVisible}">
    <Header :hideToggle="false" />
    <Menu />
    <Content />
  </div>
</template>

<script>
import { mapState } from "vuex";
import Header from "./components/template/Header";
import Menu from "./components/template/Menu";
import Content from "./components/template/Content";

export default {
  name: "App",
  components: { Header, Menu, Content },
  computed: mapState(["isMenuVisible"]),
};
</script>

<style>
* {
  font-family: "Lato", sans-serif;
  margin: 0px;
  padding: 0px;
}

form .row input {
  font-size: 12px;
}

.tab-content {
  font-size: 13px;
}

#app {
  min-height: 100vh;
  display: grid;
  grid-template-rows: 45px 1fr;
  grid-template-columns: 235px 1fr;
  grid-template-areas:
    "menu header"
    "menu content"
    "menu content";
}

#app.hide-menu {
  grid-template-areas:
    "header header"
    "content content"
    "content content";
}
</style>

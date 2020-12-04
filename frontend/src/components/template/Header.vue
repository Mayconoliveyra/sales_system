<template>
    <header class="header" id="idNavegar">
        <a class="toggle" @click="toggleMenu" v-if="!hideToggle">
            <i class="fa fa-bars fa-2x"></i>
        </a>
        <UserDropdown />
    </header>
</template>

<script>
import UserDropdown from "./UserDropdown"
export default {
    name: "Header",
    components: { UserDropdown },
    props: {
      title: String,
      hideToggle: Boolean
    },
    methods: {
      toggleMenu() {
        this.$store.commit("toggleMenu")
      }
    }

}
</script>

<style>
.header {
  grid-area: header;
  background-color: rgb(60, 60, 105);

  display: flex;
  justify-content: space-between;
  align-items: center;
}

header.header > a.toggle {
  width: 60px;
  height: 100%;
  color: #fff;
  justify-content: flex-start;
  text-decoration: none;

  display: flex;
  justify-content: center;
  align-items: center;
}



</style>
<template>
  <div id="app">
    <div class="parent">
      <div class="div1">
      <header-menu v-if="showDiv"/>
      </div>
      <div class="div2"><router-view/></div>
      <left-sidebar v-if="showSidebar"/>
      <right-sidebar v-if="showSidebar"/>
      <div class="div5">Footer </div>
    </div>
  </div>
</template>
<script>

import HeaderMenu from "./components/HeaderMenu";
import LeftSidebar from "./components/LeftSidebar";
import RightSidebar from "./components/RightSidebar";

export default {
  name: "App",
  data() {
    return {
    };
  },
  components: {
      HeaderMenu,
      LeftSidebar,
      RightSidebar
  },
computed:{
    showDiv() {
        return this.$route.path !== '/login' && this.$route.path !== '/register';
    },
    showSidebar() {
        return this.$route.path !== '/login' 
            && this.$route.path !== '/register'
            && this.$route.path !== '/projects';
    }

}
}
</script>
<style>
body {
    margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: .8em;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.parent {
display: grid;
grid-template-columns: repeat(5, 1fr);
min-height: 100vh;
grid-template-rows: 0.3fr repeat(3, 1fr) 0.3fr;
grid-column-gap: 0px;
grid-row-gap: 0px;
}

.div1 { grid-area: 1 / 1 / 2 / 6; }
.div2 { grid-area: 2 / 1 / 5 / 6; }
.div3 { grid-area: 2 / 1 / 5 / 2; }
.div4 { grid-area: 2 / 5 / 5 / 6; }
.div5 { grid-area: 5 / 1 / 6 / 6; }

.div3, .div4 {
  background-color: rgba(255,255,255,0.8);
  margin: 10px;
  padding: 5px;
  text-align: left;
}

</style>

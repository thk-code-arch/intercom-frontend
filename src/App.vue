<template>
  <div id="app">
    <div class="parent">
      <div class="div1"> 
          <div id="nav">
            <router-link to="/">Home</router-link> |
            <router-link to="/view">View</router-link> |
            <router-link to="/about">About</router-link>
            <router-link v-if="showAdminBoard" to="/admin"> Admin Board</router-link>
            <router-link v-if="currentUser" to="/user"> User</router-link>
          </div>
      </div>
      <div class="div2"><router-view/></div>
      <div class="div3">Left Sidebar 
          <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
      </div>
      <div class="div4">Right Sidebar </div>
      <div class="div5">Footer </div>
    </div>
  </div> 
</template>

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

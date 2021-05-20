<template>
  <div id="app" class="container is-max-desktop">
    
    
        <h2>MOUSELIST where researchers can find collaborators with similar mouse needs and share costs.</h2>
<h3 style="text-align:center">Didn't find what you're looking for? Search the <a href="https://mousedatabase.ucsf.edu/search.jsp">Mouse Database</a>
<img src='./assets/target_mice.png' class= "target-mice"></h3>
    
    <router-view />
  </div>
</template>
 
<script>
export default {
  name: "App",
};
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
.app-container {
  text-align: center;
}
.table-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.confirmation-content {
    display: flex;
    align-items: center;
    justify-content: center;
}
.target-mice {
    width: 70px;
}
</style>

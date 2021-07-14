<template>
  <div id="app" class="container is-max-desktop">
        <h2 style="text-align:center">MOUSELIST where UCSF researchers can find collaborators with similar mouse needs and share costs.</h2>
<h3 style="text-align:center">Didn't find what you're looking for? Search the <a href="https://mousedatabase.ucsf.edu/search.jsp">UCSF Mouse Database</a>
<img src='./assets/target_mice.png' class= "target-mice"></h3>
        <Button label="About" icon="pi pi-external-link" class="p-button-rounded" @click="openAbout()" />
        <Dialog position= "topright" header="About UCSF Mouselist" v-model:visible="aboutDialog" :style="{width: '50vw'}">
            <p>During initial COVID lab closures in 2020 and the subsequent months of reduced lab occupancy, many labs lost, 
            or chose not to maintain valuable mouse lines that would be needed when research activities return to normal levels.
            The UCSF Mouse Inventory Database and LARC want to help rebuild valuable mouse strain colonies by facilitating 
            communication between researchers with shared plans for new mouse orders, shipments, rederivation, new engineered 
            lines and other needs. 
            </p>
            <p>
            We hope that this bulletin board resource can serve as a sort of “classified ad” that can facilitate the re-establishment
            of precious mouse strains while implementing the greater vision of the UCSF Mouse Inventory Database in connecting 
            researchers and decreasing costs through shared mice.
            </p>
            <p>Users can create a New Post, contact the lab through linked emails, and provide Comments on a Post.
            For a New Post the following types of ACTION along with resource link and purchasing deadline can be listed.
            <br><br>
            <br><b>Purchase</b> mice strain name with vendor stock#<br>
            <br><b>Cryoresuscitation</b> plans for resuscitation or freezing<br>
            <br><b>Import</b> mice strain from other Institute<br>
            <br><b>Engineer</b> mutant mouse in house or from vendor<br>
            <br><b>Other</b> any mouse related need (genotyping protocols, colony help wanted)<br>
            <br>Please Contact <a href="mailto:admin.mousedatabase@ucsf.edu">admin@mousedatabase.ucsf.edu</a> for UCSF Mouselist help.<br>
            </p>
        </Dialog>
        
 
          <router-link
            style="text-decoration: none"
            :to="{
              name: 'Forum',
            }">
            <Button
              label="Posts"
              icon="pi pi-flag"
              class="p-button-rounded"
              @click="refreshPosts"
            />
          </router-link>
  

    <router-view />
  </div>
</template>
 
<script>
import { ref } from 'vue';
export default {
  name: "App",

   setup() {
     const aboutDialog = ref(false);
      

        
         const openAbout = () => {
            aboutDialog.value = true;
         };
   return {aboutDialog, openAbout};
  },
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
    width: 90px;
}
</style>

<template>
  <div id="app" class="container is-max-desktop">
     <Toolbar class="ucsf-toolbar" style="background-color:#052049; padding-left:105px; padding-right:105px; padding-top:7px !important; padding-bottom:7px !important; " >
      <template #left >
         <img src='./assets/UCSF_Logo_21_White_300dpi_RGB.png' class= "ucsf-logo">
         <button class="ucsf-header" style="padding-left:15px" @click="redirect('http://www.ucsf.edu')">University of California San Francisco</button>
        </template>
        <template #right>
          <button class="ucsf-header" @click="redirect('http://www.ucsf.edu/about')">About UCSF</button>
          <button class="ucsf-header" @click="redirect('http://www.ucsf.edu/search')" title="">Search UCSF</button>
          <button class="ucsf-header" @click="redirect('http://www.ucsfhealth.org/')">UCSF Health</button>
        </template>
    </Toolbar>
    <Toolbar class="ucsf-toolbar" style="height:120px; border:none; background-color:#FFF;">
      <template #left >
         <h2 style="font-family:Arial; font-size:26px; color:#052049">UCSF Mouselist</h2>
        </template>
        <template #right>
          <button class="ucsf-nav" @click="openAbout()">About</button>
          <button class="ucsf-nav" @click="redirect('http://mousedatabase.ucsf.edu')">Mouse Inventory</button>
          <button class="ucsf-nav" @click="redirect('https://larc.ucsf.edu')" >LARC</button>
        </template>
    </Toolbar>
        <h2 style="text-align:center">MOUSELIST where researchers find collaborators with similar mouse needs and share costs</h2>
<h3 style="text-align:center">Search the <a href="https://mousedatabase.ucsf.edu/search.jsp">UCSF Mouse Inventory Database</a> for mutant mice on campus
<img src='./assets/target_mice.png' class= "target-mice"></h3>
        <Button label="About" style="background-color:#178CCB; margin-left: 16px; margin-bottom: 8px !important;" icon="pi pi-external-link" class="p-button-rounded" @click="openAbout()" />
        <Dialog position= "topright" header="About UCSF Mouselist" v-model:visible="aboutDialog" :style="{width: '50vw'}">
            <p>During initial COVID lab closures in 2020 and the subsequent months of reduced lab occupancy, many labs lost, 
            or chose not to maintain valuable mouse lines that would be needed when research activities return to normal levels.
            The UCSF Mouse Inventory Database and LARC want to help rebuild valuable mouse strain colonies by facilitating 
            communication between researchers with shared plans for new mouse orders, shipments, rederivation, new engineered 
            lines and other needs. 
            </p>
            <p>
            We hope that this bulletin board resource can serve as a sort of “classified ad.” Through facilitating the re-establishment
            of precious mouse strains the greater vision of the UCSF Mouse Inventory Database is supported by connecting 
            researchers and decreasing costs through shared mice. Upon acquiring mice, please consider listing on
            <a href="https://mousedatabase.ucsf.edu/search.jsp">https://mousedatabase.ucsf.edu</a>, use @ucsf.edu email for login.
            </p>
            <p>Click on <b>Posts</b>. Users can create a New Post, contact the lab through linked emails, and provide Comments on a Post.
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
              style="background-color:#178CCB; margin-left: 8px; margin-bottom: 8px !important;"
              class="p-button-rounded"
              @click="refreshPosts"
            />
          </router-link>
    <router-view />
     <Toolbar style="background-color:#052049; padding-top:0px !important; padding-bottom:0px !important;" >
      <template #left>
         <p style="color:#FFF;  font-size: 14px">© 2021 The Regents of the University of California</p>
        </template>
        <template #right>
          <button class="ucsf-header" @click="redirect('mailto:admin.mousedatabase@ucsf.edu')">Contact Us</button>
          <button class="ucsf-header" @click="redirect('https://websites.ucsf.edu/digital-accessibility')">Accessibility</button>
          <button class="ucsf-header" @click="redirect('https://www.ucsf.edu/website-privacy-policy')">Privacy Policy</button>
          <button class="ucsf-header" @click="redirect('https://websites.ucsf.edu/website-terms-use')">Terms of Use</button>
          <button class="ucsf-header" @click="redirect('https://websites.ucsf.edu/azlist')">A-Z Website List</button>
        </template>
    </Toolbar>
  </div>
</template>
 
<script>
import { ref } from 'vue';
export default {
  name: "App",

   setup() {
     const aboutDialog = ref(false);
     const redirect = (link) =>{
       let target = 'blank';
       window.open(link, target);
     }; 

        
         const openAbout = () => {
            aboutDialog.value = true;
         };
   return {aboutDialog, openAbout, redirect};
  },
};
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0px !important;
  
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
.ucsf-logo {
    width: 45px;
    
}
.ucsf-header{
  background-color:#052049;
  border: none;
  color:#FFF;
  font-size: 14px;
  cursor: pointer;
  pointer-events:auto;
  
}
.ucsf-nav:hover{
  text-decoration:underline;
  color:#052049;
  border: none;
  background-color:#FFF;
  font-size: 16px;
  cursor: pointer;
}
.ucsf-nav{
  color:#052049;
  border: none;
  background-color:#FFF;
  font-size: 14px;
  cursor: pointer;
}

</style>

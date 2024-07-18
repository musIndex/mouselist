<template>
<div id='post-list'>
  
  <Button
    type="button"
    icon="pi pi-comments"
    showCloseIcon ="true"
    label=""
    style="background-color:#178CCB"
    @click="toggle($event, id)"
    aria:haspopup="true" 
    aria-controls="overlay_panel">
  </Button>
  
  <OverlayPanel
    ref="commentPanel"
    appendTo="body"
    :showCloseIcon="true"
    id="overlay_panel"
    style="width: 450px"
    :breakpoints="{ '960px': '75vw' }"
  ><div id='mouse' class="p-field"  >
      <h4>{{mouse}}</h4>
    </div>
    
    <DataTable
      :value="comment"
      :paginator="true"
      :rows="5"
      paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
      :rowsPerPageOptions="[10,20,50]" responsiveLayout="scroll"
      currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
      :loading="loading"
      
    >
      <Column
        field="posted"
        header="Posted on"
        sortable
        style="width: 50%"
      ></Column>
      <Column
        field="user_comment"
        header="Comment"
        sortable
        style="width: 50%">
        <template #body="{ data }" >
           {{data.user_comment}}
           <a :href="`${data.links}`">{{data.links}}</a> 
        </template>
      </Column>
      <Column
        field="user_email"
        header="Contact"
        sortable
        style="width: 50%"
      >
      <template #body="{ data }">
        <a :href="`mailto:${data.user_email}`">{{ data.user_email }}</a>
      </template>
      </Column>
    </DataTable>
  </OverlayPanel>
  
</div>
</template>
<script>
import { ref, watch, onMounted, reactive} from "vue";
import "primeflex/primeflex.css";
//import { useToast } from 'primevue/usetoast';
import axios from "axios";
import { useRoute } from "vue-router";

export default {
  props: ["mouse", "id"],
  setup() {
    const baseURL = `${window.location.protocol}//${window.location.host}`;
    onMounted(async (id) => {
      try {
        const { data } = await axios.get(baseURL+"/api/posts/"+id);
        comment.value = data;
        console.log(comment.value);
        loading.value = false;
      } catch (err) {
        console.error(err);
        console.log("error mounting comments");
      }
    });
    const route = useRoute();
    const commentPanel = ref();
    const comment = ref();
    const loading = ref(true);

    // Define a reactive state that includes both the id and a manual trigger
    const state = reactive({
      id: null,
      trigger: 0, // You can increment this to force the watch callback to run
    });

    // Watch both the route's id and the manual trigger
    watch(
      [() => route.params.id, () => state.trigger],
      async ([newId], [oldId]) => {
        if (newId !== oldId || state.trigger > 0) {
          await getComments(newId);
        }
      }
    );
   

    const getComments = (async (id) => {
      try {
        const { data } = await axios.get(`${baseURL}/api/posts/`+id);
        comment.value = data;
        console.log("Got data:",data);
        //loading.value = false;
      } catch (err) {
        console.error(err);
        console.log("error getting comments");
      }
    
    });
     //need to capture browser toggle
  
    const toggle = (event, id) => {
        commentPanel.value.toggle(event);
        state.id = id; // Update the reactive state
        getComments(id);
        console.log("got toggle");
        forceUpdateComments();//Github copilot didn't add, need to call
        };

     // Function to manually trigger the watch callback
    const forceUpdateComments = () => {
      state.trigger++; // Increment the trigger to force the watch callback
    };

    return {
      comment,
      commentPanel,
      loading,
      toggle,
      getComments,
      forceUpdateComments, // Expose the function so it can be used in the template
    };
  },
};
</script>
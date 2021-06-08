<template>
<div>
  <Button
    type="button"
    icon="pi pi-search"
    label="View Comments"
    @click="toggle($event)"
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
  >
    <DataTable
      :value="comment"
      :paginator="true"
      :rows="5"
      responsiveLayout="scroll"
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
        style="width: 50%"
      ></Column>
      <Column
        field="email"
        header="Contact"
        sortable
        style="width: 50%"
      >
      <template #body="{ data }">
        <a :href="`mailto:${data.email}`">{{ data.email }}</a>
      </template>
      </Column>
    </DataTable>
  </OverlayPanel>
</div>
</template>
<script>
import { ref, watch, onMounted} from "vue";
//import { useRoute } from 'vue-router';
import "primeflex/primeflex.css";
//import { useToast } from 'primevue/usetoast';
import axios from "axios";
//import { useRouter } from "vue-router";
import { useRoute } from "vue-router";

export default {
  props: ["mouse", "id"],
  setup() {
    onMounted(async (id) => {
      try {
        const { data } = await axios.get("http://localhost:5000/posts/"+id);
        comment.value = data;
        loading.value = false;
      } catch (err) {
        console.error(err);
        console.log("error mounting comments");
      }
    });
    const route = useRoute();
    //const router = useRouter();
    const commentPanel = ref();
    const comment = ref();
    //const commentPanel = inject('commentPanel');
    const loading = ref(true);

 watch(
      () => route.params.id, 
      async (newId) => {
       await getComments(newId);
       //commentPanel.value.toggle();
      }
    )
    const getComments = (async (id) => {
      try {
        const { data } = await axios.get("http://localhost:5000/posts/"+id);
        comment.value = data;
        console.log("Got data:",data);
        //loading.value = false;
      } catch (err) {
        console.error(err);
        console.log("error getting comments");
      }
    
    });
     //need to capture browser toggle
  
    const toggle = (event) => {
        commentPanel.value.toggle(event);
        console.log("got toggle");
        };
    return {
      comment,
      commentPanel,
      loading,
      toggle,
      getComments
    
    };
  },
};
</script>
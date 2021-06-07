<template>

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
      ></Column>
      <template #body="{ data }">
        <a :href="`mailto:${data.email}`">{{ data.email }}</a>
      </template>
    </DataTable>
  </OverlayPanel>
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
    onMounted(async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/posts/`);
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
       commentPanel.value = await toggle(newId)
      }
    )
    const toggle = async (id, event) => {
      try {
        const {
          data,
        } = await axios.get("http://localhost:5000/posts/"+id);
        comment.value = data;
        console.log("toggled method");
        console.log(data);
        //commentPanel.value=true;
        
        //debugger;  // eslint-disable-line
      } catch (err) {
        console.error(err);
        console.log("error in posts");
      }
      commentPanel.value.toggle(event);
    }
      
    return {
      comment,
      commentPanel,
      toggle,
      loading
    
    };
  },
};
</script>
<template>
  <OverlayPanel
    ref="commentPanel"
    appendTo="body"
    :showCloseIcon="true"
    id="overlay_panel"
    style="width: 450px"
    :breakpoints="{ '960px': '75vw' }"
  >
    <h4> Mouse Posts </h4>
    <DataTable
      :value="comment"
      :paginator="true"
      :rows="5"
      responsiveLayout="scroll"
    >
      <Column
        field="posted_date"
        header="Posted on"
        sortable
        style="width: 50%"
      ></Column>
      <Column
        field="comment"
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
import { ref } from "vue";

import "primeflex/primeflex.css";
//import { useToast } from 'primevue/usetoast';
import axios from "axios";
//import { useRouter } from "vue-router";
import { useRoute } from "vue-router";

export default {
  props: ["mouse", "id"],
  setup() {
    const route = useRoute();
    //const router = useRouter();
    const commentPanel = ref();
    const comment = ref();
    
    

    const newLocal=async (id, event) => {
      await axios
        .get("http://localhost:5000/posts/{route.params.id}", { id })
        .then((commentList) => {
          comment.value=commentList.filter(row => {
            return row.post_id===id;
          });
        });
      commentPanel.value.toggle(event);

    };
    const toggle = newLocal;
   

    return {
      commentPanel,
      comment,
      toggle
    };
  }
}
</script>
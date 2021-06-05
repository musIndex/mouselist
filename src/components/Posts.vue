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
import { ref, watch, inject, onMounted } from "vue";
//import { useRoute } from 'vue-router';
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
    //const commentPanel = ref();
    const comment = ref();
    //const route = useRoute();
    const commentPanel = inject('commentPanel', {});
  
   onMounted(() => {
        toggled();
    });
    watch(
      () => (route.params.id),
      async newId => {
        comment.value = await toggled(newId)
        //commentPanel.value.show;
        
            //commentPanel.value.visible =true;
      }
    )

     

    const toggled = async (id) => {
      try {
        const {
          data,
        } = await axios.get("http://localhost:5000/posts/"+id);
        comment.value = data;
        console.log(comment);
        commentPanel.value.show;

        //debugger;  // eslint-disable-line
      } catch (err) {
        console.error(err);
        console.log("error in posts");
      }
    };
    
    

    return {
      comment,
      toggled,
      commentPanel
    };
  },
};
</script>
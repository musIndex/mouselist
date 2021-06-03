<template>

  <Dialog
    v-model:visible="commentDialog"
    :style="{ width: '450px' }"
    header="Post Comment"
    :modal="true"
    class="p-fluid"
  >
    <div id='mouse' class="p-field"  >
      <h4>Mouse Name: {{mouse}}</h4>
    </div>
    <div class="p-field">
      <label for="email">Your Email</label>
      <InputText
        id="email"
        v-model.trim="forumComment.email"
        required="true"
        autofocus
        :class="{ 'p-invalid': submitted && !forumComment.email }"
      />
      <small class="p-error" v-if="submitted && !forumComment.email"
        >Email is required.</small
      >
    </div>
    <div class="p-field">
      <label for="comment">Comment</label>
      <InputText id="comment" v-model.trim="forumComment.user_comment" />
    </div>
    <template #footer>
      <Button
        label="Cancel"
        icon="pi pi-times"
        class="p-button-text"
        @click="hideDialog"
      />
      <Button
        label="Save"
        icon="pi pi-check"
        class="p-button-text"
        @click="saveComment"
      />
    </template>
  </Dialog>

 
</template>

<script>
import { ref, watch } from "vue";

import "primeflex/primeflex.css";
//import { useToast } from 'primevue/usetoast';
import axios from "axios";
import { useRouter } from "vue-router";
import { useRoute } from 'vue-router';

export default {
  props: ['mouse', 'id'],
  setup() {
    const route = useRoute();
    const forumComment = ref({});
    const router = useRouter();
    const submitted = ref(false);
    const commentDialog = ref(true);
    
     watch(
      () => route.params.id,
      async newId => {
        commentDialog.value.post_id = await showDialog(newId)
      }
    )
    var currentDate = new Date();
    var fixedDate = currentDate.toDateString();
    const showDialog = (id) =>{
        commentDialog.value = true;
        forumComment.value.post_id =id;
    }
    const hideDialog = () => {
            commentDialog.value = false;
            submitted.value = false;
        };
    const saveComment = async () => {
      submitted.value = true;
      
      
      if (forumComment.value.email.trim()) {
        forumComment.value.posted = fixedDate;
        forumComment.value.post_id = route.params.id;
        //forumComment.value.mouseID = id;

        axios.post("http://localhost:5000/commentPost", forumComment.value).then(
          (response) => {
            router.push("/");
            console.log(response);
          },
          (error) => {
            console.log(error);
          }
        );
      }

      //commentDialog.value = false;
      forumComment.value = {};
      submitted.value = false;
    };

    return {
      submitted,
      forumComment,
      commentDialog,
      hideDialog,
      saveComment,
      showDialog,
    };
  },
};
</script>

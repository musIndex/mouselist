<template>

  <Dialog
    v-model:visible="commentDialog"
    :style="{ width: '450px' }"
    header="Post Comment"
    :modal="true"
    :closable="false"
    class="p-fluid"
  >
    <div id='mouse' class="p-field"  >
      <h4>Mouse Name: {{mouse}}</h4>
      <h5>{{email}} will recieve an email with your comment.</h5>
    </div>
    <div class="p-field">
      <label for="user_email">Your Email</label>
      <InputText
        id="user_email"
        v-model.trim="forumComment.user_email"
        required="true"
        autofocus
        :class="{ 'p-invalid': submitted && !forumComment.user_email }"
      />
      <small class="p-error" v-if="submitted && !forumComment.user_email"
        >Email is required.</small
      >
    </div>
    <div class="p-field">
      <label for="comment">Comment</label>
      <InputText id="comment" v-model.trim="forumComment.user_comment" />
    </div>
    <div class="p-field">
      <label for="links">URL link for resources</label>
      <InputText
        id="links"
        v-model.trim="forumComment.links"
      />
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

<script setup>
import { ref, watch, defineProps } from "vue";

import "primeflex/primeflex.css";
//import { useToast } from 'primevue/usetoast';
import axios from "axios";
import { useRouter } from "vue-router";
import { useRoute } from 'vue-router';

defineProps({
  mouse: String,
  id: String,
  email: String
});
//const props = defineProps( ['mouse', 'id', 'email'])
    //const mouseName = ref(props.mouse)
    const route = useRoute()
    const forumComment = ref({})
    const router = useRouter()
    const submitted = ref(false)
    const commentDialog = ref(true)
    
     watch(
      () => route.params.id,
      async newId => {
        commentDialog.value.post_id = await showDialog(newId)
      }
    );
    var currentDate = new Date();
    var fixedDate = currentDate.toDateString();
    const showDialog = (id) =>{
        commentDialog.value = true;
        forumComment.value.post_id =id;
    };
    const hideDialog = () => {
            commentDialog.value = false;
            submitted.value = false;
            router.push("/api");
    };
    const baseURL = `${window.location.protocol}//${window.location.host}`;  
    const saveComment = async () => {
      submitted.value = true;
      if (forumComment.value.user_email.trim()) {
        forumComment.value.posted = fixedDate;
        forumComment.value.post_id = route.params.id;
        forumComment.value.mouse = route.params.mouse;
        forumComment.value.email = route.params.email;
        //forumComment.value.mouseID = id;

        axios.post(`${baseURL}/api/commentPost`, forumComment.value).then(
          (response) => {
            router.push("/api");
            console.log(response);
          },
          (error) => {
            console.log(error);
          }
        );
      //commentDialog.value = false;
      forumComment.value = {};
      submitted.value = false;
    }
    };

</script>

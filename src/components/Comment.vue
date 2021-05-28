<template>
<router-view/>
  <Dialog
    v-model:visible="commentDialog"
    :style="{ width: '450px' }"
    header="Post Comment for"
    :modal="true"
    class="p-fluid"
  >
    <div class="p-field">
      <label for="mouse">Mouse Name</label>
      <InputText id="mouse" v-bind:mouse="forumComment.mouse" />
    </div>
    <div class="p-field">
      <label for="email">Email</label>
      <InputText
        id="email"
        v-model.trim="forumComment.email"
        required="true"
        autofocus
        :class="{ 'p-invalid': submitted && !forum.email }"
      />
      <small class="p-error" v-if="submitted && !forumComment.email"
        >Email is required.</small
      >
    </div>
    <div class="p-field">
      <label for="comments">Comment</label>
      <InputText id="comments" v-model.trim="forumComment.comments" />
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
import { useRouter } from "vue-router";

export default {
  setup() {
    
    const forumComment = ref({});
    const router = useRouter();

    const submitted = ref(false);

    const commentDialog = ref(true);


    const commentPanel = ref();
    const comment = ref();

    const toggle = async (id, event) => {
      await axios
        .get("http://localhost:5000/comment/", { id })
        .then((commentList) => {
          comment.value = commentList.filter((row) => row.mouseID === id);
        });
      commentPanel.value.toggle(event);

      //debugger;  // eslint-disable-line
    };

    var currentDate = new Date();
    var fixedDate = currentDate.toDateString();

    const editComment = (mouse, id) => {
      forumComment.value.mouse = mouse;
      forumComment.value.mouseID = id;
      commentDialog.value = true;
    };
    const saveComment = async () => {
      submitted.value = true;
      if (forumComment.value.email.trim()) {
        forumComment.value.posted = fixedDate;
        //comment.value.push(forumComment.value);
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

      commentDialog.value = false;
      forumComment.value = {};
    };

    return {
      submitted,
      forumComment,
      commentDialog,
      editComment,
      saveComment,
      commentPanel,
      comment,
      toggle,
    };
  },
};
</script>

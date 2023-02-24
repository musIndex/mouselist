<template>
<div>
<router-view />
  <div class="card">
    <Toolbar class="p-mb-4">
      <template #left>
        <Button
          label="New Post"
          icon="pi pi-plus"
          style="background-color:#90BD31"
          class="p-button-success p-mr-2"
          @click="openNew"
        />
        <h4>
          Users can add a 'New Post' and 'Post Comment' on a post. Contact
          <a href="mailto:admin.mousedatabase@ucsf.edu">administrator</a> to
          request changes on Mouselist.
        </h4>
      </template>
    </Toolbar>
    <DataTable
      :value="forum"
      dataKey="id"
      sortField="id" 
      :sortOrder="-1"
      :paginator="true"
      :rows="10"
      :filters="filters1"
      :globalFilterFields="['mouse', 'details']"
      paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
      :rowsPerPageOptions="[10,20,50]" responsiveLayout="scroll"
      currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
      :loading="loading"
    >
      <template #header>
        <div class="table-header" >
          <h2 class="p-m-0">Mouselist Posts</h2>
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText
              v-model="filters1['global'].value"
              placeholder="Search Mouse & Details"
            />
          </span>
        </div>
      </template>
      <Column
        field="posted"
        header="Posted"
        style="min-width: 10rem"
      ></Column>
      <Column
        field="mouse"
        header="Mouse"
        :sortable="true"
        style="min-width: 16rem"
      ></Column>
      <Column
        field="details"
        header="Details"
        :sortable="true"
        style="min-width: 16rem">
         <template #body="{ data }" >
           {{data.details}}
           <a :href="`${data.links}`">{{data.links}}</a> 
        </template>
      </Column>
      <Column
        field="actions"
        header="Action"
        style="min-width: 10rem"
        :sortable="true"
      ></Column>
      <Column
        field="needed"
        header="Date Needed"
        style="min-width: 10rem"
      ></Column>
      <Column header="Notes" style="min-width: 16rem"  > 
        <template #body="{ data }" > 
          {{ data.comments}} 
           
        </template>
      </Column>
      <Column  header="Comments"
      >
      <template #body="{data}" >
        <div id="comment-post"/>
          <router-link
            style="text-decoration: none"
            :to="{
              name: 'Posts',
              params: {mouse: data.mouse, id: data.id }
            }">
          <CommentPosts ref="postComponent" />
          </router-link>
        </template>
      </Column>
      
      <Column
        field="contact"
        header="Contact"
        :sortable="true"
        style="min-width: 16rem"
      >
        <template #body="{ data }">
          <a
            :href="`mailto:${data.email}?subject=Mouselist post for ${data.mouse}`"
            >{{ data.email }}</a
          >
          for PI: {{ data.holder }}
        </template>
      </Column>
      <Column header="Post Comment">
        <template #body="{ data }" >
          <router-link
            style="text-decoration: none"
            :to="{
              name: 'Comment',
              params: {mouse: data.mouse, id: data.id, email: data.email }
            }">
            <Button
              icon="pi pi-pencil"
              style="background-color:#90BD31"
              class="p-button-rounded p-button-success p-mr-2"
              @click="showDialog(id)" 
              >
            </Button>
          </router-link>
        </template>
      </Column>
    </DataTable>
  </div>

  <Dialog
    v-model:visible="forumDialog"
    :style="{ width: '450px' }"
    header="Mouselist Request"
    :modal="true"
    class="p-fluid"
  >
    <div class="p-field">
      <label for="email">Your Email</label>
      <InputText
        id="email"
        v-model.trim="forumPost.email"
        required="true"
        autofocus
        :class="{ 'p-invalid': submitted && !forumPost.email }"
      />
      <small class="p-error" v-if="submitted && !forumPost.email"
        >Email is required.</small
      >
    </div>
    <div class="p-field">
      <label for="holder">Principal Investigator</label>
      <InputText
        id="holder"
        v-model.trim="forumPost.holder"
        required="true"
        autofocus
        :class="{ 'p-invalid': submitted && !forumPost.holder }"
      />
      <small class="p-error" v-if="submitted && !forumPost.holder"
        >PI is required</small
      >
    </div>
    <div class="p-field">
      <label for="mouse">Mouse Name or Help Wanted</label>
      <InputText
        id="mouse"
        v-model.trim="forumPost.mouse"
        required="true"
        autofocus
        :class="{ 'p-invalid': submitted && !forumPost.mouse }"
      />
      <small id ="mouse-help">Genes mutated & specify organism (if not mouse), or list 'help wanted'</small>
      <small class="p-error" v-if="submitted && !forumPost.mouse"
        >Mouse name is required or list help wanted.</small
      >
    </div>

    <div class="p-field">
      <label for="details">Mouse Details or Description of Need</label>
      <Textarea
        id="details"
        v-model="forumPost.details"
        required="true"
        rows="3"
        cols="20"
      />
      <small id ="details-help">For organism include vendor and stock # or mutation description</small>
    </div>
     <div class="p-field">
      <label for="links">Include URL link</label>
      <InputText
        id="links"
        v-model.trim="forumPost.links"
      />
      <small id ="links-help">Starts with "http" for vendor stock page, MGI page or web resource</small>
    </div>

    <div class="p-field">
      <label for="actions" class="p-mb-3">Posting Category</label>
      <Dropdown
        id="actions"
        v-model="forumPost.actions"
        :options="choices"
        optionLabel="name"
        optionValue="code"
        placeholder="Select an Action"
      />
    </div>
     <div class="p-field">
         <label for="needed">Select date needed, ASAP or No Date</label>
        <div class = "p-field-radiobutton">
        <RadioButton id="asap" name="needed" value="ASAP" v-model="forumPost.needed"/>
        <label for="asap">ASAP</label>
        </div>
        <div class = "p-field-radiobutton">
        <RadioButton id="none" name="needed" value="No Date" v-model="forumPost.needed"/>
        <label for="none">No Date</label>
        </div>
      <Calendar
        v-model="forumPost.needed"
        dateFormat="mm-dd-yy"
        id="date"
        placeholder="Select Date Needed"
      />
    </div>

    <div class="p-field">
      <label for="comments">Comment</label>
      <InputText id="comments" v-model.trim="forumPost.comments" />
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
        @click="savePosting"
      />
    </template>
  </Dialog>
  </div>
</template>
<script>
import { ref, onBeforeMount} from "vue";
import axios from "axios";
import { FilterMatchMode } from "primevue/api";
import "primeflex/primeflex.css";
import { useToast } from "primevue/usetoast";
import { useRouter } from "vue-router";
import CommentPosts from "../components/Posts.vue"


export default {
 name: "Forum",
  components: {
    CommentPosts,
  },
  created(){
    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    let prevMonth = month === 0 ? 11 : month - 1;
    let prevYear = prevMonth === 11 ? year - 1 : year;
    let nextMonth = month === 11 ? 0 : month + 1;
    let nextYear = nextMonth === 0 ? year + 1 : year;
    this.minDate = new Date();
    this.minDate.setMonth(prevMonth);
    this.minDate.setFullYear(prevYear);
    this.maxDate = new Date();
    this.maxDate.setMonth(nextMonth);
    this.maxDate.setFullYear(nextYear);

    let invalidDate = new Date();
    invalidDate.setDate(today.getDate() - 1);
    this.invalidDates = [today, invalidDate];
  },
  setup() {
    const baseURL = `${window.location.protocol}//${window.location.host}`;
    onBeforeMount(async() => {
      try {
        const { data } = await axios.get(`${baseURL}/api/forum`);
        console.log(baseURL);
        forum.value = data;
        console.log(data);
        loading.value = false;
        
      } catch (err) {
        console.error(err);
        console.log("error");
        console.log(baseURL);
      }
    });
    const router = useRouter();
    const forum = ref();
    const forumPost = ref({});
    const loading = ref();
    //const dt = ref();
    const needed = ref();
    const toast = useToast();
    const filters1 = ref({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    const submitted = ref(false);

    //const forumTable = ref(new ForumTable());
    const forumDialog = ref(false);

    const actions = ref();
    var currentDate = new Date();
    var fixedDate = currentDate.toDateString();
    const openNew = () => {
      forumPost.value = {};
      submitted.value = false;
      forumDialog.value = true;
    };
    const hideDialog = () => {
      forumDialog.value = false;
      submitted.value = false;
    };
    const refreshPosts = () => {
      window.location.reload();
      router.push("/api");
      
      console.log(window.location.host);
    }
    
    
    
    const choices = ref([
      { name: "Purchase", code: "Purchase" },
      { name: "Cryoresuscitation", code: "Cryoresuscitation" },
      { name: "Import", code: "Import" },
      { name: "Engineer", code: "Engineer" },
      { name: "Other", code: "Other" }
    ]);

    const savePosting = async () => {
      submitted.value = true;
      if (forumPost.value.email.trim()) {
        if ((forumPost.value.needed !== "No Date") && (forumPost.value.needed !=="ASAP")){
        forumPost.value.needed = forumPost.value.needed.toDateString();
        }
        if (forumPost.value.actions){
        forumPost.value.actions = forumPost.value.actions.value
          ? forumPost.value.actions.value
          : forumPost.value.actions;
        }
        forumPost.value.posted = fixedDate;
      
        try {
          await axios.post(`${baseURL}/api/forumPost`, forumPost.value);
          router.push("/api");
        } catch (error) {
          console.log(error);
        }
        //forum.value.push(forumPost.value);
        try {
        loading.value = true;  
        const { data } = await axios.get(`${baseURL}/api/forum`);
        console.log(baseURL);
        forum.value = data;
        console.log(data);
        loading.value = false; 
      } catch (err) {
        console.error(err);
        console.log("error");
        console.log(baseURL);
      }
       toast.add({
          severity: "success",
          summary: "Successful",
          detail: "Post Added",
          life: 3000,
        });  
      }
    
      forumDialog.value = false;
      forumPost.value = {};
    };

    const details = ref("<div>Add Mouse Details</div>");
    const calendar = ref();
    const postComponent = ref(null);

    return {
      loading, 
      openNew,
      needed,
      hideDialog,
      submitted,
      forumPost,
      forum,
      forumDialog,
      actions,
      calendar,
      savePosting,
      choices,
      details,
      filters1,
      postComponent,
      refreshPosts
      
    };
  },
};
</script>
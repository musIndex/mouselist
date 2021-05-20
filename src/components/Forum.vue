<template>


        <div class="card">
            <Toolbar class="p-mb-4">
                <template #left>
                    <Button label="New Post" icon="pi pi-plus" class="p-button-success p-mr-2" @click="openNew" />
                    <h4>Users can post on a listing in 'Comments.' Contact <a href="mailto:admin.mousedatabase@ucsf.edu">administrator</a> to update a Mouselist post.</h4>
                </template>
            </Toolbar>
            <DataTable ref="dt" :value="forum"  v-model:filters="filters1" dataKey="id" :loading="loading"
               paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" :globalFilterFields="['mouse','details','contact']" responsiveLayout="scroll">
                <template #header>
                    <div class="table-header">
                        <h2 class="p-m-0">Mouselist Posts</h2>
                        <span class="p-input-icon-left">
                            <i class="pi pi-search" />
                            <InputText v-model="filters1['global'].value" placeholder="Search Mouse and Details" />
                        </span>
                    </div>
                </template>
                <Column field="posted" header="Posted" :sortable="true" style="min-width:12rem"></Column>
                <Column field="mouse" header="Mouse" :sortable="true" style="min-width:16rem"></Column>
                <Column field="details" header="Details" :sortable="true" style="min-width:16rem"></Column>
                <Column field="action" header="Action" :sortable="true" style="min-width:16rem"></Column>
                <Column field="dateNeeded" header="Date Needed" :sortable="true" style="min-width:16rem"></Column>
                <Column header="Comments" style="min-width:16rem">
                  <template #body="{data}" >
                     {{data.notes}}
                    <router-link :to="{ name:'Comment', params: { id: data.id } }">
                        <Button type="button" icon="pi pi-search" @click="toggle(data.id, $event)" aria:haspopup="true" aria-controls="overlay_panel" />
                    </router-link>
                 </template>
                 </Column>
                <Column field="contact" header="Contact" :sortable="true" style="min-width:16rem">
                      <template #body="{data}">
                        <a :href="`mailto:${data.email}?subject=Mouselist post for ${data.mouse}`">{{data.email}}</a> for PI: {{data.holder}}
                      </template>
                     
                </Column>
                 <Column header="Post Comment">
                    <template #body="slotProps">
                        <router-link :to="{ name:'Comment', params: {mouse:slotProps.data.mouse, id: slotProps.data.id }}">
                        <Button icon="pi pi-pencil" class="p-button-rounded p-button-success p-mr-2" @click="editComment(slotProps.data.mouse, slotProps.data.id)" />
                        </router-link>
                    </template>
                </Column>
            </DataTable>
        </div>

            <Dialog v-model:visible="forumDialog" :style="{width: '450px'}" header="Mouselist Request" :modal="true" class="p-fluid">
            <div class="p-field">
                <label for="email">Email</label>
                <InputText id="email" v-model.trim="forumPost.email" required="true" autofocus :class="{'p-invalid': submitted && !forum.email}" />
                <small class="p-error" v-if="submitted && !forumPost.email">Email is required.</small>
            </div>
             <div class="p-field">
                <label for="holder">Principal Investigator</label>
                <InputText id="holder" v-model.trim="forumPost.holder" required="true" autofocus :class="{'p-invalid': submitted && !forum.holder}" />
                <small class="p-error" v-if="submitted && !forum.holder">PI is required</small>
            </div>
            <div class="p-field">
                <label for="mouse">Mouse Name</label>
                <InputText id="mouse" v-model.trim="forumPost.mouse" required="true" autofocus :class="{'p-invalid': submitted && !forum.mouse}" />
                <small class="p-error" v-if="submitted && !forumPost.mouse">Mouse name is required.</small>
            </div>
          
            <div class="p-field">
                <label for="details">Mouse Details (Stock #, mutation description)</label>
                <Textarea id="details" v-model="forumPost.details" required="true" rows="3" cols="20" />
            </div>
          
             <div class="p-field">
                <label for="action" class="p-mb-3">Posting Category</label>
                <Dropdown id="action" v-model="forumPost.action" :options="choices" optionLabel="name" optionValue="code" placeholder="Select an Action"/>
            </div>
            <div class="p-field">
                <label for="dateNeeded">Date Needed</label>
                <Calendar v-model="forumPost.dateNeeded" dateFormat="mm-dd-yy" id="date" placeholder="Date needed or none" />
            </div>

            <div class="p-field">
                <label for="comments">Comment</label>
                <InputText id="comments" v-model.trim="forumPost.comments" />   
            </div>
            <template #footer>
                <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideDialog"/>
                <Button label="Save" icon="pi pi-check" class="p-button-text" @click="savePosting" />
            </template>
            </Dialog>
           <Dialog v-model:visible="deletePostDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
                <span v-if="forum">Are you sure you want to delete <b>{{forumPost.mouse}}</b>?</span>
            </div>
            
        </Dialog>

</template>
<script>

import { ref, onMounted } from 'vue';
import axios from "axios";
import {FilterMatchMode} from 'primevue/api';
import 'primeflex/primeflex.css';
import { useToast } from 'primevue/usetoast';
import { useRouter } from 'vue-router';

export default {
 
  created() {
        let today = new Date();
        let month = today.getMonth();
        let year = today.getFullYear();
        let prevMonth = (month === 0) ? 11 : month -1;
        let prevYear = (prevMonth === 11) ? year - 1 : year;
        let nextMonth = (month === 11) ? 0 : month + 1;
        let nextYear = (nextMonth === 0) ? year + 1 : year;
        this.minDate = new Date();
        this.minDate.setMonth(prevMonth);
        this.minDate.setFullYear(prevYear);
        this.maxDate = new Date();
        this.maxDate.setMonth(nextMonth);
        this.maxDate.setFullYear(nextYear);

        let invalidDate = new Date();
        invalidDate.setDate(today.getDate() - 1);
        this.invalidDates = [today,invalidDate];
    },
   
   setup() {
         onMounted(async () => {
        try{
      let resp = await axios.get('http://localhost:5000/forum');
      resp.then(data => {
          forum.value = data;
          loading.value = false;
          });
    } catch (err) {
      console.error(err);
    }
   });
        const router = useRouter();
        const loading = ref(true);
        const forum = ref();
        const forumPost = ref({});
        
        const dt = ref();
        
        const toast = useToast();
        const filters1 = ref({'global': {value: null, matchMode: FilterMatchMode.CONTAINS}});
        const submitted = ref(false);
        
        //const forumTable = ref(new ForumTable());
        const forumDialog = ref(false);
        
        const deletePostDialog = ref(false);
        
        const action = ref();
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
        const choices= ref([
            {name: 'Purchase', code: 'Purchase'},
            {name: 'Cryoresuscitation', code: 'Cryoresuscitation'},
            {name: 'Import', code: 'Import'},
            {name: 'Engineer', code: 'Engineer'}
            
        ]);
     
        const savePosting = async () => {
            submitted.value = true;
            if (forumPost.value.email.trim()) {
            forumPost.value.id = createId();
            forumPost.value.posted = fixedDate;
            forumPost.value.dateNeeded = forumPost.value.dateNeeded.toDateString();
            forum.value.action = forumPost.value.action.value ? forumPost.value.action.value : forumPost.value.action;
            forum.value.push(forumPost.value);
            axios.post("http://localhost:5000/forumPost", {forum}).then((response) =>{
              router.push("/");
              console.log(response);
            },(error)=>{
              console.log(error);
            });
            //forum.value.push(forumPost.value);
            toast.add({severity:'success', summary: 'Successful', detail: 'Post Added', life: 3000});
            }
            forumDialog.value = false;
            forumPost.value = {};
        };
        
        
        const createId = () => {
            let id = '';
            var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            for ( var i = 0; i < 5; i++ ) {
                id += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return id;
        }
        
        
        const details = ref('<div>Add Mouse Details</div>');
        const calendar = ref();
        
        return { dt, loading, openNew, hideDialog, deletePostDialog, submitted, forumPost, forum, forumDialog, action, calendar, savePosting, choices, details, filters1}
    }

}
</script>
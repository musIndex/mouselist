
import App from './App.vue'
import router from './router'
//import router from '../backend/routes/routes'
//import VueRouter from 'vue-router'

//import Forum from './components/Forum.vue'
//import Comment from './components/Comment.vue'
//import { createRouter } from "vue-router";

import { createApp } from 'vue'
import PrimeVue from 'primevue/config';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

import ToastService from 'primevue/toastservice';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';
import Dropdown from 'primevue/dropdown';
import {FilterService} from 'primevue/api';
import {FilterMatchMode} from 'primevue/api';
import Calendar from 'primevue/calendar';
import Toolbar from 'primevue/toolbar';
import Dialog from 'primevue/dialog';
import Textarea from 'primevue/textarea';
import OverlayPanel from 'primevue/overlaypanel';

import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';


const app = createApp(App);
//Vue.config.productionTip = false;


//const router = new VueRouter({ mode: 'history', routes: routes });
app.use(PrimeVue);
app.use(PrimeVue, FilterMatchMode.CONTAINS);
app.use(ToastService);
app.use(FilterService);
app.use(PrimeVue, {
    filterMatchModeOptions: {
        text: [
            FilterMatchMode.STARTS_WITH,
            FilterMatchMode.CONTAINS,
            FilterMatchMode.NOT_CONTAINS,
            FilterMatchMode.ENDS_WITH,
            FilterMatchMode.EQUALS,
            FilterMatchMode.NOT_EQUALS
        ],
        numeric: [
            FilterMatchMode.EQUALS,
            FilterMatchMode.NOT_EQUALS,
            FilterMatchMode.LESS_THAN,
            FilterMatchMode.LESS_THAN_OR_EQUAL_TO,
            FilterMatchMode.GREATER_THAN,
            FilterMatchMode.GREATER_THAN_OR_EQUAL_TO
        ],
        date: [
            FilterMatchMode.DATE_IS,
            FilterMatchMode.DATE_IS_NOT,
            FilterMatchMode.DATE_BEFORE,
            FilterMatchMode.DATE_AFTER
        ]
    }
});
app.component('Toolbar', Toolbar);
app.component('Dialog', Dialog);
app.component('InputText', InputText);
app.component('Dropdown', Dropdown);
app.component('Calendar', Calendar);
app.component('Button', Button);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('ColumnGroup', ColumnGroup);
app.component('Textarea', Textarea);
app.component('OverlayPanel', OverlayPanel);
app.component('Mouse',{
    props: ['mouse'],
    template:`<h4>{{ mouse }}</h4>`
})
app.use(router);
app.mount('#app');


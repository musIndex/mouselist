import { createWebHistory, createRouter } from "vue-router";
import Forum from '../components/Forum.vue'
import Comment from '../components/Comment.vue'

const routes = [
    {
      name: 'Forum',
      path: '/',
      component: Forum
    },
    {
      name: 'Comment',
      path: '/comment/:id',
      component: Comment
    },
  ];

  const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  
  export default router;

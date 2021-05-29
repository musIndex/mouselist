import { createWebHistory, createRouter } from "vue-router";
import Forum from '../components/Forum.vue'
import Comment from '../components/Comment.vue'

const routes = [
    {
      name: 'Forum',
      path: '/',
      component: Forum,
      props: true,
        children: [
          {
            path: 'comment/:id',
              name: 'Comment',
              component: Comment,
              props: true
          }
        ]
      }
  ]

  const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  
  export default router;

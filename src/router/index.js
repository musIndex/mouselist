import { createWebHistory, createRouter } from "vue-router";
import Forum from '../components/Forum.vue'
import Comment from '../components/Comment.vue'
import Posts from '../components/Posts.vue'

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
          },
          {
            path: 'posts/:id',
              name: 'Posts',
              component: Posts,
              props: true
          },
        ]
      }
  ]

  const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  
  export default router;

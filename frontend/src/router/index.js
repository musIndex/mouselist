import { createWebHashHistory, createRouter } from "vue-router";
import Forum from '../components/Forum.vue'
import Comment from '../components/Comment.vue'
import Posts from '../components/Posts.vue'

const routes = [
    {
      name: 'Forum',
      path: '/api',
      component: Forum,
      props: true,
        children: [
          {
            path: '/api/comment/:id',
              name: 'Comment',
              component: Comment,
              props: true
          },
          {
            path: '/api/posts/:id',
              name: 'Posts',
              component: Posts,
              props: true
          },
        ]
      }
  ]

  const router = createRouter({
    history: createWebHashHistory(),
    routes,
  });
  
  export default router;

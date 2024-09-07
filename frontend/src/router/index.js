import { createRouter, createWebHistory} from "vue-router";
import Forum from '../components/Forum.vue'
import Comment from '../components/Comment.vue'
import Posts from '../components/Posts.vue'

const routes = [
    {
      name: 'Forum',
      path: '/api',
      component: Forum,
      props: true,
    children:[
    {
      path: '/api/comment/:id',
      name: 'Comment',
      component: Comment,
      props: route => ({ mouse: route.params.mouse, id: route.params.id, email: route.params.email })
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
    history: createWebHistory(),
    routes,
  });
  export default router;

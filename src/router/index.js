import { createWebHistory, createRouter } from 'vue-router'

import HomeView from '../views/Home.vue'
import ChatView from '../components/chat.vue'

const routes = [
    { name: 'Home', path: '/', component: HomeView },
    { name: 'Chat', path: '/chat', component: ChatView },
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
})

export default router;
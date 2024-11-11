import { createWebHistory, createRouter } from 'vue-router'

import HomeView from '../views/Home.vue'
import ChatView from '../components/chat.vue'
import LoginView from '../components/login.vue'

const routes = [
    { name: 'Home', path: '/', component: HomeView },
    { name: 'Chat', path: '/chat', component: ChatView },
    { name: 'Login', path: '/login', component: LoginView },
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
})

export default router;
import { createWebHistory, createRouter } from 'vue-router'

import HomeView from '../views/Home.vue'

import LoginView from '../components/login.vue'


import ChatView from '../components/chat.vue'

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

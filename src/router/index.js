import { createRouter, createMemoryHistory } from 'vue-router';
import Drawing from '@/components/drawing.vue'
import Login from '@/components/login.vue'
import Spinupwait from '@/components/spinupwait.vue'

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/drawing',
        name: 'Drawing',
        component: Drawing
    },
    {
        path: '/spinupwait',
        name: 'Spinupwait',
        component: Spinupwait,
    },
    {
        path: '/',
        name: 'Home',
        component: Spinupwait // Puedes redirigir a cualquier componente que desees como página principal
    },
];


const router = createRouter({
    history: createMemoryHistory(),
    routes
});


export default router;
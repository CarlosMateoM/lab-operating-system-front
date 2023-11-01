
import { createRouter, createWebHistory } from "vue-router";
import ControlPanel from '../view/ControlPanel.vue';
import Register from '../view/Register.vue';
import Login from '../view/Login.vue';
import store from "../store";



const routes = [
    {
        path: '/',
        name: 'ControlPanel',
        meta: { requiresAuth: true},
        component: ControlPanel
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    }
];

const router = createRouter({
    history:  createWebHistory(),
    routes
});


router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !store.state.user.token){
        next({name: 'Login'})
    } else if(store.state.user.token && (to.name === 'Login' || to.name === 'Register')) {
        next({name: 'ControlPanel'});
    } else {
        next()
    }
});

export default router;
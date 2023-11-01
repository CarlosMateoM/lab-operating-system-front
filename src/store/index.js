import { createStore } from "vuex";
import axiosClient from "../axios";

const store = createStore({
    state: {
        user: {
            data: {},
            token: sessionStorage.getItem("TOKEN"),
        },
        catalog: {
            data: {}
        }
    },
    getters: {},
    actions: {
        async register({ commit }, user){
            const { data } =  await axiosClient.post('/register', user);
            commit('setUser', data);
            return data;
        },
        async login({ commit }, user){
            const { data } =  await axiosClient.post('/login', user);
            commit('setUser', data);
            return data;
        },
        async logout({ commit }){
            const { data } = await axiosClient.post('/tokens/expire');
            commit('removeUser');
            return data;
        },
        async getCatalog({ commit }){
            const data = await axiosClient.get('/catalog');
            commit('setCatalog', data);
            return data;
        },

    },
    mutations: {
        setUser: (state, userData) => {
            state.user.token = userData.token;
            state.user.data = userData.user;
            sessionStorage.setItem('TOKEN', userData.token);
        },
        removeUser: (state) => {
            state.user.token = null;
            state.user.data = {};
            sessionStorage.removeItem('TOKEN');
        },
        setCatalog: (state, catalogData) => {
            state.catalog.data = catalogData.data.catalogs;
        }
    },
    modules: {}
});

export default store;